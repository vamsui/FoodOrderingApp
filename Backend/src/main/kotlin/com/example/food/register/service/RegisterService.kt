package com.example.food.register.service

import com.example.food.register.model.User
import com.example.food.register.repository.RegisterRepositary
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

    override fun deleteById(id: String): Mono<Void> {
        return registerRepositary.deleteById(id)
    }

    override fun updateByUserId(id: String, user: User): Mono<User> {
        return registerRepositary.findById(id)
            .flatMap {
                it.firstname=user.firstname
                it.lastname=user.lastname
                it.email=user.email
                it.password=user.password
                it.confirmpassword=user.confirmpassword
                it.mobile=user.mobile

                registerRepositary.save(it)
            }
    }

}