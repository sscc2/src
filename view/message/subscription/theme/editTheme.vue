<template>
	<div class="editTheme">
		<h2 class="h2">{{pageTxt.label[0]}}</h2>
		<ul class="list">
			<li>
				<label class="txt">{{pageTxt.label[1]}}</label>
				<div class="rightBox">
					<el-input placeholder="" v-model="info1.topicName" clearable></el-input>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[2]}}</label>
				<div class="rightBox">
					<el-input placeholder="" v-model="info1.pubUserID" clearable></el-input>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[3]}}</label>
				<div class="rightBox">
					<el-input placeholder="" v-model="info1.pubTime" clearable></el-input>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[4]}}</label>
				<div class="rightBox">
					<el-input placeholder="" v-model="info1.describe" clearable></el-input>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[5]}}</label>
				<div class="rightBox">
					<el-input placeholder="" type='textarea' v-model="info1.content" :autosize="{ minRows: 4, maxRows: 40}"></el-input>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[6]}}</label>
				<div class="rightBox">
					<!--<el-transfer :filter-method="filterMethod" v-model="value" :data="list"
						filterable filter-placeholder="请输入关键字">
					</el-transfer>-->
					<div class="transfer">
						<el-transfer style="text-align: left; display: inline-block" v-model="keys1" filterable :left-default-checked="[]"
							:right-default-checked="[]" :titles="[pageTxt.label[7], pageTxt.label[8]]"  @change="handleChange" :data="list1"
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
					<p class="jg"></p>
					<el-button abc='abc' type="primary" @click="next">{{pageTxt.label[9]}}</el-button>
					<el-button @click="back">{{pageTxt.label[10]}}</el-button>
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
import observer  from '@/libs/observer.js';


	var pageTxt, slotTitle;
	pageTxt = lang.themeEditTheme;
	
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
		info1: {topicName:'',pubUserID:'',pubTime:'',topicDescr:'',topicInfo:''},
		list1: list,
		keys1: [],
	};
	
	export default {
		name: 'message_editTheme',
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
				utils.goto('/message/release');
			},
			next(){
				
			},
		},
		mounted(){
			slotTitle = kit('#slotTitle').html();
			addTitle();
			var info1 = this.info1, info = globalVar.get('userid');
			info1.topicName = info.topicName;
			info1.pubUserID = info.pubUserID;
			info1.pubTime = info.pubTime;
		},
		watch: {},
		components: {}
	};
	
	function addTitle(){
		kit('.editTheme .el-checkbox-group').each(function(el){
			var parent = el.parentNode;
			parent.insertBefore(kit(slotTitle)[0], el);
		});
		kit('.editTheme .el-transfer-panel').each(function(el, i){
			el.className += ' wrap' + i;
		});
	}
</script>

<style scoped="scoped">
	.h2{width: 1020px;font-size: 16px;color: #666;line-height: 50px;height: 50px;border-bottom: 1px solid #D8D8D8;margin-bottom: 40px;padding-left: 20px;}
	.list li{margin-bottom: 10px;}
	.txt{display: inline-block;font-size: 14px;line-height: 30px;width: 160px;vertical-align: top;text-align: right;padding-right: 10px;}
	.rightBox{vertical-align: top;display: inline-block;}
	.rightBox .el-input{width: 255px;}
	.rightBox .el-textarea{width: 835px;}
	.jg{padding-bottom: 30px;}
	
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
