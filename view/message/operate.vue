<!--消息运维-->
<template>
	<div id="operate" class="operate">
		<div class="nav" @click="nav">
			<el-button type="" @click="tabs = 0" plain>{{pageTxt.tabs[0]}}</el-button>
			<el-button type="" @click="tabs = 1" plain>{{pageTxt.tabs[1]}}</el-button>
			<el-button type="" @click="tabs = 2" plain>{{pageTxt.tabs[2]}}</el-button>
			<el-button type="" @click="tabs = 3" plain>{{pageTxt.tabs[3]}}</el-button>
			<el-button type="" @click="tabs = 4" plain>{{pageTxt.tabs[4]}}</el-button>
		</div>
		<hr class="hr"/>
		<div class="tab1" v-show="tabs==0">
			<ul class="label">
				<li>{{pageTxt.tab1.lable[0]}}</li>
				<li>{{pageTxt.tab1.lable[1]}}</li>
			</ul><ul class="con">
				<li>
					<el-button class='longBtn' type="primary" @click="tab1_dialog">{{pageTxt.tab1.lable[2]}}</el-button>
					<span class="txt red">{{tab1.redTip}}</span>
				</li><li>
					<el-input class='kbit' v-model="tab1.kbit" :placeholder="pageTxt.tab1.lable[3]"></el-input>
				</li><li>
					<el-button class='longBtn' type="success" @click="tab1_send">{{pageTxt.tab1.lable[4]}}</el-button>
				</li>
			</ul>
			<el-dialog :title="pageTxt.tab1.lable[5]" :visible.sync="tab1.dialog" width="854px">
				<hr class="hr"/>
				<div class="tab1Query">
					<span class="txt">{{pageTxt.tab1.lable[6]}}</span>
					<el-select v-model="tab1.query.type" :placeholder="pageTxt.tab1.lable[3]">
						<el-option v-for="item in pageTxt.tab1.options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<span class="txt">{{pageTxt.tab1.lable[7]}}</span>
					<el-input class='input' v-model="tab1.query.oName"></el-input>
					<span class="txt">{{pageTxt.tab1.lable[8]}}</span>
					<el-input class='input' v-model="tab1.query.nName"></el-input>
					<el-button type="primary" @click="tab1_query">{{pageTxt.tab1.lable[9]}}</el-button>
				</div>
				<hr class="hr"/>
				<el-table class='list' highlight-current-row  @current-change="tab1_row" :data="tab1.data"  tooltip-effect="dark">
					<el-table-column width="50" type="index"></el-table-column>
					<!--<el-table-column type="selection" width="55"></el-table-column>-->
					<el-table-column prop="type" :label="pageTxt.tab1.list[0]"  show-overflow-tooltip></el-table-column>
					<el-table-column prop="oId" :label="pageTxt.tab1.list[1]"  show-overflow-tooltip></el-table-column>
					<el-table-column prop="oName" :label="pageTxt.tab1.list[2]" show-overflow-tooltip></el-table-column>
					<el-table-column prop="nId" :label="pageTxt.tab1.list[3]" show-overflow-tooltip></el-table-column>
					<el-table-column prop="nName" :label="pageTxt.tab1.list[4]" show-overflow-tooltip></el-table-column>
				</el-table>
				<div class="pagination" v-show="tab1.data.length!=0">
					<el-pagination @current-change='' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
				</div>
				<div slot="footer" class="dialog-footer">
					 <el-button type="primary" @click="tab1_select">{{pageTxt.tab1.list[5]}}</el-button>
				    <el-button @click="tab1.dialog = false">{{pageTxt.tab1.list[6]}}</el-button>
				</div>
			</el-dialog>
		</div>
		<div class="tab2" v-show="tabs==1">
			<div style="margin: 0 0 20px 54px">
				<el-radio-group v-model="tab2.radio">
					<el-radio-button label="1">{{pageTxt.tab2.lable1[0]}}</el-radio-button>
					<el-radio-button label="2">{{pageTxt.tab2.lable2[0]}}</el-radio-button>
				</el-radio-group>
			</div>
			<div v-show="tab2.radio==1">
				<ul>
					<li>
						<div class="label">
							<p>{{pageTxt.tab2.lable1[1]}}</p>
						</div><div class="con">
							<el-select v-model="tab2.sendType">
								<el-option v-for="item in pageTxt.tab2.options2" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</li><li v-show="tab2.sendType==2">
						<div class="label">
							<p>{{pageTxt.tab2.lable1[5]}}</p>
						</div><div class="con">
							<el-input v-model='tab2.userID' class='input' :placeholder="pageTxt.tab2.lable1[3]"></el-input>
						</div>
					</li><li v-show="tab2.sendType==3">
						<div class="label">
							<p>{{pageTxt.tab2.lable1[6]}}</p>
							<p>&nbsp;</p>
						</div><div class="con">
							<el-input v-model='tab2.singleFile' class='input' :placeholder="pageTxt.tab2.lable1[3]"></el-input>
							<p class="txt">{{pageTxt.tab2.lable3[0]}}{{pageTxt.tab2.lable3[1]}}</p>
						</div>
					</li><li v-show="tab2.sendType==4">
						<div class="label">
							<p>{{pageTxt.tab2.lable1[7]}}</p>
						</div><div class="con">
							<el-select v-model="tab2.userType">
								<el-option v-for="item in pageTxt.tab2.options1" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</li><li>
						<div class="label">
							<p>{{pageTxt.tab2.lable1[2]}}</p>
						</div><div class="con">
							<el-input v-model='tab2.noticeFile' class='input' :placeholder="pageTxt.tab2.lable1[3]"></el-input>
							<p class="txt">{{pageTxt.tab2.lable3[0]}}</p>
						</div>
					</li><li>
						<div class="label">
							<p>&nbsp;</p>
						</div><div class="con">
							<el-button @click='tab2_send' type="success">{{pageTxt.tab2.lable1[4]}}</el-button>
						</div>
					</li>
				</ul>
			</div>
			<div v-show="tab2.radio==2">
				<ul>
					<li>
						<div class="label">
							<p>{{pageTxt.tab2.lable2[1]}}</p>
						</div><div class="con">
							<el-select v-model="tab2.batch">
								<el-option v-for="item in tab2.options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</li><li>
						<div class="label">
							<p>&nbsp;</p>
						</div><div class="con">
							<el-button @click='tab2_getNotice' type="success">{{pageTxt.tab2.lable2[2]}}</el-button>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="tab3" v-show="tabs==2">
			<div style="margin: 0 0 20px 54px;">
				<label class="txt v">{{pageTxt.tab3.lable[0]}}</label>
				<el-radio-group v-model="tab3.radio">
					<el-radio label="1">{{pageTxt.tab3.lable[1]}}</el-radio>
					<el-radio label="2">{{pageTxt.tab3.lable[2]}}</el-radio>
					<el-radio label="3">{{pageTxt.tab3.lable[3]}}</el-radio>
				</el-radio-group>
			</div>
			<ul>
				<li>
					<div class="label">
						<p>{{pageTxt.tab3.lable[4]}}</p>
					</div><div class="con">
						<el-select v-model="tab3.userID" @change='tab3_changeUser'>
							<el-option v-for="item in tab3.userData" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li><li v-show="tab3.radio==3">
					<div class="label">
						<p>{{pageTxt.tab3.lable[5]}}</p>
					</div><div class="con">
						<el-select v-model="tab3.mr">
							<el-option v-for="item in tab3.mrData" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li><li v-show="tab3.radio!=3">
					<div class="label">
						<p>{{pageTxt.tab3.lable[6]}}</p>
					</div><div class="con">
						<el-select v-model="tab3.Ekey" :disabled="tab3.userID==''">
							<el-option v-for="item in tab3.EkeyData" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<span class="txt red">{{pageTxt.tab3.tips[0]}}</span>
					</div>
				</li><li v-show="tab3.radio==2">
					<div class="label">
						<p>{{pageTxt.tab3.lable[7]}}</p>
					</div><div class="con">
						<el-select v-model="tab3.appid" :disabled='tab3.EkeyData.length==0'>
							<el-option v-for="item in tab3.appidData" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<span class="txt red">{{pageTxt.tab3.tips[1]}}</span>
					</div>
				</li><li v-show="tab3.radio==2">
					<div class="label">
						<p>{{pageTxt.tab3.lable[8]}}</p>
					</div><div class="con">
						<el-select v-model="tab3.linkid" :disabled='tab3.appidData.length==0'>
							<el-option v-for="item in tab3.linkidData" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<span class="txt red">{{pageTxt.tab3.tips[2]}}</span>
					</div>
				</li><li v-show="tab3.radio!=3">
					<div class="label">
						<p>{{pageTxt.tab3.lable[9]}}</p>
					</div><div class="con">
						<el-select v-model="tab3.format" @change='tab3_format'>
							<el-option v-for="item in tab3.formatData" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li><li v-show="tab3.radio!=3">
					<div class="label">
						<p>{{pageTxt.tab3.lable[10]}}</p>
					</div><div class="con">
						<el-input v-model="tab3.fileName" class='input' :placeholder="pageTxt.tab2.lable1[3]"></el-input>
					</div>
				</li><li>
					<div class="label">
						<p>&nbsp;</p>
					</div><div class="con">
						<el-button @click='tab3_send' type="success">{{pageTxt.tab3.lable[11]}}</el-button>
					</div>
				</li>
			</ul>
		</div>
		<div class="tab4" v-show="tabs==3">
			<div>
				<span class="txt">{{pageTxt.tab4.lable[0]}}</span>
				<el-input class='input' v-model="tab4.userID" placeholder="请输入内容"></el-input>
				<span class="txt">{{pageTxt.tab4.lable[1]}}</span>
				<el-date-picker v-model="tab4.time" :default-value='tab4.time' type="date" placeholder="选择日期">
				</el-date-picker>
				<el-button type="primary" @click='tab4_getIP' class='button'>{{pageTxt.tab4.lable[2]}}</el-button>
			</div>
			<div class="list">
				<el-table class='list' highlight-current-row  @current-change="tab4_row" :data="tab4.data" border tooltip-effect="dark">
					<el-table-column width="50" type="index"></el-table-column>
					<!--<el-table-column type="selection" width="55"></el-table-column>-->
					<el-table-column prop="route" :label="pageTxt.tab4.lable[3]"  show-overflow-tooltip></el-table-column>
				</el-table>
				<div class="pagination" v-show="tab1.data.length!=0">
					<el-pagination @current-change='' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
				</div>
			</div>
		</div>
		<div class="tab5" v-show="tabs==4">
			<ul>
				<li>
					<div class="label">
						<p>{{pageTxt.tab5.lable[0]}}</p>
					</div><div class="con">
						<el-select v-model="tab5.userID">
							<el-option v-for="item in tab5.userData" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li><li>
					<div class="label">
						<p>{{pageTxt.tab5.lable[1]}}</p>
					</div><div class="con">
						<el-select v-model="tab5.Ekey">
							<el-option v-for="item in tab5.mrData" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<span class="txt red">{{pageTxt.tab5.lable[3]}}</span>
					</div>
				</li><li>
					<div class="label">
						<p>&nbsp;</p>
					</div><div class="con">
						<el-button @click='tab5_break' type="success">{{pageTxt.tab5.lable[4]}}</el-button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>


