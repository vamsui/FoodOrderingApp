package com.example.food.restaurantlist.repositary

import com.example.food.restaurantlist.model.Restaurant
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface RestaurantRepositary : ReactiveMongoRepository<Restaurant, String>