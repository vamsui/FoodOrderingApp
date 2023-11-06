package com.example.food.address.controller

import com.example.food.address.model.Address
import com.example.food.address.service.Addressimpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono


@RestController
@CrossOrigin
@RequestMapping("/v1")
class Adresscontroller(
    @Autowired
    val addressimpl: Addressimpl

) {

    @PostMapping("/saveaddress")
    fun saveAddress(@RequestBody address: Address):Mono<Address>
    {
        return addressimpl.saveAddress(address)
    }
}