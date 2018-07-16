<template>
	<div>
		<div class='extendInfo'>
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
			<div class='center_list'>
				<ul>
					<li><el-input class="input_normal" v-model="inputValue.userAlarmSmsNum" placeholder="请输入内容"></el-input></li>
					<li><el-input class="input_normal" v-model="inputValue.userTelNum" placeholder="请输入内容"></el-input></li>
					<li><el-input class="input_normal" v-model="inputValue.userMobileNum" placeholder="请输入内容"></el-input></li>
					<li><el-input class="input_normal" v-model="inputValue.operationPhoneNum" placeholder="请输入内容"></el-input></li>
					<li><el-input class="input_normal" v-model="inputValue.operationFax" placeholder="请输入内容"></el-input></li>
					<li><el-input class="input_normal" v-model="inputValue.email" placeholder="请输入内容"></el-input></li>
					<li><el-input class="input_normal" v-model="inputValue.ssccManager" placeholder="请输入内容"></el-input></li>
				</ul>
			</div>
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
			<el-button type="primary" @click='submit'>提交</el-button>
			<el-button type="default" @click='goBack'>返回</el-button>
		</div>
	</div>
</template>

<script>
import utils from "@/libs/utils.js";

var pageTxt_cn = {
  tips: [
    "短信报警号码：","负责人座机号码：","负责人手机号码：","运维传真：","运维电话：","邮箱：","SSCC客户经理："
  ],
  lable: [
    '只能输入数字"-" ";"','只能输入数字"-" ";"','只能输入数字和";"','只能输入数字"-" ";"','只能输入数字"-" ";"',"只能输入英文字符、数字"
  ]
};

var inputValue = {
  userAlarmSmsNum: "",
  userTelNum: "",
  userMobileNum: "",
  operationPhoneNum: "",
  operationFax: "",
  email: "",
  ssccManager: ""
},pageTxt = pageTxt_cn,_this;

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
      utils.post(
        "mx/userinfoExt/modify",
        {
          cmdID: "600012",
          operator: "admin",
          userID: _this.$store.state.transferEditID,
          userAlarmSmsNum: _this.inputValue.userAlarmSmsNum,
          userTelNum: _this.inputValue.userTelNum,
          userMobileNum: _this.inputValue.userMobileNum,
          operationPhoneNum: _this.inputValue.operationPhoneNum,
          operationFax: _this.inputValue.operationFax,
          email: _this.inputValue.email,
          ssccManager: _this.inputValue.ssccManager
        },
        function(response) {
          if (response.errcode == 0) {
            utils.weakTips(response.errinfo);
          } else {
            utils.weakTips(response.msg);
          }
        }
      );
    },
    goBack: function() {
      this.$router.replace({ path: "/message/user" });
    }
  },
  created() {
    _this = this
    for (var i in this.inputValue) {
      this.inputValue[i] = "";
    }
    utils.post(
      "mx/userinfoExt/query",
      {
        cmdID: "600013",
        userID: _this.$store.state.transferEditID,
        type: 0
      },
      function(response) {
        if(response.errcode==0){
          var response1 = response.lists[0];
          if (response1) {
            _this.inputValue.userAlarmSmsNum = response1.userAlarmSmsNum;
            _this.inputValue.userTelNum = response1.userTelNum;
            _this.inputValue.userMobileNum = response1.userMobileNum;
            _this.inputValue.operationFax = response1.operationFax;
            _this.inputValue.email = response1.email;
            _this.inputValue.operationPhoneNum = response1.operationPhoneNum;
            _this.inputValue.ssccManager = response1.ssccManager;
          }
        }       
      }
    );
  }
};
</script>

<style  scoped="scoped">
.extendInfo{overflow: hidden; margin-top: 10px; font-size: 14px; color: #666666;}
.left_list{float: left; width: 145px; margin-left: 5px;}
.left_list li{line-height: 30px; text-align: right; margin-top: 10px;}
.center_list{float: left; margin-left: 10px;}
.center_list li{margin-top: 10px;}
.right_list{color: #999; font-size: 12px; float: left; margin-left: 10px;}
.right_list li{line-height: 30px; text-align: left; margin-left: 5px; margin-top: 10px;}
.bottom_btn{margin-left: 160px;}
</style>
