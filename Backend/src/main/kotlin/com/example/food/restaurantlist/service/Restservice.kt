package com.example.food.restaurantlist.service

import com.example.food.restaurantlist.model.Restaurant
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

interface Restservice {
    fun saveRestaurant(restaurant: Restaurant):Mono<Restaurant>
    fun getAllRestaurant(): Flux<Restaurant>

    fun deleteByRestaurantId(id:String):Mono<Void>

    fun updateByRestaurantId(id:String,restaurant: Restaurant):Mono<Restaurant>
}