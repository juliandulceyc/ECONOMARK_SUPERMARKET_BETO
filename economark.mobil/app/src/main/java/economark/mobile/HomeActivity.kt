package economark.mobile

import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.cardview.widget.CardView
import androidx.core.view.GravityCompat
import com.google.android.material.navigation.NavigationView
import androidx.drawerlayout.widget.DrawerLayout

class Home : AppCompatActivity() {

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var navigationView: NavigationView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        // Configurar Toolbar
        val toolbar = findViewById<Toolbar>(R.id.toolbar)
        setSupportActionBar(toolbar)

        // DrawerLayout y NavigationView
        drawerLayout = findViewById(R.id.drawer_layout)
        navigationView = findViewById(R.id.nav_view)

        // Manejo de clics en el menú lateral
        navigationView.setNavigationItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.menu_usuario -> {
                    // Acción para "Usuario"
                    true
                }
                R.id.menu_configurar_perfil -> {
                    // Acción para "Configurar Perfil"
                    true
                }
                R.id.menu_info_cuenta -> {
                    // Acción para "Información de Cuenta"
                    true
                }
                R.id.menu_notificaciones -> {
                    // Acción para "Notificaciones"
                    true
                }
                R.id.menu_cerrar_sesion -> {
                    // Acción para cerrar sesión
                    val intent = Intent(this, MainActivity::class.java)
                    intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                    startActivity(intent)
                    true
                }
                else -> false
            }.also {
                drawerLayout.closeDrawer(GravityCompat.START)  // Cierra el Drawer cuando se selecciona un ítem
            }
        }

        // Referencias a los CardView
        val reportesCard = findViewById<CardView>(R.id.bankcardId)
        val facturacionCard = findViewById<CardView>(R.id.facturacionCardId)
        val addCard = findViewById<CardView>(R.id.addCardId)
        val linksCard = findViewById<CardView>(R.id.linksCardId)
        val wifiCard = findViewById<CardView>(R.id.wifiCardId)

        // Acciones al hacer clic
        reportesCard.setOnClickListener {
            val intent = Intent(this, Reports::class.java)
            startActivity(intent)
        }

        // Podés agregar más acciones a los demás CardView si querés
    }

    // Inflar el menú en la Toolbar
    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.menu, menu)  // Asegúrate de que este archivo XML se llama "menu_home.xml"
        return true
    }

    // Manejar las acciones del ícono del menú
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            android.R.id.home -> {
                // Abrir el Drawer cuando se presiona el ícono del menú
                drawerLayout.openDrawer(GravityCompat.START)  // Cambié END a START para abrir desde la izquierda
                true
            }
            R.id.menu_usuario -> {
                // Acción para "Usuario"
                true
            }
            R.id.menu_configurar_perfil -> {
                // Acción para "Configurar Perfil"
                true
            }
            R.id.menu_info_cuenta -> {
                // Acción para "Información de Cuenta"
                true
            }
            R.id.menu_notificaciones -> {
                // Acción para "Notificaciones"
                true
            }
            R.id.menu_cerrar_sesion -> {
                // Acción para cerrar sesión
                val intent = Intent(this, MainActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                startActivity(intent)
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }
}
