<template>
	<div class="component">
		<div class='header'>
				<img  class="header_img" src="@/img/ico.png">
				<span class="header_txt1" @click="back">{{pageTxt.label[0]}}</span>
				<div class="header_line"></div>
				<span class='header_txt2'>{{headerText}}</span>
		</div>
		<el-tabs type="card" v-model="$store.state.tabv">
			<el-tab-pane name="v1">
				<span slot="label">{{pageTxt.tab[0]}}</span>
				<el-row class='info'>
					<el-col :span="6">			
						<ul class="left">
							<li><p><span class="red">*&nbsp;</span>{{pageTxt.label[1]}}</p></li>
							<li><p><span class="red">*&nbsp;</span>{{pageTxt.label[2]}}</p></li>
							<li><p>{{pageTxt.label[3]}}</p></li>
							<li><p>{{pageTxt.label[4]}}</p></li>
							<li><p><span class="red">*&nbsp;</span>{{pageTxt.label[5]}}</p></li>
							<li><p>{{pageTxt.label[7]}}</p></li>							
							<li><p><span class="red">*&nbsp;</span>{{pageTxt.label[8]}}</p></li>
							<li><p>{{pageTxt.label[9]}}</p></li>							
							<li><p>{{pageTxt.label[10]}}</p></li>
							<li><p>{{pageTxt.label[11]}}</p></li>
							<li><p>{{pageTxt.label[12]}}</p></li>
							<li><p>{{pageTxt.label[13]}}</p></li>
							<li><p>{{pageTxt.label[14]}}</p></li>
							<li><p>{{pageTxt.label[15]}}</p></li>
						</ul>
					</el-col><el-col :span="18">		
						<ul class="right">
							<li>
								<el-input v-model="$store.state.transferEditID" disabled></el-input>
							</li>
							<li>
								<el-input v-model="info.userName" placeholder=""></el-input>
							</li>
							<li>
								<el-select v-model="info.userType" placeholder="">
									<el-option v-for="item in userType" :label="item.name" :key="item.id" :value="item.id"></el-option>
								</el-select>
							</li>
							<li>
								<el-select v-model="info.userDistrict" placeholder="">
									<el-option v-for="item in cities" :label="item.name" :key="item.id" :value="item.id"></el-option>
								</el-select>
							</li>
							<li>
								<el-input v-model="info.speedCtrlKbps" placeholder=""></el-input>
								<span class="kbit">{{pageTxt.label[6]}}</span>
							</li>
							<li>
								<el-input v-model="info.userInfo" placeholder=""></el-input>
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
								<el-input v-model="info.maxPubsCount" placeholder=""></el-input>
							</li>
							<li>
								<el-input v-model="info.maxSubsCount" placeholder=""></el-input>
							</li>							
							<li>
								<el-input v-model="info.maxDaysOfTopic" placeholder=""></el-input>
							</li>														
						</ul>
					</el-col>
				</el-row>
				<div class="btn">
          <el-button type="primary" @click='sendDown'>{{pageTxt.label[16]}}</el-button>
					<el-button type="primary" @click="Edit">{{pageTxt.label[17]}}</el-button>					
					<el-button type="default" @click='back'>{{pageTxt.label[18]}}</el-button>
				</div>
			</el-tab-pane>
			
			<el-tab-pane name="v2">
				<span slot="label">{{pageTxt.tab[1]}}</span>
				<UserEkey></UserEkey>
			</el-tab-pane>			
			<el-tab-pane name="v3">
				<span slot="label">{{pageTxt.tab[2]}}</span>
				<UserSignal></UserSignal>
			</el-tab-pane>			
			<el-tab-pane name="v4">
				<span slot="label">{{pageTxt.tab[3]}}</span>
				<ExtendInfo></ExtendInfo>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import utils from "@/libs/utils.js";
import md5 from "@/libs/md5.js";
import UserEkey from "@/view/message/user/userEkey.vue";
import UserSignal from "@/view/message/user/userSignal.vue";
import ExtendInfo from "@/view/message/user/extendInfo.vue";
import lang from '@/language/lang.js';

var info = {},
  def = [
    "operator",
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
  ];
for (var i = 0; i < def.length; i++) {
  info[def[i]] = "";
}

var pageTxt = lang.userEdit; 

var data = {
  userType: [],
  cities: [],
  info,
  pageTxt,
  headerText:""
},_this;

