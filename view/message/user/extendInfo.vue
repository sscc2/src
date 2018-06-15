<template>
	<div>
		<div class='extendInfo'>
			<!-- 左列表 -->
			<div class='left_list'>
				<ul>
					<li>{{this.pageTxt.tips[0]}}</li>
					<li>{{this.pageTxt.tips[1]}}</li>
					<li>{{this.pageTxt.tips[2]}}</li>
					<li>{{this.pageTxt.tips[3]}}</li>
					<li>{{this.pageTxt.tips[4]}}</li>
					<li>{{this.pageTxt.tips[5]}}</li>
					<li>{{this.pageTxt.tips[6]}}</li>
				</ul>
			</div>
			<!-- 中间 -->
			<div class='center_list'>
				<ul>
					<li><el-input v-model="inputValue.userAlarmSmsNum" placeholder="请输入内容"></el-input></li>
					<li><el-input v-model="inputValue.userTelNum" placeholder="请输入内容"></el-input></li>
					<li><el-input v-model="inputValue.userMobileNum" placeholder="请输入内容"></el-input></li>
					<li><el-input v-model="inputValue.operationPhoneNum" placeholder="请输入内容"></el-input></li>
					<li><el-input v-model="inputValue.operationFax" placeholder="请输入内容"></el-input></li>
					<li><el-input v-model="inputValue.email" placeholder="请输入内容"></el-input></li>
					<li><el-input v-model="inputValue.ssccManager" placeholder="请输入内容"></el-input></li>
				</ul>
			</div>
			<!-- 右 -->
			<div class='right_list'>
				<ul>
					<li>{{this.pageTxt.lable[0]}}</li>
					<li>{{this.pageTxt.lable[1]}}</li>
					<li>{{this.pageTxt.lable[2]}}</li>
					<li>{{this.pageTxt.lable[3]}}</li>
					<li>{{this.pageTxt.lable[4]}}</li>
					<li>{{this.pageTxt.lable[5]}}</li>
				</ul>
			</div>	
		</div>
		<div class='bottom_btn'>
			<el-button type="success" @click='submit'>提交</el-button>
			<el-button type="danger" @click='goBack'>返回</el-button>
		</div>
	</div>
</template>


<script>
// import kit      from '@/libs/kit.js';
import utils from "@/libs/utils.js";
// import observer from "@/libs/observer.js";

var pageTxt_cn = {
    tips: [
      "短信报警号码：",
      "负责人座机号码：",
      "负责人手机号码：",
      "运维传真：",
      "运维电话：",
      "邮箱：",
      "SSCC客户经理："
    ],
    lable: [
      '只能输入数字"、" +" ";"',
      '只能输入数字"、" +" ";"',
      '只能输入数字和";"',
      '只能输入数字"、" +" ";"',
      '只能输入数字"、" +" ";"',
      "只能输入英文字符"
    ]
  },
  pageTxt_en = {};

var pageTxt = pageTxt_cn;

var def = [
  "userAlarmSmsNum",
  "userTelNum",
  "userMobileNum",
  "operationPhoneNum",
  "operationFax",
  "email",
  "ssccManager"
],inputValue={};

for(var i=0; i<def.length;i++){
  inputValue[def[i]]=''
}


export default {
  name: "extendifo",
  data: function() {
    return {
      pageTxt,
      inputValue
    };
  },
  methods: {
    submit() {
      var _this = this;
      utils.post(
        "mx/userinfoExt/modify",
        {
          cmdID: 600012,
          operator: "admin",
          userID: _this.extend,
          userAlarmSmsNum: _this.inputValue.userAlarmSmsNum,
          userTelNum: _this.inputValue.userTelNum,
          userMobileNum: _this.inputValue.userMobileNum,
          operationPhoneNum: _this.inputValue.operationPhoneNum,
          operationFax: _this.inputValue.operationFax,
          email: _this.inputValue.email,
          ssccManager: _this.inputValue.ssccManager
        },
        function(response) {
			if(response.errcode==0){
				alert(response.errinfo)
			}
		}
      );
    },
    goBack: function() {
      this.$router.replace({ path: "/message/user" });
    }
  },
  props:["extend"],
  created(){
      var _this = this;
      utils.post(
        "mx/userinfoExt/query",
        {
          cmdID: 600013,
          userID:this.extend,
          type: 0
        },
        function(response) {
           this.inputValue=response.lists
		}
      );
  }
};
</script>

<style  scoped="scoped">
.extendInfo {
  overflow: hidden;
  margin-top: 10px;
  font-size: 14px;
  color: #666666;
}
.left_list {
  float: left;
  width: 145px;
  margin-left: 5px;
}
.left_list li {
  line-height: 30px;
  text-align: right;
  margin-top: 10px;
}
.center_list {
  float: left;
  margin-left: 10px;
}
.center_list li {
  margin-top: 10px;
}
.right_list {
  font-size: 14px;
  float: left;
  margin-left: 10px;
}
.right_list li {
  line-height: 30px;
  text-align: left;
  margin-left: 5px;
  margin-top: 10px;
}

.bottom_btn {
  margin-left: 160px;
}
.el-button:nth-child(1) {
  width: 90px;
  height: 30px;
  background-color: #32ccf9;
  line-height: 7px;
  border: 1px solid #32ccf9;
}
.el-button:nth-child(2) {
  margin: 20px;
  width: 90px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #32ccf9;
  color: #32ccf9;
  line-height: 7px;
}
</style>
