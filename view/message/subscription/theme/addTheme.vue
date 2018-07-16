<template>
	<div class="addTheme">
		<h2 class="h2">
			<em @click="back">
				<img class="icon" src="@/img/ico.png" />
				<span class="topBack">{{pageTxt.label[13]}}</span>
			</em>
			<span class="span">{{pageTxt.label[0]}}</span>
		</h2>
		<ul class="list">
			<li>
				<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[1]}}</label>
				<div class="rightBox">
					<el-input :placeholder="pageTxt.must" v-model="info.topicName" ></el-input>
				</div>
			</li><li>
				<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[2]}}</label>
				<div class="rightBox">
					<!--<el-input placeholder="" v-model="info.pubUserID" clearable></el-input>-->
					<el-autocomplete @blur='blur' @input='autoInput' class="autocomplete" v-model="idName" 
						:fetch-suggestions="fetch" @select="idSelect" :trigger-on-focus="false" :placeholder="pageTxt.must">
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
				<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[4]}}</label>
				<div class="rightBox">
					<el-input :placeholder="pageTxt.must" v-model="info.topicDescr" ></el-input>
				</div>
			</li><li>
				<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[5]}}</label>
				<div class="rightBox">
					<el-input :placeholder="pageTxt.must" type='textarea' v-model="info.topicInfo" :autosize="{ minRows: 4, maxRows: 40}"></el-input>
				</div>
			</li><li>
				<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[6]}}</label>
				<div class="rightBox">
					<el-input @input='number($event)' :placeholder="pageTxt.must" v-model="info.effectiveDays" ></el-input>
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
					<button class="blueBtn" @click="now">{{pageTxt.label[11]}}</button>
					<button class="blueBtn" @click="send">{{pageTxt.label[12]}}</button>
					<button class="defBtn" @click="back">{{pageTxt.label[13]}}</button>
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


	var pageTxt, _this, slotTitle, autoTime, isInput=false;
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
			topicDescr:'主题描述',topicInfo:'主题内容', effectiveDays: '7', canSubsUserList:[],
			reviewer: ''
		},
		list: list,
		keys: [],
		allLeft: [],
		allRight: []
	};
	var submitList = [];
	
	
	function autoInput(str, cb){
		if(!str) return;
//		console.time('请求用户ID...');
		utils.getUserid({id:str, type:2}, function(data){
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
//				this.info.pubUserID = item.userID;
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
				submitList = remain;
			},
			leftCheck(arr, i){},
			rightCheck(arr, i){},
			send(e){ submit('send'); },
			now(){ submit('now'); },
			back(){ utils.goto('/message/release'); },
			number(s){
				setTimeout(function(){
					var reg = /[^0123456789]/ig;
					_this.info.effectiveDays = s.replace(reg,'');
				}, 0);
			}
		},
		mounted(){
			_this = this;
			slotTitle = kit('.addTheme #slotTitle').html();
			var info = this.info;
			for(var k in info) info[k] = '';
			this.idName = '';
			info.canSubsUserList = [];
			this.keys = [];
			addTitle();
			kit('.el-autocomplete-suggestion').off().down(function(){
				isInput = false;
			}).up(function(){isInput = true;});
		}
	};
	
	function blurID(id){
//		var id = isInput ? _this.idName : _this.info.pubUserID;
		if(!id) return;
		var param = {
			url: 'mx/userinfo/queryLists', //mx/userComm/querySpcificUser  mx/userinfo/queryLists
			cmdID: '600001', //600035  600001
			userID: '',
			type: 2,
			pageSize: 10000,
        	currentPage: 1,
        	userName: ''
		};
		_this.info.pubUserID = id;
		utils.post(param, function(data){
//			console.log('通信关系用户：', data);
			if(data.errcode < 0){
				_this.list = [];
				return console.log(data.errinfo);
			}
			var arr = data.lists, i, len = arr.length, obj;
			for (var i = 0; i < len; i++) {
				obj = arr[i];
				if(obj.userID&&obj.userID != id){
					obj.key = i;
					obj.label = obj.userID + obj.userName;
				} else {
					arr.splice(i, 1);
					--i;
					len = arr.length;
				}
			}
			_this.keys = [];
			_this.list = arr;
		});
	}
	
	function submit(sub){
		var must = ['topicName', 'topicDescr', 'topicInfo', 'effectiveDays'],
			tips = pageTxt.tips;
		var i, ind, tem = [], info = _this.info;
		if(!_this.idName) return utils.weakTips(tips.pubUserID);
		for (i = 0; i < must.length; i++) {
			var str = must[i];
			if(!info[str]) return utils.weakTips(tips[str]);
		}
		//[{"userID":"24","userName":"2"},{"userID":"4","userName":"4"}]
		for (i = 0; i < submitList.length; i++) {
			ind = submitList[i];
			tem.push(_this.list[ind]);
		}
		info.canSubsUserList = tem;
		if(sub == 'send'){
			utils.hints({
				txt: pageTxt.tips.send,
				yes: function(){
					info.cmdID = '600045';
					info.operator = 'admin';
					utils.post('mx/pubTopic/add', info, function(data){
//						console.log('增加主题：',data);
						if(data.errcode < 0) return utils.weakTips(data.errinfo);
						utils.weakTips(data.errinfo);
						utils.goto('/message/release');
					});
				}
			});
		} else {
			utils.review({ //审核
				yes: function(args){
					utils.hints({
						txt: pageTxt.tips.now,
						yes: function(){
							info.cmdID = '600047';
							info.reviewer = args.name;
							utils.post('mx/pubTopic/addImmediately', info, function(data){
//								console.log('立即增加主题：',data);
								if(data.errcode < 0) return utils.weakTips(data.errinfo);
//								utils.weakTips(data.errinfo);
								utils.wheelReq(data); //轮循
								utils.goto('/message/release');
							});
						}
					});
				}
			});
		}
	}
	
	function addTitle(){
		kit('.addTheme .el-checkbox-group').each(function(el, i){
			el.className += ' _transfer_group_' + i;
			var parent = el.parentNode;
			var tiel = kit(slotTitle);
			parent.insertBefore(tiel[0], el);
		});
//		kit('.transfer .el-transfer-panel__header .el-checkbox__input').detach();
//		kit('.el-transfer-panel__header .el-checkbox__original').css('display','none');
	
	}
			
