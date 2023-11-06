package com.example.foodOrderingApp.order.service

import com.example.foodOrderingApp.order.model.Order
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Service

@Service
class KafkaProducer {

    @Autowired
    lateinit var kafkaTemplate: KafkaTemplate<String,Order>

    @Autowired
    lateinit var javaMailSender: JavaMailSender

    var logger=LoggerFactory.getLogger(KafkaProducer::class.java)

    fun sendOrderPlacedEmail(customer: Order){
        val itemNames = customer.items.map { it.name }
        val message=SimpleMailMessage()
        message.setTo(customer.email)
        val emailText = StringBuilder()
        emailText.append("Your order has been placed successfully. Items in your order:\n")

        // Iterate through each cart item and add details to the email text
        for (item in customer.items) {
            val itemName = item.name
            val itemQuantity = item.quantity
            val itemPrice = item.cost
            val totalItemPrice = (itemQuantity ?: 0) * (itemPrice?:0) // Use Elvis operator to provide a default value

            // Append item details to the email text
            emailText.append("$itemName - Quantity: ${itemQuantity ?: 0}, Price per Item: $itemPrice, Total Price: $totalItemPrice\n")
        }

        // Set the email message text
        message.setText(emailText.toString())

        message.setSubject("Order has been recieved")
     javaMailSender.send(message)
    }

    fun sendOrderPlacedMessage(customer:Order){
        logger.info("order has been placed by customer ${customer}")
        kafkaTemplate.send("order-placed",customer)
        sendOrderPlacedEmail(customer)
    }
}