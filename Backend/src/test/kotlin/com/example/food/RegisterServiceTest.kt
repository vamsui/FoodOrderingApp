package com.example.foodOrderingApp

import com.example.foodOrderingApp.register.model.User
import com.example.foodOrderingApp.register.service.RegisterService
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import reactor.test.StepVerifier

@SpringBootTest
class RegisterServiceTest {

    @Autowired
    private lateinit var registerService: RegisterService

    @Test
    fun testSaveUser() {
        val user = User("123", "john", "Doe", "abc@gmail.com", "Hh@12345", "Hh@12345", 9100829916)

        // Save the user using the service
        val savedUserMono = registerService.saveUser(user)

        // Verify the result using StepVerifier
        savedUserMono.doOnNext { savedUser ->
            println("Saved User: $savedUser")
        }

        StepVerifier.create(savedUserMono)
            .expectNextMatches {  it.id?.isNotBlank() == true } // Ensure the user has an ID
            .expectComplete()
            .verify()
    }



    @Test
    fun testCheckEmailExists() {
        // Replace 'someEmail' with a valid email in your database
        val email = "gosala@gmail.com"

        // Check if the email exists using the service
        val existsMono = registerService.checkEmailExists(email)

        // Verify the result using StepVerifier
        StepVerifier.create(existsMono)
            .expectNext(true) // Assuming the email exists
            .expectComplete()
            .verify()
    }
}