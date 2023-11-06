package com.example.food

import com.example.food.login.service.LoginServiceImpl
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import reactor.test.StepVerifier

@SpringBootTest
class LoginServiceTest {

    @Autowired
    private lateinit var loginServiceImpl: LoginServiceImpl

    @Test
    fun testCheckEmailExists() {
        val email = "gosalavamshi@gmail.com"
        val password = "Jj@12345"

        // Check if the email and password combination exists using the service
        val existsMono = loginServiceImpl.checkEmailExists(email, password)

        // Verify the result using StepVerifier
        StepVerifier.create(existsMono)
            .expectNext(true) // Assuming the email and password combination exists
            .expectComplete()
            .verify()
    }

}