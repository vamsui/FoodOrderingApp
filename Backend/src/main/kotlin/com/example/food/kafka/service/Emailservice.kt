/*
package com.example.foodOrderingApp.kafka.service

import jakarta.mail.internet.MimeMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service

@Service
class EmailService(private val mailSender: JavaMailSender) {

    fun sendOrderConfirmationEmail(recipient: String, orderId: String) {
        val mimeMessage: MimeMessage = mailSender.createMimeMessage()
        val helper = MimeMessageHelper(mimeMessage, true)

        // Set the recipient's email address
        helper.setTo(recipient)

        // Set the subject of the email
        helper.setSubject("Order Confirmation for Order ID: $orderId")

        // Set the content of the email
        val emailContent = "Thank you for your order with Order ID: $orderId. Your order is confirmed."
        helper.setText(emailContent, true) // Use true to enable HTML content

        // Send the email
        mailSender.send(mimeMessage)
    }
}*/
