<template>
    <div class="Popup" v-show="$store.state.passShow">
        <div class="_panle">
          <div>
            <p id="_title">{{pageTxt.label[0]}}</p>
            <img id="_close" src="@/img/close.png" @click="fanhui">
          </div>

          <div class="_messaga">
            <ul class="_dialog">
              <li>
                <div class="leftBox">
                  <p class="txt">{{pageTxt.label[1]}}</p>
                </div>
                <div class="rightBox">
                  <el-input  v-model="this.$store.state.transferEditID" placeholder="" disabled></el-input>
                </div>
              </li>
              <li>
                <div class="leftBox">
                  <p class="txt">{{pageTxt.label[2]}}</p>
                </div>                
                <div class="rightBox">
                    <el-radio v-model="info.isModifyDefaultPasswd" :label="0" @change="changeNpasswd">{{pageTxt.label[3]}}</el-radio>
                    <el-radio v-model="info.isModifyDefaultPasswd" :label="1" @change="changeNpasswd">{{pageTxt.label[4]}}</el-radio>
                </div>
              </li>
              <li>
                <div class="leftBox">
                  <p class="txt">{{pageTxt.label[5]}}</p>
                </div>                
                <div class="rightBox">
                  <el-input  v-model="info.npasswd"  :placeholder="info.isModifyDefaultPasswd?'':'111111'"  :disabled="info.isModifyDefaultPasswd==0"></el-input>
                </div>
              </li>
              <li>
                <div class="leftBox">
                  <p class="txt">{{pageTxt.label[6]}}</p>
                </div>
                <div class="rightBox">
                  <el-input v-model="info.again"  name='again' :placeholder="info.isModifyDefaultPasswd?'':'111111'"  :disabled="info.isModifyDefaultPasswd==0"></el-input>
                </div>
              </li>
            </ul>
          </div>

          <div class="passwd_btn">
            <el-button type="primary" @click="sendDown">{{pageTxt.label[7]}}</el-button>
            <el-button type="primary" @click="verify">{{pageTxt.label[8]}}</el-button>
            <el-button type="default" @click="fanhui">{{pageTxt.label[9]}}</el-button>
          </div>

        </div>
      </div> 
</template>

<script>
import utils from "@/libs/utils.js";
import md5 from "@/libs/md5.js";
import lang from '@/language/lang.js';

var pageTxt = lang.password,_this;
var data = {
  pageTxt,
  msg: "",
  info: { id: "", npasswd: "", isModifyDefaultPasswd: 0 },
}

export default {
  data() {
    return data;
  },
  methods: {
    fanhui(){
      this.$store.state.passShow = false;
      this.info.isModifyDefaultPasswd =0 ;
      this.changeNpasswd();
    },
    // 提交
    verify(){
      this.encapsulationVerify(this.submit);
    },
    encapsulationVerify(fn) {
      var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^\w\s]).{8,}|(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
      if (this.info.isModifyDefaultPasswd == 0) {
        fn();
      } else {
        if (reg.test(this.info.npasswd)) {
          if (this.info.npasswd == this.info.again) {
          fn();
          } else {
            utils.weakTips(_this.pageTxt.tips[0]);
          }
        } else {
          utils.weakTips(_this.pageTxt.tips[1]);
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
						txt: _this.pageTxt.tips[2],
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
        this.info.npasswd = 111111,this.info.again = 111111;
      } else {
        this.info.npasswd = "",this.info.again = "";
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