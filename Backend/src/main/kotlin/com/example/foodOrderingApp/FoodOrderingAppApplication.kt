package com.example.foodOrderingApp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Import

@SpringBootApplication
@Import(CorsConfig::class)
class FoodOrderingAppApplication

fun main(args: Array<String>) {
	runApplication<FoodOrderingAppApplication>(*args)

}
