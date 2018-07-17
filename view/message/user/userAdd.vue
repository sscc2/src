<template>
	<div class="component">
		<div class='header'>
				<img  class="header_img" src="@/img/ico.png">
				<span class="header_txt1" @click="back">{{pageTxt.label[0]}}</span>
				<div class="header_line"></div>
				<span class='header_txt2'>{{pageTxt.label[19]}}</span>
		</div>
		<el-tabs type="card">
			<el-tab-pane>
				<span slot="label">{{pageTxt.tab[0]}}</span>
				<el-row class='info'>
					<el-col :span="6">
						<ul class="left">
							<li><p><span class="red">*&nbsp;</span>{{pageTxt.label[1]}}：</p></li>
							<li><p><span class="red">*&nbsp;</span>{{pageTxt.label[2]}}：</p></li>
							<li><p>{{pageTxt.label[20]}}：</p></li>
							<li><p><span class="red">*&nbsp;</span>{{pageTxt.label[23]}}：</p></li>
							<li><p>{{pageTxt.label[3]}}：</p></li>
							<li><p>{{pageTxt.label[4]}}：</p></li>
							<li><p><span class="red">*&nbsp;</span>{{pageTxt.label[5]}}：</p></li>
							<li><p>{{pageTxt.label[7]}}：</p></li>							
							<li><p><span class="red">*&nbsp;</span>{{pageTxt.label[8]}}：</p></li>
							<li><p>{{pageTxt.label[9]}}：</p></li>							
							<li><p>{{pageTxt.label[10]}}：</p></li>
							<li><p>{{pageTxt.label[11]}}：</p></li>
							<li><p>{{pageTxt.label[12]}}：</p></li>
							<li><p>{{pageTxt.label[13]}}：</p></li>
							<li><p>{{pageTxt.label[14]}}：</p></li>
							<li><p>{{pageTxt.label[15]}}：</p></li>
						</ul>
					</el-col><el-col :span="18">
						<ul class="right">
							<li>	
									<el-input v-model="info.userID"></el-input>
							</li>
							<li>
									<el-input v-model="info.userName"></el-input>
							</li>
							<li class="default_radio">
								<el-radio v-model="info.isModifyDefaultPasswd" :label="0" @change="judge">{{pageTxt.label[21]}}</el-radio>
  							<el-radio v-model="info.isModifyDefaultPasswd" :label="1" @change="judge">{{pageTxt.label[22]}}</el-radio>
							</li>
							<li>
									<el-input  v-model="info.userPasswd"  :disabled="info.isModifyDefaultPasswd==0"></el-input>					              
							</li>
							<li>
								<el-select v-model="info.userType" placeholder="">
									<el-option v-for="item in userType" :label="item.name" :key="item.id"  :value="item.id"></el-option>
								</el-select>
							</li>
							<li>
								<el-select v-model="info.userDistrict" placeholder="">
									<el-option v-for="item in cities" :label="item.name" :key="item.id"  :value="item.id"></el-option>
								</el-select>
							</li>
							<li>
								<input type="text" v-model="info.speedCtrlKbps" placeholder="">
								<span class="kbit">{{pageTxt.label[6]}}</span>
							</li>
							<li>
								<input type="text" v-model="info.userInfo" placeholder="">
							</li>							
							<li>
								<el-select v-model="info.connSuGroupName" placeholder="">
									<el-option v-for="item in pageTxt.connect" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</li>
							<li>
								<el-select v-model="info.isAlarmIfOffLine" placeholder="">
									<el-option v-for="item in pageTxt.online" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</li>
							<li>
								<el-date-picker v-model="info.softEncBeginDate" type="datetime" :placeholder="pageTxt.label[24]"></el-date-picker>
							</li>
              
              <li>
								  <el-date-picker v-model="info.softEncEndDate" type="datetime" :placeholder="pageTxt.label[24]"></el-date-picker>
							</li>
							<li>
								<el-select v-model="info.allowSendRecvFile" placeholder="">
									<el-option v-for="item in pageTxt.online" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</li>
							<li>
								<input type="text" v-model="info.maxPubsCount" placeholder="">
							</li>
							<li>
								<input type="text" v-model="info.maxSubsCount" placeholder="">
							</li>
							<li>
								<input type="text" v-model="info.maxDaysOfTopic" placeholder="">
							</li>
						</ul>
					</el-col>
				</el-row>
				<div class="btn">
          <el-button type="primary" @click='submitForm(sendDown)'>{{pageTxt.label[16]}}</el-button>
					<el-button type="primary" @click="submitForm(add)">{{pageTxt.label[17]}}</el-button>					
					<el-button type="default" @click='back'>{{pageTxt.label[18]}}</el-button>
				</div>
			</el-tab-pane>			
			<el-tab-pane disabled>
				<span slot="label">{{pageTxt.tab[1]}}</span>
			</el-tab-pane>			
			<el-tab-pane disabled>
				<span slot="label">{{pageTxt.tab[2]}}</span>
			</el-tab-pane>
			<el-tab-pane disabled>
				<span slot="label">{{pageTxt.tab[3]}}</span>				
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import utils from "@/libs/utils.js";
import md5 from "@/libs/md5.js";
import lang from '@/language/lang.js';

