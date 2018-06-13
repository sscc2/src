<template>
	<div class="release">
		<div class="searchBox">
			<h2 class="h2">{{pageTxt.label[0]}}</h2>
			<hr class="_hr" />
			cmdID: '600042', pubUserID: '', topicName: '',
			beginDate: '', endDate: '', sortType: '0'
			<label class="txt">{{pageTxt.label[1]}}</label>
			<el-input placeholder="" v-model="info.pubUserID" clearable></el-input>
			<!--<label class="txt">{{pageTxt.label[2]}}</label>
			<el-input placeholder="" v-model="info.pubUserName" clearable></el-input>-->
			<label class="txt">{{pageTxt.label[3]}}</label>
			<el-input placeholder="" v-model="info.topicName" clearable></el-input>
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
			highlight-current-row :data="data" tooltip-effect="dark">
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
					<img @click="add" src="@/img/theme/add_2.png" alt="">
					<img @click="edit" src="@/img/theme/edit_2.png" alt="">
					<img @click="del" src="@/img/theme/del_2.png" alt="">
					<img @click="detail" src="@/img/theme/detail_2.png" alt="">
				</div>
			</el-table-column>
		</el-table>
		<div class="_pagination" v-show="max!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="max"></el-pagination>
			<div class="rightTxt">
				共{{max}}条数据
			</div>
		</div>
		<AddTheme></AddTheme>
		<EditTheme></EditTheme>
		<DetailTheme></DetailTheme>
	</div>
</template>

<script>
import kit         from '@/libs/kit.js';
import utils       from '@/libs/utils.js';
import globalVar   from '@/libs/globalVar.js';
import observer    from '@/libs/observer.js';
import AddTheme    from '@/view/message/subscription/theme/addTheme.vue';
import EditTheme   from '@/view/message/subscription/theme/editTheme.vue';
import DetailTheme from '@/view/message/subscription/theme/detailTheme.vue';


	var lang = {}, pageTxt, _this;
	lang.cn = {
		tips: {user: "请在列表中选择一条记录！",del: "是否确认要删除该用记录吗？",},
		label: ['已发布主题','发布者ID：','发布者名称：','主题名：','日期：','起始日期','至','结束日期',
			'查询','添加用户主题','修改用户主题','删除用户主题','主题详情'],
		list: ['发布者ID','发布者名称','主题名','发布时间','订阅个数','操作']
	},
	lang.en = {};
	pageTxt = lang[globalVar.get('lang')];
	
	var data = {
		pageTxt,
		info: {
			cmdID: '600042', pubUserID: '', topicName: '',
			beginDate: '', endDate: '', sortType: '0'
		},
		picker: null,
		data: [/*{pubUserID:'发布者ID',pubUserName:'发布者名称',topicName:'主题名',pubTime:'发布时间',subsUserCount:'订阅个数'}*/],
		row: '',
		maxData: '2000',
		selects: [],
		max: 0
	};
	
//	observer.addBinding('messUpload', function(master, param){
//		if(master != 'messUpload') return;
//		data.obj = param;
//	});
	
	export default {
		name: 'message_release',
		data() {
			return data;
		},
		methods: {
			search(){
				search();
			},
			add(){
				observer.execute('messAddTheme',{sync:true, disabled: false});
			},
			editTheme(){
				var row = this.selects;
				if(row.length != 1){
					utils.confirm({ message: pageTxt.tips.user, type: 2 });
					return;
				}
				observer.execute('messEditTheme',{sync:true, disabled: true, obj: row[0]});
			},
			edit(){
				var _this = this;
				setTimeout(function(){
					observer.execute('messEditTheme',{sync:true, disabled: true, obj: _this.row});
				}, 0);
			},
			delTheme(){
				var row = this.selects;
				if(row.length != 1){
					utils.confirm({ message: pageTxt.tips.user, type: 2 });
					return;
				}
				utils.confirm({message: pageTxt.tips.del, fn:function(){
					utils.confirm({message: '删除成功！', type: 1});
				}, btn: 2});
			},
			del(){
				var _this = this;
				setTimeout(function(){
					utils.confirm({message: pageTxt.tips.del, fn:function(){
					utils.confirm({message: '删除成功！', type: 1});
				}, btn: 2});
				}, 0);
			},
			detailTheme(){
				observer.execute('messDetailTheme',{sync:true, obj: this.row});
			},
			detail(){
				var _this = this;
				setTimeout(function(){
					observer.execute('messDetailTheme',{sync:true, obj: _this.row});
				}, 0);
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
				console.log(row)
			},
			currentPage(){
				
			},
		},
		beforeCreate(){},
		mounted(){
			_this = this;
			search();
		},
		components: {AddTheme, EditTheme, DetailTheme}
	};
	function search(){
		var picker = _this.picker, info = _this.info;
		if(!picker){
			picker = today();
		}
		info.beginDate = picker[0];
		info.endDate = picker[1];
		utils.post('mx/pubTopic/queryLists', info, function(data){
//			console.log('已发布主题：',data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			utils.weakTips(data.errinfo);
			_this.data = data.lists;
			_this.max = parseInt(data.count)||0;
		});
	}
	function today(){
		var day = new Date(), str = '', t;
		str += day.getFullYear() + '-';
		t = day.getMonth() + 1;
		str += (t<10 ? '0'+t : t) + '-',
		str += day.getDate();
		return [str+' 00:00:00',str+' 23:59:59'];
	}
</script>

<style scoped="scoped">
	.release{padding:0 20px;white-space: nowrap;color: #333;}
	.h2{font-size: 16px;line-height: 44px;color: #666;}
	._hr{margin: 0 0 10px;min-width: 1132px;margin-left: -20px;}
	.searchBox *{vertical-align: middle;}
	.txt{font-size: 14px;line-height: 30px;padding-left: 10px;}
	.el-input{width: 150px;line-height: 30px;}
	.el-button *{vertical-align: middle;}
	.btnS{margin-left: 10px;line-height: 30px;padding: 0 14px;}
	.btnTxt{color: #5a769e;}
	._zero{white-space: nowrap;}
	._zero img{vertical-align: middle;margin-right: 10px;}
</style>