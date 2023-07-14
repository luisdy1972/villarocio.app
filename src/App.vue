<script setup>
// modulos
import { ref, onMounted } from "vue"

// componentes
import NavBar from "./assets/components/NavBar.vue"
import Carousel from "./assets/components/Carousel.vue"
import CardPerson from "./assets/components/CardPerson.vue"

// librerias
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
</script>

<template>
  <NavBar />
  <div class="contenedor-principal">
    <Carousel class="mb-5" />
    <section class="container">
      <h2 class="p-4">Gupos</h2>
      <div class="d-flex justify-content-center flex-wrap mb-5">
        <CardPerson class="m-1" v-for="anciano in ancianos" :grupo="anciano.numero" :nombre="anciano.nombre"
          :responsabilidad="anciano.responsabilidad" :linkInforme="anciano.linkInforme"
          :linkAgenda="anciano.linkAgenda" />
      </div>
    </section>
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
