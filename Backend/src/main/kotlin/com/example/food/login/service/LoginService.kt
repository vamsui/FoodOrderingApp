package com.example.foodOrderingApp.login.service

import com.example.foodOrderingApp.login.model.User
import reactor.core.publisher.Mono

interface LoginService {
    fun checkEmailExists(email:String,password:String): Mono<Boolean>
}