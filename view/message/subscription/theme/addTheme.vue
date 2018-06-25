<template>
	<div class="addTheme">
		<h2 class="h2">{{pageTxt.label[0]}}</h2>
		<ul class="list">
			<li>
				<label class="txt">{{pageTxt.label[1]}}</label>
				<div class="rightBox">
					<el-input placeholder="" v-model="info.topicName" ></el-input>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[2]}}</label>
				<div class="rightBox">
					<!--<el-input placeholder="" v-model="info.pubUserID" clearable></el-input>-->
					<el-autocomplete @blur='blur' @input='autoInput' class="autocomplete" v-model="idName" 
						:fetch-suggestions="fetch" @select="idSelect" :trigger-on-focus="false">
						<div slot-scope="{item}">
							<span class="name">{{item.userID}}</span>
						    <span class="addr">({{item.userName}})</span>
						</div>
					</el-autocomplete>
				</div>
			</li>
			<!--<li>
				<label class="txt">{{pageTxt.label[3]}}</label>
				<div class="rightBox">
					<el-input placeholder="" v-model="info.pubUserName" clearable></el-input>
				</div>
			</li>-->
			<li>
				<label class="txt">{{pageTxt.label[4]}}</label>
				<div class="rightBox">
					<el-input placeholder="" v-model="info.topicDescr" ></el-input>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[5]}}</label>
				<div class="rightBox">
					<el-input placeholder="" type='textarea' v-model="info.topicInfo" :autosize="{ minRows: 4, maxRows: 40}"></el-input>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[6]}}</label>
				<div class="rightBox">
					<el-input  type="number" placeholder="" v-model="info.effectiveDays" ></el-input>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[7]}}</label>
				<div class="rightBox">
					<div class="transfer">
						<el-transfer v-model="keys" filterable :left-default-checked="allLeft"
							:right-default-checked="allRight" :titles="[pageTxt.label[9], pageTxt.label[10]]"  @change="handleChange" :data="list"
							:button-texts="[]" :format="{ noChecked: '${total}',hasChecked: '${checked}/${total}'}"
							@left-check-change='leftCheck' @right-check-change='rightCheck'>
							<div slot-scope="{option}">
								<span class="itemTxt">{{option.userID}}</span>
								<span class="itemTxt">{{option.userName}}</span>
							</div>
						</el-transfer>
					</div>
				</div>
			</li>
			<!--<li>
				<label class="txt">{{pageTxt.label[8]}}</label>
				<div class="rightBox">
					<el-input placeholder="" v-model="info.operator" ></el-input>
				</div>
			</li>-->
			<li>
				<label class="txt">&nbsp;</label>
				<div class="rightBox">
					<p class="jg"></p>
					<el-button type="primary" @click="submit">{{pageTxt.label[11]}}</el-button>
					<el-button @click="back">{{pageTxt.label[12]}}</el-button>
					<p class="jg"></p>
				</div>
			</li>
		</ul>
		<!--穿梭框标题-->
		<div id="slotTitle">
			<div class="slotTitle">
				<div id="all" class="all">
					<!--<el-checkbox></el-checkbox>-->
				</div>
				<span class="itemTxt">{{pageTxt.list[0]}}</span>
				<span class="itemTxt">{{pageTxt.list[1]}}</span>
			</div>
		</div>
	</div>
</template>

<script>
import kit       from '@/libs/kit.js';
import utils     from '@/libs/utils.js';
import lang      from '@/language/lang.js';
import globalVar from '@/libs/globalVar.js';
import observer  from '@/libs/observer.js';


	var pageTxt, _this, slotTitle, idList = [], autoTime, isInput=false;
	pageTxt = lang.themeAddTheme;
	
	var list = [];
	for (var i = 0; i < 10; i++) {
		var obj = {
			key:i, userID: 'userID'+kit.randomNum(10,99),
			userName: '用户名'+i
		};
		obj.label = obj.userID + obj.userName;
//		list.push(obj);
	}
	
	var data = {
		pageTxt,
		idName: '',
		info: {
			operator:'admin', topicName:'主题名称', pubUserID:'发布者ID', pubUserName:'发布者名称',
			topicDescr:'主题描述',topicInfo:'主题内容', effectiveDays: '7', canSubsUserList:[]
		},
		list: list,
		keys: [],
		allLeft: [],
		allRight: []
	};
	var submitList = [];
	
