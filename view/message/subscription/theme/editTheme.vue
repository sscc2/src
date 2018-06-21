<template>
	<div class="editTheme">
		<h2 class="h2">{{pageTxt.label[0]}}</h2>
		
		<el-tabs v-model="active" type="card" @tab-click="tabsCK">
			<el-tab-pane :label="pageTxt.label[1]" name="first">
				<ul class="list">
					<li>
						<label class="txt">{{pageTxt.label[2]}}</label>
						<div class="rightBox">
							<span class="txt1">{{info.topicName}}</span>
						</div>
					</li><li>
						<label class="txt">{{pageTxt.label[3]}}</label>
						<div class="rightBox">
							<span class="txt1">{{info.pubUserID}}</span>
						</div>
					</li><li>
						<label class="txt">{{pageTxt.label[4]}}</label>
						<div class="rightBox">
							<span class="txt1">{{info.pubTime}}</span>
						</div>
					</li><li>
						<label class="txt">{{pageTxt.label[5]}}</label>
						<div class="rightBox">
							<el-input placeholder="" v-model="info.topicDescr" clearable></el-input>
						</div>
					</li><li>
						<label class="txt">{{pageTxt.label[6]}}</label>
						<div class="rightBox">
							<el-input placeholder="" type='textarea' v-model="info.topicInfo" :autosize="{ minRows: 4, maxRows: 40}"></el-input>
						</div>
					</li><li>
						<label class="txt">{{pageTxt.label[7]}}</label>
						<div class="rightBox">
							<div class="transfer">
								<el-transfer v-model="keys" filterable :titles="[pageTxt.label[8], pageTxt.label[9]]" 
									@change="handleChange" :data="list" :button-texts="[]" 
									:format="{ noChecked: '${total}',hasChecked: '${checked}/${total}'}">
									<div slot-scope="{option}">
										<span class="itemTxt">{{option.userID}}</span>
										<span class="itemTxt">{{option.userName}}</span>
									</div>
								</el-transfer>
							</div>
						</div>
					</li><li>
						<label class="txt">&nbsp;</label>
						<div class="rightBox">
							<p class="jg"></p>
							<button class="blueBtn" @click="next">{{pageTxt.label[10]}}</button>
							<button class="defBtn" @click="back">{{pageTxt.label[11]}}</button>
							<p class="jg"></p>
						</div>
					</li>
				</ul>
				<!--穿梭框标题-->
				<div id="slotTitle">
					<div class="slotTitle">
						<div class="all">
							<!--<el-checkbox></el-checkbox>-->
						</div>
						<span class="itemTxt">{{pageTxt.list[0]}}</span>
						<span class="itemTxt">{{pageTxt.list[1]}}</span>
					</div>
				</div>
			</el-tab-pane>
			
			
			<el-tab-pane :label="pageTxt.label[12]" name="second">
				<ul class="list">
					<li>
						<label class="txt">{{pageTxt.label[13]}}</label>
						<div class="rightBox box">
							<div class="table">
								<h3 class="h3">{{pageTxt.label[8]}}</h3>
								<el-table highlight-current-row :data="info.canSubsUserList" tooltip-effect="dark">
									<el-table-column width="40">
										<div slot-scope="scope" class="_zero">
											<img @click="addAppid(scope.row)" src="@/img/theme/add_1.png" alt="">
										</div>
									</el-table-column>
									<el-table-column prop="userID" :label="pageTxt.list[0]" show-overflow-tooltip></el-table-column>
									<el-table-column prop="userName" :label="pageTxt.list[1]" show-overflow-tooltip></el-table-column>
								</el-table>
							</div>
							
							<h3 class="h3">{{pageTxt.label[9]}}</h3>
							<el-table id='appid' highlight-current-row :data="info.subsUserList" tooltip-effect="dark">
								<el-table-column width="55">
									<div slot-scope="scope" class="_zero">
										<img @click="delAppid(scope.row)" src="@/img/theme/del_1.png" alt="">
									</div>
								</el-table-column>
								<el-table-column prop="userID" :label="pageTxt.list[0]" show-overflow-tooltip></el-table-column>
								<el-table-column prop="userName" :label="pageTxt.list[1]" show-overflow-tooltip></el-table-column>
								<el-table-column :label="pageTxt.list[2]" width='120'>
									<div slot-scope="scope" class="_zero">
										<input @click="inck(this)" />
									</div>
								</el-table-column>
							</el-table>
						</div>
					</li><li>
						<label class="txt">&nbsp;</label>
						<div class="rightBox">
							<p class="jg"></p>
							<button class="blueBtn" @click="now">{{pageTxt.label[14]}}</button>
							<button class="blueBtn" @click="submit">{{pageTxt.label[10]}}</button>
							<button class="defBtn" @click="back">{{pageTxt.label[11]}}</button>
							<p class="jg"></p>
						</div>
					</li>
				</ul>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import kit       from '@/libs/kit.js';
