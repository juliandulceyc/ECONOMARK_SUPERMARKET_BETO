package economark.mobile

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import economark.mobile.network.api
import economark.mobile.network.
import economark.mobile.network.RetrofitClient
import economark.mobile.utils.SessionManager
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import com.google.android.material.snackbar.Snackbar
import androidx.core.content.ContextCompat
import android.graphics.Color
import com.google.android.gms.cast.framework.SessionManager

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var sessionManager: SessionManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)
        supportActionBar?.hide()

        sessionManager = SessionManager(this)

        setupListeners()
        checkExistingSession()
    }

    private fun setupListeners() {
        binding.buttonLogin.setOnClickListener {
            val email = binding.inputEmail.text.toString()
            val password = binding.inputPassword.text.toString()

            if (validateInputs(email, password)) {
                performLogin(email, password)
            }
        }

        binding.tvForgotPassword.setOnClickListener {
            navigateToPasswordRecovery()
        }

        binding.register.setOnClickListener {
            navigateToRegister()
        }
    }

    private fun validateInputs(email: String, password: String): Boolean {
        return when {
            email.isEmpty() -> {
                showSnackbar("Ingrese su correo electrónico")
                false
            }
            password.isEmpty() -> {
                showSnackbar("Ingrese su contraseña")
                false
            }
            else -> true
        }
    }

    private fun performLogin(email: String, password: String) {
        val loginRequest = LoginRequest(email, password)

        RetrofitClient.instance.login(loginRequest).enqueue(object : Callback<LoginResponse> {
            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                if (response.isSuccessful) {
                    handleLoginSuccess(response.body())
                } else {
                    handleLoginError(response.code())
                }
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                showSnackbar("Error de conexión: ${t.message}")
            }
        })
    }

    private fun handleLoginSuccess(loginResponse: LoginResponse?) {
        loginResponse?.let {
            if (it.success) {
                sessionManager.saveUserSession(
                    token = it.token,
                    userId = it.userId,
                    rol = it.rol,
                    fotoPerfil = it.fotoPerfil
                )
                redirectToHome()
            } else {
                showSnackbar(it.message ?: "Error de autenticación")
            }
        }
    }

    private fun handleLoginError(statusCode: Int) {
        val errorMessage = when (statusCode) {
            401 -> "Credenciales inválidas"
            500 -> "Error del servidor"
            else -> "Error desconocido ($statusCode)"
        }
        showSnackbar(errorMessage)
    }

    private fun checkExistingSession() {
        if (sessionManager.isLoggedIn()) {
            redirectToHome()
        }
    }

    private fun showSnackbar(message: String) {
        Snackbar.make(binding.mainContainer, message, Snackbar.LENGTH_SHORT).apply {
            setBackgroundTint(ContextCompat.getColor(this@MainActivity, R.color.colorError))
            setTextColor(Color.WHITE)
            show()
        }
    }

    private fun navigateToPasswordRecovery() {
        startActivity(Intent(this, RecuperarContrasenaActivity::class.java))
    }

    private fun navigateToRegister() {
        startActivity(Intent(this, RegisterActivity::class.java))
    }

    private fun redirectToHome() {
        startActivity(Intent(this, HomeActivity::class.java))
        finish()
    }
}