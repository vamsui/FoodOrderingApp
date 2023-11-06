package com.example.food.service

import com.example.food.restaurantmenu.model.ItemList
import com.example.food.restaurantmenu.repositary.MenuRepositary
import com.example.food.restaurantmenu.service.MenuServiceimpl
import io.kotlintest.shouldBe
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Test
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


class RestaurantMenuService {

    val itemList1= ItemList("123","2","1","chicken lolipop","serves two",300,"https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg")
    val itemList2=ItemList("124","3","1","chicken 65","serves two",200,"https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg")


    private val menuRepositary=mockk<MenuRepositary>() {
        every {
            save(itemList1)
        }returns Mono.just(itemList1)

        every {
            findAll()
        }returns Flux.just(itemList1,itemList2)

        every {
            findByRestid("1")
        }returns  Flux.just(itemList1,itemList2)
    }


    private val menuServiceimpl=MenuServiceimpl(menuRepositary)

    @Test
    fun `should save the restaurant menu`(){
       val result=menuServiceimpl.saveMenu(itemList1).block()
       result shouldBe itemList1
    }

    @Test
    fun `should return all the menu items of restuarant`(){
        val item1=menuServiceimpl.getMenu("1").blockFirst()
        val item2=menuServiceimpl.getMenu("1").blockLast()

        item1 shouldBe itemList1
        item2 shouldBe itemList2
    }

}