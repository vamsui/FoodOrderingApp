package com.example.food.service

import com.example.food.cartitem.model.CartItem
import com.example.food.cartitem.repository.CartitrmRepository
import com.example.food.cartitem.service.Cartitemimpl
import io.kotlintest.shouldBe
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Test
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

class CartItemService {

    val cartItem1= CartItem("123","12","1","gosa@gmail.com","chicken biryani",300,1,300,"abc.jpg")
    val cartItem2=CartItem("124","13","2","gosa@gmail.com","chicken fry",200,1,200,"abcd.jpg")


    private val cartitrmRepository = mockk<CartitrmRepository>(){

        every {
            save(cartItem1)
        }returns Mono.just(cartItem1)

        every {
            deleteByOrderitemid("12")
        }returns Mono.empty()

        every {
            findAll()
        }returns Flux.just(cartItem1,cartItem2)

        every {
            findByEmailAndItemid("gosa@gmail.com","12")
        }returns Mono.just(cartItem1)
    }


    private val cartitemimpl=Cartitemimpl(cartitrmRepository)

    @Test
    fun `should save the cartitem when function is called`(){
        val result =cartitemimpl.saveCart(cartItem1).block()
        result shouldBe cartItem1
    }

    @Test
    fun`should return the cartitems when function is called`(){

        val result1=cartitemimpl.getAllCarts().blockFirst()
        val result2=cartitemimpl.getAllCarts().blockLast()


        result1 shouldBe cartItem1
        result2 shouldBe cartItem2
    }

    @Test
    fun `should delete the cart by id`(){
        val result=cartitemimpl.delcart("12")

        result shouldBe Mono.empty()
    }

    @Test
    fun `should get the car item by email and orderitemid`(){
        val result=cartitemimpl.getOrderId("gosa@gmail.com","12").block()
        result shouldBe cartItem1
    }

}