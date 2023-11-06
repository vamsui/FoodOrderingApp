package com.example.foodOrderingApp.cartitem.service

import com.example.foodOrderingApp.cartitem.model.CartItem
import com.example.foodOrderingApp.cartitem.repository.CartitrmRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.kotlin.core.publisher.switchIfEmpty

@Service
class Cartitemimpl(
    @Autowired
    var cartitrmRepository: CartitrmRepository
):Cartitemservice {
    override fun saveCart(cartItem: CartItem): Mono<CartItem> {
        return cartitrmRepository.save(cartItem)
    }


    override fun delcart(orderitemid: String):Mono<Boolean> {
        return cartitrmRepository.deleteByOrderitemid(orderitemid)
    }

    override fun getAllCarts(): Flux<CartItem> {
        return cartitrmRepository.findAll()
    }


    override fun getOrderId(email:String,itemid: String): Mono<CartItem> {
        return cartitrmRepository.findByEmailAndItemid(email, itemid)
            .switchIfEmpty(Mono.just(CartItem()))

    }

    override fun deleteAllCarts() {
        cartitrmRepository.deleteAll()
    }


}

