package com.example.food.order.controller

import com.example.food.cartitem.model.CartItem
import com.example.food.order.model.Order
import com.example.food.order.service.Orderimpl
import io.kotlintest.shouldBe
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.test.web.reactive.server.returnResult
import reactor.core.publisher.Mono


@WebFluxTest(OrderController::class)
@AutoConfigureWebTestClient

class OrderControllerTest
{

    @Autowired
    lateinit var client: WebTestClient

    @Autowired
    lateinit var orderimpl: Orderimpl
    @Test
    fun`should save order information when api is called`(){

        val cartItem1= CartItem("123","12","1","gosa@gmail.com","chicken biryani",300,1,300,"abc.jpg")

        val cartItem2= CartItem("124","13","2","gosa@gmail.com","chicken 65",200,1,200,"abcd.jpg")

        val order=Order("1", listOf( cartItem1,cartItem2),400,"gosal@gmail.com")

        val expectedResponse= mapOf("id" to "123",
            "items" to listOf(cartItem1,cartItem2),
            "cost" to 300,
            "email" to "gosala@gmail.com"
        )


        every {
            orderimpl.saveOrder(order)
        } returns  Mono.just(order)


        val response = client.post()
            .uri("/v1/saveOrder")
            .bodyValue(order)
            .exchange()
            .expectStatus().is2xxSuccessful
            .returnResult<Any>().responseBody
        response.blockFirst() shouldBe expectedResponse


        response.blockFirst()
        verify (exactly = 1){

            orderimpl.saveOrder(order)
        }

    }


/*
    @Test
    fun `should return the user on basis of id`(){
        val expectedResult= mapOf("id" to "652e6307fd53c5595700b8c9",
            "firstname" to "gosala",
            "lastname" to "vamsi",
            "email" to "gosala@gmail.com",
            "password" to "Hh@12345",
            "confirmpassword" to "Hh@12345",
            "mobile" to 9898989898

        )

        val user= User("652e6307fd53c5595700b8c9","gosala","vamsi","gosala@gmail.com","Hh@12345","Hh@12345",9898989898)

        every {
            registerService.getUserById("652e6307fd53c5595700b8c9")
        } returns Mono.just(
            user
        )
        val response=client.get()
            .uri("/v1/find?id=652e6307fd53c5595700b8c9")
            .exchange()
            .expectStatus().is2xxSuccessful
            .returnResult<Any>()
            .responseBody

        response.blockFirst() shouldBe expectedResult
        verify (exactly = 1){
            registerService.getUserById("652e6307fd53c5595700b8c9")
        }
    }




    @Test
    fun `should check if email exists`() {
        val emailToCheck = "gosala@gmail.com"
        val expectedResult = true // Assuming the email exists in this test case

        // Mock the behavior of your registerService
        every { registerService.checkEmailExists(emailToCheck) } returns Mono.just(expectedResult)

        client.get()
            .uri("/v1/checkemail?email=gosala@gmail.com")
            .exchange()
            .expectStatus().is2xxSuccessful
            .expectBody(Boolean::class.java)
            .isEqualTo(expectedResult)
    }

    @Test
    fun `should delete a user by ID`() {
        val resourceIdToDelete = "123"

        // Mock the behavior of your registerService
        every { registerService.deleteById(resourceIdToDelete) } returns Mono.empty()

        client.delete()
            .uri("/v1/delete/123")
            .exchange()
            .expectStatus().isOk // You can change this to .isNoContent() if your API returns 204 No Content on success
            .expectBody().isEmpty()

        // Optionally, you can verify that the service method was called
        verify(exactly = 1) {
            registerService.deleteById(resourceIdToDelete)
        }
    }

    @Test
    fun `should update the user on basis of id`(){
        val expectedResult=

            mapOf("id" to "123",
                "firstname" to "sachin",
                "lastname" to "ramesh",
                "email" to "sachin@gmail.com",
                "password" to "Po@12345",
                "confirmpassword" to "Po@12345",
                "mobile" to 9876987698

            )

        val user= User("123","sachin","ramesh","sachin@gmail.com","Po@12345","Po@12345",9876987698)

        every {
            registerService.updateByUserId("123",user)
        } returns Mono.just(
            user
        )
        val response=client.put()
            .uri("/v1/update/123")
            .bodyValue(user)
            .exchange()
            .expectStatus().is2xxSuccessful
            .returnResult<Any>()
            .responseBody

        response.blockFirst() shouldBe expectedResult
        verify (exactly = 1){
            registerService.updateByUserId("123",user)
        }
    }
*/

    @TestConfiguration
    class ControllerTestConfig {
        @Bean
        fun orderimpl() = mockk<Orderimpl>()
    }

}