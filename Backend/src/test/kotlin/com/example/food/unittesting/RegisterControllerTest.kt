package com.example.foodOrderingApp.unittesting

import com.example.foodOrderingApp.register.controller.RegisterController
import com.example.foodOrderingApp.register.model.User
import com.example.foodOrderingApp.register.repository.RegisterRepositary
import com.example.foodOrderingApp.register.service.RegisterService
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import reactor.core.publisher.Mono
import reactor.test.StepVerifier


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RegisterControllerTest {

    @Autowired
    lateinit var registerService: RegisterService

    @Autowired
    lateinit var registerRepositary: RegisterRepositary

    @Autowired
    lateinit var  registerController: RegisterController

    val user= User("","sam","bill","sam@gmail.com","Uu@12345","Uu@12345",9087657665)


    @BeforeEach
    fun setUp(){
        registerService= Mockito.mock(RegisterService::class.java)
        registerController= RegisterController(registerService)
    }

    @Test
    fun testSaveUser(){
        Mockito.`when`(registerService.saveUser(user)).thenReturn(Mono.just(user))

        val result = registerController.saveUser(user).block()

        Mockito.verify(registerService,Mockito.times(1)).saveUser(user)

        Assertions.assertNotNull((result))

        Assertions.assertEquals(user,result)
    }

    @Test
    fun getUsersByEmail(){

        Mockito.`when`(registerService.checkEmailExists("abc@gmail.com")).thenReturn(Mono.just(true))


        StepVerifier.create(registerController.checkEmailExists("abc@gmail.com"))
            .expectSubscription()
            .expectNextCount(1)
            .verifyComplete()
    }


}