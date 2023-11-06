package com.example.food

import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Bean
import org.springframework.web.client.RestTemplate


@SpringBootTest
class FoodOrderingAppApplicationTests {

	@Test
	fun contextLoads() {
	}

	@Bean
	fun restTemplate(): RestTemplate {
		return RestTemplate()
	}



}
