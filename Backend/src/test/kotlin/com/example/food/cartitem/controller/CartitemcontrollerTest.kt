package com.example.food.cartitem.controller

import com.example.food.cartitem.model.CartItem
import com.example.food.cartitem.service.Cartitemimpl
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
import org.springframework.http.MediaType
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.test.web.reactive.server.returnResult
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@WebFluxTest(Cartitemcontroller::class)
@AutoConfigureWebTestClient

class CartitemcontrollerTest
{

    @Autowired
    lateinit var client: WebTestClient

    @Autowired
    lateinit var cartitemimpl: Cartitemimpl
    @Test
    fun`should add cartitem when api is called`(){

        val expectedResponse= mapOf("id" to "123",
            "orderitemid" to "12",
            "itemid" to "1",
            "email" to "gosa@gmail.com",
            "name" to "chicken biryani",
            "cost" to 300,
            "quantity" to 1,
            "totalcost" to 300,
            "imageurl" to  "abc.jpg"

        )
        val cartItem=CartItem("123","12","1","gosa@gmail.com","chicken biryani",300,1,300,"abc.jpg")

        every {
            cartitemimpl.saveCart(cartItem)
        } returns  Mono.just(cartItem)


        val response = client.post()
            .uri("/v1/savecart")
            .bodyValue(cartItem)
            .exchange()
            .expectStatus().is2xxSuccessful
            .returnResult<Any>().responseBody
        response.blockFirst() shouldBe expectedResponse


        response.blockFirst()
        verify (exactly = 1){
            cartitemimpl.saveCart(cartItem)
        }

    }



    @Test
    fun `should display all the cartitem details`(){

        val cartItem1=CartItem("123","12","1","gosa@gmail.com","chicken biryani",300,1,300,"abc.jpg")

        val cartItem2=CartItem("124","13","2","gosa@gmail.com","chicken 65",200,1,200,"abcd.jpg")


        val expectedResult= listOf(
            mapOf("id" to "123",
                "orderitemid" to "12",
                "itemid" to "1",
                "email" to "gosa@gmail.com",
                "name" to "chicken biryani",
                "cost" to 300,
                "quantity" to 1,
                "totalcost" to 300,
                "imageurl" to  "abc.jpg"

            ),
            mapOf("id" to "124",
                "orderitemid" to "13",
                "itemid" to "2",
                "email" to "gosa@gmail.com",
                "name" to "chicken 65",
                "cost" to 200,
                "quantity" to 1,
                "totalcost" to 200,
                "imageurl" to  "abcd.jpg"

            )

        )

        every {
            cartitemimpl.getAllCarts()
        } returns Flux.just(cartItem1,cartItem2)

        val response=client.get()
            .uri("/v1/cartall")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus().is2xxSuccessful
            .returnResult<Any>()
            .responseBody

        response.blockFirst() shouldBe expectedResult[0]

        verify (exactly = 1){
     cartitemimpl.getAllCarts()
        }


    }




    @Test
    fun `should delete a cart by ID`() {
        val expectedResult=true

        // Mock the behavior of your registerService
        every {
            cartitemimpl.delcart("65")
        } returns Mono.just(expectedResult)

        client.delete()
            .uri("/v1/deletecart/65")
            .exchange()
            .expectStatus().isOk // You can change this to .isNoContent() if your API returns 204 No Content on success
            .expectBody(Boolean::class.java)
            .isEqualTo(expectedResult)

        // Optionally, you can verify that the service method was called
        verify(exactly = 1) {

            cartitemimpl.delcart("65")
        }
    }



    @TestConfiguration
    class ControllerTestConfig {
        @Bean
        fun cartitemimpl() = mockk<Cartitemimpl>()
    }

}