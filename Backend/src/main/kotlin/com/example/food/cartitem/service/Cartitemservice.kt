package com.example.food.cartitem.service

import com.example.food.cartitem.model.CartItem
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

interface Cartitemservice {
    fun saveCart(cartItem: CartItem):Mono<CartItem>

    fun delcart(orderitemid:String):Mono<Boolean>

    fun getAllCarts():Flux<CartItem>

    fun getOrderId(email:String,itemid: String):Mono<CartItem>

    fun deleteAllCarts()
}