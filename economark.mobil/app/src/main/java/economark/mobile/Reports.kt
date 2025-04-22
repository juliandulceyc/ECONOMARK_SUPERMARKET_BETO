package economark.mobile

import android.content.Intent
import android.graphics.*
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import economark.mobile.models.ReportesConfig
import economark.mobile.models.Columna
import okhttp3.*
import org.json.JSONArray
import java.io.File
import java.io.FileOutputStream
import java.io.IOException

class Reports : AppCompatActivity() {

    private lateinit var spinner: Spinner
    private lateinit var progressBar: ProgressBar
    private lateinit var client: OkHttpClient

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_reports)

        // Configuración del Toolbar y el botón de regresar
        val toolbar = findViewById<Toolbar>(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        // Asegurarse de que el botón de regreso funciona correctamente
        toolbar.setNavigationOnClickListener {
            onBackPressed() // Utilizamos onBackPressed() para garantizar el comportamiento esperado
        }

        spinner = findViewById(R.id.spinnerReportes)
        progressBar = findViewById(R.id.progressBar)
        client = OkHttpClient()

        val reportes = ReportesConfig.entidades.keys.toList()
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, reportes)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinner.adapter = adapter

        findViewById<Button>(R.id.btnGenerarReporte).setOnClickListener {
            val tipoReporte = spinner.selectedItem.toString()
            val entidad = ReportesConfig.entidades[tipoReporte]
            if (entidad != null) {
                fetchAndGenerateReport(entidad.label, entidad.url, entidad.columnas)
            } else {
                Toast.makeText(this, "Tipo de reporte no reconocido", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun fetchAndGenerateReport(title: String, url: String, columnas: List<Columna>) {
        progressBar.visibility = View.VISIBLE

        val request = Request.Builder().url(url).build()
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                runOnUiThread {
                    progressBar.visibility = View.GONE
                    Toast.makeText(this@Reports, "Error al obtener datos", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onResponse(call: Call, response: Response) {
                runOnUiThread { progressBar.visibility = View.GONE }

                if (response.isSuccessful) {
                    val jsonArray = JSONArray(response.body?.string())
                    val pdfFile = generatePdf(title, columnas, jsonArray)
                    openPdf(pdfFile)
                } else {
                    runOnUiThread {
                        Toast.makeText(this@Reports, "Error al generar reporte", Toast.LENGTH_SHORT).show()
                    }
                }
            }
        })
    }

    private fun generatePdf(title: String, columnas: List<Columna>, data: JSONArray): File {
        val config = ReportesConfig.entidades[title] ?: return File("")
        val columnas = config.columnas

        val document = android.graphics.pdf.PdfDocument()
        val pageInfo = android.graphics.pdf.PdfDocument.PageInfo.Builder(595, 842, 1).create()
        val page = document.startPage(pageInfo)

        val canvas = page.canvas
        val paint = Paint()
        val headerPaint = Paint()
        val linePaint = Paint()

        headerPaint.typeface = Typeface.create(Typeface.DEFAULT_BOLD, Typeface.BOLD)
        headerPaint.textSize = 14f
        headerPaint.color = Color.WHITE

        paint.textSize = 12f
        paint.color = Color.BLACK

        linePaint.color = Color.BLACK
        linePaint.strokeWidth = 1f

        val cellHeight = 30f
        val cellPadding = 6f
        val startX = 40f
        var startY = 80f
        val cellWidth = (500f / columnas.size)

        // Título
        val titlePaint = Paint()
        titlePaint.typeface = Typeface.create(Typeface.DEFAULT_BOLD, Typeface.BOLD)
        titlePaint.textSize = 20f
        titlePaint.color = Color.rgb(33, 150, 243)
        canvas.drawText("Reporte: $title", startX, 50f, titlePaint)

        // Encabezados
        for ((i, col) in columnas.withIndex()) {
            val left = startX + i * cellWidth
            canvas.drawRect(left, startY, left + cellWidth, startY + cellHeight, Paint().apply { color = Color.rgb(33, 150, 243) })
            canvas.drawText(col.label, left + cellPadding, startY + cellHeight / 2 + 5f, headerPaint)
        }

        startY += cellHeight

        // Datos
        for (i in 0 until data.length()) {
            val obj = data.getJSONObject(i)

            for ((j, col) in columnas.withIndex()) {
                val left = startX + j * cellWidth
                val value = if (obj.has(col.key)) obj.getString(col.key) else ""
                canvas.drawRect(left, startY, left + cellWidth, startY + cellHeight, Paint().apply { color = Color.WHITE })
                canvas.drawText(value, left + cellPadding, startY + cellHeight / 2 + 5f, paint)
            }

            startY += cellHeight
            if (startY + cellHeight > 800f) break // salto de página aún no implementado
        }

        // Cuadrícula (líneas verticales)
        for (i in 0..columnas.size) {
            val x = startX + i * cellWidth
            canvas.drawLine(x, 80f, x, startY, linePaint)
        }

        // Líneas horizontales
        val rowCount = data.length().coerceAtMost(((800f - 80f) / cellHeight).toInt())
        for (i in 0..rowCount) {
            val y = 80f + i * cellHeight
            canvas.drawLine(startX, y, startX + columnas.size * cellWidth, y, linePaint)
        }

        document.finishPage(page)

        val file = File(getExternalFilesDir(null), "$title.pdf")
        document.writeTo(FileOutputStream(file))
        document.close()

        return file
    }

    private fun openPdf(file: File) {
        val intent = Intent(Intent.ACTION_VIEW)
        intent.setDataAndType(
            androidx.core.content.FileProvider.getUriForFile(this, "${packageName}.provider", file),
            "application/pdf"
        )
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        startActivity(intent)
    }
}
