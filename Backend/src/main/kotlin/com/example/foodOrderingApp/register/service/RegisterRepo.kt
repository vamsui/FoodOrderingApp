package com.example.foodOrderingApp.register.service

import com.example.foodOrderingApp.register.model.User
import reactor.core.publisher.Mono

interface RegisterRepo {
    fun saveUser(user: User):Mono<User>
    fun getUserById(id:String):Mono<User>
    fun checkEmailExists(email:String):Mono<Boolean>
}