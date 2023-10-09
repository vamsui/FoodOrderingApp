package com.example.foodOrderingApp.restaurantlist.service

import com.example.foodOrderingApp.restaurantlist.model.Restaurant
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

interface Restservice {
    fun saveRestaurant(restaurant: Restaurant):Mono<Restaurant>
    fun getAllRestaurant(): Flux<Restaurant>
}