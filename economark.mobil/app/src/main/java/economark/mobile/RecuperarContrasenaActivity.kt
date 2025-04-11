package economark.mobile

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.button.MaterialButton
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.io.IOException
import android.widget.TextView


class RecuperarContrasenaActivity : AppCompatActivity() {

    private val client = OkHttpClient()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_forgot_password)
        supportActionBar?.hide()

        // Referencias a las vistas del layout
        val inputEmail = findViewById<TextInputEditText>(R.id.sendEmail)
        val buttonForgot = findViewById<MaterialButton>(R.id.buttonForgot)
        val backToLoginText = findViewById<TextView>(R.id.backToLoginText)

        // Configuración del botón "Enviar"
        buttonForgot.setOnClickListener {
            val email = inputEmail.text.toString().trim()
            if (email.isNotEmpty()) {
                enviarCorreoRecuperacion(email)
            } else {
                Toast.makeText(this, "Por favor, ingresa tu correo", Toast.LENGTH_SHORT).show()
            }
        }

        // Navegar de vuelta a la pantalla de login
        backToLoginText.setOnClickListener {
            finish() // Cierra esta actividad y vuelve al login
        }
    }

    private fun enviarCorreoRecuperacion(email: String) {
        val json = JSONObject()
        json.put("email", email)

        val mediaType = "application/json; charset=utf-8".toMediaType()
        val body = json.toString().toRequestBody(mediaType)
        val url = "http://10.0.2.2:3000/recuperar-password" // Ajusta esta URL según tu API

        val request = Request.Builder()
            .url(url)
            .post(body)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                runOnUiThread {
                    Toast.makeText(
                        this@RecuperarContrasenaActivity,
                        "Error de red: ${e.message}",
                        Toast.LENGTH_LONG
                    ).show()
                }
            }

            override fun onResponse(call: Call, response: Response) {
                val responseBody = response.body?.string()
                runOnUiThread {
                    if (response.isSuccessful) {
                        Toast.makeText(
                            this@RecuperarContrasenaActivity,
                            "Correo enviado correctamente",
                            Toast.LENGTH_SHORT
                        ).show()

                        // Redirigir a una pantalla de confirmación o al login
                        val intent = Intent(this@RecuperarContrasenaActivity, MainActivity::class.java)
                        startActivity(intent)
                        finish()
                    } else {
                        Toast.makeText(
                            this@RecuperarContrasenaActivity,
                            "Error: $responseBody",
                            Toast.LENGTH_LONG
                        ).show()
                    }
                }
            }
        })
    }
}
