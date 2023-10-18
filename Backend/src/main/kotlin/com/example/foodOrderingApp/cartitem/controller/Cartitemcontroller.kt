package com.example.foodOrderingApp.cartitem.controller

import com.example.foodOrderingApp.cartitem.model.CartItem
import com.example.foodOrderingApp.cartitem.service.Cartitemimpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono

import reactor.core.publisher.Flux

@CrossOrigin
@RestController
@RequestMapping("/v1")
class Cartitemcontroller(
@Autowired var cartitemimpl: Cartitemimpl
) {

    @PostMapping("/savecart")
    fun savecart(@RequestBody cartItem: CartItem): Mono<CartItem> {
        return cartitemimpl.saveCart(cartItem)
    }
    @DeleteMapping("/deletecart/{orderitemid}")
    fun delcart(@PathVariable orderitemid: String):Mono<Boolean> {
          return cartitemimpl.delcart(orderitemid)
    }
    @GetMapping("/cartall")
    fun getallcartitems():Flux<CartItem>{
        return cartitemimpl.getAllCarts()

    }

    @GetMapping("orderid")
    fun checkbyorderid(@RequestParam email: String,itemid:String):Mono<CartItem>
    {
        return cartitemimpl.getOrderId(email,itemid)
    }
}