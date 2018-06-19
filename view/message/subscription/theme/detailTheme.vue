<template>
	<div class="detailTheme">
		<h2 class="h2">{{pageTxt.label[0]}}</h2>
		<ul class="list">
			<li>
				<label class="txt">{{pageTxt.label[1]}}</label>
				<div class="rightBox">
					<span v-model="info.topicName" class="txt1"></span>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[7]}}</label>
				<div class="rightBox">
					<span v-model="info.pubUserID" class="txt1"></span>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[2]}}</label>
				<div class="rightBox">
					<span v-model="info.topicDescr" class="txt1"></span>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[3]}}</label>
				<div class="rightBox">
					<p v-model="info.topicInfo" class="txt2"></p>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[4]}}</label>
				<div class="rightBox">
					<!--<p class="txt1">{{pageTxt.label[5]}}</p>-->
					<div class="transfer">
						<el-transfer style="text-align: left; display: inline-block" v-model="value" filterable :titles="[pageTxt.label[9], pageTxt.label[10]]"  @change="handleChange" :data="list"
							:button-texts="[]" :format="{ noChecked: '${total}',hasChecked: '${checked}/${total}'}">
							<div slot-scope="{option}">
								<span class="itemTxt">{{option.userID}}</span>
								<span class="itemTxt">{{option.userName}}</span>
								<span class="itemTxt hide">{{option.subUserppid}}</span>
							</div>
						</el-transfer>
					</div>
				</div>
			</li><li>
				<label class="txt">&nbsp;</label>
				<div class="rightBox">
					<el-button @click="back" class='back'>返 回</el-button>
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
				<span class="itemTxt hide">{{pageTxt.list[2]}}</span>
			</div>
		</div>
	</div>
</template>

<script>
import kit       from '@/libs/kit.js';
import utils     from '@/libs/utils.js';
import globalVar from '@/libs/globalVar.js';
import observer  from '@/libs/observer.js';


	var lang = {}, pageTxt, slotTitle, backPage;
	lang.cn = {
		tips: {},
		label: ['主题详情','主题名称：','主题描述：','主题内容：','接收方：','可订阅用户','已订阅用户','发布者ID：'],
		list: ['用户ID','用户名','appid']
	};
	lang.en = {};
	pageTxt = lang[globalVar.get('lang')];
	
	var list = [];
	for (var i = 0; i < 10; i++) {
		var obj = {
			key:i, userID: 'userID'+kit.randomNum(10,99),
			userName: '用户名'+i, subUserppid:'appid'+i
		};
		obj.label = obj.userID + obj.userName;
		list.push(obj);
	}
	
	var data = {
		pageTxt,
		data: false,
		info: {topicName:'',pubUserID:'',topicDescr:'',topicInfo:''},
		list: list,
		value: [],
	};
	
	export default {
		name: 'message_detailTheme',
		data() {
			return data;
		},
		methods: {
			handleChange(remain, direction, moved){
				if(direction == 'right'){
					
				} else {
					
				}
			},
			back(){
				
				this.$router.replace({ path: "/message/release" });
			},
			
		},
		beforeCreate(){
			_this = this;
			backPage = this.$route.params.id;
		},
		mounted(){
			getDetail();
			slotTitle = kit('#slotTitle').html();
			useridList();
			addTitle();
		},
		watch: {},
		components: {}
	};
	var idList = [];
	function useridList(){
		idList = globalVar.useridList();
		var call = function(master){
			if(master != 'useridReady') return;
			observer.delBinding('useridReady', call);
			idList = globalVar.useridList(); call = null;
		}
		if(!idList.length) observer.addBinding('useridReady', call);
	}
	function addTitle(){
		kit('.detailTheme .el-checkbox-group').each(function(el){
			var parent = el.parentNode;
			parent.insertBefore(kit(slotTitle)[0], el);
		});
		kit('.detailTheme .el-transfer-panel').each(function(el, i){
			el.className += ' wrap' + i
		});
//		kit('.detailTheme .transfer .el-transfer__buttons').css('visibility','hidden');
//		kit('.detailTheme .transfer .el-checkbox__input').css('display','none');
	}
	var _this;
	function getDetail(){
		var userid = globalVar.get('userid'),
			param = {
				cmdID: '600043', pubUserID: userid.pubUserID,
				topicName: userid.topicName, type: '0'
			};
		utils.post('mx/pubTopic/query', param, function(data){
			console.log('订阅详情：',data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			var res = data.lists[0],  info = _this.info, subs, arr = [];
			info.topicName = res.topicName;
			info.pubUserName = res.pubUserName;
			info.pubUserID = res.pubUserID;
			info.topicDescr = res.topicDescr;
			info.topicInfo = res.topicInfo;
			info.effectiveDays = res.effectiveDays;
			info.pubTime = res.pubTime;
			subs = res.subsUserList;
			if(!subs||subs.length==0)return;
			_this.list = subs.concat(data.canSubUserID);
			for (var i = 0; i < subs.length; i++) {
				arr.push(i);
			}
			_this.value = arr;
		});
	}
</script>

<style scoped="scoped">
	.list li{margin-bottom: 10px;}
	.h2{width: 1020px;font-size: 16px;color: #666;line-height: 50px;height: 50px;border-bottom: 1px solid #D8D8D8;margin-bottom: 40px;padding-left: 20px;}
	.txt,.txt1,.txt2{display: inline-block;font-size: 14px;line-height: 30px;width: 160px;vertical-align: top;text-align: right;padding-right: 10px;}
	.txt1,.txt2{text-align: left;width: auto;}
	.txt2{line-height: 20px;white-space: normal;max-width: 800px;}
	.rightBox{vertical-align: top;display: inline-block;}
	.rightBox .el-input{width: 255px;}
	.rightBox .el-textarea{width: 835px;}
	
	/*.tableWrap{width: 370px;display: inline-block;vertical-align: top;max-height: 400px;overflow-y: auto;}
	.tableWrap:first-child{margin-right: 40px;}*/
	
	.back{margin-top: 30px;}
	
	.transfer{text-align: center;}
	.itemTxt{display: inline-block;font-size: 13px;line-height: 40px;color: #666;vertical-align: middle;}
	#slotTitle{display: none;}
	.slotTitle{background: #F6F6F6;border: 1px solid #D8D8D8;border-width: 1px 0;}
	.all{font-size: 14px;width: 36px;display: inline-block;padding-left: 15px;pointer-events: none;}
	.hide{display: none;}
	.transfer .wrap0 .itemTxt{width: 150px;}
	.transfer .wrap1 .itemTxt{width: 100px;}
	.transfer .wrap1 .hide{display: inline-block;}
</style>
