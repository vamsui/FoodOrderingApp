package com.example.foodOrderingApp.register.service

import com.example.foodOrderingApp.register.model.User
import com.example.foodOrderingApp.register.repository.RegisterRepositary
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service

class RegisterService(
    @Autowired
    var registerRepositary: RegisterRepositary
): RegisterRepo {
    override fun saveUser(user: User):Mono<User>{
        return registerRepositary.save(user)
}

    override fun getUserById(id: String): Mono<User> {
        return registerRepositary.findById(id)
    }

   override fun checkEmailExists(email: String): Mono<Boolean> {
       val us= registerRepositary.findByEmail(email)
           .map { user ->
               // Create a new object with just the email and password
               user != null
           }.defaultIfEmpty(false)



       return us
    }

}