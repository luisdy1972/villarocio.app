<script setup>
import { NavBar, Footer } from '@components'
</script>

<template>
	<div>
		<NavBar></NavBar>
	</div>
	<div style="margin-top: 4rem">
		<RouterView></RouterView>
	</div>
	<Footer></Footer>
</template>

<style scoped></style>
