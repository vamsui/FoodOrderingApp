package com.example.food.restaurantmenu.controller

import com.example.food.restaurantmenu.model.ItemList
import com.example.food.restaurantmenu.service.MenuServiceimpl
import io.kotlintest.shouldBe
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.http.MediaType
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.test.web.reactive.server.returnResult
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@WebFluxTest(MenuController::class)
@AutoConfigureWebTestClient
class MenuControllerTest
{

    @Autowired
    lateinit var client: WebTestClient

    @Autowired
    lateinit var menuServiceimpl: MenuServiceimpl
    @Test
    fun`should create menu account when api is called`(){

        val expectedResponse= mapOf("id" to "123",
            "itemid" to "2",
            "restid" to "1",
            "name" to "chicken lolipop",
            "description" to "serves two",
            "cost" to 300,
            "imageurl" to  "https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg"

        )

        val itemList=ItemList("123","2","1","chicken lolipop","serves two",300,"https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg")
        every {
            menuServiceimpl.saveMenu(itemList)
        } returns  Mono.just(itemList)


        val response = client.post()
            .uri("/v1/saveMenu")
            .bodyValue(itemList)
            .exchange()
            .expectStatus().is2xxSuccessful
            .returnResult<Any>().responseBody
        response.blockFirst() shouldBe expectedResponse


        response.blockFirst()
        verify (exactly = 1){
            menuServiceimpl.saveMenu(itemList)
        }

    }



    @Test
    fun `should display all the menu details`(){


        val itemList1=ItemList("123","2","1","chicken lolipop","serves two",300,"https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg")

        val itemList2=ItemList("124","3","1","chicken 65","serves two",350,"https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v1.jpg")



        val expectedResult= listOf(
            mapOf("id" to "123",
                "itemid" to "2",
                "restid" to "1",
                "name" to "chicken lolipop",
                "description" to "serves two",
                "cost" to 300,
                "imageurl" to  "https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v2.jpg"

            ),
            mapOf("id" to "124",
                "itemid" to "3",
                "restid" to "1",
                "name" to "chicken 65",
                "description" to "serves two",
                "cost" to 350,
                "imageurl" to  "https://b.zmtcdn.com/data/pictures/5/113895/3c06f6fbb8f667a2537dfdb6f060dc8b_o2_featured_v1.jpg"
            )

        )

        every {
            menuServiceimpl.getMenu("1")
        } returns Flux.just(itemList1,itemList2)

        val response=client.get()
            .uri("/v1/getmenu?restid=1")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus().is2xxSuccessful
            .returnResult<Any>()
            .responseBody

        response.blockFirst() shouldBe expectedResult[0]

        verify (exactly = 1){
          menuServiceimpl.getMenu("1")
        }


    }





    @TestConfiguration
    class ControllerTestConfig {
        @Bean
        fun menuServiceimpl() = mockk<MenuServiceimpl>()
    }

}