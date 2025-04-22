package economark.network

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

// Datos que se envían al backend para iniciar sesión
data class LoginRequest(
    val username: String,
    val password: String
)

// Respuesta del backend después de iniciar sesión
data class LoginResponse(
    val success: Boolean,
    val message: String,
    val token: String,
    val rol: String,
    val userId: String,
    val fotoPerfil: String? // si no estás usando fotoPerfil aún, puedes ponerlo como null
)

// Datos que se envían al backend para registrar un nuevo usuario
data class RegisterRequest(
    val rol: String,
    val username: String,
    val correo: String,
    val password: String
)

// Respuesta del backend después de registrar un nuevo usuario
data class RegisterResponse(
    val success: Boolean,
    val message: String
)

// Interfaz Retrofit para consumir la API
interface ApiService {
    @POST("auth/login")
    fun login(@Body request: LoginRequest): Call<LoginResponse>

    @POST("auth/register")
    fun register(@Body request: RegisterRequest): Call<RegisterResponse>
}
