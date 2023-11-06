package com.example.food.address.service

import com.example.food.address.model.Address
import reactor.core.publisher.Mono

interface Addressservice {
    fun saveAddress(address: Address):Mono<Address>
}