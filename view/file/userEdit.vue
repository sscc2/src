<template>
	<div class="component">
		<el-tabs type="card">
			<el-tab-pane label="基本信息">
				<span slot="label">{{pageTxt.tab[0]}}</span>
				<el-row class='info'>
					<el-col :span="6">
						<ul class="left">
							<li><p><i class="red">*</i>{{pageTxt.infoTxt[0]}}：</p></li>
							<li><p><i class="red">*</i>{{pageTxt.infoTxt[1]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[2]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[3]}}：</p></li>
							<li><p><i class="red">*</i>{{pageTxt.infoTxt[4]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[5]}}：</p></li>
							<li><p><i class="red">*</i>{{pageTxt.infoTxt[6]}}：</p></li>
							<li class="txtH"><p>{{pageTxt.infoTxt[7]}}：</p></li>
							<li><p>{{pageTxt.infoTxt[8]}}：</p></li>
						</ul>
					</el-col><el-col :span="18">
						<ul class="right">
							<li>
								<el-input v-model="info.sUserId" placeholder="必填项..." name="sUserId"></el-input>
							</li><li>
								<el-input v-model="info.sUserName" placeholder="必填项..." name="sUserName"></el-input>
							</li><li>
								<el-select v-model="info.iUserType" placeholder="请选择" name="iUserType">
									<el-option v-for="item in userType" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</li><li>
									<el-select v-model="info.sRegion" placeholder="请选择" name="sRegion">
										<el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
							</li><li>
								<el-input v-model="info.iSpeedCtrl" placeholder="必填项..." name="iSpeedCtrl"></el-input>
								<span class="kbit">{{pageTxt.infoTxt[9]}}</span>
							</li><li>
								<el-select v-model="info.cNotOnlineAlarm" placeholder="请选择" name="cNotOnlineAlarm">
									<el-option v-for="item in online" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</li><li>
								<el-select v-model="info.sGroupName" placeholder="请选择" name="sGroupName">
									<el-option v-for="item in connect" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</li><li class="txtH">
									<el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="info.sToUserInfo" name="sToUserInfo"> </el-input>
							</li><li>
								<el-input class='color' disabled v-model="time" placeholder="必填项.."></el-input>
							</li>
						</ul>
					</el-col>
				</el-row>
				<div class="btn">
					<el-button type="success" @click="add($event)">{{pageTxt.infoTxt[10]}}</el-button>
					<el-button type="danger" @click='del($event)'>{{pageTxt.infoTxt[11]}}</el-button>
				</div>
			</el-tab-pane>
			<el-tab-pane label="Ekey">
				<span slot="label">{{pageTxt.tab[1]}}</span>
			</el-tab-pane>
			<el-tab-pane label="通信关系">
				<span slot="label">{{pageTxt.tab[2]}}</span>
			</el-tab-pane>
			<el-tab-pane label="扩展信息">
				<span slot="label">{{pageTxt.tab[3]}}</span>
			</el-tab-pane>
		</el-tabs>
		<div class="lang">
			<span @click="cn($event)">中文</span>
			<i>｜</i>
			<span @click="en($event)">English</span>
		</div>
	</div>
</template>

