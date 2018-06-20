<template>
	<div class="">
		
	</div>
</template>

<script>
import kit       from '@/libs/kit.js';
import utils     from '@/libs/utils.js';
import globalVar from '@/libs/globalVar.js';
import lang      from '@/language/lang.js';
import observer  from '@/libs/observer.js';


	var pageTxt;
	pageTxt = lang.template;
	
	var data = {
		pageTxt,
		
	};
	
//	observer.addBinding('messUpload', function(master, param){
//		if(master != 'messUpload') return;
//		data.obj = param;
//	});
	
	export default {
		name: 'message_',
		data() {
			return data;
		},
		methods: {},
		beforeCreate(){},
		mounted(){},
		components: {}
	};
</script>

<style scoped="scoped">
	
</style>