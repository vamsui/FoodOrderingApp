package com.example.foodOrderingApp.address.service

import com.example.foodOrderingApp.address.model.Address
import com.example.foodOrderingApp.address.repository.Addressrepo
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