<script>
import kit from '@/libs/kit.js';
import utils from '@/libs/utils.js';

	var pageTxt_cn = {
		tabs: ['连通性测试指令', '系统通知', '系统日志/配置文件','线路探测','断开用户连接'],
		tips: {
			err_test: '<p>1:请先点击【选择...】按钮选择关系对信息！</p><p>2:测试包大小必须是[0，5242880]区间中的整数值！</p>',
			err_guanxi: '<p>请选择通信关系对！</p>', err_file1: '通知文件不能为空！', err_id: '请输入用户ID！',
			err_file2: '名单文件不能为空！',err_Edey: '请选择Ekey！', err_appId: '请选择AppId！',
			err_linkId: '请选择LinkId！',err_mr: '请选择MR！',err_file3: '文件名不能为空！',err_date: '请选择日期！'
		},
		tab1: {
			lable: ['关系对信息：','测试包大小：','选择','必填项...','发送','选择关系对','业务类型','用户：','对端用户：','查询'],
			options: [
				{value: '1',label: '三方存管'},{value: '2',label: '银期转账'},{value: '3',label: '银基转账'},
				{value: '4',label: '资金划拔'},{value: '5',label: '信证报盘'},{value: '6',label: '电子对账'},
				{value: '7',label: '融资融券'},{value: '8',label: '基金盘后'},{value: '9',label: '转融通'},
				{value: '10',label: 'B转H'},{value: '11',label: '交叉销售'},{value: '12',label: '报价回购'},
				{value: '13',label: '个股期权'},{value: '14',label: 'FISP'},{value: '15',label: '私募报转'},
				{value: '16',label: '云证通'},{value: '17',label: '基金实时业务'},{value: '18',label: '基金费用对账'},
			],
			list: ['业务类型','源用户ID','源用户名','目的用户ID','目的用户的','确 定','返 回'],
		},
		tab2: {
			lable1: ['发送系统通知','发送方式：','通知文件：','必填项...','发送','用户ID：','名单文件：','用户类型：'],
			lable2: ['获取通知反馈用户列表','批次号：','获取通知反馈','请选择'],
			lable3: ['文件格式必须为GB2312，存放路径ump-server/cnfig/fdep/notice/','，用户ID之间用英文分号号隔开'],
			options1: [
				{value: '1', label: 'tmp' },{value: '2', label: '银行' },{value: '3', label: '证券' },
				{value: '4', label: '基金' },{value: '5', label: '期货' },{value: '6', label: '保险' },
				{value: '7', label: '信托' },{value: '8', label: '系统内用户' },{value: '9', label: '交易所' },
				{value: '10', label: '投资公司' },{value: '11',label: '测试'}
			],
			options2: [
				{value: '1',label: '全部用户'},{value: '2',label: '单个用户'},
				{value: '3',label: '用户名单'},{value: '4',label: '用户类型'}
			]
		},
		tab3: {
			lable: ['日志类型：','用户Mr日志','用户APP日志','Mr.ini配置','用户ID：','MR：','Ekey名称：','AppId：','LinkId：','文件名格式：','文件名：','发送'],
			tips: ['(需选择用户ID后，才可选Ekey名称)','(需选择Ekey名称后，才可选AppId)','(需选择AppId名称后，才可选LinkId)'],
			options1: [
				{value: '1',label: '全部用户'},{value: '2',label: '单个用户'},
				{value: '3',label: '用户名单'},{value: '4',label: '用户类型'}
			]
		},
		tab4: {
			lable: ['用户ID：','日期：','获取线路探测结果','用户线路探测结果(Mr名称|Mr的IP|转换前的IP及端口|转换后的IP及端口|状态[0-通畅，1-不能]|时间)'],
		},
		tab5: {
			lable: ['用户ID：','Ekey名称：','请选择','(选择用户后，若不选Ekey,则表示“断开该用户的所有MR”)','断开'],
		},
	},
	pageTxt_en = {
		
	};
	
	var pageTxt = pageTxt_cn;
	export default {
		name: 'message_operate',
		data(){
			return {
				pageTxt,
				tabs: 0,
				tab1:{
					send: {},
					query:{type:'',oName:'',nName:''},
					kbit: '',
					dialog: false,
					data:[{type: '电子对账', oId: 'ftcsTest1000', oName: '王小虎',nId: 'ftcsTest2222',nName: '王大虎'}
					,{type: '电子对账', oId: 'ftcsTest1001', oName: '李四',nId: 'ftcsTest3333',nName: '王伍'}],
					row: null,
					redTip: ''
				},
				tab2: {
					radio: 1,
					sendType: '1',
					userType: '1',
					options: [{value: '1', label: '请选择' }],
					userID: '',
					singleFile: '',
					noticeFile: '',
					batch: '1',
				},
				tab3: {
					radio: '1',
					userData: [{value: '1',label: '王小虎'},{value: '2',label: '李四'},{value: '3',label: '王伍'}],
					mrData: [],
					EkeyData: [],
					appidData: [],
					linkidData: [],
					formatData: [{value: '1',label: 'bsmr_YYYYMMDD_HHMMSS.log'},{value: '2',label: 'bsmr.log'}
						,{value: '3',label: 'bsmr_XX.log'},{value: '4',label: 'sxdataYYYYMMDD_XXXX.log'}
						,{value: '5',label: 'mrapi.log'},{value: '6',label: 'mrapi_XX.log'}],
					userID: '',
					mr: '',
					Ekey: '',
					appid: '',
					linkid: '',
					format: '1',
					fileName: 'bsmr_YYYYMMDD_HHMMSS',
				},
				tab4: {
					userID: '',
					time: Date.now(),
					data: [{route: '测试数据ABC！'}],
				},
				tab5: {
					userData: [{value: '1',label: '王小虎'},{value: '2',label: '李四'},{value: '3',label: '王伍'}],
					EkeyData: [],
					userID: '',
					Ekey: ''
				}
			};
		},
		methods: {
			nav(e){
				var nav = kit('.nav .el-button','#operate').delClass('navActive');
				nav.setAttr('style','').eq(this.tabs).addClass('navActive');
			},
			tab1_dialog(e){
				this.tab1.dialog = true;
			},
			tab1_select(e){
				if(this.tab1.row){
					var s = '', k, row = this.tab1.row,
						obj = {
							'oId': pageTxt.tab1.list[1],
							'nId': pageTxt.tab1.list[3],
							'type': pageTxt.tab1.list[0]
						};
					for(k in obj){
						s += obj[k] + ':' + row[k] + ',';
					}
					this.tab1.redTip = s;
					this.tab1.dialog = false;
				} else utils.confirm({message: pageTxt.tips.err_guanxi});
			},
			tab1_send(e){
				utils.confirm({message: pageTxt.tips.err_test});
			},
			tab1_row(row){
				this.tab1.row = row;
				console.log(row);
			},
			tab1_query(e){
				console.log(this.tab1.query);
			},
			tab2_send(){
				var params = ('sendType,noticeFile,userID,singleFile,userType').split(','),
					tem, i, len, err = '', n = 1;
				switch (this.tab2.sendType){
					case '2':
						tem = 'userID,noticeFile';break;
					case '3':
						tem = 'singleFile,noticeFile';break;
					default:
						tem = 'noticeFile';break;
				}
				tem = tem.split(',');
				var obj = {
					noticeFile: pageTxt.tips.err_file1,
					userID: pageTxt.tips.err_id,
					singleFile: pageTxt.tips.err_file2
				};
				for (i = 0, len = tem.length; i < len; i++) {
					if(this.tab2[tem[i]]==''){
						err += '<p>' + n + '.' + obj[tem[i]] + '</p>';
						n++;
					}
				}
				if(err==''){
					
				} else utils.confirm({message: err});
			},
			tab2_getNotice(){
				
			},
			tab3_send(){
				var params = ('userID,mr,Ekey,appid,linkid,format,fileName').split(','),
					tem, i, len, err = '', n = 1;
				console.log(this.tab3.radio);
				switch (this.tab3.radio){
					case '1':
						tem = 'userID,Ekey,fileName';break;
					case '2':
						tem = 'userID,Ekey,appid,linkid,fileName';break;
					default:
						tem = 'userID,mr';break;
				}
				tem = tem.split(',');
				var obj = {
					userID: pageTxt.tips.err_id,
					mr: pageTxt.tips.err_mr,
					Ekey: pageTxt.tips.err_Edey,
					appid: pageTxt.tips.err_appId,
					linkid: pageTxt.tips.err_linkId,
					fileName: pageTxt.tips.err_file3,
				};
				for (i = 0, len = tem.length; i < len; i++) {
					if(this.tab3[tem[i]]==''){
						err += '<p>' + n + '.' + obj[tem[i]] + '</p>';
						n++;
					}
				}
				if(err==''){
					
				} else utils.confirm({message: err});
			},
			tab3_changeUser(val){
				console.log(val)
			},
			tab3_format(val){
				this.tab3.fileName = this.tab3.formatData[val-1].label;
			},
			
			tab4_getIP(data){
				var params = ('userID,time').split(','),
					tem, i, len, err = '', n = 1;
				
				tem = params;
				var obj = {
					userID: pageTxt.tips.err_id,
					time: pageTxt.tips.err_date
				};
				for (i = 0, len = tem.length; i < len; i++) {
					if(this.tab4[tem[i]]==''||this.tab4[tem[i]]==null){
						err += '<p>' + n + '.' + obj[tem[i]] + '</p>';
						n++;
					}
				}
				console.log(typeof this.tab4.time)
				if(err==''){
					
				} else utils.confirm({message: err});},
			tab4_row(){
				
			},
			
			tab5_break(){
				if(!this.tab5.userID) return utils.confirm({message: pageTxt.tips.err_id});
			}
			
		},
		mounted: function(){
			var nav = kit('#operate .nav .el-button').eq(this.tabs);
			if(nav) nav.addClass('navActive');
		},
	}
