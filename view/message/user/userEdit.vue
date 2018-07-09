<template>
	<div class="component">
		<div class='header'>
				<img  class="header_img" src="@/img/ico.png">
				<span class="header_txt1" @click="del($event)">返回</span>
				<div class="header_line"></div>
				<span class='header_txt2'>{{$store.state.headerText}}</span>
		</div>
		<el-tabs type="card" v-model="$store.state.tabv">
			<el-tab-pane label="基本信息" name="v1">
				<span slot="label">{{pageTxt.tab[0]}}</span>
				<el-row class='info'>
					<el-col :span="6">			
						<ul class="left">
							<li><p><span class="red">*&nbsp;</span>{{pageTxt.infoTxt[2]}}：</p></li>
							<li><p><span class="red">*&nbsp;</span>{{pageTxt.infoTxt[3]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[6]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[7]}}：</p></li>
							<li><p><span class="red">*&nbsp;</span>{{pageTxt.infoTxt[8]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[10]}}：</p></li>							
							<li><p><span class="red">*&nbsp;</span>{{pageTxt.infoTxt[11]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[12]}}：</p></li>							
							<li><p>{{pageTxt.infoTxt[13]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[14]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[15]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[16]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[17]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[18]}}：</p></li>
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
								<span class="kbit">{{pageTxt.infoTxt[19]}}</span>
							</li>
							<li>
								<el-input v-model="info.userInfo" placeholder=""></el-input>
							</li>														
							<li>
								<el-select v-model="info.connSuGroupName" placeholder="">
									<el-option v-for="item in connect" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</li>
							<li>
								<el-select v-model="info.isAlarmIfOffLine" placeholder="">
									<el-option v-for="item in online" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</li>
							<li>
								<el-date-picker v-model="info.softEncBeginDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
							</li>
							<li>
								<el-date-picker v-model="info.softEncEndDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
							</li>
							<li>
								<el-select v-model="info.allowSendRecvFile" placeholder="">
									<el-option v-for="item in online" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
          <el-button type="primary" @click='sendDown'>{{pageTxt.infoTxt[21]}}</el-button>
					<el-button type="primary" @click="Edit($event)">{{pageTxt.infoTxt[20]}}</el-button>					
					<el-button type="default" @click='del($event)'>{{pageTxt.infoTxt[22]}}</el-button>
				</div>
			</el-tab-pane>
			
			<el-tab-pane label="Ekey" name="v2">
				<span slot="label">{{pageTxt.tab[1]}}</span>
				<UserEkey></UserEkey>
			</el-tab-pane>			
			<el-tab-pane label="通信关系" name="v3">
				<span slot="label">{{pageTxt.tab[2]}}</span>
				<UserSignal></UserSignal>
			</el-tab-pane>			
			<el-tab-pane label="扩展信息" name="v4">
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

var pageTxt = {
    tab: ["基本信息", "Ekey", "通信关系", "扩展信息"],
    infoTxt: [
      "用户",
      "操作员",
      "用户ID",
      "用户名称",
      "使用默认密码",
      "密码",
      "用户类型",
      "所属地区",
      "速度",
      "配置时间",
      "用户联系方式信息",
      "用户组",
      "离线是否告警",
      "软加密开始时间",
      "软加密结束时间",
      "是否允许收发文件",
      "发布主题个数上限",
      "订阅主题个数上限",
      "最大主题过期天数",
      "(Kbit/s)-1或0:不限速",
      "修改",
      "立即下发",
      "返回"
    ]
  },
  connect = [
    { value: "Group0", label: "Group0" },
    { value: "Group1", label: "Group1" },
    { value: "Group2", label: "Group2" },
    { value: "Group3", label: "Group3" },
    { value: "Group4", label: "Group4" },
    { value: "Group5", label: "Group5" },
    { value: "Group6", label: "Group6" }
  ],
  online = [{ value: "1", label: "是" }, { value: "0", label: "否" }];

