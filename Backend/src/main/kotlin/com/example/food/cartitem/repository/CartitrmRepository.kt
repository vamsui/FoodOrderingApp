package com.example.foodOrderingApp.cartitem.repository

import com.example.foodOrderingApp.cartitem.model.CartItem
import com.example.foodOrderingApp.restaurantmenu.model.ItemList
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Repository
interface CartitrmRepository :ReactiveMongoRepository<CartItem,String>{
    fun findByEmailAndItemid(email: String, itemid: String): Mono<CartItem>

    fun deleteByOrderitemid(orderitemid: String):Mono<Boolean>


}