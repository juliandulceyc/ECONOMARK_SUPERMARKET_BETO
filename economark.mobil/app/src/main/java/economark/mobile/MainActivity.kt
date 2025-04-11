package economark.mobile

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import economark.mobile.HomeActivity
import com.google.android.material.snackbar.Snackbar
import economark.mobile.utils.SessionManager
import economark.network.LoginRequest
import economark.network.LoginResponse
import economark.network.RetrofitClient
import economark.mobile.databinding.ActivityMainBinding
import economark.mobile.ui.activities.RegisterActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var sessionManager: SessionManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        supportActionBar?.hide()

        sessionManager = SessionManager(this)

        setupListeners()
    }

    private fun setupListeners() {
        // Botón de inicio de sesión
        binding.buttonLogin.setOnClickListener {
            val email = binding.inputEmail.text.toString()
            val password = binding.inputPassword.text.toString()

            if (email.isNotEmpty() && password.isNotEmpty()) {
                performLogin(email, password)
            } else {
                showSnackbar("Por favor, llena todos los campos")
            }
        }

        // Texto de "Olvidaste tu contraseña"
        binding.tvForgotPassword.setOnClickListener {
            navigateToPasswordRecovery()
        }

        // Texto para registrarse
        binding.register.setOnClickListener {
            navigateToRegister()
        }
    }

    private fun performLogin(email: String, password: String) {
        val loginRequest = LoginRequest(email, password)

        RetrofitClient.instance.login(loginRequest).enqueue(object : Callback<LoginResponse> {
            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                if (response.isSuccessful) {
                    val loginResponse = response.body()
                    if (loginResponse?.success == true) {
                        // Guardar la sesión del usuario
                        sessionManager.saveUserSession(
                            token = loginResponse.token,
                            userId = loginResponse.userId,
                            rol = loginResponse.rol,
                            fotoPerfil = loginResponse.fotoPerfil
                        )

                        Toast.makeText(
                            this@MainActivity,
                            "¡Inicio de sesión exitoso!",
                            Toast.LENGTH_SHORT
                        ).show()
                        redirectToHome()
                    } else {
                        showSnackbar(loginResponse?.message ?: "Error desconocido")
                    }
                } else {
                    showSnackbar("Usuario o contraseña incorrectos")
                }
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                showSnackbar("Error de conexión: ${t.message}")
            }
        })
    }

    private fun showSnackbar(message: String) {
        Snackbar.make(binding.mainContainer, message, Snackbar.LENGTH_SHORT).apply {
            setBackgroundTint(ContextCompat.getColor(this@MainActivity, R.color.colorError))
            setTextColor(Color.WHITE)
            show()
        }
    }

    private fun navigateToPasswordRecovery() {
        val intent = Intent(this, RecuperarContrasenaActivity::class.java)
        startActivity(intent)
    }

    private fun navigateToRegister() {
        val intent = Intent(this, RegisterActivity::class.java)
        startActivity(intent)
    }

    private fun redirectToHome() {
        val intent = Intent(this, HomeActivity::class.java)
        startActivity(intent)
        finish()
    }
}
