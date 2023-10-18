package com.example.foodOrderingApp.restaurantmenu.repositary

import com.example.foodOrderingApp.restaurantmenu.model.ItemList
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
@Repository
interface MenuRepositary:ReactiveMongoRepository<ItemList,String> {
    fun findByRestid(restid:String):Flux<ItemList>
}