package com.example.foodOrderingApp.login.controller

import com.example.foodOrderingApp.login.service.LoginService
import com.example.foodOrderingApp.login.service.LoginServiceImpl
import com.example.foodOrderingApp.login.model.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono


@RestController
@RequestMapping("/v1")
@CrossOrigin
class LoginController(
    @Autowired
    val loginServiceImpl: LoginServiceImpl
) {
    @GetMapping("/login")
    fun checkEmailExists(@RequestParam email: String,password:String): Mono<Boolean> {
        return loginServiceImpl.checkEmailExists(email,password)
    }

}