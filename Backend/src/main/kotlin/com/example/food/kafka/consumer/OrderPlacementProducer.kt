/*
package com.example.foodOrderingApp.kafka.consumer
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.stereotype.Component


@Component
class OrderPlacementProducer(private val kafkaTemplate: KafkaTemplate<String, String>) {

    fun sendOrderPlacementMessage(orderId: String) {
        kafkaTemplate.send("order-placed", orderId)
    }
}*/