package com.example.pokeem

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView

class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        val signButton = findViewById(R.id.signButton) as Button
        val forgotPass = findViewById(R.id.forgotPass) as TextView
        val createAcc = findViewById(R.id.createAcc) as Button

        signButton.setOnClickListener{
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }

//        forgotPass.setOnClickListener {
//            val intent = Intent(this, second::class.java)
//            startActivity(intent)
//
//        }

        createAcc.setOnClickListener{
            val intent = Intent(this, SignupActivity::class.java)
            startActivity(intent)
        }

    }
}