<script>
	var pageTxt_cn = {
		tab: ['基本信息','Ekey','通信关系','扩展信息'],
		infoTxt: ['用户ID','用户名','用户类型','所在地区','最大收发速度','不在线报警','连接分组',
			'深证通公告','增加时间','(Kbit/s)-1或0:不限速','增加','返回']
	},
	pageTxt_en = {
		tab: ['info','Ekey','communication','information'],
		infoTxt: ['userID','user name','user type','your locale','max speed','No online alarm',
			'group','notice','increase the time','(Kbit/s)-1 or 0:Speed limit','increase','back'],
		infoBtn: ['','']
	},
	userType_cn = [
		{value: '1', label: '银行' },
		{value: '2', label: '券商' },
		{value: '3', label: '基金' },
		{value: '4', label: '期货' },
		{value: '5', label: '保险' },
		{value: '6', label: '信托' },
		{value: '7', label: '监管机构' },
		{value: '8', label: '测试' },
		{value: '9', label: '其他' },
	],
	userType_en = [
		{value: '1', label: 'Bank' },
		{value: '2', label: 'Broker' },
		{value: '3', label: 'fund' },
		{value: '4', label: 'futures' },
		{value: '5', label: 'Insurance' },
		{value: '6', label: 'Trust' },
		{value: '7', label: 'Regulators' },
		{value: '8', label: 'Test' },
		{value: '9', label: 'Other' },
	],
	cities_cn =[
		{value: 'BJ', label: '北京'},
		{value: 'SH', label: '上海'},
		{value: 'NJ', label: '南京'},
		{value: 'CD', label: '成都'},
		{value: 'SZ', label: '深圳'},
		{value: 'GZ', label: '广州'}
	],
	cities_en =[
		{value: 'BJ', label: 'Beijing'},
		{value: 'SH', label: 'Shanghai'},
		{value: 'NJ', label: 'Nanjing'},
		{value: 'CD', label: 'Chengdu'},
		{value: 'SZ', label: 'Shenzhen'},
		{value: 'GZ', label: 'Guangzhou'}
	],
	online_cn = [
		{value: '1', label: '是' },
		{value: '0', label: '否' },
	],
	online_en = [
		{value: '1', label: 'YES' },
		{value: '0', label: 'NO' },
	],
	connect_cn = [
		{value: 'Group0', label: 'Group0' },
		{value: 'Group1', label: 'Group1' },
		{value: 'Group2', label: 'Group2' },
		{value: 'Group3', label: 'Group3' },
		{value: 'Group4', label: 'Group4' },
		{value: 'Group5', label: 'Group5' },
		{value: 'Group6', label: 'Group6' },
	];
	
	var info = {},
	def = ['sUserId', 'sUserName', 'iUserType', 'sRegion', 'iSpeedCtrl', 'cNotOnlineAlarm', 'sGroupName', 'sToUserInfo'],
	must = ['sUserId', 'sUserName', 'iSpeedCtrl', 'sGroupName'];
	for (var i = 0; i < def.length; i++) {
		info[def[i]] = '';
	}
	
	module.exports = {
		data(){
			return {
				pageTxt: pageTxt_cn,
				info:info,
				time: getDate(),
				userType: userType_cn, cities: cities_cn,
				online: online_cn, connect: connect_cn,
			};
		},
		methods: {
			add: function(e){
				var info = this.info;
				console.log(info);
				for (var i = 0; i < must.length; i++) {
					if(info[must[i]] == '') break;
				}
				if(i != 4 ) return alert('*号为必填项!');
				var _this = this;
				var loading = this.$loading({
		          lock: true,
		          text: 'waiting...',
		          background: 'rgba(255, 255, 255, 0.5)'
		        });
		        var t = setTimeout(function(){
		          loading.close();
		        }, 15000);
				this.$http.post('/insert', info).then(function(response){
//					console.log(response.data.code);
					loading.close();
					clearTimeout(t);
					if(response.data.code == '0'){
						alert('添加成功');
					} else {
						alert('添加失败!');
					}
				}, function(response){
					console.log(response);
					loading.close();
					clearTimeout(t);
				    alert('添加失败!');
				});
			},
			del: function(e){
				this.$router.replace({path:'/FDEPMessage'});
			},
			cn: function(e){
				this.pageTxt = pageTxt_cn;
				this.userType = userType_cn;
				this.cities = cities_cn;
				this.online = online_cn;
				this.connect = connect_cn;
			},
			en: function(e){
				this.pageTxt = pageTxt_en;
				this.userType = userType_en;
				this.cities = cities_en;
				this.online = online_en;
				this.connect = connect_cn;
			}
		},
		beforeCreate(){
			console.log(this);
		},
		created: function(){
			info.iSpeedCtrl = '-1';
		},
		mounted(){
//			this.$el.style.display = 'block';
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
	.component{font-size:0;color:#606266;min-width:800px;min-height: 630px;}
	.el-tabs{padding:10px;margin:0 auto}
	.el-col{vertical-align:top}
	.el-select .el-input .el-select__caret{line-height:30px}
	.el-textarea{width:280px}
	.info{white-space:nowrap}
	.info .left{text-align:right}
	.info li{margin-top:10px;height:36px}
	.el-input{width:280px}
	.info .left p,.kbit{font-size:14px;line-height:36px;vertical-align:middle}
	.kbit{margin-left:6px}
	.info .right{padding-left:6px}
	.info .right input{font-size:14px;height:30px;vertical-align:middle;padding:0 6px}
	.red{color:red}
	.btn{text-align:center;padding-right:25%}
	.btn button{margin:20px}
	.info .txtH{height:100px}
	.el-textarea__inner{resize:none}
	.info .el-input.is-disabled .el-input__inner{background-color:#FFF;border-color:#dcdfe6;color:#606266;cursor:default}
	.lang{position:absolute;top:10px;right:30px}
	.lang i,.lang span{font-size:14px;line-height:40px;height:40px;vertical-align:middle;color:#409EFF}
	.lang span{cursor:pointer}
	.lang i{margin:0 8px}
</style>