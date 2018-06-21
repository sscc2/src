<template>
	<div class="home">
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
	
	
	!function (){
		var param = {
			url: 'mx/userinfo/queryLists',
			cmdID: "600001",
			userID: '',
			userName: '',
			pageSize: 500,
			currentPage: 1
			
		};
		utils.post(param, function(data){
			console.log('useridList：',data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			var obj, i;
			for (i = 0; i < data.lists.length; i++) {
				obj = data.lists[i];
				obj.words = obj.userID+obj.userName;
			}
			globalVar.set('useridList', data.lists);
			observer.execute('useridReady');
		});
	}();
	
	
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
		border: 1px solid  #ebeff4;overflow-x: auto;overflow-y: hidden;min-height: 100%;
	    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
		box-shadow: 0 6px 7px 7px  #e5e9f0;
		background-color: white;
	}
</style>
