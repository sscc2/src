<template>
	<div class="component">
		<!-- 头部 -->
		<div class='header'>
				<img  class="header_img" src="@/img/ico.png">
				<span class="header_txt1" @click="del($event)">返回</span>
				<div class="header_line"></div>
				<span class='header_txt2'>{{pageTxt.infoTxt[0]}}</span>
		</div>
		<!-- 选项卡 -->
		<el-tabs type="card">
			<el-tab-pane label="基本信息">
				<span slot="label">{{pageTxt.tab[0]}}</span>
				<el-row class='info'>
					<el-col :span="6">
						<!-- 表单左 -->
						<ul class="left">
							<li><p>{{pageTxt.infoTxt[1]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[2]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[3]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[4]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[5]}}：</p></li>
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
						<!-- 表单右 -->
						<ul class="right">
							<el-form :model="info" ref="info">
							<li>								
								<el-form-item  prop="operator" :rules="[ { required: true, message: '操作员不能为空'}]">
									<el-input v-model="info.operator"></el-input>
								</el-form-item>									
							</li>
							<li>
								<el-form-item  prop="userID" :rules="[{ required: true, message: 'ID不能为空'}]">
									<el-input v-model="info.userID"></el-input>
								</el-form-item>	
							</li>
							<li>
								<el-form-item  prop="userName" :rules="[{ required: true, message: '用户名不能为空'}]">
									<el-input v-model="info.userName"></el-input>
								</el-form-item>	
							</li>
							<li class="default_radio">
								<el-radio v-model="info.isModifyDefaultPasswd" :label="0">启用</el-radio>
  								<el-radio v-model="info.isModifyDefaultPasswd" :label="1">不启用</el-radio>
							</li>
							<li>
								<el-form-item  prop="userPasswd" :rules="[{ required: true, message: '密码不能为空'},{ pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^\w\s]).{8,}|(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, message: '密码必须包含大小写字母、数字、特殊字符中两项且大于8位' }]">	
									<el-input  v-model.number="info.userPasswd" :disabled="info.isModifyDefaultPasswd==0"></el-input>
								</el-form-item>	
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
							</li><li>
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
							</el-form>							
						</ul>
					</el-col>
				</el-row>
				<!-- 按钮 -->
				<div class="btn">
					<el-button type="primary" @click="submitForm('info')">{{pageTxt.infoTxt[20]}}</el-button>
					<el-button type="primary" @click='cancelFieldValidate'>{{pageTxt.infoTxt[21]}}</el-button>
					<el-button type="primary" @click='del()'>{{pageTxt.infoTxt[22]}}</el-button>
				</div>
			</el-tab-pane>
			
			<el-tab-pane label="Ekey" disabled>
				<span slot="label">{{pageTxt.tab[1]}}</span>
			</el-tab-pane>
			
			<el-tab-pane label="通信关系" disabled>
				<span slot="label">{{pageTxt.tab[2]}}</span>
			</el-tab-pane>
			
			<el-tab-pane label="扩展信息" disabled>
				<span slot="label">{{pageTxt.tab[3]}}</span>				
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import kit        from '@/libs/kit.js';
import utils      from '@/libs/utils.js';
import observer   from '@/libs/observer.js';
import md5        from '@/libs/md5.js';

	var info = {}, _this,
	def = ['operator','userID', 'userName', 'userType', 'userDistrict', 'speedCtrlKbps', 'configTime', 'userInfo', 'connSuGroupName','isAlarmIfOffLine',  'softEncEndDate' , 'softEncBeginDate', 'allowSendRecvFile', 'maxPubsCount', 'maxSubsCount', 'maxDaysoftopic', 'isModifyDefaultPasswd','userPasswd'],
	must = ['userId', 'userName', 'userPasswd', 'speedCtrlKbps', 'connSuGroupName'];
	for (var i = 0; i < def.length; i++) {
		info[def[i]] = '';
	}

	var pageTxt = {
		tab: ['基本信息', 'Ekey', '通信关系', '扩展信息'],
		infoTxt: ['创建用户','操作员','用户ID','用户名称','使用默认密码','密码','用户类型','所属地区','速度','配置时间','用户联系方式信息','用户组','离线是否告警',
			'软加密开始时间','软加密结束时间','是否允许收发文件','发布主题个数上限','订阅主题个数上限','最大主题过期天数','(Kbit/s)-1或0:不限速','创建','立即下发','返回']
	},

	userType = [
		{value: '0', label: '银行' },
		{value: '2', label: '券商' },
		{value: '3', label: '基金' },
		{value: '4', label: '期货' },
		{value: '5', label: '保险' },
		{value: '6', label: '信托' },
		{value: '7', label: '监管机构' },
		{value: '8', label: '测试' },
		{value: '9', label: '其他' },
	],

	cities =[
		{value: 'BJ', label: '北京'},
		{value: 'SH', label: '上海'},
		{value: 'NJ', label: '南京'},
		{value: 'CD', label: '成都'},
		{value: 'SZ', label: '深圳'},
		{value: 'GZ', label: '广州'}
	],

	connect = [
		{value: '0', label: 'Group0' },
		{value: '1', label: 'Group1' },
		{value: '2', label: 'Group2' },
		{value: '3', label: 'Group3' },
		{value: '4', label: 'Group4' },
		{value: '5', label: 'Group5' },
		{value: '6', label: 'Group6' },
	],	

	online = [
		{value: '1', label: '是' },
		{value: '0', label: '否' },
	]

	export default {
		data(){
			return {
				info,
				pageTxt,				
				userType,
				cities,
				connect,
				online, 				
				time: getDate(),
			};
		},
		methods: {	
		// 表单验证
		cancelFieldValidate(){
			 this.$refs['info'].clearValidate() // 清除年龄的验证  
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
			if (valid) {
				add()
			} else {
				alert("错误")
				return false;
				}
			});
		},
  
			add: function(){
				var _this=this;
				utils.post('mx/userinfo/add',{
				cmdId:600003,
				operator:_this.info.operator,
				userID:_this.info.userID,
				userName:_this.info.userName,
				userType:_this.info.userType,
				userDistrict:_this.info.userDistrict,
				speedCtrlKbps:_this.info.speedCtrlKbps,
				configTime:_this.info.configTime,
				userInfo:_this.info.userInfo,
				connSuGroupName:_this.info.connSuGroupName,
				isAlarmIfOffLine:_this.info.isAlarmIfOffLine,
				softEncBeginDate:_this.info.softEncBeginDate,
				softEncEndDate:_this.info.softEncEndDate,
				allowSendRecvFile:_this.info.allowSendRecvFile,
				maxPubsCount:_this.info.maxPubsCount,
				maxSubsCount:_this.info.maxSubsCount,
				maxDaysoftopic:_this.info.maxDaysoftopic,
				isModifyDefaultPasswd:_this.info.isModifyDefaultPasswd,
				userPasswd:_this.info.userPasswd},function(response){
        		_this.userData = response.data;
    			})
			},
			del: function(e){
				this.$router.replace({path:'/message/user'});
			},	
		},
		beforeCreate(){ _this = this },
		created: function(){
			info.isModifyDefaultPasswd=0;		
			info.userPasswd='111111';
			info.userType='0';
			info.userDistrict='0';
			info.speedCtrlKbps='-1';
			info.connSuGroupName='0';
			info.isAlarmIfOffLine='0';
			info.softEncBeginDate='0';
			info.softEncEndDate='0';
			info.allowSendRecvFile= '0';
			info.maxPubsCount='0';
			info.maxSubsCount='0';
			info.maxDaysoftopic='0';

			var _this=this;
			this.$axios
			.post("http://192.168.218.35:8081/fdep/mx/dict/query",{
				cmdId:600000,
				language:'cn',
				type:''
			})	
			.then(function(response){

			})
			.catch(function(error){
				console.log(error)
			})	
		},
		mounted(){

		},
		updated(){

		}
	};
	function getDate(){
		var d = new Date(),
		t = d.getFullYear() + '-';
		t += dbNum(d.getMonth()+1) + '-';
		t += d.getDate() + ' ';
		t += dbNum(d.getHours()) + ':';
		t += dbNum(d.getMinutes()) + ':';
		t += dbNum(d.getSeconds());
		return t;
	}
	function dbNum(num){
		return num < 10 ? '0'+num : num;
	}
