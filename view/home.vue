<template>
	<div class="home">
	
			'<div id="_hints"><div class="_panle">'+
			'<div><p id="_title">复核操作</p><img id="_close" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z'+
			'0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOVJREFUeNqMk90NgjAURmvjCDKFiDsormCI8cUNNO7hgw4hO/ATRxBwC9lBv5vcJtcbKm1yeLA9h2sTJrv9ITLG5OAMni'+
			'ZsLcEFZBaPO1iBgjdC5IKdnAJH8AYzUI5EnByxc6LAi2tjkUTJKWgtb1JkLSL67yQc/pFpw4pDnYhEIuKVaU3VmB0fKEXECHkjZT2BWy1H3CRSbvRh67ntT+Bvg4EYVPzmXk'+
			'xS8n38DZBcCznl0b0ROyI3jI4sdEDL+sJ0pHIRCswH5KGPykV6EYkpcA2QZSQVkRsFMvAIkHWEnO1XgAEAy8ZNZzb9vqAAAAAASUVORK5CYII=" />'+
			'</div><div class="_messaga"><p id="_ctxt">sdfsdf</p></div>'+
			'<div><button id="_yes" class="blueBtn">提 交</button><button id="_no" class="defBtn">返 回</button></div></div></div>';
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	    <navhead></navhead>
	    <div class="cw">
	    	<sidebar></sidebar>
			<div class="homeView">
				<div class="router">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import utils from '@/libs/utils.js';
import globalVar from '@/libs/globalVar.js';
import observer  from '@/libs/observer.js';
import navhead   from '@/view/navHead.vue';
import sidebar   from '@/view/sidebar.vue';

	
	export default {
		name: 'home',
		data() {
			return {};
		},
       components: {navhead,sidebar}
	}
</script>

<style scoped>
	.home{white-space: nowrap;height: 100%;}
	.home .cw{height: calc(100% - 50px);}
	.el-menu{border: none;}
	.homeView{margin-left: 226px;height:100%;padding: 20px;overflow-x: hidden;overflow-y: auto;vertical-align: top; background-color: #EDF0F5;}
	.router{
		border: 1px solid  #EBEFF4;overflow-x: auto;overflow-y: hidden;min-height: 100%;
	    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
		box-shadow: 0 6px 7px 7px #e5e9f0;background-color: #FFF;
	}
</style>
