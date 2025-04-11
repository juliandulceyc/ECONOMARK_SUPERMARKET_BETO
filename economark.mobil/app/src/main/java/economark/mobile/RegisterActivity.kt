package economark.mobile.ui.activities

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.TextInputEditText
import economark.mobile.MainActivity
import economark.mobile.R
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.io.IOException

class RegisterActivity : AppCompatActivity() {

    private val client = OkHttpClient()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)
        supportActionBar?.hide()

        val firstName = findViewById<TextInputEditText>(R.id.firstName)
        val lastName = findViewById<TextInputEditText>(R.id.lastName)
        val email = findViewById<TextInputEditText>(R.id.registerEmail)
        val password = findViewById<TextInputEditText>(R.id.registerPassword)
        val confirmPassword = findViewById<TextInputEditText>(R.id.confirmPassword)
        val registerButton = findViewById<MaterialButton>(R.id.registerButton)
        val loginLink = findViewById<android.widget.TextView>(R.id.loginLink)

        registerButton.setOnClickListener {
            val name = firstName.text.toString().trim()
            val last = lastName.text.toString().trim()
            val emailText = email.text.toString().trim()
            val pass = password.text.toString().trim()
            val confirmPass = confirmPassword.text.toString().trim()

            if (name.isEmpty() || last.isEmpty() || emailText.isEmpty() || pass.isEmpty() || confirmPass.isEmpty()) {
                Toast.makeText(this, "Por favor, complete todos los campos", Toast.LENGTH_SHORT).show()
            } else if (pass != confirmPass) {
                Toast.makeText(this, "Las contraseñas no coinciden", Toast.LENGTH_SHORT).show()
            } else {
                enviarRegistro(name, last, emailText, pass)
            }
        }

        loginLink.setOnClickListener {
            finish() // vuelve a la pantalla de login
        }
    }

    private fun enviarRegistro(nombre: String, apellido: String, email: String, password: String) {
        val json = JSONObject().apply {
            put("nombre", nombre)
            put("apellido", apellido)
            put("email", email)
            put("password", password)
        }

        val mediaType = "application/json; charset=utf-8".toMediaType()
        val body = json.toString().toRequestBody(mediaType)
        val url = "http://10.0.2.2:3000/register" // Ajusta esta URL a tu endpoint real

        val request = Request.Builder()
            .url(url)
            .post(body)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                runOnUiThread {
                    Toast.makeText(this@RegisterActivity, "Error de red: ${e.message}", Toast.LENGTH_LONG).show()
                }
            }

            override fun onResponse(call: Call, response: Response) {
                val responseBody = response.body?.string()
                runOnUiThread {
                    if (response.isSuccessful) {
                        Toast.makeText(this@RegisterActivity, "Registro exitoso", Toast.LENGTH_SHORT).show()
                        startActivity(Intent(this@RegisterActivity, MainActivity::class.java))
                        finish()
                    } else {
                        Toast.makeText(this@RegisterActivity, "Error: $responseBody", Toast.LENGTH_LONG).show()
                    }
                }
            }
        })
    }
}
