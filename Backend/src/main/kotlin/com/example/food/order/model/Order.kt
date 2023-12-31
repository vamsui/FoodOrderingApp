package com.example.food.order.model

import com.example.food.cartitem.model.CartItem
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class Order (
    @Id
    val orderid:String?=null,
    val items:List<CartItem>,
    val cost:Long?=null,
    val email:String?=null
    )