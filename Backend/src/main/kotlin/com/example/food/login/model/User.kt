package com.example.foodOrderingApp.login.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document


@Document
data class User (
    @Id
    val id: String?=null,
    val firstname:String?=null,
    val lastname:String?=null,
    val email:String?=null,
    val password:String?=null,
    val confirmpassword:String?=null,
    val mobile: Long?=null,
)