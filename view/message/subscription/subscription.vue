<template>
	<div class="subscription">
		<div class="searchBox">
			<h2 class="h2">{{pageTxt.label[0]}}</h2>
			<hr class="_hr" />
			<label class="txt">{{pageTxt.label[1]}}</label>
			<!--<el-input placeholder="" v-model="info.subUserID"></el-input>-->
			<el-autocomplete class="elInput" v-model="idName" :fetch-suggestions="fetch" @select="idSelect" :trigger-on-focus="false">
				<div slot-scope="{item}">
					<span class="name">{{item.userID}}</span>
				    <span class="addr">({{item.userName}})</span>
				</div>
			</el-autocomplete>
			<!--<label class="txt">{{pageTxt.label[2]}}</label>
			<el-input placeholder="" v-model="info.subUserName"></el-input>-->
			<label class="txt">{{pageTxt.label[3]}}</label>
			<el-input class='elInput' placeholder="" v-model="info.topicName"></el-input>
			<el-button class='btnS' type='primary' @click='search'>{{pageTxt.label[4]}}</el-button>
		</div>
		<div class="btnBox">
			<el-button @click='detail' class='btn' type='text'>
				<img src="../../../img/theme/detail_1.png"/>
				<span class="btnTxt">{{pageTxt.label[5]}}</span>
			</el-button>
		</div>
		<el-table @sort-change='sortReq' @current-change="currenRow" @selection-change="selectionRow"
				highlight-current-row :data="data" tooltip-effect="dark">
			<!--<el-table-column width="50" type="index"></el-table-column>-->
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="subUserID"  sortable='custom' :label="pageTxt.list[0]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="subUserName" :label="pageTxt.list[1]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="subAppID" :label="pageTxt.list[2]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubUserID" :label="pageTxt.list[3]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubUserName" :label="pageTxt.list[4]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="topicName" :label="pageTxt.list[5]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubTime" sortable='custom' :label="pageTxt.list[6]" show-overflow-tooltip></el-table-column>
			<el-table-column :label="pageTxt.list[7]" width='60'>
				<div slot-scope="scope" class="_zero">
					<img @click="see" src="@/img/theme/detail_1.png" alt="">
				</div>
			</el-table-column>
		</el-table>
		<div class="_pagination" v-show="max!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="max"></el-pagination>
			<div class="rightTxt">
				共{{max}}条数据
			</div>
		</div>
		<!--<DetailTheme></DetailTheme>-->
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
		idName: '',
		info: {
			subUserID:'', topicName: '',
			sortType: '2', type: '0'
		},
		data: [/*{subUserID:'订阅者ID',subUserName:'订阅者名',subAppID:'订阅者AppID',pubUserID:'发布者ID',pubUserName:'发布者名称',topicName:'主题名',pubTime:'发布时间'}*/],
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
			fetch(str, cb){
				var idName,i,len = idList.length,obj,tem=[];
				for (i = 0; i < len; i++) {
					obj = idList[i];
					idName = obj.userID+obj.userName;
					if(idName.indexOf(str)!=-1) tem.push(obj);
				}
				cb(tem);
			},
			idSelect(item){
				this.info.subUserID = item.userID;
				this.idName = item.userID+'('+item.userName+')';
			},
			search(){
				search();
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
			sortReq(obj){
				//默认2   0，按发布时间从近到远排序， 1，按发布时间从远到近排序。。
				// 2，按订阅者用户从小到大排序，3，按订阅者用户从大到小培训。。
				var info = this.info;
				if(obj.order == 'ascending'){ //从小到大
					switch (obj.prop){
						case 'subUserID':
							info.sortType = '2';break;
						default:
							info.sortType = '0';break;
					}
				} else if(obj.order == 'descending') {
					switch (obj.prop){
						case 'subUserID':
							info.sortType = '3';break;
						default:
							info.sortType = '1';break;
					}
				} else info.sortType = '2';
				
				search();
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
			search();
			useridList();
		},
		components: {DetailTheme}
	};
	function search(){
		var info = _this.info;
		info.cmdID = '600044'
		utils.post('mx/subTopic/queryLists', info, function(data){
//			console.log('已发布主题：',data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			_this.data = data.lists;
			_this.max = parseInt(data.count)||0;
		});
	}
	var idList = [];
	function useridList(){
		idList = globalVar.get('useridList');
		var call = function(master, list){
			if(master != 'useridReady') return;
			observer.delBinding('useridReady', call);
			idList = list; call = null;
		}
		if(!idList.length) observer.addBinding('useridReady', call);
	}
</script>

<style scoped="scoped">
	.subscription{padding: 0 20px;white-space: nowrap;color: #333;}
	.h2{font-size: 16px;line-height: 44px;color: #666;}
	._hr{margin: 0 0 10px;margin-left: -20px;}
	.searchBox *{vertical-align: middle;}
	.txt{font-size: 14px;line-height: 30px;padding-left: 10px;}
	.elInput{width: 240px;line-height: 30px;}
	.red{color: red;}
	.btnS{margin-left: 10px;line-height: 30px;padding: 0 14px;}
	.btnTxt{color: #5a769e;}
	.el-button *{vertical-align: middle;}
</style>
