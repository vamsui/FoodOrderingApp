package com.example.food.login.repository

import com.example.food.login.model.User
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono
@Repository
interface LoginRepository: ReactiveMongoRepository<User, String>
{
    fun findByEmail(email: String) : Mono<User>
}