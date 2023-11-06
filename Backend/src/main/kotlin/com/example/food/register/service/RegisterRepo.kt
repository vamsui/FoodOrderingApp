package com.example.food.register.service

import com.example.food.register.model.User
import reactor.core.publisher.Mono

interface RegisterRepo {
    fun saveUser(user: User):Mono<User>
    fun getUserById(id:String):Mono<User>
    fun checkEmailExists(email:String):Mono<Boolean>

    fun deleteById(id:String):Mono<Void>

    fun updateByUserId(id:String,user: User):Mono<User>
}