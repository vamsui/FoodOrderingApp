package com.example.food.login.service

import reactor.core.publisher.Mono

interface LoginService {
    fun checkEmailExists(email:String,password:String): Mono<Boolean>
}