package com.example.foodOrderingApp.restaurantmenu.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class ItemList (
        @Id
        val id: String?=null,
        val itemid:String?=null,
        val restid:String?=null,
        val name:String?=null,
        val description:String?=null,
        val cost: Long?=null,
        val imageurl:String?=null,
    )