import utils     from '@/libs/utils.js';
import globalVar from '@/libs/globalVar.js';
import lang      from '@/language/lang.js';
import observer  from '@/libs/observer.js';


	var pageTxt, slotTitle, all = false, _this,
	pageTxt = lang.themeEditTheme;
	
	var list = [];
	for (var i = 0; i < 10; i++) {
		var obj = {
			key:i, userID: 'userID'+kit.randomNum(10,99),
			userName: '用户名'+i, userAppid:'appid'+i
		};
		obj.label = obj.userID + obj.userName;
		list.push(obj);
	}
	
	var data = {
		pageTxt,
		active: 'first',
		info: {topicName:'',pubUserID:'',pubTime:'',topicDescr:'',topicInfo:'',
			canSubsUserList:[],subsUserList:[]},
		list: list,
		keys: [],
	};
	
	export default {
		name: 'message_editTheme',
		data() {
			return data;
		},
		methods: {
			tabsCK(){
				
			},
			handleChange(remain, direction, moved){
//				console.log(remain);
				var list = this.list, len = remain.length,arr=[];
				for (var i = 0; i < len; i++) {
					arr.push(list[remain[i]]);
				}
				this.info.canSubsUserList = arr;
				
//				debugger
				var sub = this.info.subsUserList, id, k,
				len = arr.length, has = [];
				for (i = 0; i < len; i++) {
					id = arr[i].userID;
					for (k = 0; k < sub.length; k++) {
//						console.log(id,sub[k].userID);
						if(id == sub[k].userID){
							has.push(sub[k]);
						}
					}
				}
				this.info.subsUserList = has;
			},
			back(){
				utils.goto('/message/release');
			},
			next(){
				if( isSelectUser() ){
					this.active = 'second';
				} else {
					utils.goto('/message/release');
				}
			},
			addAppid(row){
				console.log(row);
				var obj = {
					userID: row.userID,
					userName: row.userName,
					userAppid: '',
				};
				this.info.subsUserList.unshift(obj);
				
			},
			delAppid(row){
				var sub = this.info.subsUserList, id = row.userID;
				for (var i = 0; i < sub.length; i++) {
					if(sub[i].userID==id) sub.splice(i,1);
					break;
				}
			},
			inck(e){
				console.log(e)
			},
			now(){
				
			},
			submit(){
				
				
			},
		},
		mounted(){
			_this = this;
			this.active = 'first';
			this.keys = [];
			this.info.canSubsUserList = [];
			this.info.subsUserList = [];
			
			useridList();
			slotTitle = kit('#slotTitle').html();
			addTitle();
		},
		watch: {},
		components: {}
	};
	
	function isSelectUser(){
		var sel = _this.info.canSubsUserList, len = sel.length;
//		if(len == _cans.length) return false;
		var i, k, id;
		for (i = 0; i < len; i++) {
			id = sel[i].userID;
			for (k = 0; k < _cans.length; k++) {
				if(id == _cans[k].userID) break;
			}
			if(k==_cans.length) return true 
		}
		return false;
	}
	
	function useridList(){
		list = globalVar.useridList();
		var call = function(master){
			if(master != 'useridReady') return;
			observer.delBinding('useridReady', call);
			list = globalVar.useridList(); call = null;
			getDetail();
		}
		if(list.length > 0) getDetail();
		else observer.addBinding('useridReady', call);
	}
	
	function getDetail(){
		var userid = globalVar.get('userid'),
			param = {
				cmdID: '600043', pubUserID: userid.pubUserID,
				topicName: userid.topicName, type: '0'
			};
		utils.post('mx/pubTopic/query', param, function(data){
			console.log('订阅详情：',data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			var res = data.lists[0];
			_this.info = res;
			_this.info.canSubsUserList = res.canSubsUserList||[],
			_this.info.subsUserList = res.subsUserList||[];
			getKey();
			
/*			info.topicName = res.topicName;
			info.pubUserName = res.pubUserName;
			info.pubUserID = res.pubUserID;
			info.topicDescr = res.topicDescr;
			info.topicInfo = res.topicInfo;
			info.effectiveDays = res.effectiveDays;
			info.pubTime = res.pubTime;
			var subs, can, arr = [], val = [];
			subs = res.subsUserList;
			can = res.canSubsUserList;
			val = [];
			if(subs&&subs.length>0){
				arr = arr.concat(subs);
				info.mid = ''
				for (var i = 0; i < subs.length; i++)
					val.push(i);
			}
			if(can&&can.length>0){
				arr = arr.concat(can);
			} else {}
		
			var obj, temp = [];
			for (i = 0; i < arr.length; i++) {
				obj = arr[i];
				temp.push({
					key:i, userID: obj.userID,
					userName: obj.userName,
					userAppid: obj.userAppid,
					label: obj.userID + obj.userName
				});
			}
			_this.list = temp;
			_this.keys = val;*/
		});
	}
	var _cans = [];
	function cans(){
		var can = _this.info.canSubsUserList, len=can.length;
		for (var i = 0; i < len; i++)
			_cans.push(can[i]);
	}
	function getKey(){
		var i, len = list.length, obj, key=[],
			can = _this.info.canSubsUserList;
			cans();
		
		for (i = 0; i < len; i++) {
			obj = list[i];
			obj.key = i;
			obj.label = obj.userID + obj.userName;
			for (var k = 0; i < can.length; k++) {
				if(can[k].userID==obj.userID){
					key.push(i);
					break;
				}
			}
		}
		_this.list = list;
		_this.keys = key;
	}
	
	function addTitle(){
		kit('.editTheme .el-checkbox-group').each(function(el){
			var parent = el.parentNode;
			parent.insertBefore(kit(slotTitle)[0], el);
		});
//		kit('.editTheme .el-transfer-panel').each(function(el, i){
//			el.className += ' wrap';
//			if(i==3) el.className += '1';
//		});
	}
</script>

<style scoped="scoped">
	.el-tabs {min-width: 1000px;}
	.h2{width: 1020px;font-size: 16px;color: #666;line-height: 50px;height: 50px;border-bottom: 1px solid #D8D8D8;margin-bottom: 40px;padding-left: 20px;}
	.list li{margin-bottom: 10px;}
	.txt,.txt1{display: inline-block;font-size: 14px;line-height: 30px;width: 160px;vertical-align: top;text-align: right;padding-right: 10px;}
	.txt1{text-align: left;width: auto;}
	.rightBox{vertical-align: top;display: inline-block;}
	.rightBox .el-input{width: 255px;}
	.rightBox .el-textarea{width: 835px;}
	.blueBtn{margin-right: 40px;}
	.jg{padding-bottom: 30px;}
	
	.transfer{text-align: center;}
	.el-transfer{text-align: left; display: inline-block;}
	.itemTxt,.itxt{display: inline-block;font-size: 13px;line-height: 40px;color: #666;vertical-align: middle;}
	#slotTitle{display: none;}
	.slotTitle{background: #F6F6F6;border: 1px solid #D8D8D8;border-width: 1px 0;}
	.all{font-size: 14px;width: 36px;display: inline-block;padding-left: 15px;pointer-events: none;}
	.hide{display: none;}
	.itemTxt{width: 150px;}
	
	.box{white-space: nowrap;}
	.box > *{display: inline-block;vertical-align: top;}
	.box .el-table{width: 370px;margin-right: 40px;}
	.h3{font-size: 14px;color: #909399;}
</style>
<style>
	.editTheme .el-tabs__item{color: #5a6e93;}
	.editTheme .el-tabs__header{margin-left: 40px;}
	.editTheme .el-tabs__item.is-active{color: #32ccf9;}
</style>