package com.example.food.restaurantlist.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document


@Document
data class Restaurant (
    @Id
    var id: String?=null,
    var restid:String?=null,
    var restaurantname:String?=null,
    var description:String?=null,
    var address:String?=null,
    var mobile: Long?=null,
    var imageurl:String?=null,
    )

