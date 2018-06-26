<template>
	<div class="sidebar">
		<el-menu default-active="message/user" unique-opened background-color="#F7F9FA " text-color="#5c759d" active-text-color="#2873f0" active-background-color="#FFF">
			<div index="message" v-show='model==1'>
				<el-menu-item name='user' index="message/user" @click='message'>
					<img class="icon" src="../img/sidebar/user.png" />
					<em>{{pageTxt.tabs[0]}}</em>
				</el-menu-item>
				<el-menu-item name='Ekey' index="message/Ekey" @click='message'>
					<img class="icon" src="../img/sidebar/ekey.png" />
					<em>{{pageTxt.tabs[1]}}</em>
				</el-menu-item>
				<el-menu-item name='signal' index="message/signal" @click='message'>
					<img class="icon" src="../img/sidebar/user.png" />
					<em>{{pageTxt.tabs[2]}}</em>
				</el-menu-item>
				<!--<el-menu-item type='不做' name='config' index="message/config" @click='message'>{{pageTxt.tabs[3]}}</el-menu-item>-->
				<el-menu-item name='host' index="message/host" @click='message'>
					<img class="icon" src="../img/sidebar/host.png" />
					<em>{{pageTxt.tabs[4]}}</em>
				</el-menu-item>
				<!--<el-menu-item type='不做' name='operate' index="message/operate" @click='message'>{{pageTxt.tabs[5]}}</el-menu-item>-->
				<el-menu-item name='distr' index="message/distr" @click='message'>
					<img class="icon" src="../img/sidebar/distr.png" />
					<em>{{pageTxt.tabs[6]}}</em>
				</el-menu-item>
				<el-menu-item name='statist' index="message/statist" @click='message'>
					<img class="icon" src="../img/sidebar/audit.png" />
					<em>{{pageTxt.tabs[7]}}</em>
				</el-menu-item>
				
				<el-submenu index="message/userSet">
					<div slot="title">
						<img class="icon" src="../img/sidebar/theme.png" />
						<em>{{pageTxt.tabs[9]}}</em>
					</div>
					<el-menu-item name='userSet' index="message/userSet" @click='message'>
						<em class="two">{{pageTxt.tabs[10]}}</em>
					</el-menu-item>
					<el-menu-item name='release' index="message/release" @click='message'>
						<em class="two">{{pageTxt.tabs[11]}}</em>
					</el-menu-item>
					<el-menu-item name='subscription' index="message/subscription" @click='message'>
						<em class="two">{{pageTxt.tabs[12]}}</em>
					</el-menu-item>
				</el-submenu>
				
				<el-submenu index="message/query">
					<div slot="title">
						<img class="icon" src="../img/sidebar/version.png" />
						<em>{{pageTxt.tabs[13]}}</em>
					</div>
					<el-menu-item name='query' index="message/release" @click='message'>
						<em class="two">{{pageTxt.tabs[14]}}</em>
					</el-menu-item>
					<el-menu-item name='contrast' index="message/contrast" @click='message'>
						<em class="two">{{pageTxt.tabs[15]}}</em>
					</el-menu-item>
				</el-submenu>
			</div>
			<el-submenu index="files" v-show='model==2'>
				<template slot="title">
					<i class="el-icon-document"></i>
					<span>FDEP文件</span>
				</template>
				<el-menu-item-group>
					<el-menu-item name='user' index="file/user" @click='files'>{{pageTxt.tabs[0]}}</el-menu-item>
					<el-menu-item name='Ekey' index="file/Ekey" @click='files'>{{pageTxt.tabs[1]}}</el-menu-item>
					<el-menu-item name='signal' index="file/signal" @click='files'>{{pageTxt.tabs[2]}}</el-menu-item>
					<el-menu-item name='task' index="file/task" @click='files'>{{pageTxt.tabs[8]}}</el-menu-item>
					<el-menu-item name='config' index="file/config" @click='files'>{{pageTxt.tabs[3]}}</el-menu-item>
					<el-menu-item name='distr' index="file/distr" @click='files'>{{pageTxt.tabs[6]}}</el-menu-item>
					<el-menu-item name='operate' index="file/operate" @click='files'>{{pageTxt.tabs[5]}}</el-menu-item>
					<el-menu-item name='statist' index="file/statist" @click='files'>{{pageTxt.tabs[7]}}</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
import kit       from '@/libs/kit.js';
import globalVar from '@/libs/globalVar.js';
import lang      from '@/language/lang.js';


	var data = {
		pageTxt: lang.sidebar,
		model: '1'
	};
	
	
	var el;
	export default {
		name: 'sidebar',
		data() {
			return data;
		},
		methods: {
			message(e){
				var path = '/message/' + e.$el.getAttribute('name');
				this.$router.replace({path});
			},
			files(e){
				var path = '/file/' + e.$el.getAttribute('name');
				this.$router.replace({path});
			}
		},
		mounted(){
			this.$router.replace({path: '/message/user'});
			kit('.sidebar .el-menu-item').down(function(e){
				el = this;
			}).mouseover(function(e){
				this.className='el-menu-item bg';
			}).mouseout(function(e){
				if(this != el)
					this.className='el-menu-item';
			});
		},
//		computed:{
//          onRoutes(){
//				this.$router.replace({path: '/message/user'});
//          }
//     }
	}
</script>

<style scoped="scoped">
	.sidebar{position: absolute;top:0;left: 0;width: 226px;height: 100%;background: #F7F9FA;overflow: auto;border-right: 1px solid #D7D8DA;}
	.icon{margin: 0 5px 0 0px;}
	.two{padding-left: 20px;}
	/*.sidebar .el-menu-item-group .el-menu-item:hover{background: #FFF !important;}*/
	.sidebar .bg{background: #FFF !important;}
	.sidebar .is-active{background: #FFF !important;}
</style>
<style>
	.sidebar .el-submenu__title:hover{background: #FFF !important;}
</style>