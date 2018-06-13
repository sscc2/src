<template>
	<div class="">
		
	</div>
</template>

<script>
import kit       from '@/libs/kit.js';
import utils     from '@/libs/utils.js';
import globalVar from '@/libs/globalVar.js';
import observer  from '@/libs/observer.js';
import Ekey      from '@/view/message/user/Ekey.vue';


	var lang = {}, pageTxt;
	lang.cn = {
		tips: {},
		label: []
	};
	lang.en = {};
	pageTxt = lang[globalVar.get('lang')];
	
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
	}
</script>

<style scoped="scoped">
	
</style>