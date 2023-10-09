package com.example.foodOrderingApp.register.controller

import com.example.foodOrderingApp.register.model.User
import com.example.foodOrderingApp.register.service.RegisterService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono

@CrossOrigin
@RestController
@RequestMapping("/v1")
class RegisterController(
    @Autowired
    val registerService: RegisterService

) {

    @PostMapping("/create")
    fun saveUser(@RequestBody user: User):Mono<User>{
        return registerService.saveUser(user)
    }

    @GetMapping("/find")
    fun getUserById(@RequestParam id: String):Mono<User>{
        return registerService.getUserById(id)
    }

    @GetMapping("/checkemail")
    fun checkEmailExists(@RequestParam email: String): Mono<Boolean> {
        return registerService.checkEmailExists(email)
    }


}