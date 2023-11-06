import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "3.1.4"
	id("io.spring.dependency-management") version "1.1.3"
	kotlin("jvm") version "1.8.22"
	kotlin("plugin.spring") version "1.8.22"
	id("jacoco")

}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
	mavenCentral()
}




dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-mongodb-reactive")
	implementation("org.springframework.boot:spring-boot-starter-webflux")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("io.projectreactor.kotlin:reactor-kotlin-extensions")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor")
	implementation("jakarta.servlet:jakarta.servlet-api:5.0.0")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("io.projectreactor:reactor-test")
	implementation("org.springframework.kafka:spring-kafka")
    implementation ("org.apache.kafka:kafka-clients:3.0.0")
	implementation ("com.fasterxml.jackson.core:jackson-databind:2.13.0")
	testImplementation("io.mockk:mockk:1.10.6")
	testImplementation("io.kotlintest:kotlintest-runner-junit5:3.4.2")



	implementation ("org.springframework.boot:spring-boot-starter-mail")

	/*implementation ("org.springframework.kafka:spring-kafka:2.7.3") // Use the correct version

		implementation("org.springframework.kafka:spring-kafka")
        implementation("org.apache.kafka:kafka-clients")
        implementation("javax.mail:javax.mail-api:1.6.2")
        implementation("com.sun.mail:javax.mail:1.6.2")
        implementation ("org.springframework.boot:spring-boot-starter-mail")

*/


}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs += "-Xjsr305=strict"
		jvmTarget = "17"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
