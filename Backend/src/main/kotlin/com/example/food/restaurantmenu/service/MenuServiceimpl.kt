package com.example.food.restaurantmenu.service

import com.example.food.restaurantmenu.model.ItemList
import com.example.food.restaurantmenu.repositary.MenuRepositary
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class MenuServiceimpl(
    @Autowired
    val menuRepositary: MenuRepositary

):MenuService {

    override fun saveMenu(itemList: ItemList): Mono<ItemList> {
        return menuRepositary.save(itemList)
    }
    override fun getMenu(restid:String):Flux<ItemList>{
        return menuRepositary.findByRestid(restid)
    }


}