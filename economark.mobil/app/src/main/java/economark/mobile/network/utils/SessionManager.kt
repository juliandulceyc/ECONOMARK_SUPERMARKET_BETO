package com.example.marflexv2.utils

import android.content.Context
import android.content.SharedPreferences

class SessionManager(context: Context) {
    private var prefs: SharedPreferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    companion object {
        const val PREFS_NAME = "user_session"
        const val KEY_AUTH_TOKEN = "auth_token"
        const val KEY_USER_ID = "user_id"
        const val KEY_USER_ROL = "user_rol"
        const val KEY_FOTO_PERFIL = "foto_perfil"
    }

    fun saveUserSession(token: String, userId: String, rol: String, fotoPerfil: String?) {
        val editor = prefs.edit()
        editor.putString(KEY_AUTH_TOKEN, token)
        editor.putString(KEY_USER_ID, userId)
        editor.putString(KEY_USER_ROL, rol)
        editor.putString(KEY_FOTO_PERFIL, fotoPerfil)
        editor.apply()
    }

    fun fetchAuthToken(): String? {
        return prefs.getString(KEY_AUTH_TOKEN, null)
    }

    fun getUserId(): String? {
        return prefs.getString(KEY_USER_ID, null)
    }

    fun getUserRol(): String? {
        return prefs.getString(KEY_USER_ROL, null)
    }

    fun getFotoPerfil(): String? {
        return prefs.getString(KEY_FOTO_PERFIL, null)
    }

    fun clearSession() {
        val editor = prefs.edit()
        editor.clear()
        editor.apply()
    }
}
