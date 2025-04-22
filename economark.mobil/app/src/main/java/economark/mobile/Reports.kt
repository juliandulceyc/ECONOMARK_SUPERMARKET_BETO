package economark.mobile

import android.annotation.SuppressLint
import android.app.DatePickerDialog
import android.content.ActivityNotFoundException
import android.content.Intent
import android.graphics.Color
import android.graphics.Paint
import android.graphics.pdf.PdfDocument
import android.os.Bundle
import android.os.Environment
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.core.content.FileProvider
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch
import java.io.File
import java.io.FileOutputStream
import java.text.SimpleDateFormat
import java.util.*

class Reports : AppCompatActivity() {

    private lateinit var etFecha: EditText
    private lateinit var iconoCalendario: ImageView
    private lateinit var spinnerReportes: Spinner
    private lateinit var btnGenerar: Button
    private lateinit var btnDescargar: Button
    private lateinit var btnHistorial: Button
    private lateinit var reportGeneratedLayout: LinearLayout
    private var archivoGenerado: File? = null

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_reports)

        // Toolbar
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        // Referencias UI
        etFecha = findViewById(R.id.etFecha)
        iconoCalendario = findViewById(R.id.iconoCalendario)
        spinnerReportes = findViewById(R.id.spinnerReportes)
        btnGenerar = findViewById(R.id.btnGenerar)
        btnDescargar = findViewById(R.id.btnDescargar)
        btnHistorial = findViewById(R.id.btnHistorial)
        reportGeneratedLayout = findViewById(R.id.reportGeneratedLayout)

        reportGeneratedLayout.visibility = View.GONE

        // Spinner
        val opciones = arrayOf(
            "Seleccione reporte...",
            "Bajo Stock",
            "Productos por fecha",
            "Generar todos"
        )
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, opciones)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinnerReportes.adapter = adapter

        // Calendario
        iconoCalendario.setOnClickListener { mostrarDatePicker() }

        // Botón Generar
        btnGenerar.setOnClickListener {
            val seleccion = spinnerReportes.selectedItem.toString()
            when (seleccion) {
                "Bajo Stock" -> generarReporteBajoStock()
                else -> Toast.makeText(this, "Funcionalidad no implementada aún", Toast.LENGTH_SHORT).show()
            }
        }

        // Botón Descargar
        btnDescargar.setOnClickListener {
            archivoGenerado?.let { file ->
                val uri = FileProvider.getUriForFile(
                    this,
                    "${packageName}.provider",
                    file
                )
                val intent = Intent(Intent.ACTION_VIEW).apply {
                    setDataAndType(uri, "application/pdf")
                    addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                }
                try {
                    startActivity(Intent.createChooser(intent, "Abrir reporte con..."))
                } catch (e: ActivityNotFoundException) {
                    Toast.makeText(this, "No hay visor de PDF instalado", Toast.LENGTH_SHORT).show()
                }
            } ?: Toast.makeText(this, "No se ha generado ningún archivo aún", Toast.LENGTH_SHORT).show()
        }

        // Botón Historial
        btnHistorial.setOnClickListener {
            Toast.makeText(this, "Funcionalidad de historial aún no implementada", Toast.LENGTH_SHORT).show()
        }
    }

    private fun mostrarDatePicker() {
        val calendar = Calendar.getInstance()
        val datePicker = DatePickerDialog(
            this,
            { _, year, month, day ->
                etFecha.setText("$day/${month + 1}/$year")
            },
            calendar.get(Calendar.YEAR),
            calendar.get(Calendar.MONTH),
            calendar.get(Calendar.DAY_OF_MONTH)
        )
        datePicker.show()
    }

    private fun generarReporteBajoStock() {
        btnGenerar.isEnabled = false
        btnGenerar.text = "Generando..."

        lifecycleScope.launch {
            try {
                val datos = listOf(
                    Triple(1, "Producto A", "5 unidades"),
                    Triple(2, "Producto B", "2 unidades"),
                    Triple(3, "Producto C", "1 unidad")
                )

                generarPDF(datos)
                Toast.makeText(this@Reports, "Reporte generado", Toast.LENGTH_SHORT).show()
                reportGeneratedLayout.visibility = View.VISIBLE

            } catch (e: Exception) {
                Toast.makeText(this@Reports, "Error al generar reporte", Toast.LENGTH_SHORT).show()
            } finally {
                btnGenerar.isEnabled = true
                btnGenerar.text = "Generar"
            }
        }
    }

    private fun generarPDF(datos: List<Triple<Int, String, String>>) {
        val pdf = PdfDocument()
        val pageInfo = PdfDocument.PageInfo.Builder(595, 842, 1).create()
        val page = pdf.startPage(pageInfo)
        val canvas = page.canvas

        val titlePaint = Paint().apply {
            color = Color.BLACK
            textSize = 22f
            textAlign = Paint.Align.CENTER
        }

        val headerPaint = Paint().apply {
            color = Color.BLACK
            textSize = 14f
            isFakeBoldText = true
        }

        val textPaint = Paint().apply {
            color = Color.BLACK
            textSize = 12f
        }

        var y = 80f
        canvas.drawText("Reporte Bajo Stock", 297f, y, titlePaint)
        y += 40f
        val fecha = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault()).format(Date())
        canvas.drawText("Generado el: $fecha", 297f, y, textPaint)

        y += 40f
        canvas.drawText("ID", 50f, y, headerPaint)
        canvas.drawText("Nombre", 150f, y, headerPaint)
        canvas.drawText("Stock", 350f, y, headerPaint)

        y += 20f
        canvas.drawLine(50f, y, 545f, y, headerPaint)

        for (item in datos) {
            y += 30f
            canvas.drawText(item.first.toString(), 50f, y, textPaint)
            canvas.drawText(item.second, 150f, y, textPaint)
            canvas.drawText(item.third, 350f, y, textPaint)
        }

        pdf.finishPage(page)

        val file = File(getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS), "reporte_economark_${System.currentTimeMillis()}.pdf")
        pdf.writeTo(FileOutputStream(file))
        pdf.close()
        archivoGenerado = file
    }
}
