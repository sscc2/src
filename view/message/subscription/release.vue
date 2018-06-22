<template>
	<div class="release">
		<div class="searchBox">
			<h2 class="h2">{{pageTxt.label[0]}}</h2>
			<hr class="_hr" />
			<label class="txt">{{pageTxt.label[1]}}</label>
			<!--<el-input placeholder="" v-model="info.pubUserID"></el-input>-->
			<el-autocomplete @input='autoInput' class="elInput" v-model="idName" :fetch-suggestions="fetch" @select="idSelect" :trigger-on-focus="false">
				<div slot-scope="{item}">
					<span class="name">{{item.userID}}</span>
				    <span class="addr">({{item.userName}})</span>
				</div>
			</el-autocomplete>
			<!--<label class="txt">{{pageTxt.label[2]}}</label>
			<el-input placeholder="" v-model="info.pubUserName"></el-input>-->
			<label class="txt">{{pageTxt.label[3]}}</label>
			<el-input class='elInput' placeholder="" v-model="info.topicName"></el-input>
			<label class="txt">{{pageTxt.label[4]}}</label>
			<el-date-picker class='daterange' v-model="picker" value-format="yyyy-MM-dd HH:mm:ss" :range-separator="pageTxt.label[6]" 
				type="daterange" :start-placeholder="pageTxt.label[5]" :end-placeholder="pageTxt.label[7]">
			</el-date-picker>
			<el-button class='btnS' type='primary' @click='search'>{{pageTxt.label[8]}}</el-button>
		</div>
		<div class="btnBox">
			<el-button class='btn' @click='add' type='text'>
				<img src="@/img/theme/add_1.png"/>
				<span class="btnTxt">{{pageTxt.label[9]}}</span>
			</el-button><el-button class='btn' @click='editTheme' type='text'>
				<img src="@/img/theme/edit_1.png"/>
				<span class="btnTxt">{{pageTxt.label[10]}}</span>
			</el-button><el-button class='btn' @click='delTheme' type='text'>
				<img src="@/img/theme/del_1.png"/>
				<span class="btnTxt">{{pageTxt.label[11]}}</span>
			</el-button><el-button class='btn' @click='detailTheme' type='text'>
				<img src="@/img/theme/detail_1.png"/>
				<span class="btnTxt">{{pageTxt.label[12]}}</span>
			</el-button>
		</div>
		<el-table @sort-change='sortReq' @current-change="currenRow" @selection-change="selectionRow" 
			highlight-current-row :data="data" tooltip-effect="dark" style="min-width: 960px">
			<!--<el-table-column width="50" type="index"></el-table-column>-->
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="pubUserID" sortable='custom' :label="pageTxt.list[0]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubUserName" :label="pageTxt.list[1]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="topicName" :label="pageTxt.list[2]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubTime" sortable='custom' :label="pageTxt.list[3]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="subsUserCounts" sortable='custom' :label="pageTxt.list[4]" show-overflow-tooltip></el-table-column>
			<el-table-column :label="pageTxt.list[5]" width='120'>
				<div slot-scope="scope" class="_zero">
					<!--<el-button class='_iBtn' type='primary' plain @click="edit">
						<img src="@/img/altericos.png" alt="">
					</el-button>-->
					<img @click="add(scope.$index, scope.row, scope)" src="@/img/theme/add_2.png" alt="">
					<img @click="edit(scope.$index, scope.row, scope)" src="@/img/theme/edit_2.png" alt="">
					<img @click="del(scope.$index, scope.row, scope)" src="@/img/theme/del_2.png" alt="">
					<img @click="detail(scope.$index, scope.row, scope)" src="@/img/theme/detail_2.png" alt="">
				</div>
			</el-table-column>
		</el-table>
		<div class="_pagination" v-show="max!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="max"></el-pagination>
			<div class="rightTxt">
				共{{max}}条数据
			</div>
		</div>
		<!--<AddTheme></AddTheme>-->
		<!--<EditTheme></EditTheme>-->
		<!--<DetailTheme></DetailTheme>-->
	</div>
</template>

<script>
import utils       from '@/libs/utils.js';
import globalVar   from '@/libs/globalVar.js';
import lang        from '@/language/lang.js';
import observer    from '@/libs/observer.js';
import AddTheme    from '@/view/message/subscription/theme/addTheme.vue';
import EditTheme   from '@/view/message/subscription/theme/editTheme.vue';
import DetailTheme from '@/view/message/subscription/theme/detailTheme.vue';


	var pageTxt, _this, autoTime, isInput = false, currentPage=1;
	pageTxt = lang.themeRelease;
	var data = {
		pageTxt,
		idName: '',
		userID:'',
		info: {
			cmdID: '600042', pubUserID: '', topicName: '',
			beginDate: '', endDate: '', sortType: '0'
		},
		picker: null,
		data: [{pubUserID:'发布者ID',pubUserName:'发布者名称',topicName:'主题名',pubTime:'发布时间',subsUserCounts:'订阅个数'}],
		row: '',
		maxData: '2000',
		selects: [],
		max: 0
	};
	