//	observer.addBinding('messAddTheme', function(master, param){
//		if(master != 'messAddTheme') return;
//		data.sync = param.sync;
//	});
	
	function autoInput(str, cb){
		if(!str) return;
//		console.time('请求用户ID...');
		utils.getUserid(str, function(data){
			var i,len = data.length,tem=[];
			for (i = 0; i < len; i++) {
				if(data[i].label.indexOf(str)!=-1) tem.push(data[i]);
			}
			cb(tem);
		});
	}
	
	export default {
		name: 'message_addTheme',
		data() {
			return data;
		},
		methods: {
			fetch(str, cb){
				clearTimeout(autoTime);
				autoTime = setTimeout(autoInput, 300, str, cb);
			},
			idSelect(item){
				isInput = false;
				this.info.pubUserID = item.userID;
				this.idName = item.userID+'('+item.userName+')';
				blurID(item.userID);
			},
			autoInput(){
				isInput = true;
			},
			blur(){
//				console.log(isInput,this.info.pubUserID)
				if(isInput) blurID(this.idName);
			},
			handleChange(remain, direction, moved){
//				kit('.slotTitle').each(function(el){
//					el.check = true;
//				}).trigger('click');
//				console.log(remain, moved);
				submitList = remain;
			},
			leftCheck(arr, i){
				return;
				var curLen = arr.length, remainLen = submitList.length,
					listLen = this.list.length, el = kit('.addTheme .slotTitle').eq(0);
				console.log(curLen, remainLen, listLen);
				el[0].check = false;
				if(listLen - remainLen == curLen){
					el.trigger('click');
				} else {
					el.find('.el-checkbox__input')[0].className ='el-checkbox__input';
				}
			},
			rightCheck(arr, i){},
			submit(e){
//				if(submitList.length==0) return;
				//[{"userID":"24","userName":"2"},{"userID":"4","userName":"4"}]
				var i, ind, tem = [], info = this.info;
				for (i = 0; i < submitList.length; i++) {
					ind = submitList[i];
					tem.push(this.list[ind]);
				}
				utils.hints({
					txt:'是否要提交！',
					yes: function(){
						info.canSubsUserList = tem;
						info.cmdID = '600045';
						utils.post('mx/pubTopic/add', info, function(data){
							console.log('增加主题：',data);
							if(data.errcode < 0) return utils.weakTips(data.errinfo);
							utils.weakTips(data.errinfo);
							_this.$router.replace({ path: "/message/release" });
		//					_this.list = data.lists;
						});
					}
				});
				
			},
			back(){
				this.$router.replace({ path: "/message/release" });
			}
		},
		mounted(){
			_this = this;
			slotTitle = kit('.addTheme #slotTitle').html();
			var info = this.info;
			for(var k in info) info[k] = '';
			info.canSubsUserList = [];
			this.keys = [];
//			useridList();
			addTitle();
			kit('.el-autocomplete-suggestion').off().down(function(){
				isInput = false;
			}).up(function(){isInput = true;});
		},
		watch: {},
		components: {}
	};
	
	function useridList(){
		_this.list = globalVar.useridList();
		var call = function(master){
			if(master != 'useridReady') return;
			observer.delBinding('useridReady', call);
			_this.list = globalVar.useridList(); call = null;
		}
		if(!_this.list.length) observer.addBinding('useridReady', call);
	}
	
	function blurID(id){
//		var id = isInput ? _this.idName : _this.info.pubUserID;
		var param = {
			url: 'mx/userComm/querySpcificUser',
			cmdID: '600035',
			userID: id
		};
		utils.post(param, function(data){
//			console.log('通信关系用户：', data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			var arr = data.lists, i, len = arr.length, obj;
			for (var i = 0; i < len; i++) {
				obj = arr[i];
				if(obj.userID){
					obj.key = i;
					obj.label = obj.userID + obj.userName;
				} else {
					arr.splice(i, 1);
					--i;
				}
			}
			_this.keys = [];
			_this.list = arr;
		});
	}
	
	function addTitle(){
		kit('.addTheme .el-checkbox-group').each(function(el, i){
			el.className += ' _transfer_group_' + i;
			var parent = el.parentNode;
			var tiel = kit(slotTitle).click(ck);
			parent.insertBefore(tiel[0], el);
			var checkBox = tiel.find('.el-checkbox__input');
			tiel = tiel[0];
			tiel.index = i;
			tiel.check = false;
			
			
			function ck(e){
				return;
//				e.stopImmediatePropagation();
//				e.preventDefault();
//				var qq=document.querySelector('.addTheme .el-checkbox-group .el-checkbox__original');
				console.log(_this);
				tiel.check = !tiel.check;
//				debugger;
				if(tiel.check){
					var len = _this.list.length, temp = [];
					for (var i = 0; i < len; i++) temp.push(i);
					if(tiel.index == 0){
						_this.allLeft = temp;
					} else {
						_this.allRight = temp;
					}
					checkBox[0].className ='el-checkbox__input is-checked';
				} else {
					if(tiel.index == 0){
						_this.allLeft = [];
					} else {
						_this.allRight = [];
					}
					checkBox[0].className ='el-checkbox__input';
				}
			}
		});
//		kit('.transfer .el-transfer-panel__header .el-checkbox__input').detach();
//		kit('.el-transfer-panel__header .el-checkbox__original').css('display','none');
	}
			
</script>

<style scoped="scoped">
	.addTheme{min-width: 1016px;}
	.h2{font-size: 16px;color: #666;line-height: 50px;height: 50px;border-bottom: 1px solid #D8D8D8;margin-bottom: 40px;padding-left: 20px;}
	.list li{margin-bottom: 10px;}
	.txt{display: inline-block;font-size: 14px;line-height: 30px;width: 160px;vertical-align: top;text-align: right;padding-right: 10px;}
	.rightBox{vertical-align: top;display: inline-block;}
	.rightBox .el-input{width: 255px;}
	.rightBox .el-textarea{width: 835px;}
	.jg{padding-bottom: 30px;}
	.autocomplete{width: 255px;}
	
	.transfer{text-align: center;}
	.el-transfer{text-align: left; display: inline-block;}
	.itemTxt{display: inline-block;width: 150px;font-size: 13px;line-height: 40px;color: #666;vertical-align: middle;}
	#slotTitle{display: none;}
	.slotTitle{background: #F6F6F6;border: 1px solid #D8D8D8;border-width: 1px 0;}
	.all{font-size: 14px;width: 36px;display: inline-block;padding-left: 15px;pointer-events: none;}
</style>
