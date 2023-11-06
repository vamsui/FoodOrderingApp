
/*
package com.example.foodOrderingApp.kafka.producer
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Component
import com.example.foodOrderingApp.kafka.service.EmailService
@Component
class OrderPlacementConsumer(

    val emailService: EmailService) {

    @KafkaListener(topics = ["order-placed"])
    fun receiveOrderPlacementMessage(orderId: String) {
        // Process the order placement message and send the email notification here
        sendEmailNotification(orderId)
    }

    private fun sendEmailNotification(orderId: String) {
        // Replace with the recipient's email address
        val recipientEmail = "gosalavamshi@gmail.com"

        // Send an email notification
        emailService.sendOrderConfirmationEmail(recipientEmail, orderId)
    }
}*/