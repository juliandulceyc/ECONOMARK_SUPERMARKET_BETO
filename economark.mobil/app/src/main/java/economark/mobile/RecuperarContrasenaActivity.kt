package economark.mobile.ui.activities

import android.os.Bundle
import android.view.View
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.TextInputEditText
import economark.mobile.R
import okhttp3.*
import org.json.JSONObject
import java.io.IOException
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.MediaType.Companion.toMediaType


class RecuperarContrasenaActivity : AppCompatActivity() {

    private val client = OkHttpClient()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_forgot_password)

        val sendEmailEditText = findViewById<TextInputEditText>(R.id.sendEmail)
        val buttonForgot = findViewById<MaterialButton>(R.id.buttonForgot)
        val backToLoginText = findViewById<TextView>(R.id.backToLoginText)

        // Click listener for the "Enviar" button to initiate password recovery
        buttonForgot.setOnClickListener {
            val email = sendEmailEditText.text.toString().trim()

            if (email.isNotEmpty()) {
                mostrarConfirmacion(email)
            } else {
                Toast.makeText(this, "Por favor ingresa un correo electrónico válido", Toast.LENGTH_SHORT).show()
            }
        }

        // Click listener for the "Volver al login" link
        backToLoginText.setOnClickListener {
            // Go back to the login screen
            finish() // Or startActivity(Intent(this, LoginActivity::class.java))
        }
    }

    // Método para mostrar la alerta de confirmación antes de enviar el correo
    private fun mostrarConfirmacion(email: String) {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Confirmación de envío")
        builder.setMessage("¿Estás seguro de que deseas enviar un correo de recuperación a $email?")
        builder.setPositiveButton("Sí") { _, _ ->
            recuperarContrasena(email)
        }
        builder.setNegativeButton("No") { dialog, _ ->
            dialog.dismiss()  // Solo cierra la alerta si el usuario elige "No"
        }
        builder.create().show()
    }

    private fun recuperarContrasena(email: String) {
        val json = JSONObject()
        json.put("correo", email)

        val mediaType = "application/json; charset=utf-8".toMediaType()
        val body = json.toString().toRequestBody(mediaType)
        val url = "http://10.0.2.2:3000/auth/forgot-password" // Cambia la URL si es necesario

        val request = Request.Builder()
            .url(url)
            .post(body)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                runOnUiThread {
                    Toast.makeText(this@RecuperarContrasenaActivity, "Error de red: ${e.message}", Toast.LENGTH_LONG).show()
                }
            }

            override fun onResponse(call: Call, response: Response) {
                val responseBody = response.body?.string()
                runOnUiThread {
                    if (response.isSuccessful) {
                        // If the request is successful, show a confirmation message
                        mostrarAlertaExito()
                    } else {
                        // If there is an error, show the error message
                        mostrarAlertaError(responseBody ?: "Error desconocido")
                    }
                }
            }
        })
    }

    // Método para mostrar la alerta de éxito
    private fun mostrarAlertaExito() {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Éxito")
        builder.setMessage("Correo enviado para recuperar contraseña. Revisa tu bandeja de entrada.")
        builder.setPositiveButton("Aceptar") { dialog, _ ->
            dialog.dismiss()  // Cierra el diálogo cuando el usuario hace clic en "Aceptar"
            finish() // Finaliza la actividad para regresar a la pantalla de login
        }
        builder.create().show()
    }

    // Método para mostrar la alerta de error
    private fun mostrarAlertaError(errorMessage: String) {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Error")
        builder.setMessage("Hubo un problema al intentar enviar el correo. $errorMessage")
        builder.setPositiveButton("Aceptar") { dialog, _ ->
            dialog.dismiss()
        }
        builder.create().show()
    }
}
