<script setup>
import { ref, onMounted } from "vue"

import NavBar from "./assets/components/NavBar.vue"
import Carousel from "./assets/components/Carousel.vue"

import axios from "axios"
const rutaData = "https://villarocio-ba5a1-default-rtdb.europe-west1.firebasedatabase.app/.json";

const ancianos = ref([""])
const ministeriales = ref([""])

onMounted(() => {
  axios
    .get(rutaData)
    .then(function (response) {
      ancianos.value = response.data.ancianos
      ministeriales.value = response.data.ministeriales
      console.log(ancianos.value)
    })
    .catch(function (error) {
      console.error(error)
    })
})
import CardPerson from "./assets/components/CardPerson.vue"
</script>

<template>
  <NavBar />
  <div class="contenedor-principal">
    <Carousel class="mb-5" />
    <section class="container">
      <h2 class="p-4">Gupos</h2>
    </section>
    <div class="container mb-5">
      <!-- :for -->
      <CardPerson :grupo="ancianos[0].numero" :nombre="ancianos[0].nombre" :responsabilidad="ancianos[0].responsabilidad"
        :linkInforme="ancianos[0].linkInforme" :linkAgenda="ancianos[0].linkAgenda" />
    </div>
  </div>
</template>

<style scoped>
.contenedor-principal {
  margin-top: 4rem;
}

h2 {
  border-top: solid 1px rgb(185, 185, 185);
}
</style>
