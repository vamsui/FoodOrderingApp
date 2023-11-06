package com.example.food.service

import com.example.food.login.model.User
import com.example.food.login.repository.LoginRepository
import com.example.food.login.service.LoginServiceImpl
import io.kotlintest.shouldBe
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Test
import reactor.core.publisher.Mono

class LoginServiceTest {
    val user1= User("123","peter","parker","peter@gmail.com","Uu@12345","Uu@12345",9879879871)

    private val loginRepositary= mockk<LoginRepository>(){


        every {
            findByEmail("peter@gmail.com")
        } returns Mono.just(user1)

    }

    private  val loginServiceImpl=LoginServiceImpl(loginRepositary)


    @Test
    fun `should return user by email id`(){
        val result=loginServiceImpl.checkEmailExists("peter@gmail.com","Uu@12345").block()
        result shouldBe true
    }
}