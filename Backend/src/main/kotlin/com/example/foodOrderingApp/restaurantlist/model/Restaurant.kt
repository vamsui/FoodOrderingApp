package com.example.foodOrderingApp.restaurantlist.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document


@Document
data class Restaurant (
    @Id
    val id: String?=null,
    val restaurantname:String?=null,
    val description:String?=null,
    val address:String?=null,
    val mobile: Long?=null,
    val imageurl:String?=null,
    )

