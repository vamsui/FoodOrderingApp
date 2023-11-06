package com.example.food.login.controller

import com.example.food.login.service.LoginServiceImpl
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.test.web.reactive.server.WebTestClient
import reactor.core.publisher.Mono

@WebFluxTest(LoginController::class)
@AutoConfigureWebTestClient
class LoginControllerTest
{
    @Autowired
    lateinit var client: WebTestClient
    @Autowired
    lateinit var loginServiceImpl: LoginServiceImpl


    @Test
    fun `should check if email exists`() {
        val emailToCheck = "gosala@gmail.com"
        val password="Hh@12345"
        val expectedResult = true // Assuming the email exists in this test case

        // Mock the behavior of your registerService
        every { loginServiceImpl.checkEmailExists(emailToCheck,password) } returns Mono.just(expectedResult)

        client.get()
            .uri("/v1/login?email=gosala@gmail.com&password=Hh@12345")
            .exchange()
            .expectStatus().is2xxSuccessful
            .expectBody(Boolean::class.java)
            .isEqualTo(expectedResult)
    }

    @TestConfiguration
    class ControllerTestConfig {
        @Bean
        fun loginServiceImpl() = mockk<LoginServiceImpl>()
    }

}