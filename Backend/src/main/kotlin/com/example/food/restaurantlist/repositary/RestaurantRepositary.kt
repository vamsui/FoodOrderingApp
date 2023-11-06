package com.example.foodOrderingApp.restaurantlist.repositary

import com.example.foodOrderingApp.register.model.User
import com.example.foodOrderingApp.restaurantlist.model.Restaurant
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface RestaurantRepositary : ReactiveMongoRepository<Restaurant, String>