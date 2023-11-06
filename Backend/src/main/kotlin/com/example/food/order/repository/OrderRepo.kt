package com.example.food.order.repository

import com.example.food.order.model.Order
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface OrderRepo :ReactiveMongoRepository<Order,String>