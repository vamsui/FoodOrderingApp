package com.example.foodOrderingApp.restaurantlist.controller

import com.example.foodOrderingApp.restaurantlist.model.Restaurant
import com.example.foodOrderingApp.restaurantlist.service.RestaurantService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


@CrossOrigin
@RestController
@RequestMapping("/v1")
class AddRestaController(
    @Autowired
    val restaurantService: RestaurantService
) {
    @PostMapping("/addrestaurant")
    fun saveRestaurant(@RequestBody restaurant: Restaurant):Mono<Restaurant>{
        return restaurantService.saveRestaurant(restaurant)
    }

    @GetMapping("/all")
    fun getAllRestaurants(): Flux<Restaurant> {
        return restaurantService.getAllRestaurant()
    }
}