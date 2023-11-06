package com.example.food.order.service

import com.example.food.order.model.Order
import org.slf4j.LoggerFactory
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Service


@Service
class KafkaConsumer {
    val logger=LoggerFactory.getLogger(KafkaConsumer::class.java)

    @KafkaListener(topics = ["order-placed"], groupId = "order-group")
    fun recievedOrderMessage(customer:Order)
    {
        logger.info("Your order has been recieved with the below details ${customer}")
    }
}