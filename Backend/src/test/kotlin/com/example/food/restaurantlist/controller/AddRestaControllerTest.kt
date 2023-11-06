package com.example.food.restaurantlist.controller

import com.example.food.restaurantlist.model.Restaurant
import com.example.food.restaurantlist.service.RestaurantService
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


@WebFluxTest(AddRestaController::class)
@AutoConfigureWebTestClient
class AddRestaControllerTest
{

    @Autowired
    lateinit var client: WebTestClient

    @Autowired
    lateinit var restaurantService: RestaurantService
    @Test
    fun`should create restaurant account when api is called`(){

        val expectedResponse= mapOf("id" to "6523d8025359d80533ec75e4",
            "restid" to "1",
            "restaurantname" to "RK restaurant",
            "description" to "best food",
            "address" to "Worli",
            "mobile" to 9879879871,
            "imageurl" to  "https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg"

        )

        val restaurant=Restaurant("6523d8025359d80533ec75e4","1","RK restaurant","best food","Worli",9879879871,"https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg")
        every {
            restaurantService.saveRestaurant(restaurant)
        } returns  Mono.just(restaurant)


        val response = client.post()
            .uri("/v1/addrestaurant")
            .bodyValue(restaurant)
            .exchange()
            .expectStatus().is2xxSuccessful
            .returnResult<Any>().responseBody
        response.blockFirst() shouldBe expectedResponse


        response.blockFirst()
        verify (exactly = 1){
            restaurantService.saveRestaurant(restaurant)
        }

    }



    @Test
    fun `should display all the restaurants details`(){

        val restaurant1=Restaurant("6523d8025359d80533ec75e4","12","RK restaurant","best food","Worli",9879879871,"https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg")

        val restaurant2=Restaurant("6523d72f5359d80533ec75e1","13","RK good times","best food times","dadar",9879879872,"https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg")


        val expectedResult= listOf(
            mapOf("id" to "6523d8025359d80533ec75e4",
                "restid" to "12",
                "restaurantname" to "RK restaurant",
                "description" to "best food",
                "address" to "Worli",
                "mobile" to 9879879871,
                "imageurl" to  "https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg"

            ),
            mapOf("id" to "6523d72f5359d80533ec75e1",
                "restid" to "13",
                "restaurantname" to "RK good times",
                "description" to "best food times",
                "address" to "dadar",
                "mobile" to 9879879872,
                "imageurl" to  "https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg"

            )

        )

        every {
            restaurantService.getAllRestaurant()
        } returns Flux.just(restaurant1,restaurant2)

        val response=client.get()
            .uri("/v1/all")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus().is2xxSuccessful
            .returnResult<Any>()
            .responseBody

        response.blockFirst() shouldBe expectedResult[0]

        verify (exactly = 1){

            restaurantService.getAllRestaurant()
        }


    }




    @Test
    fun `should delete a restaurant by ID`() {
        val resourceIdToDelete = "6523d8025359d80533ec75e4"

        // Mock the behavior of your registerService
        every { restaurantService.deleteByRestaurantId(resourceIdToDelete)
             } returns Mono.empty()

        client.delete()
            .uri("/v1/deleteRestaurant/6523d8025359d80533ec75e4")
            .exchange()
            .expectStatus().isOk // You can change this to .isNoContent() if your API returns 204 No Content on success
            .expectBody().isEmpty()

        // Optionally, you can verify that the service method was called
        verify(exactly = 1) {
            restaurantService.deleteByRestaurantId(resourceIdToDelete)
        }
    }

    @Test
    fun `should update the restaurant on basis of id`(){
        val expectedResponse= mapOf("id" to "6523d8025359d80533ec75e4",
            "restid" to "12",
            "restaurantname" to "RK restaurant",
            "description" to "best food",
            "address" to "Worli",
            "mobile" to 9879879871,
            "imageurl" to  "https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg"

        )

        val restaurant=Restaurant("6523d8025359d80533ec75e4","12","RK restaurant","best food","Worli",9879879871,"https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg")
        every {
            restaurantService.updateByRestaurantId("6523d8025359d80533ec75e4",restaurant)
        } returns  Mono.just(restaurant)

        val response=client.put()
            .uri("/v1/updateRestaurant/6523d8025359d80533ec75e4")
            .bodyValue(restaurant)
            .exchange()
            .expectStatus().is2xxSuccessful
            .returnResult<Any>()
            .responseBody

        response.blockFirst() shouldBe expectedResponse
        verify (exactly = 1){
            restaurantService.updateByRestaurantId("6523d8025359d80533ec75e4",restaurant)
        }
    }


    @TestConfiguration
    class ControllerTestConfig {
        @Bean
        fun restaurantService() = mockk<RestaurantService>()
    }

}