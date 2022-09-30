package com.example.pokeem

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.fragment.app.Fragment
import androidx.navigation.NavController
import androidx.navigation.findNavController
import androidx.navigation.ui.setupActionBarWithNavController
import com.example.pokeem.databinding.ActivityMainBinding
import com.google.android.material.bottomnavigation.BottomNavigationView

class  MainActivity : AppCompatActivity() {
//    lateinit var bottomNav:BottomNavigationView
    lateinit var binding:ActivityMainBinding
//    lateinit var navController:NavController



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
//        navController=findNavController(R.id.frameLayout)
//        setupActionBarWithNavController(navController)




    }
}