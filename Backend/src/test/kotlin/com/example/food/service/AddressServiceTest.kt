package com.example.food.service
import com.example.food.address.model.Address
import com.example.food.address.repository.Addressrepo
import com.example.food.address.service.Addressimpl
import io.kotlintest.shouldBe
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Test
import reactor.core.publisher.Mono

class AddressServiceTest {
    val address=Address("1","12","abc","def",9898989898,"abc@gmail.com","23rd street newyork","newyork","denver",123456)


    private val addressrepo = mockk<Addressrepo>() {

        every {
            save(address)
        }returns  Mono.just(address)
    }

    private val addressimpl=Addressimpl(addressrepo)

    @Test
    fun `should save the address when function is called`(){
        val result=addressimpl.saveAddress(address).block()

        result shouldBe address
    }

}