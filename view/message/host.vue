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
								<span class='title_txt'><span class="red">*&nbsp;</span>{{hostText_cn[2]}}</span>
								<el-switch v-model="switchValue1" @change="changeTextarea" :active-text="hostText_cn[7]"  active-color='#0DB9EB' :inactive-text="hostText_cn[6]" inactive-color='#D7D8DA'></el-switch>
                <span class='prompt_txt'>{{hostText_cn[9]}}</span>
							</div>
							<div class="content">
								<el-input id="textarea1" type="textarea" rows="18" v-model="textareaValue1" :readonly="!switchValue1"></el-input>
							</div>
							<button class="blueBtn" id="button1" type="primary" @click="edit">{{hostText_cn[3]}}</button>
						</el-tab-pane>		

						<el-tab-pane :label="hostText_cn[4]" name="second">
							<div class="switch_box">
								<span class='title_txt'><span class="red">*&nbsp;</span>{{hostText_cn[5]}}</span>
								<el-switch v-model="switchValue2"  @change="changeTextarea" :active-text="hostText_cn[7]"  active-color='#0DB9EB' :inactive-text="hostText_cn[6]" inactive-color='#D7D8DA'></el-switch>
                <span class='prompt_txt'>{{hostText_cn[10]}}</span>
							</div>
							<div class="content">
								<el-input id="textarea2" type="textarea" rows="18" v-model="textareaValue2" :readonly="!switchValue2"></el-input>
							</div>
							<button class="blueBtn" id="button2" @click="edit">{{hostText_cn[3]}}</button>
						</el-tab-pane>	

				</el-tabs>
			</div>				

		</div>
	</div>
</template>

<script>
import utils from "@/libs/utils.js";

var hostText_cn = [
  "主机配置",
  "全局静态配置",
  "静态配置文件：",
  "提交",
  "全局动态配置",
  "动态配置文件：",
  "只读",
  "编辑",
  "是否提交当前修改",
  "(全局静态配置文件为：mxstatic.ini，文件仅支持UTF-8格式)",
  "(全局动态配置文件为：mxdynamic.ini，文件仅支持UTF-8格式)",
],_this;


export default {
  data() {
    return {
      hostText_cn,
      switchValue1: false,
      switchValue2: false,
      textareaValue1: "",
      textareaValue2: "",
      activeName: "first",
      hostType: 0
    };
  },
  methods: {
    //编辑
    edit() {
      var configinfo=_this.hostType ? _this.switchValue2 : _this.switchValue1;
      if(!configinfo){
        return
      }
      utils.hints({
        txt: hostText_cn[8],
        yes: this.editSubmit,
        btn: 2
      });
    },
    editSubmit() {
      utils.post(
        "mx/suConfig/modify",
        {
          cmdID: "600082",
          type: _this.hostType,
          cfgInfo: _this.hostType ? _this.textareaValue2 : _this.textareaValue1 
        },
        function(response) {
          if (response.errcode == 0) {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    //判断静态/动态配置
    handleClick(tab, event) {
      if (event.target.getAttribute("id") == "tab-first") {
        this.hostType = 0;
      }
      if (event.target.getAttribute("id") == "tab-second") {
        this.hostType = 1;
      }
      this.switchValue1=this.switchValue2=false;
      this.changeTextarea();
      utils.post(
        "mx/suConfig/query",
        {
          cmdID: "600081",
          type: _this.hostType
        },
        function(response) {
          if (_this.hostType == 0) {
            _this.textareaValue1 = response.cfgInfo;
          } else {
            _this.textareaValue2 = response.cfgInfo;
          }
        }
      );
    },
    //改变文本框
    changeTextarea() {
      afn("textarea1","button1",this.switchValue1)
      afn("textarea2","button2",this.switchValue2)
    }
  },
  //初始化数据
  created() {
    _this = this;
    utils.post(
      "mx/suConfig/query",
      {
        cmdID: "600081",
        type: _this.hostType
      },
      function(response) {
        if (response.errcode == 0) {
          if (_this.hostType == 0) {
            _this.textareaValue1 = response.cfgInfo;
          } else {
            _this.textareaValue2 = response.cfgInfo;
          }
        }
      }
    );
  },
  mounted(){
    this.changeTextarea() 
  }
};
  function afn(textareaID,buttonID,p){
      var textarea=document.getElementById(textareaID);
      var button=document.getElementById(buttonID)
      if(p){
        textarea.style = "background:#fff"
        button.style = "background-color:#32CCF9" 
      }else{
        textarea.style = "background:#F8F8F8"
        button.style = "background-color:rgb(215, 216, 218)" 
      }
  }
</script>

<style scoped="scoped">
.host{padding:20px;}
.host_btn *{vertical-align:middle;}
.host_btn .blueBtn{margin-top: 40px; margin-left: 120px;}
.title_txt{font-size:14px; color:#666; margin-right: 10px;}
.prompt_txt{font-size:14px; color:#999; margin-right: 10px;}
.switch_box{margin-top: 5px;}
.switch_box .el-switch{margin-right: 20px;}
.content{margin-top: 20px; width: 75%; margin-left: 120px;}
.red{font-size:14px; color:#FF6B6B;}

</style>

