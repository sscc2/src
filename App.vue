<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>
<style>
	html, body{width: 100%; height: 100%;overflow: hidden;}
	body{font-size: 0;}
	#app{height: 100%;}
</style>
