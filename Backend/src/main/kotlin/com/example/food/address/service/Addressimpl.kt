package com.example.food.address.service

import com.example.food.address.model.Address
import com.example.food.address.repository.Addressrepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class Addressimpl(

    @Autowired val addressrepo: Addressrepo
):Addressservice {
    override fun saveAddress(address: Address): Mono<Address> {
        return addressrepo.save(address)
    }
}