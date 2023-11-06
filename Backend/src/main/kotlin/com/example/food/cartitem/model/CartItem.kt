package com.example.food.cartitem.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class CartItem (
    @Id
    val id: String?=null,
    val orderitemid: String?=null,
    val itemid: String?=null,
    val email: String?=null,
    val name: String?=null,
    val cost: Long?=null,
    val quantity: Long?=null,
    val totalcost: Long?=null,
    val imageurl : String?=null,

)