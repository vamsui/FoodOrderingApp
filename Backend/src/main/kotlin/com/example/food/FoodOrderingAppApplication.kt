package com.example.food

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Import
import org.springframework.web.bind.annotation.CrossOrigin

@SpringBootApplication
@Import(CorsConfig::class)
@CrossOrigin
class FoodOrderingAppApplication

fun main(args: Array<String>) {
	runApplication<FoodOrderingAppApplication>(*args)

}
