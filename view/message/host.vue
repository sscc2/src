<template>
	<div>
		<div class='header'>
			<span class='header_txt'>{{hostText_cn[0]}}</span>
		</div>

		<div class="host">

			<div class='host_btn'>
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			
						<el-tab-pane :label="hostText_cn[1]" name="first">
							<div class="switch_box">
								<span class='title_txt'><span class="red">*&nbsp;</span> {{hostText_cn[2]}}</span>
								<el-switch v-model="switchValue1" :active-text="hostText_cn[7]"  active-color='#0DB9EB' :inactive-text="hostText_cn[6]" inactive-color='#D7D8DA'></el-switch>
							</div>
							<div class="content">
								<el-input  type="textarea" rows="18" v-model="textareaValue1" :readonly="!switchValue1"></el-input>
							</div>
							<el-button type="primary" @click="edit">{{hostText_cn[3]}}</el-button>
						</el-tab-pane>		

						<el-tab-pane :label="hostText_cn[4]" name="second">
							<div class="switch_box">
								<span class='title_txt'><span class="red">*&nbsp;</span> {{hostText_cn[5]}}</span>
								<el-switch v-model="switchValue2" :active-text="hostText_cn[7]"  active-color='#0DB9EB' :inactive-text="hostText_cn[6]" inactive-color='#D7D8DA'></el-switch>
							</div>
							<div class="content">
								<el-input  type="textarea" rows="18" v-model="textareaValue2" :readonly="!switchValue2"></el-input>
							</div>
							<el-button type="primary" @click="edit">{{hostText_cn[3]}}</el-button>
						</el-tab-pane>	

				</el-tabs>
			</div>				

		</div>
	</div>
</template>

<script>
import utils from "@/libs/utils.js";

var hostText_cn=['主机配置','全局静态配置','静态配置文件：','编辑','全局动态配置','动态配置文件：','只读','编辑']

export default {
  data() {
    return {
	  hostText_cn,	
	  switchValue1: false,
	  switchValue2: false,	  
      textareaValue1: '',
	  textareaValue2: '',
	  activeName: 'first',
	  hostType:0,
    }
  },
  methods:{
	  edit(){
		 utils.hints({
          txt:"是否提交当前修改",
          yes:this.editSubmit,
          btn: 2
        })
	  },
	  editSubmit(){
		var _this=this;
		utils.post(
		"mx/suConfig/modify",
		{
			cmdID:"600082",
			type:_this.hostType,
			cfgInfo:_this.hostType?_this.textareaValue2:_this.textareaValue1
		},
		function(response){
			if(response.errcode==0){
				utils.weakTips(response.errinfo);
			}
		}
	)
	  },
	  handleClick(tab, event) {
		  if(event.target.getAttribute('id')=='tab-first'){
			  this.hostType=0
		  }
		  if(event.target.getAttribute('id')=='tab-second'){
			  this.hostType=1
		  }
		  var _this=this;
		  utils.post(
			"mx/suConfig/query",
			{
				cmdID:"600081",
				type:_this.hostType
			},
			function(response){
				if(_this.hostType==0){
					_this.textareaValue1=response.cfgInfo;
				}else{
					_this.textareaValue2=response.cfgInfo;
				}				
			}
		)  
      }
  },
  created(){
		var _this=this;
		utils.post(
		"mx/suConfig/query",
		{
			cmdID:"600081",
			type:_this.hostType
		},
		function(response){
			if(response.errcode==0){
				if(_this.hostType==0){
					_this.textareaValue1=response.cfgInfo;
				}else{
					_this.textareaValue2=response.cfgInfo;
				}				
			}
		}
	)
  }
}
</script>

<style scoped="scoped">
.host{padding:22px}
.showHost{margin-top: 40px; width: 1350px;}
.title_txt{font-size:14px; color:#666;  margin-right: 10px;float: left; line-height: 20px;}
.red{font-size:14px; color:#FF6B6B;}
.switch_box{margin-top: 20px;}
.content{margin-top: 20px; width: 75%; margin-left: 120px;}
.el-button--big{margin-top: 40px; margin-left: 120px; display: block;}
</style>