</script>

<style scoped="scoped">
	.addTheme{min-width: 1016px; color: #666}
	.h2{border-bottom: 1px solid #D8D8D8;margin-bottom: 40px;padding-left: 20px;}
	.h2 *{vertical-align: middle;}
	.h2 em{cursor: pointer;}
	.h2 .icon{margin-right: 6px;}
	.h2 .topBack{font-size: 13px;color: #5a719d;line-height: 32px;height: 32px;padding-right: 20px;
		border-right: 1px solid #edeef0;}
	.h2 .span{font-size: 16px;color: #666;line-height: 50px;height: 50px;padding-left: 20px;font-weight: bold;}
	.list li{margin-bottom: 10px;}
	.txt{display: inline-block;font-size: 14px;line-height: 30px;width: 160px;vertical-align: top;text-align: right;padding-right: 10px;}
	.red{color: #F00;line-height: 1;vertical-align: text-bottom;}
	.rightBox{vertical-align: top;display: inline-block;}
	.rightBox .el-input{width: 255px;}
	.rightBox .el-textarea{width: 835px;}
	.blueBtn{margin-right: 40px;}
	.jg{padding-bottom: 30px;}
	.autocomplete{width: 255px;}
	
	.transfer{text-align: center;}
	.el-transfer{text-align: left; display: inline-block;}
	.itemTxt{display: inline-block;width: 150px;font-size: 13px;line-height: 40px;color: #666;vertical-align: middle;}
	#slotTitle{display: none;}
	.slotTitle{background: #F6F6F6;border: 1px solid #D8D8D8;border-width: 1px 0;}
	.all{font-size: 14px;width: 36px;display: inline-block;padding-left: 15px;pointer-events: none;}
</style>
