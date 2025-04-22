package economark.mobile.ui.activities

import android.content.Intent
import android.os.Bundle
import android.widget.Spinner
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.TextInputEditText
import economark.mobile.MainActivity
import economark.mobile.R
import economark.network.ApiService
import economark.network.RegisterRequest
import economark.network.RegisterResponse
import economark.network.RetrofitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {

    private val apiService = RetrofitClient.instance // Usa la instancia de ApiService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        // Obtén las referencias de los campos
        val firstName = findViewById<TextInputEditText>(R.id.firstName)
        val email = findViewById<TextInputEditText>(R.id.registerEmail)
        val password = findViewById<TextInputEditText>(R.id.registerPassword)
        val confirmPassword = findViewById<TextInputEditText>(R.id.confirmPassword)
        val registerButton = findViewById<MaterialButton>(R.id.registerButton)
        val loginLink = findViewById<android.widget.TextView>(R.id.loginLink)

        registerButton.setOnClickListener {
            val rol = findViewById<Spinner>(R.id.userTypeSpinner).selectedItem.toString().trim()
            val name = firstName.text.toString().trim()
            val emailText = email.text.toString().trim()
            val pass = password.text.toString().trim()
            val confirmPass = confirmPassword.text.toString().trim()

            // Validaciones básicas de los campos
            if (name.isEmpty() || emailText.isEmpty() || pass.isEmpty() || confirmPass.isEmpty()) {
                Toast.makeText(this, "Por favor, complete todos los campos", Toast.LENGTH_SHORT).show()
            } else if (pass != confirmPass) {
                Toast.makeText(this, "Las contraseñas no coinciden", Toast.LENGTH_SHORT).show()
            } else if (rol.isEmpty()) {
                Toast.makeText(this, "Por favor, seleccione un tipo de usuario", Toast.LENGTH_SHORT).show()
            } else {
                // Enviar la solicitud de registro
                enviarRegistro(rol, name, emailText, pass)
            }
        }


        // Enlace para ir al login si el usuario ya tiene cuenta
        loginLink.setOnClickListener {
            finish() // Vuelve a la pantalla de login
        }
    }

    // Función para enviar la solicitud de registro
    private fun enviarRegistro(rol: String, nombre: String, email: String, password: String) {
        val registerRequest = RegisterRequest(rol, nombre, email, password)

        apiService.register(registerRequest).enqueue(object : Callback<RegisterResponse> {
            override fun onFailure(call: Call<RegisterResponse>, t: Throwable) {
                // Manejar error de red
                Toast.makeText(this@RegisterActivity, "Error de red: ${t.message}", Toast.LENGTH_LONG).show()
            }

            override fun onResponse(call: Call<RegisterResponse>, response: Response<RegisterResponse>) {
                if (response.isSuccessful) {
                    // Registro exitoso
                    Toast.makeText(this@RegisterActivity, "Registro exitoso", Toast.LENGTH_SHORT).show()
                    // Redirigir a la pantalla principal después de un registro exitoso
                    startActivity(Intent(this@RegisterActivity, MainActivity::class.java))
                    finish() // Cierra la actividad actual
                } else {
                    // Mostrar error si la respuesta no es exitosa
                    Toast.makeText(this@RegisterActivity, "Error: ${response.message()}", Toast.LENGTH_LONG).show()
                }
            }
        })
    }
}
