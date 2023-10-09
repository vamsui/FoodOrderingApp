package com.example.foodOrderingApp.login.service


import com.example.foodOrderingApp.login.repository.LoginRepository
import com.example.foodOrderingApp.login.model.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class LoginServiceImpl(
    @Autowired

    val loginRepository: LoginRepository

):LoginService {
    override fun checkEmailExists(email: String,password:String): Mono<Boolean> {
        val us= loginRepository.findByEmail(email)
            .map { user ->
                // Create a new object with just the email and password
                user != null && user.password == password

            }.defaultIfEmpty(false)
        return us
    }

}