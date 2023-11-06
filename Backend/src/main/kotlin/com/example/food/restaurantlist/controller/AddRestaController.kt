package com.example.food.restaurantlist.controller

import com.example.food.restaurantlist.model.Restaurant
import com.example.food.restaurantlist.service.RestaurantService
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

    @DeleteMapping("/deleteRestaurant/{id}")
    fun deleteById(@PathVariable id: String): Mono<Void> {
        // Implement the logic to delete the resource by ID using your service
        return restaurantService.deleteByRestaurantId(id)
    }

    @PutMapping("/updateRestaurant/{id}")
    fun updateById(@PathVariable id: String,@RequestBody restaurant: Restaurant):Mono<Restaurant>{
        return restaurantService.updateByRestaurantId(id,restaurant)
    }

}