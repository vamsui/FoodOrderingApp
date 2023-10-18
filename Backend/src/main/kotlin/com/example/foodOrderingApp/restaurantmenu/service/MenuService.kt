package com.example.foodOrderingApp.restaurantmenu.service

import com.example.foodOrderingApp.restaurantmenu.model.ItemList
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

interface MenuService {
    fun saveMenu(itemList: ItemList):Mono<ItemList>
    fun getMenu(restid:String):Flux<ItemList>

}