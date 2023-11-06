package com.example.foodOrderingApp.register.controller

import com.example.foodOrderingApp.register.model.User
import com.example.foodOrderingApp.register.service.RegisterService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono

@CrossOrigin
@RestController
@RequestMapping("/v1")
class RegisterController(
    @Autowired
    val registerService: RegisterService

) {

    @PostMapping("/create", produces = [MediaType.APPLICATION_JSON_VALUE])
    @ResponseBody
    fun saveUser(@RequestBody user: User):Mono<User>{
        return registerService.saveUser(user)
    }

    @GetMapping("/find", produces = [MediaType.APPLICATION_JSON_VALUE])
    @ResponseBody
    fun getUserById(@RequestParam id: String):Mono<User>{
        return registerService.getUserById(id)
    }

    @GetMapping("/checkemail", produces = [MediaType.APPLICATION_JSON_VALUE])
    @ResponseBody
    fun checkEmailExists(@RequestParam email: String): Mono<Boolean> {
        return registerService.checkEmailExists(email)
    }


}