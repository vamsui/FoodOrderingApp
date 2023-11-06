package com.example.food.address.controller


import com.example.food.address.service.Addressimpl
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

@WebFluxTest(Adresscontroller::class)
@AutoConfigureWebTestClient
class AdresscontrollerTest
{

    @Autowired
    lateinit var client: WebTestClient

    @Autowired
    lateinit var addressimpl: Addressimpl
    @Test
    fun`should save the address when api is called`(){

        val expectedResponse= mapOf("id" to "1",
            "orderid" to "12",
            "firstname" to "abc",
            "lastname" to "def",
            "mobile" to 9898989898,
            "email" to "abc@gmail.com",
            "fulladdress" to "23rd street newyork",
            "city" to "newyork",
            "state" to "denver",
            "zipcode" to 123456
        )


        val address=com.example.food.address.model.Address("1","12","abc","def",9898989898,"abc@gmail.com","23rd street newyork","newyork","denver",123456)

        every {
            addressimpl.saveAddress(address)
        } returns  Mono.just(address)


        val response = client.post()
            .uri("/v1/saveaddress")
            .bodyValue(address)
            .exchange()
            .expectStatus().is2xxSuccessful
            .returnResult<Any>().responseBody
        response.blockFirst() shouldBe expectedResponse


        response.blockFirst()
        verify (exactly = 1){
            addressimpl.saveAddress(address)
        }

    }


    @TestConfiguration
    class ControllerTestConfig {
        @Bean
        fun addressimpl() = mockk<Addressimpl>()
    }

}