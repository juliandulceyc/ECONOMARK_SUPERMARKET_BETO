package economark.mobile

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import economark.mobile.R

class Home : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home) // Asegúrate de que el nombre del XML sea correcto

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
    }
}
