package com.example.food.order.service

import com.example.food.order.model.Order
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

interface Orderservice {
    fun saveOrder(order: Order):Mono<Order>

    fun getAllOrders():Flux<Order>

    fun getByOrderId(orderid:String):Mono<Order>
}