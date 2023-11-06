package com.example.foodOrderingApp.order.repository

import com.example.foodOrderingApp.order.model.Order
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface OrderRepo :ReactiveMongoRepository<Order,String>