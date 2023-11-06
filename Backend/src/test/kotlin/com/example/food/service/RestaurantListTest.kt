package com.example.food.service

import com.example.food.restaurantlist.model.Restaurant
import com.example.food.restaurantlist.repositary.RestaurantRepositary
import com.example.food.restaurantlist.service.RestaurantService
import io.kotlintest.shouldBe
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Test
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


class RestaurantListTest {
    val restaurant1=
        Restaurant("65","1","RK restaurant","best food","Worli",9879879871,"https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg")

    val restauran2=
        Restaurant("65","1","RK good times","best food times","dadar",9879879871,"https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg")


    private val restaurantRepositary=mockk<RestaurantRepositary>(){
        every {
            save(restaurant1)
        } returns Mono.just(restaurant1)

        every {
            findAll()
        }returns Flux.just(restaurant1,restauran2)

        every {
            deleteById("65")
        }returns Mono.empty()

        every {
            findById("65")
        }returns Mono.just(restaurant1)
    }

    private val restaurantService =RestaurantService(restaurantRepositary)

    @Test
    fun `should save the restaurant details`(){
        val result=restaurantService.saveRestaurant(restaurant1).block()

        result shouldBe restaurant1
    }

    @Test
    fun `should return all the restaurants details when method is called`(){
        val result1=restaurantService.getAllRestaurant().blockFirst()
        val result2=restaurantService.getAllRestaurant().blockLast()

        result1 shouldBe restaurant1
        result2 shouldBe restauran2
    }

    @Test
    fun `should delete the restaurant by id`(){
        val result=restaurantService.deleteByRestaurantId("65")

        result shouldBe Mono.empty()
    }

    @Test

    fun`should update the restaurant details by id`(){
        val result=restaurantService.updateByRestaurantId("65",restauran2).block()

        result shouldBe restauran2

    }

}