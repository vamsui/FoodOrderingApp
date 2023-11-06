package com.example.foodOrderingApp.unittesting

import com.example.foodOrderingApp.cartitem.controller.Cartitemcontroller
import com.example.foodOrderingApp.cartitem.model.CartItem
import com.example.foodOrderingApp.cartitem.service.Cartitemimpl
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import reactor.core.publisher.Mono


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)

class CartItemTest {

    @Autowired lateinit var cartitemimpl: Cartitemimpl
    @Autowired lateinit var cartitemcontroller: Cartitemcontroller


    val cartItem=CartItem("11","12","13","gos@gmail.com","abc",123,2,246,"abc.jpg")


    @BeforeEach
    fun set(){
        cartitemimpl=Mockito.mock(Cartitemimpl::class.java)
        cartitemcontroller= Cartitemcontroller(cartitemimpl)
    }

    @Test
    fun saveCart(){
        Mockito.`when`(cartitemimpl.saveCart(cartItem)).thenReturn(Mono.just(cartItem))
        val result=cartitemcontroller.savecart(cartItem).block()
        Mockito.verify(cartitemimpl,Mockito.times(1)).saveCart(cartItem)

        Assertions.assertNotNull(result)
        Assertions.assertEquals(result,cartItem)
    }
}