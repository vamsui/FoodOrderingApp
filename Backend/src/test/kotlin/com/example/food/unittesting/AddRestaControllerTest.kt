package com.example.foodOrderingApp.unittesting

import com.example.foodOrderingApp.restaurantlist.controller.AddRestaController
import com.example.foodOrderingApp.restaurantlist.model.Restaurant
import com.example.foodOrderingApp.restaurantlist.service.RestaurantService
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.test.StepVerifier

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AddRestaControllerTest {
    @Autowired lateinit var restaurantService: RestaurantService

    @Autowired lateinit var addRestaController: AddRestaController


    val restaurant=Restaurant("844","9","Tasty Bites","Chinese","Gachibowli",9765431234,"https://b.zmtcdn.com/data/pictures/chains/5/110155/811c01a5430d50d3260f77917da99e12_o2_featured_v2.jpg")

@BeforeEach
fun set()
{
    restaurantService=Mockito.mock(RestaurantService::class.java)
    addRestaController= AddRestaController(restaurantService)
}


    @Test
    fun saveRest()
    {
        Mockito.`when`(restaurantService.saveRestaurant(restaurant)).thenReturn(Mono.just(restaurant))
        val result=addRestaController.saveRestaurant(restaurant).block()
        Mockito.verify(restaurantService,Mockito.times(1)).saveRestaurant(restaurant)

        Assertions.assertNotNull(result)
        Assertions.assertEquals(result,restaurant)

    }

    @Test
    fun getRestaurants()
    {
        Mockito.`when`(restaurantService.getAllRestaurant()).thenReturn(Flux.just(restaurant))

        val result=addRestaController.getAllRestaurants()
        StepVerifier.create(result)
            .expectSubscription()
            .expectNext(restaurant)
            .expectComplete()
            .verify()


    }
}