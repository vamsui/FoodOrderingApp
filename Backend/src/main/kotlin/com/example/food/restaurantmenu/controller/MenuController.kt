package com.example.foodOrderingApp.restaurantmenu.controller

import com.example.foodOrderingApp.restaurantmenu.model.ItemList
import com.example.foodOrderingApp.restaurantmenu.service.MenuServiceimpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@CrossOrigin
@RestController
@RequestMapping("/v1")

class MenuController(

    @Autowired
    var menuServiceimpl: MenuServiceimpl
) {
    @PostMapping("/saveMenu")
    fun saveMenu(@RequestBody itemList: ItemList):Mono<ItemList>{
        return menuServiceimpl.saveMenu(itemList)
    }

    @GetMapping("/getmenu")
    fun getmenu(@RequestParam restid:String):Flux<ItemList>{
        return menuServiceimpl.getMenu(restid)
    }


}