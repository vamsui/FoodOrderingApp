package com.example.food.restaurantlist.service

import com.example.food.restaurantlist.model.Restaurant

import com.example.food.restaurantlist.repositary.RestaurantRepositary
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

    override fun deleteByRestaurantId(id: String): Mono<Void> {
        return restaurantRepositary.deleteById(id)
    }

    override fun updateByRestaurantId(id: String, restaurant: Restaurant): Mono<Restaurant> {
        return restaurantRepositary.findById(id)
            .flatMap {
                it.restid=restaurant.restid
                it.restaurantname=restaurant.restaurantname
                it.description=restaurant.description
                it.address=restaurant.address
                it.mobile=restaurant.mobile
                it.imageurl=restaurant.imageurl

                restaurantRepositary.save(it)
            }
    }

}