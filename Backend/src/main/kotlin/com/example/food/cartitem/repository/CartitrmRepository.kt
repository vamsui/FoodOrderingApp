package com.example.food.cartitem.repository

import com.example.food.cartitem.model.CartItem
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono

@Repository
interface CartitrmRepository :ReactiveMongoRepository<CartItem,String>{
    fun findByEmailAndItemid(email: String, itemid: String): Mono<CartItem>

    fun deleteByOrderitemid(orderitemid: String):Mono<Boolean>


}