export default {
  data() {
    return data;
  },
  methods: {
    //立即下发
    sendDown() {
      utils.review({
        yes:function(info){
          utils.hints({
						txt: _this.pageTxt.tips[0],
						yes: function(){
              utils.post('mx/userinfo/modifyImmediately',
               {
                  cmdID: "600007",
                  operator: "admin",
                  reviewer: info.name,
                  userID: _this.$store.state.transferEditID,
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
               }, 
               function(response){
                 utils.wheelReq(response);                
							});
						}
					});
        }
      });
    },
    //修改
    Edit() {
      utils.post(
        "mx/userinfo/modify",
        {
          cmdID: "600004",
          operator: "admin",
          userID: _this.$store.state.transferEditID,
          userName: _this.info.userName,
          userType: _this.info.userType,
          userDistrict: _this.info.userDistrict,
          speedCtrlKbps: _this.info.speedCtrlKbps,
          userInfo: _this.info.userInfo,
          connSuGroupName: _this.info.connSuGroupName,
          isAlarmIfOffLine: _this.info.isAlarmIfOffLine,
          softEncBeginDate: _this.info.softEncBeginDate,
          softEncEndDate: _this.info.softEncEndDate,
          allowSendRecvFile: _this.info.allowSendRecvFile,
          maxPubsCount: _this.info.maxPubsCount,
          maxSubsCount: _this.info.maxSubsCount,
          maxDaysOfTopic: _this.info.maxDaysOfTopic
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
    //返回
    back() {
      this.$router.replace({ path: this.$store.state.editBack });
    }
  },
  //初始化数据
  created() {
    _this = this;
    if(this.$store.state.editBack == "/message/userSet"){
      this.headerText = _this.pageTxt.tips[3];
    }else{
      this.headerText = this.$store.state.headerText;
    }
    this.tabv = this.$store.state.tabv;
    utils.post(
      "mx/userinfo/query",
      {
        cmdID: "600002",
        userID: _this.$store.state.transferEditID,
        type: 0
      },
      function(response) {
        _this.info.userName = response.lists[0].userName;
        _this.info.userType = response.lists[0].userType.toString();
        _this.info.userDistrict = response.lists[0].userDistrict;
        _this.info.speedCtrlKbps = response.lists[0].speedCtrlKbps;
        _this.info.userInfo = response.lists[0].userInfo;
        _this.info.connSuGroupName = response.lists[0].connSuGroupName;
        _this.info.isAlarmIfOffLine = response.lists[0].isAlarmIfOffLine;
        _this.info.softEncBeginDate = response.lists[0].softEncBeginDate.toString();
        _this.info.softEncEndDate = response.lists[0].softEncEndDate.toString();
        _this.info.allowSendRecvFile = response.lists[0].allowSendRecvFile.toString();
        _this.info.maxPubsCount = response.lists[0].maxPubsCount;
        _this.info.maxSubsCount = response.lists[0].maxSubsCount;
        _this.info.maxDaysOfTopic = response.lists[0].maxDaysOfTopic;
      }
    );
    // 用户类型
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
  },
  components: { UserEkey, UserSignal, ExtendInfo }
};
    
</script>

<style scoped="scoped">
.component{color: #606266; min-width: 800px; min-height: 630px;}
.red{color: red;}
.info li{margin-top: 10px; height: 36px;}
.info{white-space: nowrap;}
.header{height: 44px; border-bottom: 1px solid #EBEFF4; overflow: hidden;}
.header_img{float: left; margin-top: 15px; margin-left: 20px;}
.header_txt1{font-size: 13px; color: #5c759d; float: left; line-height: 44px; margin-left: 5px; cursor: pointer;}
.header_line{border-right: 1px solid #ebeff4; height: 30px; float: left; margin-left: 20px; margin-top: 9px;}
.header_txt2{font-size: 16px; color: #656a73; line-height: 44px; margin-left: 20px; font-weight: bold;}
.el-tabs{padding: 22px; margin: 0 auto;}
.el-col-6{width: 145px; font-size: 14px; color: #666;}
.left li{text-align: right; line-height: 40px;}
.right{margin-left: 15px; line-height: 40px;}
.right input{font-size: 14px; width: 255px; height: 30px; vertical-align: middle; padding: 0 5px; border: 1px solid #d7d8da; text-indent: 7px;}
input:focus{border: 2px solid #32ccf9;}
.el-select{width: 255px;}
.el-textarea{width: 255px;}
.el-input{width: 255px;}
.kbit{font-size: 12px; line-height: 36px; vertical-align: middle; color: #999; margin-left: 10px;}
.info .txtH{height: 100px;}
.btn{margin-left: 140px; margin-top: 30px;}
.red{color: red; font-size: 14px;}
</style>