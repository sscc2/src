<template>
	<div class="component">

		<div class='header'>
				<img  class="header_img" src="@/img/ico.png">
				<span class="header_txt1" @click="del($event)">返回</span>
				<div class="header_line"></div>
				<span class='header_txt2'>修改用户</span>
		</div>

		<el-tabs type="card" :value="tabv">
			<el-tab-pane label="基本信息" name="v1">
				<span slot="label">{{pageTxt.tab[0]}}</span>
				<el-row class='info'>
					<el-col :span="6">			
						<ul class="left">
							<li><p>{{pageTxt.infoTxt[2]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[3]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[6]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[7]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[8]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[10]}}：</p></li>							
							<li><p>{{pageTxt.infoTxt[11]}}：</p></li>
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
								<input type="text" v-model="info.userID" disabled>
							</li>
							<li>
								<input type="text" v-model="info.userName" placeholder="">
							</li>
							<li>
								<el-select v-model="info.userType" placeholder="">
									<el-option v-for="item in userType" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</li>
							<li>
								<el-select v-model="info.userDistrict" placeholder="">
									<el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</li>
							<li>
								<input type="text" v-model="info.speedCtrlKbps" placeholder="">
								<span class="kbit">{{pageTxt.infoTxt[19]}}</span>
							</li>
							<li>
								<input type="text" v-model="info.userInfo" placeholder="">
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
								<input type="text" v-model="info.maxPubsCount" placeholder="">
							</li>
							<li>
								<input type="text" v-model="info.maxSubsCount" placeholder="">
							</li>							
							<li>
								<input type="text" v-model="info.maxDaysoftopic" placeholder="">
							</li>
														
						</ul>
					</el-col>
				</el-row>
				<div class="btn">
					<el-button type="primary" @click="Edit($event)">{{pageTxt.infoTxt[20]}}</el-button>
					<el-button type="primary" @click='del($event)'>{{pageTxt.infoTxt[21]}}</el-button>
					<el-button type="primary" @click='del($event)'>{{pageTxt.infoTxt[22]}}</el-button>
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
			
			<el-tab-pane label="扩展信息">
				<span slot="label">{{pageTxt.tab[3]}}</span>
				<ExtendInfo></ExtendInfo>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import kit from "@/libs/kit.js";
import utils from "@/libs/utils.js";
import md5 from "@/libs/md5.js";
import UserEkey from "@/view/message/user/userEkey.vue";
import UserSignal from "@/view/message/user/userSignal.vue";
import ExtendInfo from "@/view/message/user/extendInfo.vue";

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
    "maxDaysoftopic",
    "isModifyDefaultPasswd",
    "userPasswd"
  ],
  must = [
    "userId",
    "userName",
    "userPasswd",
    "speedCtrlKbps",
    "connSuGroupName"
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
  userType = [
    { value: "1", label: "银行" },
    { value: "2", label: "券商" },
    { value: "3", label: "基金" },
    { value: "4", label: "期货" },
    { value: "5", label: "保险" },
    { value: "6", label: "信托" },
    { value: "7", label: "监管机构" },
    { value: "8", label: "测试" },
    { value: "9", label: "其他" }
  ],
  cities = [
    { value: "BJ", label: "北京" },
    { value: "SH", label: "上海" },
    { value: "NJ", label: "南京" },
    { value: "CD", label: "成都" },
    { value: "SZ", label: "深圳" },
    { value: "GZ", label: "广州" }
  ],
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
  info,
  pageTxt,
  userType,
  cities,
  connect,
  online,
  time: getDate(),
  obj: {},
  tabv: ""
};

export default {
  data() {
    return data;
  },
  methods: {
    Edit() {
      var _this = this;
      utils.post(
        "mx/userinfo/modify",
        {
          cmdID: 600004,
          userID: _this.$stroe.state.transferEditID,
          operator: _this.info.operator,
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
          maxDaysoftopic: _this.info.maxDaysoftopic
        },
        function(response) {
          if (response.errcode == 0) {
            open6(response.errinfo)
          } else {
            
          }
        }
      );
    },
    del: function(e) {
      this.$router.replace({ path: "/message/user" });
    },

    open6(msg) {
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {
          this.$store.state.tabv = "v2";
          this.$router.replace({ path: "/message/userEdit/mess" });
        })
        .catch(() => {
          this.$store.state.tabv = "v1";
          this.$router.replace({ path: "/message/userEdit/mess" });
        });
    }
  },

  // 初始化数据
  created: function() {
    var _this = this;
    _this.info.userID = _this.$store.state.transferEditID;
    _this.tabv = _this.$store.state.tabv;
    utils.post(
      "mx/userinfo/query",
      {
        cmdID: 600002,
        userID: _this.$store.state.transferEditID,
        type: 0
      },
      function(response) {
        _this.info = response.lists[0];
      }
    );
  },
  components: { UserEkey, UserSignal, ExtendInfo }
};

function getDate() {
  var d = new Date(),
    t = d.getFullYear() + "-";
  t += dbNum(d.getMonth() + 1) + "-";
  t += d.getDate() + " ";
  t += dbNum(d.getHours()) + ":";
  t += dbNum(d.getMinutes()) + ":";
  t += dbNum(d.getSeconds());
  return t;
}

function dbNum(num) {
  return num < 10 ? "0" + num : num;
}
</script>

<style scoped="scoped">
.component {
  color: #606266;
  min-width: 800px;
  min-height: 630px;
}
.red {
  color: red;
}
.info li {
  margin-top: 10px;
  height: 36px;
}
.info {
  white-space: nowrap;
}
/* 头部 */
.header {
  height: 47px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
}
.header_img {
  float: left;
  margin-top: 15px;
  margin-left: 20px;
}
.header_txt1 {
  font-size: 13px;
  color: #5c759d;
  float: left;
  line-height: 47px;
  margin-left: 5px;
  cursor: pointer;
}
.header_line {
  border-right: 1px solid #ebeff4;
  height: 30px;
  float: left;
  margin-left: 20px;
  margin-top: 9px;
}
.header_txt2 {
  font-size: 16px;
  color: #656a73;
  line-height: 47px;
  margin-left: 20px;
  font-weight: bold;
}
/* 选项卡 */
.el-tabs {
  padding: 22px;
  margin: 0 auto;
}
/* 表单左 */
.el-col-6 {
  width: 145px;
  font-size: 14px;
  color: #666666;
}
.left li {
  text-align: right;
  line-height: 40px;
}
/* 表单右 */
.right {
  margin-left: 15px;
  line-height: 40px;
}
.right input {
  font-size: 14px;
  width: 255px;
  height: 30px;
  vertical-align: middle;
  padding: 0 5px;
  border: 1px solid #d7d8da;
  text-indent: 7px;
}
input:focus {
  border: 2px solid #32ccf9;
}
.el-select {
  width: 255px;
}
.el-textarea {
  width: 255px;
}
.el-input {
  width: 255px;
}
.kbit {
  font-size: 12px;
  line-height: 36px;
  vertical-align: middle;
  color: #999999;
  margin-left: 10px;
}
.info .txtH {
  height: 100px;
}
/* 按钮 */
.btn {
  margin-left: 140px;
  margin-top: 30px;
}
</style>