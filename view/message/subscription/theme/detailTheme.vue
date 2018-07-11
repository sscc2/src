<template>
	<div class="detailTheme">
		<h2 class="h2">
			<em @click="back">
				<img class="icon" src="@/img/ico.png" />
				<span class="topBack">{{pageTxt.label[8]}}</span>
			</em>
			<span class="span">{{pageTxt.label[0]}}</span>
		</h2>
		<ul class="list">
			<li>
				<label class="txt">{{pageTxt.label[1]}}</label>
				<div class="rightBox">
					<span class="txt1">{{info.topicName}}</span>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[7]}}</label>
				<div class="rightBox">
					<span class="txt1">{{info.pubUserID}}</span>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[2]}}</label>
				<div class="rightBox">
					<span class="txt1">{{info.topicDescr}}</span>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[3]}}</label>
				<div class="rightBox">
					<p class="txt2">{{info.topicInfo}}</p>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[4]}}</label>
				<div class="rightBox">
					<!--<p class="txt1">{{pageTxt.label[5]}}</p>-->
					<div class="transfer">
						<el-transfer v-model="keys" filterable :titles="[pageTxt.label[5], pageTxt.label[6]]"  @change="handleChange" :data="list"
							:button-texts="[]" :format="{ noChecked: '${total}',hasChecked: '${checked}/${total}'}">
							<div slot-scope="{option}">
								<span class="itemTxt">{{option.userID}}</span>
								<span class="itemTxt">{{option.userName}}</span>
								<span class="itemTxt hide">{{option.userAppid}}</span>
							</div>
						</el-transfer>
					</div>
				</div>
			</li><li>
				<label class="txt">&nbsp;</label>
				<div class="rightBox">
					<button class="defBtn" @click="back">{{pageTxt.label[8]}}</button>
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
				<span class="itemTxt hide">{{pageTxt.list[2]}}</span>
			</div>
		</div>
	</div>
</template>

<script>
import kit       from '@/libs/kit.js';
import utils     from '@/libs/utils.js';
import globalVar from '@/libs/globalVar.js';
import lang      from '@/language/lang.js';


	var pageTxt, slotTitle, backPage;
	pageTxt = lang.themeDetailTheme;
	
	var list = [];
	/*for (var i = 0; i < 10; i++) {
		var obj = {
			key:i, userID: 'userID'+kit.randomNum(10,99),
			userName: '用户名'+i, subUserppid:'appid'+i
		};
		obj.label = obj.userID + obj.userName;
		list.push(obj);
	}*/
	
	var data = {
		pageTxt,
		info: {topicName:'',pubUserID:'',topicDescr:'',topicInfo:''},
		list: list,
		keys: [],
	};
	
	export default {
		name: 'message_detailTheme',
		data() {
			return data;
		},
		methods: {
			handleChange(remain, direction, moved){
//				console.log(remain);
//				console.log(this.keys);
			},
			back(){
				utils.goto('/message/' + utils.route().id);
			},
			
		},
		beforeCreate(){
			_this = this;
			backPage = this.$route.params.id;
		},
		mounted(){
			getDetail();
			slotTitle = kit('#slotTitle').html();
			addTitle();
		}
	};
	function addTitle(){
		kit('.detailTheme .el-checkbox-group').each(function(el){
			var parent = el.parentNode;
			parent.insertBefore(kit(slotTitle)[0], el);
		});
		kit('.detailTheme .el-transfer-panel').each(function(el, i){
			el.className += ' wrap' + i;
		});
//		kit('.detailTheme .transfer .el-transfer__buttons').css('visibility','hidden');
//		kit('.detailTheme .transfer .el-checkbox__input').css('display','none');
	}
	var _this;
	function getDetail(){
		var userid = globalVar.get('userid');
		if(!userid) return;
		var	param = {
				cmdID: '600043', pubUserID: userid.pubUserID,
				topicName: userid.topicName, type: '0'
			};
		utils.post('mx/pubTopic/query', param, function(data){
//			console.log('订阅详情：',data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			var res = data.lists[0],  info = _this.info;
			info.topicName = res.topicName;
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
				for (var i = 0; i < subs.length; i++)
					val.push(i);
			}
			if(can&&can.length>0) arr = arr.concat(can);
		
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
			_this.keys = val;
		});
	}
</script>

<style scoped="scoped">
	.h2{width: 1020px;border-bottom: 1px solid #D8D8D8;margin-bottom: 40px;padding-left: 20px;}
	.h2 *{vertical-align: middle;}
	.h2 em{cursor: pointer;}
	.h2 .icon{margin-right: 6px;}
	.h2 .topBack{font-size: 13px;color: #5a719d;line-height: 32px;height: 32px;padding-right: 20px;
		border-right: 1px solid #edeef0;}
	.h2 .span{font-size: 16px;color: #666;line-height: 50px;height: 50px;padding-left: 20px;font-weight: bold;}
	.list li{margin-bottom: 10px;}
	.txt,.txt1,.txt2{display: inline-block;font-size: 14px;line-height: 30px;width: 160px;vertical-align: top;text-align: right;padding-right: 10px;}
	.txt1,.txt2{text-align: left;width: auto;}
	.txt2{line-height: 20px;white-space: normal;max-width: 800px;padding: 5px 0;}
	.rightBox{vertical-align: top;display: inline-block;}
	.rightBox .el-input{width: 255px;}
	.rightBox .el-textarea{width: 835px;}
	
	/*.tableWrap{width: 370px;display: inline-block;vertical-align: top;max-height: 400px;overflow-y: auto;}
	.tableWrap:first-child{margin-right: 40px;}*/
	
	.defBtn{margin-top: 30px;}
	
	.transfer{text-align: center;}
	.el-transfer{text-align: left; display: inline-block;}
	.itemTxt{display: inline-block;font-size: 13px;line-height: 40px;color: #666;vertical-align: middle;}
	#slotTitle{display: none;}
	.slotTitle{background: #F6F6F6;border: 1px solid #D8D8D8;border-width: 1px 0;}
	.all{font-size: 14px;width: 36px;display: inline-block;padding-left: 15px;pointer-events: none;}
	.hide{display: none;}
	.transfer .wrap0 .itemTxt{width: 150px;}
	.transfer .wrap1 .itemTxt{width: 100px;}
	.transfer .wrap1 .hide{display: inline-block;}
</style>
<style>
	.detailTheme .transfer .el-checkbox__input{display: none;}
	.detailTheme .el-transfer__buttons button{display: none;}
</style>