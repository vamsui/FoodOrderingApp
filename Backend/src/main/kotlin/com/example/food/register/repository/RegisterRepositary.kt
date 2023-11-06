package com.example.food.register.repository

import com.example.food.register.model.User
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono

@Repository
interface RegisterRepositary : ReactiveMongoRepository<User,String>
{
    fun findByEmail(email: String) : Mono<User>
}