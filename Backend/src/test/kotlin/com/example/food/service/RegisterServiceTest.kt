package com.example.food.service

import com.example.food.register.model.User
import com.example.food.register.repository.RegisterRepositary
import com.example.food.register.service.RegisterService
import io.kotlintest.shouldBe
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Test
import reactor.core.publisher.Mono


class RegisterServiceTest {

    val user1= User("123","peter","parker","peter@gmail.com","Uu@12345","Uu@12345",9879879871)
    val user2=User("123","james","maddy","james@gmail.com","Uu@12345","Uu@12345",9879879872)


    private val registerRepositary=mockk<RegisterRepositary>(){

        every {
            deleteById("123")
        }returns Mono.empty()

        every {
            findByEmail("peter@gmail.com")
        }returns Mono.just(user1)

        every {
            findById("123")
        }returns Mono.just(user1)

        every {
            save(user1)
        }returns Mono.just(user1)




    }

    private val registerService=RegisterService(registerRepositary)


    @Test
    fun `save the user details`() {
        val user = registerService.saveUser(user1).block()

        user shouldBe user1
    }

    @Test

    fun`should delete the user by id`(){
        val result=registerService.deleteById("123")

        result shouldBe Mono.empty()
    }

    @Test
    fun `should update the user by id`(){
        val result=registerService.updateByUserId("123",user2).block()
        result shouldBe user2
    }

    @Test
    fun `should find the user by id`(){
        val result=registerService.getUserById("123").block()
        result shouldBe user1
    }


    @Test
    fun `should return user by email id`(){
        val result=registerService.checkEmailExists("peter@gmail.com").block()
        result shouldBe true
    }
}