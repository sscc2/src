<template>
    <div class="Popup" v-show="$store.state.passShow">

        <div class="_panle">
          <div>
            <p id="_title">{{pageTxt.lable[0]}}</p>
            <img id="_close" src="@/img/close.png" @click="$store.state.passShow = false">
          </div>

          <div class="_messaga">
            <ul class="_dialog">
              <li>
                <div class="leftBox">
                  <p class="txt">{{pageTxt.lable[1]}}</p>
                </div>
                <div class="rightBox">
                  <el-input  v-model="this.$store.state.transferEditID"  :placeholder="pageTxt.lable[8]" disabled></el-input>
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
                </div>
              </li>
            </ul>
          </div>

          <div class="passwd_btn">
            <el-button type="primary" @click="sendDown">立即下发</el-button>
            <el-button type="primary" @click="verify">提交</el-button>
            <el-button type="default" @click="$store.state.passShow = false">返回</el-button>
          </div>

        </div>
      </div> 
</template>

<script>
import utils from "@/libs/utils.js";
import md5 from "@/libs/md5.js";

var pageTxt_cn = {
  lable: [
    "修改密码",
    "用户ID：",
    "重置默认密码：",
    "新密码：",
    "审核人：",
    "审核pass：",
    "提交",
    "返回",
    "必填项...",
    "选择日期",
    "确认："
  ]
},pageTxt = pageTxt_cn,_this;

var data = {
  pageTxt,
  msg: "",
  info: { id: "", npasswd: "", isModifyDefaultPasswd: 0 },
};

export default {
  data() {
    return data;
  },
  methods: {
    // 提交
    verify(){
      this.encapsulationVerify(this.submit());
    },
    encapsulationVerify(fn) {
      var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^\w\s]).{8,}|(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
      if (this.info.isModifyDefaultPasswd == 0) {
        this.fn;
      } else {
        if (reg.test(this.info.npasswd)) {
          if (this.info.npasswd == this.info.again) {
            this.fn;
          } else {
            utils.weakTips("两次输入的应该一致");
          }
        } else {
          utils.weakTips(
            "密码必须包含大小写字母、数字、特殊字符中两项且大于8位"
          );
        }
      }
    },
    submit() {
      utils.post(
        "mx/userpasswd/modify",
        {
          cmdID: "600009",
          operator: "admin",
          userID: _this.$store.state.transferEditID,
          isModifyDefaultPasswd: _this.info.isModifyDefaultPasswd,
          userPasswd: _this.info.isModifyDefaultPasswd ? md5.hex_md5(_this.info.npasswd).substr(8, 16) : md5.hex_md5("111111").substr(8, 16)
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
    // 立即下发
    sendDown(){
      this.$store.state.passShow = false;
      utils.review({
        yes:function(info){
          utils.hints({
						txt: "是否立即下发",
						yes: function(){
              utils.post('mx/userpasswd/modifyImmediately',
               {
                 cmdID: "600010",
                 operator: "admin",
                 reviewer: info.name,
                 userID: _this.$store.state.transferEditID,
                 isModifyDefaultPasswd:_this.info.isModifyDefaultPasswd,
                 userPasswd: _this.info.isModifyDefaultPasswd ? md5.hex_md5(_this.info.npasswd).substr(8, 16) : md5.hex_md5("111111").substr(8, 16) 
               }, 
               function(response){
                  utils.wheelReq(response);                                           
							});
						}
					});
        }
      });
    },
    // 清空缓存数据
    changeNpasswd() {
      if (this.info.isModifyDefaultPasswd == 0) {
        this.info.npasswd = 111111;
        this.info.again = 111111;
      } else {
        this.info.npasswd = "";
        this.info.again = "";
      }
    }
  },
  // 初始化
  created() {
    _this=this;
    this.info.id = this.$store.state.transferEditID;
  }
};		
</script>

<style scoped="scoped">
.txt{font-size: 16px; line-height: 30px; height: 30px;}
.userPass{width: 600px; margin: 0 auto; border: 1px solid #dcdfe6;}
.rightBox > .el-radio{line-height: 30px}
.Popup ._panle{height: 360px;}
.passwd_btn{margin-top: 45px;}
</style>