//	observer.addBinding('messUpload', function(master, param){
//		if(master != 'messUpload') return;
//		data.obj = param;
//	});
	function delTheme(){
		var row = delTheme.row,
		param = {
			url: 'mx/pubTopic/delete',
			cmdID: '600046',
			operator: 'admin',
			pubUserID: row.pubUserID,
			topicName: row.topicName
		};
		utils.post(param, function(data){
			console.log('删除主题：',data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			utils.weakTips(pageTxt.tips.success);
			search();
		});
	}
	
	function autoInput(str, cb){
		if(!str) return;
		utils.getUserid(str, function(data){
			var i,len = data.length,tem=[];
			for (i = 0; i < len; i++) {
				if(data[i].label.indexOf(str)!=-1) tem.push(data[i]);
			}
			cb(tem);
		});
	}
	
	export default {
		name: 'message_release',
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
				this.userID = item.userID;
				this.idName = item.userID+'('+item.userName+')';
			},
			autoInput(){
				isInput = true;
			},
			search(){
				search(1, 20);
			},
			add(){
				this.$router.replace({ path: "/message/addTheme" });
				observer.execute('messAddTheme',{sync:true});
			},
			editTheme(){
				var row = this.selects;
				if(row.length != 1){
					utils.weakTips(pageTxt.tips.user);
					return;
				}
				utils.goto('/message/editTheme','userid',row[0]);
			},
			edit(ind, row){
				utils.goto('/message/editTheme','userid',row);
			},
			delTheme(){
				var row = this.selects;
				if(row.length != 1){
					utils.weakTips(this.pageTxt.tips.user);
					return;
				}
				delTheme.row = row[0];
				utils.hints({txt:pageTxt.tips.del, yes:delTheme, btn:2});
			},
			del(ind, row){
//				console.log(ind, row);
				delTheme.index = ind;
				delTheme.row = row;
				utils.hints({txt:pageTxt.tips.del, yes:delTheme, btn:2});
			},
			detailTheme(){
				globalVar.set('userid', this.selects[0]);
				this.$router.replace({ path: "/message/detailTheme/release" });
//				observer.execute('messDetailTheme',{sync:true, obj: this.row});
			},
			detail(ind, row){
				globalVar.set('userid', row);
				this.$router.replace({ path: "/message/detailTheme/release" });
			},
			sortReq(obj){
				/*
				 * 默认0，按发布时间从近到远排序， 1，按发布时间从远到近排序。。2，按发布者用户从小到大排序，
				 * 3，按发布者用户从大到小培训。。。4，按订阅者个数从大到小培训，5，按订阅者个数从小到大排序
				 * {pubUserID:'发布者ID',pubTime:'发布时间',subsUserCount:'订阅个数'}
				 */
				
				var info = this.info;
				if(obj.order == 'ascending'){ //从小到大
					switch (obj.prop){
						case 'pubUserID':
							info.sortType = '2';break;
						case 'subsUserCounts':
							info.sortType = '5';break;
						default:
							info.sortType = '0';break;
					}
				} else if(obj.order == 'descending') {
					switch (obj.prop){
						case 'pubUserID':
							info.sortType = '3';break;
						case 'subsUserCounts':
							info.sortType = '4';break;
						default:
							info.sortType = '1';break;
					}
				} else info.sortType = '0';
				
				info.beginDate = this.picker[0];
				info.endDate = this.picker[1];
				search();
			},
			selectionRow(val){
		     	this.selects = val;
		    },
			currenRow(row){
				this.row = row;
//				console.log(row);
			},
			currentPage(){
				
			},
		},
		beforeCreate(){},
		mounted(){
			this.selects = [];
			_this = this;
			search();
			useridList();
		},
		components: {AddTheme, EditTheme, DetailTheme}
	};
	function search(num, size){
		var picker = _this.picker, info = _this.info;
		var userID = isInput ? _this.idName : _this.userID;
		if(!picker){
			picker = today();
		}
		info.beginDate = picker[0];
		info.endDate = picker[1].split(' ',1)[0];
		info.endDate += ' 23:59:59';
		info.pubUserID = userID;
		info.currentPage = num||1;
		info.pageSize = size||20;
		utils.post('mx/pubTopic/queryLists', info, function(data){
//			console.log('已发布主题：',data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			_this.data = data.lists;
			_this.max = parseInt(data.count)||0;
		});
	}
	function today(){
		var day = new Date(), str = '', t;
		str += day.getFullYear() + '-';
		t = day.getMonth() + 1;
		str += (t<10 ? '0'+t : t) + '-';
//		str += day.getDate();
//		return [str+' 00:00:00',str+' 23:59:59'];
		return [str+'01 00:00:00',str+'28 23:59:59'];
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
	.release{padding:0 20px;white-space: nowrap;color: #333;}
	.h2{font-size: 16px;line-height: 44px;color: #666;}
	._hr{margin: 0 0 10px;min-width: 1000px;margin-left: -20px;}
	.searchBox *{vertical-align: middle;}
	.txt{font-size: 14px;line-height: 30px;padding-left: 10px;}
	.elInput{width: 200px;line-height: 30px;}
	.el-button *{vertical-align: middle;}
	.btnS{margin-left: 10px;line-height: 30px;padding: 0 14px;}
	.btnTxt{color: #5a769e;}
	._zero{white-space: nowrap;}
	._zero img{vertical-align: middle;margin-right: 10px;}
</style>