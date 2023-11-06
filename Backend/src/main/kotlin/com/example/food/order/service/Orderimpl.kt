package com.example.food.order.service

import com.example.food.order.model.Order
import com.example.food.order.repository.OrderRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class Orderimpl(
    @Autowired
    val orderRepo: OrderRepo
):Orderservice {
    override fun saveOrder(order: Order): Mono<Order> {
        return orderRepo.save((order))
    }

    override fun getAllOrders(): Flux<Order> {
        return orderRepo.findAll()
    }

    override fun getByOrderId(orderid: String): Mono<Order> {
        return orderRepo.findById(orderid)
    }
}