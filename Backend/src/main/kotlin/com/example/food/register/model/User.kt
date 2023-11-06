package com.example.food.register.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document


@Document
data class User (
    @Id
    var id: String?=null,
    var firstname:String?=null,
    var lastname:String?=null,
    var email:String?=null,
    var password:String?=null,
    var confirmpassword:String?=null,
    var mobile: Long?=null,
    )