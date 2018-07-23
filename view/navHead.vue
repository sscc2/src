<template>
	<div class="navHead">
        <div class="logoBox">
        	<div class="logo"><img  src="../img/logo.png"/></div> 
        </div>

        <div class="messBox">
			<div class="ico1">
				<!-- <img class="csor" src="../img/cdico.png"/> -->
			</div> 
			<div class="ico2"><img  src="../img/warinico.png" /></div>  
			<div class="ico3"><span class='ioc3_txt'>38</span></div>
			<span class="warin_txt">告警：2018-03-05 10:31:47 深圳RU:大面积用户掉线。错误代码：SKG9QM2425。</span>
        </div>

        <div class="userBox">
			<div>
				<div class="ico4"><img src="../img/switchico.png"></div> 
				<span class="margin_left" @click="swc">{{this.swc_txt}}</span>		
			</div>
			
			<div>
				<el-dropdown trigger="click">
				<span class="el-dropdown-link">
					<span class="margin_left">配置管理系统</span>
					<div class="ico5"><img class="csor" src="../img/selectdico1.png"></div>	
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>分析系统 </el-dropdown-item>
				</el-dropdown-menu>
				</el-dropdown>									
			</div>
			
			<div>
				<el-dropdown trigger="click">
				<span class="el-dropdown-link">
					<span class="margin_left">admin</span>
					<div class="ico5"><img class="csor" src="../img/selectdico1.png"></div>	
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>admin1</el-dropdown-item>
					<el-dropdown-item>admin2</el-dropdown-item>
					<el-dropdown-item>admin3</el-dropdown-item>
				</el-dropdown-menu>
				</el-dropdown>							
			</div>
			
        </div>
    </div>
</template>

<script>
		
export default {
		name: 'navHead',
		data() {
			return {
				swc_txt:"消息系统"
				
				}
		},
		methods: {
			swc(){
				if(this.swc_txt=="消息系统"){
					this.swc_txt="文件系统"
					this.$router.replace({ path: "/file/home" });
				}else{
					this.swc_txt="消息系统"
					this.$router.replace({ path: "/message/userAdd/mess" });
				}
			}
		}
	}
</script>

<style scoped="scoped">

	.navHead{width: 100%;height: 50px; background: #3571D5; overflow: hidden; font-size: 12px;color: #FEFFFF}
	.logoBox{width: 226px;height: 100%; position: relative; float: left;background-color: #2861c1}
	.logo{width: 168px; height: 37px; position: absolute; margin: auto; top: 0;bottom: 0; left: 0; right: 0;}
	
	.userBox *,.messBox *{vertical-align:middle}
	.messBox{height: 100%; margin-left: 22px; float: left;}
	.ico1{display: inline-block;}
	.ico2{margin-left: 30px; display: inline-block;}
	.ico3{margin-left: 12px; display: inline-block;} 
	.ioc3_txt{background-color: #FF6B6B; width: 20px; height: 20px; text-align: center; line-height: 20px; border-radius: 50%} 
	.warin_txt{line-height: 50px; margin-left: 8px;} 
	 
	.userBox{float:right; margin-right: 20px;height: 100%;}
	.ico4{margin-right: 8px; display: inline-block;}
	.ico5{margin-left: 8px; display: inline-block;}
	.margin_left{line-height: 50px; font-size: 12px;color: #FEFFFF}
	.userBox>div:nth-child(1){display: inline-block; margin-right: 50px;}
	.userBox>div:nth-child(2){display: inline-block; margin-right: 22px;}
	.userBox>div:nth-child(3){display: inline-block;}

	.csor{cursor:pointer} 
</style>