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
      <a :href="props.linkInforme" target="_blank" class="btn btn-primary m-1">Informe</a>
      <a :href="props.linkAgenda" target="_blank" class="btn btn-primary m-1">Agenda</a>
    </div>
  </div>
</template>

<style scoped>
.card-person {
  max-width: 400px;
  min-width: 250px;
}
</style>
