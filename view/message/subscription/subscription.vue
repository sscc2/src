<template>
	<div class="subscription">
		<div class="searchBox">
			<h2 class="h2">{{pageTxt.label[0]}}</h2>
			<hr class="_hr" />
			<label class="txt">{{pageTxt.label[1]}}</label>
			<el-input placeholder="" v-model="info.id" clearable></el-input>
			<label class="txt">{{pageTxt.label[2]}}</label>
			<el-input placeholder="" v-model="info.name" clearable></el-input>
			<label class="txt">{{pageTxt.label[3]}}</label>
			<el-input placeholder="" v-model="info.shuti" clearable></el-input>
			<el-button class='btnS' type='primary' @click='search'>{{pageTxt.label[4]}}</el-button>
		</div>
		<div class="btnBox">
			<el-button @click='detail' class='btn' type='text'>
				<img src="../../../img/theme/detail_1.png"/>
				<span class="btnTxt">{{pageTxt.label[5]}}</span>
			</el-button>
		</div>
		<el-table highlight-current-row  @current-change="currenRow" @selection-change="selectionRow" :data="data" border tooltip-effect="dark">
			<!--<el-table-column width="50" type="index"></el-table-column>-->
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="subUserID" :label="pageTxt.list[0]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="subUserName" :label="pageTxt.list[1]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubUserID" :label="pageTxt.list[2]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubUserName" :label="pageTxt.list[3]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="topicName" :label="pageTxt.list[4]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="topicName" :label="pageTxt.list[5]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubTime" :label="pageTxt.list[6]" show-overflow-tooltip></el-table-column>
			<el-table-column :label="pageTxt.list[7]" width='60'>
				<div slot-scope="scope" class="_zero">
					<!--<el-button class='_iBtn' type='primary' plain @click="edit">
						<img src="@/img/altericos.png" alt="">
					</el-button>-->
					<img @click="see" src="@/img/theme/detail_1.png" alt="">
				</div>
			</el-table-column>
		</el-table>
		<div class="_pagination" v-show="max!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
			<div class="rightTxt">
				共{{max}}条数据
			</div>
		</div>
		<DetailTheme></DetailTheme>
	</div>
</template>

<script>
import utils       from '@/libs/utils.js';
import globalVar   from '@/libs/globalVar.js';
import observer    from '@/libs/observer.js';
import DetailTheme from '@/view/message/subscription/theme/detailTheme.vue';


	var lang = {}, pageTxt, _this;
	lang.cn = {
		tips: {user: "请在列表中选择一条记录！"},
		label: ['已订阅主题','订阅者ID：','订阅者名：','主题名：','查询','主题详情'],
		list: ['订阅者ID','订阅者名','订阅者AppID','发布者ID','发布者名称','主题名','发布时间','操作']
	};
	lang.en = {};
	pageTxt = lang[globalVar.get('lang')];
	
	var data = {
		pageTxt,
		info: {id:'',name:'',shuti:''},
		data: [/*{subUserID:'订阅者ID',subUserName:'订阅者名',pubUserID:'订阅者AppID',pubUserName:'发布者ID',topicName:'发布者名称',topicName:'主题名',pubTime:'发布时间'}*/],
		row: '',
		selects: [],
		max: 0
	};
//	for (var i = 0; i < 30; i++) {
//		data.data.push({userId:'49821',userName:'ABC',reNum:'5',subNum:'5',time:'2020'});
//	}
//	observer.addBinding('messUpload', function(master, param){
//		if(master != 'messUpload') return;
//		data.obj = param;
//	});
	
	export default {
		name: 'message_subscription',
		data() {
			return data;
		},
		methods: {
			search(){
				var param = this.info;
//				utils.post('', param, function(res){
//					console.log(res);
//				});
			},
			currenRow(row){
				this.row = row;
				console.log(row)
			},
			selectionRow(val){
		     	this.selects = val;
		    },
			currentPage(){
				
			},
			detail(){
				var row = this.selects;
				if(row.length != 1){
					utils.confirm({ message: pageTxt.tips.user, type: 2 });
					return;
				}
				observer.execute('messDetailTheme',{sync:true, obj: row[0]});
			},
			see(){
				var _this = this;
				setTimeout(function(){
					observer.execute('messDetailTheme',{sync:true, obj: _this.row});
				}, 0);
			}
		},
		beforeCreate(){},
		mounted(){
			_this = this;
			var param = {
				cmdID: '600050', susbUserID:'', topicName: '',
				sortType: 0, type: 0
			};
			utils.post('mx/subTopic/queryLists', param, function(data){
				console.log('已发布主题：',data);
				if(data.errcode < 0) return utils.weakTips(data.errinfo);
				_this.data = data.lists;
				_this.max = data.count;
			});
		},
		components: {DetailTheme}
	}
</script>

<style scoped="scoped">
	.subscription{padding: 0 20px;white-space: nowrap;color: #333;}
	.h2{font-size: 16px;line-height: 44px;color: #666;}
	._hr{margin: 0 0 10px;margin-left: -20px;}
	.searchBox *{vertical-align: middle;}
	.txt{font-size: 14px;line-height: 30px;padding-left: 10px;}
	.el-input{width: 180px;line-height: 30px;}
	.red{color: red;}
	.btnS{margin-left: 10px;line-height: 30px;padding: 0 14px;}
	.btnTxt{color: #5a769e;}
	.el-button *{vertical-align: middle;}
</style>