var data = {
  userType: [{ id: "0", name: "tmp" }],
  cities: [{ id: "BJ", name: "北京" }],
  info,
  pageTxt,
  connect,
  online,
};

export default {
  data() {
    return data;
  },
  methods: {
    // 立即下发
    sendDown() {
      utils.review({
        yes:function(){
          utils.hints({
						txt: "是否立即下发",
						yes: function(){
              utils.post('mx/userinfo/modifyImmediately',
               {
                  cmdID: "600007",
                  operator: "admin",
                  reviewer: "admin2",
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
                  maxDaysOfTopic: _this.info.maxDaysoftTopic,                                        
               }, 
               function(response){
                 utils.wheelReq(response.uuid);                
							});
						}
					});
        }
      });
    },
    //修改
    Edit() {
      var _this = this;
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
          maxDaysOfTopic: _this.info.maxDaysoftTopic
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
    // 删除
    del: function(e) {
      this.$router.replace({ path: this.$store.state.editBack });
    }
  },

  // 初始化数据
  created: function() {
    this.tabv = this.$store.state.tabv;
    var _this = this;
    utils.post(
      "mx/userinfo/query",
      {
        cmdID: "600002",
        userID: _this.$store.state.transferEditID,
        type: "0"
      },
      function(response) {
        _this.info.userName = response.lists[0].userName;
        _this.info.userType = response.lists[0].userType;
        _this.info.userDistrict = response.lists[0].userDistrict;
        _this.info.speedCtrlKbps = response.lists[0].speedCtrlKbps;
        _this.info.userInfo = response.lists[0].userInfo;
        _this.info.connSuGroupName = response.lists[0].connSuGroupName;
        _this.info.isAlarmIfOffLine = response.lists[0].isAlarmIfOffLine;
        _this.info.softEncBeginDate = response.lists[0].softEncBeginDate.toString();
        _this.info.softEncEndDate = response.lists[0].softEncEndDate.toString();
        _this.info.allowSendRecvFile = response.lists[0].allowSendRecvFile;
        _this.info.maxPubsCount = response.lists[0].maxPubsCount;
        _this.info.maxSubsCount = response.lists[0].maxSubsCount;
        _this.info.maxDaysOfTopic = response.lists[0].maxDaysOfTopic;
      }
    );
    utils.post(
      "mx/dict/query",
      {
        cmdID: "600000",
        language: "0",
        type: "1"
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
        language: "0",
        type: "2"
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
.header{height: 47px; border-bottom: 1px solid #ccc; overflow: hidden;}
.header_img{float: left; margin-top: 15px; margin-left: 20px;}
.header_txt1{font-size: 13px; color: #5c759d; float: left; line-height: 47px; margin-left: 5px; cursor: pointer;}
.header_line{border-right: 1px solid #ebeff4; height: 30px; float: left; margin-left: 20px; margin-top: 9px;}
.header_txt2{font-size: 16px; color: #656a73; line-height: 47px; margin-left: 20px; font-weight: bold;}
.el-tabs{padding: 22px; margin: 0 auto;}
.el-col-6{width: 145px; font-size: 14px; color: #666666;}
.left li{text-align: right; line-height: 40px;}
.right{margin-left: 15px; line-height: 40px;}
.right input{font-size: 14px; width: 255px; height: 30px; vertical-align: middle; padding: 0 5px; border: 1px solid #d7d8da; text-indent: 7px;}
input:focus{border: 2px solid #32ccf9;}
.el-select{width: 255px;}
.el-textarea{width: 255px;}
.el-input{width: 255px;}
.kbit{font-size: 12px; line-height: 36px; vertical-align: middle; color: #999999; margin-left: 10px;}
.info .txtH{height: 100px;}
.btn{margin-left: 140px; margin-top: 30px;}
.red{color: red; font-size: 14px;}
</style>