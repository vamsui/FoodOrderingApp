package com.example.foodOrderingApp.restaurantlist.service

import com.example.foodOrderingApp.restaurantlist.model.Restaurant

import com.example.foodOrderingApp.restaurantlist.repositary.RestaurantRepositary
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service

class RestaurantService(
    @Autowired
    val restaurantRepositary: RestaurantRepositary
):Restservice {
    override fun saveRestaurant(restaurant: Restaurant):Mono<Restaurant>{
        return restaurantRepositary.save(restaurant)
    }

    override fun getAllRestaurant(): Flux<Restaurant> {
        return restaurantRepositary.findAll()
    }
}