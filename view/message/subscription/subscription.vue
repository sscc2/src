<template>
	<div class="subscription">
		<div class="searchBox">
			<h2 class="h2">{{pageTxt.label[0]}}</h2>
			<hr class="_hr" />
			<label class="txt">{{pageTxt.label[1]}}</label>
			<!--<el-input class='elInput' placeholder="" v-model="info.subUserID"></el-input>-->
			<el-autocomplete @input='autoInput' class="elInput" v-model="idName" :fetch-suggestions="fetch" @select="idSelect" :trigger-on-focus="false">
				<div slot-scope="{item}">
					<span class="name">{{item.userID}}</span>
				    <span class="addr">({{item.userName}})</span>
				</div>
			</el-autocomplete>
			<!--<label class="txt">{{pageTxt.label[2]}}</label>
			<el-input placeholder="" v-model="info.subUserName"></el-input>-->
			<label class="txt">{{pageTxt.label[3]}}</label>
			<el-input class='elInput' placeholder="" v-model="info.topicName" clearable></el-input>
			<button class='blueBtn' type='primary' @click='search'>{{pageTxt.label[4]}}</button>
			<label class="el-icon-circle-close clearInput"></label>;
		</div>
		<div class="btnBox">
			<!--<el-button @click='detail' class='btn' type='text'>
				<img src="../../../img/theme/detail_1.png"/>
				<span class="btnTxt">{{pageTxt.label[5]}}</span>
			</el-button>-->
		</div>
		<el-table @sort-change='sortReq' @current-change="currenRow" @selection-change="selectionRow"
				highlight-current-row :data="data" tooltip-effect="dark" style="min-width: 1040px">
			<el-table-column width="50" :label="column" type="index"></el-table-column>
			<!--<el-table-column type="selection" width="55"></el-table-column>-->
			<el-table-column prop="subUserID"  sortable='custom' :label="pageTxt.list[0]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="subUserName" :label="pageTxt.list[1]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="subAppID" :label="pageTxt.list[2]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubUserID" :label="pageTxt.list[3]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubUserName" :label="pageTxt.list[4]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="topicName" :label="pageTxt.list[5]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubTime" sortable='custom' :label="pageTxt.list[6]" show-overflow-tooltip></el-table-column>
			<el-table-column :label="pageTxt.list[7]" width='60'>
				<div slot-scope="scope" class="_zero">
					<el-tooltip :content="pageTxt.label[5]" placement="bottom" effect="light">
						<img @click="see(scope.$index, scope.row, scope)" src="@/img/theme/detail_2.png" alt="">
					</el-tooltip>
				</div>
			</el-table-column>
		</el-table>
		<div class="_pagination" v-if="max>size">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next, jumper" :page-size='size' :total="max"></el-pagination>
			<div class="rightTxt">
				共{{max}}条数据
			</div>
		</div>
		<div class="onePage" v-else-if="max>0&&max<=size">
			已显示全部{{max}}个数据
		</div>
		<!--<DetailTheme></DetailTheme>-->
	</div>
</template>

<script>
import utils       from '@/libs/utils.js';
import lang        from '@/language/lang.js';
//import DetailTheme from '@/view/message/subscription/theme/detailTheme.vue';


	var pageTxt, _this, autoTime, _currentPage=1, isInput=false;
	pageTxt = lang.themeSubscription;
	
	var data = {
		pageTxt,
		column: '　',
		idName: '',
		info: {
			subUserID:'', topicName: '',
			sortType: '2', type: '0'
		},
		data: [/*{subUserID:'订阅者ID',subUserName:'订阅者名',subAppID:'订阅者AppID',pubUserID:'发布者ID',pubUserName:'发布者名称',topicName:'主题名',pubTime:'发布时间'}*/],
		row: '',
		selects: [],
		size: 20,
		max: 0
	};

	function autoInput(str, cb){
		if(!str) return;
		utils.getUserid(str, function(data){
//			console.log('用户ID data',data);
			var i,len = data.length,tem=[];
			for (i = 0; i < len; i++) {
				if(data[i].label.indexOf(str)!=-1) tem.push(data[i]);
			}
			cb(tem);
		});
	}
	
	export default {
		name: 'message_subscription',
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
				this.info.subUserID = item.userID;
				this.idName = item.userID+'('+item.userName+')';
			},
			autoInput(){
				isInput = true;
			},
			search(){
				search(_currentPage = 1);
			},
			currenRow(row){
				this.row = row;
			},
			selectionRow(val){
		     	this.selects = val;
			},
			pageSize(val){
//		    	console.log(`每页 ${val} 条`);
		    	this.size = val;
		    	search();
		    },
			currentPage(val){
//				console.log(`当前页: ${val}`,`每页 ${this.size} 条`);
				_currentPage = val;
				search();
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
				
				search(_currentPage = 1);
			},
			detail(){
				var row = this.selects;
				if(row.length != 1){
					utils.weakTips(pageTxt.tips.user);
					return;
				}
				utils.goto('/message/detailTheme/subscription','userid',row[0]);
			},
			see(ind, row){
				utils.goto('/message/detailTheme/subscription','userid',row);
			}
		},
		beforeCreate(){},
		mounted(){
			_this = this;
			this.selects = [];
			this.idName = this.info.subUserID = this.info.topicName = '';
			this.size = 20;
			search(_currentPage = 1);
			var btn = utils.clearInput({
				pos: '.subscription',
				id: '#el-auto',
				clas: '.clearInput',
			});
			btn.clear(e => {
				_this.info.subUserID = _this.idName = '';
			});
		},
//		components: {DetailTheme}
	};
	function search(num, size){
		var info = _this.info;
		var userID = isInput ? _this.idName : info.subUserID;
		info.cmdID = '600044';
		info.currentPage = num||_currentPage;
		info.pageSize = size||_this.size;
		info.subUserID = userID;
		utils.post('mx/subTopic/queryLists', info, function(data){
//			console.log('已订阅主题：',data);
			if(data.errcode != 0) return utils.weakTips(data.errinfo);
			_this.data = data.lists;
			_this.max = parseInt(data.totalSize)||_this.data.length;
		});
	}
</script>

<style scoped="scoped">
	.subscription{padding: 0 20px;white-space: nowrap;color: #666;}
	.h2{font-size: 16px;line-height: 44px;color: #666;font-weight: bold;}
	._hr{min-width: 1080px;}
	.searchBox *{vertical-align: middle;}
	.txt{font-size: 14px;line-height: 30px;padding-right: 10px;}
	.elInput{width: 240px;line-height: 1;margin-right: 35px;}
	.red{color: red;}
	.blueBtn{margin-left: 10px;}
	.btnBox{padding: 10px 0;}
	.btn{margin-right: 35px;margin-left: 0;padding: 0;}
	.btnTxt{vertical-align: middle;color: #5a769e;line-height: 30px;height: 30px;}
	.el-button *{vertical-align: middle;}
	._zero img{margin-right: 15px;}
	.clearInput{bottom: 8px;left:284px;}
</style>
