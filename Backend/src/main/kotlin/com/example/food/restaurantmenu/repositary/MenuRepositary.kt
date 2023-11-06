package com.example.food.restaurantmenu.repositary

import com.example.food.restaurantmenu.model.ItemList
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
@Repository
interface MenuRepositary:ReactiveMongoRepository<ItemList,String> {
    fun findByRestid(restid:String):Flux<ItemList>
}