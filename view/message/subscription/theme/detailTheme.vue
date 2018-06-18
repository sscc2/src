<template>
	<div class="detailTheme">
		<h2 class="h2">{{pageTxt.label[0]}}</h2>
		<ul class="list">
			<li>
				<label class="txt">{{pageTxt.label[1]}}</label>
				<div class="rightBox">
					<el-input :disabled='disabled' placeholder="" v-model="info.name" clearable></el-input>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[2]}}</label>
				<div class="rightBox">
					<el-input :disabled='disabled' placeholder="" v-model="info.man" clearable></el-input>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[3]}}</label>
				<div class="rightBox">
					<el-input placeholder="" type='textarea' v-model="info.content" :autosize="{ minRows: 4, maxRows: 40}"></el-input>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[4]}}</label>
				<div class="rightBox">
					<!--<p class="txt1">{{pageTxt.label[5]}}</p>-->
					<div class="tableWrap">
						<el-table class='table' ref="multipleTable" :data="list" border tooltip-effect="dark">
							<el-table-column type="index" width="55"></el-table-column>
							<!--<el-table-column type="selection" width="55"></el-table-column>-->
							<el-table-column prop="id" label="用户ID" show-overflow-tooltip></el-table-column>
							<el-table-column prop="name" label="用户名" show-overflow-tooltip></el-table-column>
						</el-table>
					</div><div class="tableWrap">
						<el-table class='table' ref="multipleTable" :data="list" border tooltip-effect="dark">
							<el-table-column type="index" width="55"></el-table-column>
							<!--<el-table-column type="selection" width="55"></el-table-column>-->
							<el-table-column prop="id" label="用户ID" show-overflow-tooltip></el-table-column>
							<el-table-column prop="name" label="用户名" show-overflow-tooltip></el-table-column>
							<el-table-column prop="other" label="APPID" show-overflow-tooltip>
								
							</el-table-column>
						</el-table>
					</div>
				</div>
			</li><li>
				<label class="txt">&nbsp;</label>
				<div class="rightBox">
					<el-button @click="back" class='back'>返 回</el-button>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import kit       from '@/libs/kit.js';
import utils     from '@/libs/utils.js';
import globalVar from '@/libs/globalVar.js';
import observer  from '@/libs/observer.js';


	var lang = {}, pageTxt, slotTitle, first = false;
	lang.cn = {
		tips: {},
		label: ['主题详情','主题名称：','主题描述：','主题内容：','接收方：','可订阅用户','已订阅用户'],
		list: ['用户ID','用户名','其他']
	};
	lang.en = {};
	pageTxt = lang[globalVar.get('lang')];
	
	var list = [];
	for (var i = 0; i < 2; i++) {
		list.push({
			label:'全部的数据'+i, key:i, id: kit.randomNum(10,99),
			name: '用户'+i,other:'其它'
		});
	}
	
	var data = {
		pageTxt,
		sync: false,
		disabled: false,
		obj: null,
		info: {name:'',describe:'',content:''},
		list: list,
		value: [],
		filterMethod(a, b){
//			console.log(a);
//			console.log(b);
//			return true
		}
	};
	
	observer.addBinding('messDetailTheme', function(master, param){
		if(master != 'messDetailTheme') return;
		data.sync = param.sync;
		data.obj = param.obj;
	});
	
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
		mounted(){
			slotTitle = kit('#slotTitle').html();
			first = false;
			console.log(this.$route.params.id);
		},
		watch: {},
		components: {}
	};
	
	function addTitle(){
		kit('.detailTheme .el-checkbox-group').each(function(el){
			var parent = el.parentNode;
			parent.insertBefore(kit(slotTitle)[0], el);
		});
		kit('.detailTheme .transfer .el-transfer__buttons').css('visibility','hidden');
		kit('.detailTheme .transfer .el-checkbox__input').css('display','none');
	}
</script>

<style scoped="scoped">
	.list li{margin-bottom: 10px;}
	.h2{font-size: 16px;color: #666;line-height: 50px;height: 50px;border-bottom: 1px solid #D8D8D8;margin-bottom: 40px;padding-left: 20px;}
	.txt,.txt1{display: inline-block;font-size: 14px;line-height: 30px;width: 160px;vertical-align: top;text-align: right;padding-right: 10px;}
	.txt1{text-align: left;}
	.rightBox{vertical-align: top;display: inline-block;}
	.rightBox .el-input{width: 255px;}
	.rightBox .el-textarea{width: 835px;}
	/*.table{width: 815px;height: 268px;overflow-y: auto;}*/
	.tableWrap{width: 370px;display: inline-block;vertical-align: top;max-height: 400px;overflow-y: auto;}
	.tableWrap:first-child{margin-right: 40px;}
	.back{margin-top: 30px;}
</style>
