package com.example.pokeem

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class SignupActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signup)

        val back = findViewById(R.id.back) as Button
        val next=findViewById(R.id.next) as Button

        back.setOnClickListener{
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)

        }
        next.setOnClickListener {
            val intent = Intent(this, SignupActivity2::class.java)
            startActivity(intent)

        }
    }
}