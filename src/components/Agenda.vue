<script setup></script>
<template>
	<div class="container">
		<h2 class="pb-3">Agenda congregación</h2>
		<div class="d-flex justify-content-center">
			<iframe
				class="shadow p-1 mb-5"
				src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=America%2FBogota&amp;showTitle=0&amp;showPrint=0&amp;showCalendars=0&amp;showTz=0&amp;src=YWNjZDA1ZmQ5ZDU4YmY3YjgyOWVlNjU3OGQ4NjViNDU4NmQwNGIxZjI0MmNjZDRlMjk3MDM0ZTQzN2NlYmRlNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23F4511E"
				style="border-width: 0"
				width="1000"
				height="600"
				frameborder="0"
				scrolling="si"
			>
			</iframe>
		</div>
	</div>
	<section class="container mb-5">
		<div class="d-flex justify-content-between pt-4">
			<h3>Arreglos de conferencias</h3>
			<div class="d-flex gap-3">
				<router-link to="/agenda/ancianos">
					<button class="btn btn-primary">Ancianos</button>
				</router-link>
				<router-link to="/agenda/ministeriales">
					<button class="btn btn-secondary">Ministeriales</button>
				</router-link>
			</div>
		</div>
		<router-view></router-view>
	</section>
</template>
