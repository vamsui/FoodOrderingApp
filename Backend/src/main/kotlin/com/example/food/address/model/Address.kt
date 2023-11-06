package com.example.foodOrderingApp.address.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class Address (
        @Id
        val id: String?=null,
        val orderid:String?=null,
        val firstname:String?=null,
        val lastname:String?=null,
        val mobile: Long?=null,
        val email:String?=null,
        val fulladdress:String?=null,
        val city:String?=null,
        val state:String?=null,
        val zipcode: Long?=null,
)