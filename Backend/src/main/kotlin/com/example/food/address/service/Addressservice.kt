package com.example.foodOrderingApp.address.service

import com.example.foodOrderingApp.address.model.Address
import reactor.core.publisher.Mono

interface Addressservice {
    fun saveAddress(address: Address):Mono<Address>
}