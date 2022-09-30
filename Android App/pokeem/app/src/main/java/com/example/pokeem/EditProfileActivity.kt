package `in`.stcvit.idcard.ui.activities


import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.view.inputmethod.InputMethodManager
import androidx.appcompat.app.AppCompatActivity
import com.example.pokeem.databinding.ActivityEditProfileBinding


class EditProfileActivity : AppCompatActivity() {
    lateinit var binding: ActivityEditProfileBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityEditProfileBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.apply {

            bioTV.text = intent.getStringExtra("bio")

            backBTN.setOnClickListener {
                onBackPressed()
            }

            bioEditBTN.setOnClickListener {
                bioTV.visibility = View.INVISIBLE
                bioET.visibility = View.VISIBLE
                bioET.setText(bioTV.text)
                bioET.requestFocus()
                val imm: InputMethodManager = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
                imm.showSoftInput(bioET, InputMethodManager.SHOW_IMPLICIT)
                bioEditBTN.visibility = View.INVISIBLE
                doneBTN.visibility = View.VISIBLE
            }

            doneBTN.setOnClickListener {
                bioTV.visibility = View.VISIBLE
                bioET.visibility = View.INVISIBLE
                bioTV.text = bioET.text.trim()
                val inputMethodManager = getSystemService(INPUT_METHOD_SERVICE) as InputMethodManager
                inputMethodManager.hideSoftInputFromWindow(it.applicationWindowToken, 0)
                bioEditBTN.visibility = View.VISIBLE
                doneBTN.visibility = View.INVISIBLE
            }

            updateBTN.setOnClickListener {
                val intent = Intent()
                intent.putExtra("bio", bioTV.text.toString())
                setResult(RESULT_OK, intent)
                finish()
            }
        }
    }
}