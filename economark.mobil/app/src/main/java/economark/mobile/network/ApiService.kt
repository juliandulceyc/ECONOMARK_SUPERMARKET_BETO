package com.example.marflex.network

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
    val fotoPerfil: String?
)

// Interfaz Retrofit para consumir la API
interface ApiService {
    @POST("/login")
    fun login(@Body request: LoginRequest): Call<LoginResponse>
}