var pageTxt = lang.userEdit,_this;

var info = {},
  def = [
    "operator",
    "userID",
    "userName",
    "userType",
    "userDistrict",
    "speedCtrlKbps",
    "configTime",
    "userInfo",
    "connSuGroupName",
    "isAlarmIfOffLine",
    "softEncEndDate",
    "softEncBeginDate",
    "allowSendRecvFile",
    "maxPubsCount",
    "maxSubsCount",
    "maxDaysOfTopic",
    "isModifyDefaultPasswd",
    "userPasswd"
  ],_this;

for (var i = 0; i < def.length; i++) {
  info[def[i]] = "";
}

export default {
  data() {
    return {
      userType: [],
      cities: [],
      info,
      pageTxt,
      judgment: []
    };
  },
  methods: {
    // 立即下发
    sendDown() {
      utils.review({
        yes:function(info){
          utils.hints({
						txt: _this.pageTxt.tips[0],
						yes: function(){
              utils.post('mx/userinfo/addImmediately',
               {
                  cmdID: "600006",
                  operator: "admin",
                  reviewer: info.name,
                  userID: _this.info.userID,
                  userName: _this.info.userName,
                  userType: _this.info.userType,
                  userDistrict: _this.info.userDistrict,
                  speedCtrlKbps: _this.info.speedCtrlKbps,
                  configTime: _this.info.configTime,
                  userInfo: _this.info.userInfo,
                  connSuGroupName: _this.info.connSuGroupName,
                  isAlarmIfOffLine: _this.info.isAlarmIfOffLine,
                  softEncBeginDate: _this.info.softEncBeginDate,
                  softEncEndDate: _this.info.softEncEndDate,
                  allowSendRecvFile: _this.info.allowSendRecvFile,
                  maxPubsCount: _this.info.maxPubsCount,
                  maxSubsCount: _this.info.maxSubsCount,
                  maxDaysOfTopic: _this.info.maxDaysOfTopic,
                  isModifyDefaultPasswd: _this.info.isModifyDefaultPasswd,
                  userPasswd: _this.info.isModifyDefaultPasswd ? _this.info.userPasswd : md5.hex_md5("111111").substr(8, 16)
               }, 
               function(response){
                 response.type=1;
                 utils.wheelReq(response);                
							});
						}
					});
        }
      });
    },
    //创建
    add() {
      this.$store.state.transferEditID = this.info.userID;
      utils.post(
        "mx/userinfo/add",
        {
          cmdId: "600003",
          operator: "admin",
          userID: _this.info.userID,
          userName: _this.info.userName,
          userType: _this.info.userType,
          userDistrict: _this.info.userDistrict,
          speedCtrlKbps: _this.info.speedCtrlKbps,
          configTime: _this.info.configTime,
          userInfo: _this.info.userInfo,
          connSuGroupName: _this.info.connSuGroupName,
          isAlarmIfOffLine: _this.info.isAlarmIfOffLine,
          softEncBeginDate: _this.info.softEncBeginDate,
          softEncEndDate: _this.info.softEncEndDate,
          allowSendRecvFile: _this.info.allowSendRecvFile,
          maxPubsCount: _this.info.maxPubsCount,
          maxSubsCount: _this.info.maxSubsCount,
          maxDaysOfTopic: _this.info.maxDaysOfTopic,
          isModifyDefaultPasswd: _this.info.isModifyDefaultPasswd,
          userPasswd: _this.info.isModifyDefaultPasswd ? _this.info.userPasswd : md5.hex_md5("111111").substr(8, 16)
        },
        function(response) {
          if (response.errcode == 0) {
            utils.hints({
              txt: response.errinfo,
              yes: function(){
                _this.$store.state.tabv = "v2";
                _this.$router.replace({ path: "/message/userEdit/mess"})
              },
              no: function(){
                _this.$store.state.headerText;
                _this.$store.state.tabv = "v1";
                _this.$router.replace({ path: "/message/userEdit/mess" })
              }
            });
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    // 表单验证
    submitForm(fn) {
      var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^\w\s]).{8,}|(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
      if (this.info.userID != "" && this.info.userName != "") {
        if (this.info.isModifyDefaultPasswd == 0) {
          fn();
        } else {
          if (reg.test(this.info.userPasswd)) {
            fn();
          } else {
            utils.weakTips(_this.pageTxt.tips[1]);
          }
        }
      } else {
        utils.weakTips(_this.pageTxt.tips[2]);
      }
    },
    judge() {
      if (info.isModifyDefaultPasswd != 0) {
        this.info.userPasswd = "";
      } else {
        this.info.userPasswd = 111111;
      }
    },
    back() {
      this.$router.replace({ path: "/message/user" });
    }
  },
  // 初始化数据
  created() {
    _this = this;
    utils.post(
      "mx/dict/query",
      {
        cmdID: "600000",
        language: 0,
        type: 1
      },
      function(response) {
        if (response.errcode == 0) {
          _this.userType = response.lists;
        }
      }
    );
    utils.post(
      "mx/dict/query",
      {
        cmdID: "600000",
        language: 0,
        type: 2
      },
      function(response) {
        if (response.errcode == 0) {
          _this.cities = response.lists;
        }
      }
    );
    info.userID = "";
    info.userName = "";
    info.isModifyDefaultPasswd = 0;
    info.userPasswd = "111111";
    info.userType = "0";
    info.userDistrict = "BJ";
    info.speedCtrlKbps = "-1";
    info.connSuGroupName = "0";
    info.isAlarmIfOffLine = "0";
    info.softEncBeginDate = "";
    info.softEncEndDate = "";
    info.allowSendRecvFile = "0";
    info.maxPubsCount = "0";
    info.maxSubsCount = "0";
    info.maxDaysOfTopic = "0";
  }
};
</script>

<style scoped="scoped">
.component{color: #606266; min-width: 1000px; min-height: 630px;}
.header{height: 44px; border-bottom: 1px solid #EBEFF4; overflow: hidden;}
.header_img{float: left; margin-top: 15px; margin-left: 20px;}
.header_txt1{font-size: 13px; color: #5c759d; float: left; line-height: 44px; margin-left: 5px; cursor: pointer;}
.header_line{border-right: 1px solid #EBEFF4; height: 30px; float: left; margin-left: 20px; margin-top: 9px;}
.header_txt2{font-size: 16px; color: #656a73; line-height: 44px; margin-left: 20px; font-weight: bold;}
.el-tabs{padding: 22px;}
.info{white-space: nowrap;}
.el-col-6{width: 140px; font-size: 14px; color: #666666;}
.left li{text-align: right; line-height: 40px;}
.info li{margin-top: 10px; height: 36px;}
.right{margin-left: 15px; line-height: 40px;}
.right input{font-size: 14px; width: 255px; height: 30px; vertical-align: middle; padding: 0 5px; border: 1px solid #d7d8da; text-indent: 12px; color: #666;}
input:focus{border: 2px solid #32ccf9;}
.el-select{width: 255px;}
.el-textarea{width: 255px;}
.el-input{width: 255px;}
.kbit{font-size: 12px; line-height: 36px; vertical-align: middle; color: #999999; margin-left: 10px;}
.info .txtH{height: 100px;}
.default_radio{line-height: 50px;}
.btn{margin-left: 140px; margin-top: 30px;}
._zero > img[data-v-d09b1104]{margin-left: 0 !important;}
.red{color: red; font-size: 14px;}
</style>