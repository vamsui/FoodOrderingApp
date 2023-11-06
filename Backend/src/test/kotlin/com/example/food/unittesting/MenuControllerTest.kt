package com.example.foodOrderingApp.unittesting

import com.example.foodOrderingApp.restaurantmenu.controller.MenuController
import com.example.foodOrderingApp.restaurantmenu.model.ItemList
import com.example.foodOrderingApp.restaurantmenu.service.MenuServiceimpl
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.test.StepVerifier


@SpringBootTest(webEnvironment =  SpringBootTest.WebEnvironment.RANDOM_PORT)
class MenuControllerTest {

    @Autowired
    lateinit var menuServiceimpl: MenuServiceimpl
    @Autowired
    lateinit var menuController: MenuController

    val itemList=ItemList("23","11","22","chicken Biryani","serves two people",300,"https://b.zmtcdn.com/data/pictures/chains/5/110155/811c01a5430d50d3260f77917da99e12_o2_featured_v2.jpg")


    @BeforeEach
    fun set(){
        menuServiceimpl=Mockito.mock(MenuServiceimpl::class.java)
        menuController= MenuController(menuServiceimpl)
    }

    @Test
    fun saveMenu(){
        Mockito.`when`(menuServiceimpl.saveMenu(itemList)).thenReturn(Mono.just(itemList))
        val result=menuController.saveMenu(itemList).block()
        Mockito.verify(menuServiceimpl,Mockito.times(1)).saveMenu(itemList)
        Assertions.assertNotNull(result)
        Assertions.assertEquals(result,itemList)

    }


    @Test
    fun getMenu(){
        Mockito.`when`(menuServiceimpl.getMenu("1")).thenReturn(Flux.just(itemList))
        val result=menuController.getmenu("1")
        StepVerifier.create(result)
            .expectSubscription()
            .expectNext(itemList)
            .expectComplete()
            .verify()
    }
}