</script>

<style scoped="scoped">
	.el-button{font-size: 16px;}
	.navActive{color: #3a8ee6;border-color: #3a8ee6;}
	.hr{margin: 15px 0;margin: 15px 0;border: none;height: 1px;background: #C0C4CC;}
	.txt{font-size: 16px;}
	.longBtn{width: 90px;}
	.label{display: inline-block;vertical-align: top;width: 180px;text-align: right;}
	.label>*{font-size: 16px;min-height: 40px;line-height: 40px;margin-bottom: 10px;}
	.con{display: inline-block;vertical-align: top;}
	.con>*{min-height: 40px;margin-bottom: 10px;}
	
	.tab1 .kbit{width: 240px;}
	.tab1 .list{max-height: 400px;overflow-y: auto;}
	.pagination{text-align: right;margin-top: 10px;}
	.tab1Query{white-space: nowrap;}
	.tab1 .input{width: 180px;}
	.tab1 .el-select{width: 140px;}
	.red{color: #f56c6c;margin-left: 20px;}
	
	.tab2 .input{width: 217px;}
	
	.tab3 .v{vertical-align: middle;}
	.tab3 .el-select{width: 270px;}
	.tab3 .input{width: 400px;}
	
	.tab4 .txt, .tab4 .button{margin: 0 10px;}
	.tab4 .input{width: 180px;}
	.tab4 .list{margin-top: 20px;}
	
	.tab5 {}
</style>
<style>
	.operate .el-dialog__body {padding-top: 0;}
</style>