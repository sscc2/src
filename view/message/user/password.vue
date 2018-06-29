<template>
	<el-dialog :title="pageTxt.lable[0]" width='620px' :visible.sync="$store.state.passShow">
		<ul class="_dialog">
			<li>
				<div class="leftBox">
					<p class="txt">{{pageTxt.lable[1]}}</p>
				</div>
        <div class="rightBox">
					<el-input  v-model="this.$store.state.transferEditID"  :placeholder="pageTxt.lable[8]" disabled=""></el-input>
					<span class="txt red" v-show="err.id">{{pageTxt.tips.id}}</span>
				</div>
			</li>
			<li>
				<div class="leftBox">
					<p class="txt">{{pageTxt.lable[2]}}</p>
				</div>
				
				<div class="rightBox">
						<el-radio v-model="info.isModifyDefaultPasswd" :label="0" @change="changeNpasswd">重置</el-radio>
  						<el-radio v-model="info.isModifyDefaultPasswd" :label="1" @change="changeNpasswd">不重置</el-radio>
				</div>
			</li>
			<li>
				<div class="leftBox">
					<p class="txt">{{pageTxt.lable[3]}}</p>
				</div>
				
				<div class="rightBox">
					<el-input  v-model="info.npasswd"  :placeholder="info.isModifyDefaultPasswd?pageTxt.lable[8]:'111111'"  :disabled="info.isModifyDefaultPasswd==0"></el-input>
				</div>
			</li>
			<li>
				<div class="leftBox">
					<p class="txt">{{pageTxt.lable[10]}}</p>
				</div>
        <div class="rightBox">
					<el-input v-model="info.again"  name='again' :placeholder="info.isModifyDefaultPasswd?pageTxt.lable[8]:'111111'"  :disabled="info.isModifyDefaultPasswd==0"></el-input>
					<span class="txt red" v-show="err.again">{{pageTxt.tips.again}}</span>
				</div>
			</li>
		</ul>
		<div class="bottom_btn">
		    <el-button @click="$store.state.passShow = false">{{pageTxt.lable[7]}}</el-button>
		    <el-button type="primary" @click="submit1">{{pageTxt.lable[6]}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
import kit from "@/libs/kit.js";
import utils from "@/libs/utils.js";
import md5 from "@/libs/md5.js";

var pageTxt_cn = {
    tips: {
      id: "请填写用户ID",
      usernam: "请填写用户名",
      npasswd: "请输入新密码",
      again: "重复新密码",
      assessor: "请填写审核人",
      pass: "请填写复核密码"
    },
    lable: [
      "修改密码",
      "用户ID：",
      "是否重置默认密码：",
      "新密码：",
      "审核人：",
      "审核pass：",
      "提交",
      "返回",
      "必填项...",
      "选择日期",
      "确认："
    ],
    error: [
      "请选择软加密开始时间",
      "束时间不能小于开始时间",
      "请填写复核操作员",
      "请填写复核密码"
    ]
  }

var pageTxt = pageTxt_cn;

var data = {
  pageTxt,
  msg: "",
  info: { id: "", npasswd: "", isModifyDefaultPasswd: 0 },
  err: {
    id: false,
    usernam: false,
    npasswd: false,
    again: false,
    assessor: false,
    pass: false
  }
};

export default {
  data() {
    return data;
  },
  methods: {
    // 验证
    submit1(){
       var reg=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^\w\s]).{8,}|(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
        if(this.info.isModifyDefaultPasswd==0){
          this.submit()
        }else{
           if(reg.test(this.info.npasswd)){
             if(this.info.npasswd==this.info.again){
                 this.submit()
             }else{
                utils.weakTips("两次输入的应该一致");
             }
        }else{
          utils.weakTips("密码必须包含大小写字母、数字、特殊字符中两项且大于8位");
        }
        }       
    },
    submit() {
      this.$store.state.passShow=false
      var _this = this;
      utils.post(
        "mx/userpasswd/modify",
        {
          cmdID: 600009,
          operator: "admin",
          userID: _this.$store.state.transferEditID,
          isModifyDefaultPasswd: _this.info.isModifyDefaultPasswd,
          userPasswd: _this.info.isModifyDefaultPasswd?md5.hex_md5(_this.info.npasswd).substr(8, 16):md5.hex_md5("111111").substr(8, 16)
        },
        function(response) {
          if (response.errcode == 0) {
            utils.weakTips(response.errinfo);
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    changeNpasswd(){
      if(this.info.isModifyDefaultPasswd==0){
        this.info.npasswd=111111;
        this.info.again=111111;
      }else{
        this.info.npasswd="";
        this.info.again="";
      }
    }
  },
  created() {
    this.info.id = this.$store.state.transferEditID;
  }
};
</script>

<style scoped="scoped">
.txt{font-size: 16px; line-height: 30px; height: 30px;}
.userPass{width: 600px; margin: 0 auto; border: 1px solid #dcdfe6;}
.input{width: 180px;}
.red{color: #f56c6c; margin-left: 10px;}
</style>