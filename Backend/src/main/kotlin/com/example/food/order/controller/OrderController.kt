package com.example.foodOrderingApp.order.controller

import com.example.foodOrderingApp.order.model.Order
import com.example.foodOrderingApp.order.service.KafkaProducer
import com.example.foodOrderingApp.order.service.Orderimpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


@CrossOrigin
@RestController
@RequestMapping("/v1")
class OrderController(
    @Autowired
    val orderimpl: Orderimpl,

) {

    @Autowired

    lateinit var kafkaProducer: KafkaProducer // Initialize KafkaProducer directly

    @PostMapping("/saveOrder")
    fun saveOrder(@RequestBody order: Order): Mono<Order>{
        val result= orderimpl.saveOrder(order)
       // kafkaProducer.sendOrderPlacedMessage(order)
        return result

    }

    @GetMapping("/getOrders")
    fun getOrder():Flux<Order>
    {
        return orderimpl.getAllOrders()
    }



    @GetMapping("/findOrder")
    fun getOrderById(@RequestParam orderid:String):Mono<Order>{
        return orderimpl.getByOrderId(orderid)
    }



    @PostMapping("/sendEmail")
    fun getOrderDetails(@RequestBody customer:Order){
        kafkaProducer.sendOrderPlacedMessage(customer)
    }
}