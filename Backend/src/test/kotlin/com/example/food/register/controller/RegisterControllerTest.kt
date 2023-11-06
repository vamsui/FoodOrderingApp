package com.example.foodOrderingApp.register.controller

import com.example.foodOrderingApp.register.model.User
import com.example.foodOrderingApp.register.service.RegisterService
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.test.web.reactive.server.returnResult
import reactor.core.publisher.Mono
import org.springframework.context.annotation.Bean
import org.springframework.boot.test.context.TestConfiguration



@WebFluxTest(RegisterController::class)
@AutoConfigureWebTestClient
class RegisterControllerTest{

    @Autowired
    lateinit var client: WebTestClient

    @Autowired
    lateinit var registerService: RegisterService

    @Test
    fun`should create user account when api is called`(){

        val expectedResponse= mapOf("id" to "123",
            "firstname" to "peter",
            "lastname" to "parker",
            "email" to "peter@gmail.com",
            "password" to "Uu@12345",
            "confirmpassword" to "Uu@12345",
            "mobile" to 9879879871

        )

        var user=User("123","peter","parker","peter@gmail.com","Uu@12345","Uu@12345",9879879871)

        every {
            registerService.saveUser(user)
        }returns  Mono.just(user)


        val response = client.post()
            .uri("v1/create")
            .bodyValue(user)
            .exchange()
            .expectStatus().is2xxSuccessful
            .returnResult<Any>().responseBody

        response.blockFirst()
        verify (exactly = 1){
            registerService.saveUser(user)
        }

    }

}