</script>

<style scoped="scoped">
	.component{color:#606266; min-width:1000px; min-height:630px;}
	/* 头部 */
	.header{height:47px; border-bottom:1px solid #ccc; overflow:hidden;}
	.header_img{float:left; margin-top:15px; margin-left:20px;}
	.header_txt1{font-size:13px; color:#5C759D; float:left; line-height:47px; margin-left:5px; cursor:pointer;}
	.header_line{border-right:1px solid #EBEFF4; height:30px; float: left; margin-left:20px; margin-top:9px;}
	.header_txt2{font-size:16px; color: #656A73; line-height:47px; margin-left:20px; font-weight:bold;}
	/* 选项卡 */
	.el-tabs{padding:22px;}
	.info{white-space:nowrap;}	
	/* 表单左 */
	.el-col-6{width: 140px;font-size:14px; color:#666666;}
	.left li{text-align:right; line-height:40px}
	.info li{margin-top:10px; height:36px;}
	/* 表单右 */
	.right{margin-left:15px; line-height:40px}
	.right input{font-size:14px; width: 255px; height:30px;vertical-align:middle;padding:0 5px; border:1px solid #D7D8DA; text-indent:12px;color:#666}
	input:focus{border:2px solid #32CCF9;}
	.el-select{width: 255px;}
	.el-textarea{width:255px;}
	.el-input{width:255px;}
	.kbit{font-size:12px;line-height:36px;vertical-align:middle; color:#999999;margin-left:10px}
	.info .txtH{height:100px}
	.default_radio{line-height: 50px;}
	/* 按钮 */
	.btn{margin-left: 140px; margin-top: 30px;}	
</style>