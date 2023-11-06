package com.example.food.address.repository

import com.example.food.address.model.Address
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface Addressrepo:ReactiveMongoRepository<Address,String>
{
}