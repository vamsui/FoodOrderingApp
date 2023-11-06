package com.example.foodOrderingApp.unittesting

import com.example.foodOrderingApp.login.controller.LoginController
import com.example.foodOrderingApp.login.repository.LoginRepository
import com.example.foodOrderingApp.login.service.LoginServiceImpl
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import reactor.core.publisher.Mono
import reactor.test.StepVerifier


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class LoginControllerTest {
    @Autowired lateinit var loginServiceImpl: LoginServiceImpl

    @Autowired lateinit var loginRepository: LoginRepository

    @Autowired lateinit var loginController: LoginController
    @BeforeEach
    fun set()
    {
        loginServiceImpl = Mockito.mock(LoginServiceImpl::class.java)
        loginController= LoginController(loginServiceImpl)

    }

    @Test
    fun getUsersByEmail(){
        Mockito.`when`(loginServiceImpl.checkEmailExists("abc@gmail.com","Aa@12345")).thenReturn(Mono.just(true))

        StepVerifier.create(loginController.checkEmailExists("abc@gmail.com","Aa@12345"))
            .expectSubscription()
            .expectNextCount(1)
            .verifyComplete()
    }
}