<template>

	<div>
		<!-- 头部 -->
		<div class='header'>
				<span class='header_txt'>主机配置</span>
		</div>

		<div class="host">
			<!-- 导航 -->
			<div class='host_btn'>
				<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
					
					<el-tab-pane label="全局静态配置" name="first">
						<span class='title_txt'>静态配置文件：</span>						
						<div class='textarea'>
							<el-input type="textarea" :rows="9"  v-model="textarea1">
							</el-input>							
						</div>
							<el-button @click="handleClick">编辑</el-button>
					</el-tab-pane>
					
					<el-tab-pane label="全局动态配置">
						<span class='title_txt'>动态配置文件：</span> 
						<div class='textarea'>
							<el-input type="textarea" :rows="9"  v-model="textarea2">
							</el-input>
							
						</div>
							<el-button @click="handleClick">编辑</el-button>
					</el-tab-pane>
				</el-tabs>
			</div>				

		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      textarea1: '<el-input type="textarea" :rows="9"  v-model="textarea2"><el-tabs v-model="activeName2" type="card" @tab-click="handleClick">',
	  textarea2: '<el-input type="textarea" :rows="9"  v-model="textarea2"><el-tabs v-model="activeName2" type="card" @tab-click="handleClick">',
	  activeName2: 'first'
    }
  },
  methods:{
	  handleClick(tab, event) {
        console.log(tab, event);
      }
  }
}
</script>

<style scoped="scoped">

/* 头部 */
.header {height: 47px;border-bottom: 1px solid #ccc;}
.header_txt {font-size: 16px;  color: #656a73;  line-height: 47px;  margin-left: 17px;  font-weight: bold;}

.host{padding:22px}
.title_txt{font-size: 14px; color:#666; float: left;}
.textarea{width: 60%; margin-top: 40px;}
.el-button--big{margin-top: 40px; margin-left: 100px; width: 90px; height: 30px; line-height: 0; background-color:#32CCF9; color:white}
.host_btn > .el-textarea__inner{background-color: #F8F8F8; }
.el-textarea{width: 600px; height: 200px;}

</style>