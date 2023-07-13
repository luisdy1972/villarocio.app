<script setup>
const props = defineProps({
  grupo: String,
  nombre: String,
  responsabilidad: String,
  linkInforme: String,
  linkAgenda: String
})
</script>

<template>
  <div class="card card-person">
    <h5 class="card-header">Gurpo {{ props.grupo }}</h5>
    <div class="card-body">
      <h5 class="card-title">{{ props.nombre }}</h5>
      <p class="card-text">{{ props.responsabilidad }}</p>
      <a :href="props.linkInforme" class="btn btn-primary m-1">Informe</a>
      <a :href="props.linkAgenda" class="btn btn-primary m-1">Agenda</a>
    </div>
  </div>
</template>

<style scoped>
.card-person {
  max-width: 400px;
}
</style>
