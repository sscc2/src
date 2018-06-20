<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import globalVar from '@/libs/globalVar.js';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

	if(globalVar.get('lang')=='en'){
		locale.use(lang);
	}
	export default {
		name: 'App'
	};
</script>
<style>
	html, body{width: 100%; height: 100%;overflow: hidden;}
	body{font-size: 0;}
	#app{height: 100%;}
</style>
