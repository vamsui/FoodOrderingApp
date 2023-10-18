package com.example.foodOrderingApp.address.repository

import com.example.foodOrderingApp.address.model.Address
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface Addressrepo:ReactiveMongoRepository<Address,String>
{
}