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
			<el-input class='elInput' placeholder="" v-model="info.topicName" clearable></el-input>
			<label class="txt">{{pageTxt.label[4]}}</label>
			<el-date-picker class='daterange' v-model="picker" value-format="yyyy-MM-dd" :range-separator="pageTxt.label[6]" 
				type="daterange" :start-placeholder="pageTxt.label[5]" :end-placeholder="pageTxt.label[7]">
			</el-date-picker>
			<button class='blueBtn' type='primary' @click='search'>{{pageTxt.label[8]}}</button>
			<label class="el-icon-circle-close clearInput"></label>;
		</div>
		<div class="btnBox">
			<el-button class='btn' @click='add' type='text'>
				<img src="@/img/theme/add_2.png"/>
				<span class="btnTxt">{{pageTxt.label[9]}}</span>
			</el-button>
			<!--<el-button class='btn' @click='editTheme' type='text'>
				<img src="@/img/theme/edit_1.png"/>
				<span class="btnTxt">{{pageTxt.label[10]}}</span>
			</el-button><el-button class='btn' @click='delTheme' type='text'>
				<img src="@/img/theme/del_1.png"/>
				<span class="btnTxt">{{pageTxt.label[11]}}</span>
			</el-button><el-button class='btn' @click='detailTheme' type='text'>
				<img src="@/img/theme/detail_1.png"/>
				<span class="btnTxt">{{pageTxt.label[12]}}</span>
			</el-button>-->
			<el-button class='btn' @click='download' type='text'>
				<img src="@/img/theme/download.png"/>
				<span class="btnTxt">{{pageTxt.label[13]}}</span>
			</el-button>
		</div>
		<el-table @sort-change='sortReq' @current-change="currenRow" @selection-change="selectionRow" 
			highlight-current-row :data="data" tooltip-effect="dark" style="min-width: 1040px">
			<el-table-column width="50" :label="column" type="index"></el-table-column>
			<!--<el-table-column type="selection" width="55"></el-table-column>-->
			<el-table-column prop="pubUserID" sortable='custom' :label="pageTxt.list[0]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubUserName" :label="pageTxt.list[1]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="topicName" :label="pageTxt.list[2]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubTime" sortable='custom' :label="pageTxt.list[3]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="subsUserCounts" sortable='custom' :label="pageTxt.list[4]" show-overflow-tooltip></el-table-column>
			<el-table-column :label="pageTxt.list[5]" width='120'>
				<div slot-scope="scope" class="_zero">
					<!--<img @click="add(scope.$index, scope.row, scope)" src="@/img/theme/add_2.png" alt="">-->
					<el-tooltip v-if="scope.row.userIDEnable!=0" :content="pageTxt.label[10]" placement="bottom" effect="light">
						<img @click="edit(scope.$index, scope.row, scope)" src="@/img/theme/edit_2.png" alt="">
					</el-tooltip>
					<el-tooltip :content="pageTxt.label[11]" placement="bottom" effect="light">
						<img @click="del(scope.$index, scope.row, scope)" src="@/img/theme/del_2.png" alt="">
					</el-tooltip>
					<el-tooltip :content="pageTxt.label[12]" placement="bottom" effect="light">
						<img @click="detail(scope.$index, scope.row, scope)" src="@/img/theme/detail_2.png" alt="">
					</el-tooltip>
				</div>
			</el-table-column>
		</el-table>
		<div class="_pagination" v-if="max>size">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next, jumper" @size-change="pageSize" :page-size='size' :total="max"></el-pagination>
			<div class="rightTxt">
				共{{max}}条数据
			</div>
		</div>
		<div class="onePage" v-else-if="max>0&&max<=size">
			已显示全部{{max}}个数据
		</div>
		<!--<AddTheme></AddTheme>-->
		<!--<EditTheme></EditTheme>-->
		<!--<DetailTheme></DetailTheme>-->
		<div class="Popup" v-show="downCSV">
			<div class="_panle">
				<div>
					<p id="_title">{{pageTxt.label[13]}}</p>
					<img id="_close" src="@/img/close.png" @click="downCSV=false">
				</div>
				<div class="_messaga">
					<span class="txt">文件名：<a :href="csvUrl" style="color:#5C759D">{{csvName}}</a></span>
					<div class="_messaga_info">
						<span class="info_txt">{{pageTxt.label[14]}}</span>
					</div>
				</div>
				<div class="info_button">
					<button class="defBtn" @click="downCSV=false">{{pageTxt.label[15]}}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import utils       from '@/libs/utils.js';
import lang        from '@/language/lang.js';
//import AddTheme    from '@/view/message/subscription/theme/addTheme.vue';
//import EditTheme   from '@/view/message/subscription/theme/editTheme.vue';
//import DetailTheme from '@/view/message/subscription/theme/detailTheme.vue';


	var pageTxt, _this, autoTime, isInput = false, _currentPage=1;
	pageTxt = lang.themeRelease;
	var data = {
		pageTxt,
		column: '　',
		idName: '',
		info: {
			pubUserID: '', topicName: '',
			beginDate: '', endDate: '', sortType: '0'
		},
		picker: [],
		data: [/*{pubUserID:'发布者ID',pubUserName:'发布者名称',topicName:'主题名',pubTime:'发布时间',subsUserCounts:'订阅个数'}*/],
		row: '',
		selects: [],
		size: 20,
		max: 0,
		downCSV: false,
		csvUrl: '#',
		csvName: ''
	};
	
	function delTheme(sub, args){
		var row = delTheme.row,
		param = {
			operator: 'admin',
			pubUserID: row.pubUserID,
			topicName: row.topicName
		};
		if(sub == 'send'){
			param.url = 'mx/pubTopic/delete';
			param.cmdID = '600046';
		} else {
			param.url = 'mx/pubTopic/deleteImmediately';
			param.cmdID = '600049';
			param.reviewer = args.name;
		}
		utils.post(param, function(data){
//			console.log('删除主题：',data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			if(sub == 'send') utils.weakTips(data.errinfo);
			else utils.wheelReq(data); //轮循
			search();
		});
	}
	
	function delSend(){delTheme('send');}
	function delNow(){
		utils.review({ //审核
			yes: function(args){
				delTheme('now', args);
			}
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
				this.info.pubUserID = item.userID;
				this.idName = item.userID+'('+item.userName+')';
			},
			autoInput(){
				isInput = true;
			},
			search(){
				search(_currentPage = 1);
			},
			add(){
				utils.goto('/message/addTheme')
			},
			editTheme(){
				var row = this.selects;
				if(isError(row)) return;
				utils.goto('/message/editTheme','userid',row[0]);
			},
			edit(ind, row){
				utils.goto('/message/editTheme','userid',row);
			},
			delTheme(){
				var row = this.selects;
				if(isError(row)) return;
				delTheme.row = row[0];
				utils.hints({
					txt:pageTxt.tips.del, btn:3,
					yes:delSend, now:delNow,
				});
			},
			del(ind, row){
//				console.log(ind, row);
				delTheme.index = ind;
				delTheme.row = row;
				utils.hints({
					txt:pageTxt.tips.del, btn:3,
					yes:delSend, now:delNow,
				});
			},
			detailTheme(){
				var row = this.selects;
				if(isError(row)) return;
				utils.goto('/message/detailTheme/release','userid', this.selects[0]);
			},
			detail(ind, row){
				utils.goto('/message/detailTheme/release','userid', row);
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
				search(_currentPage = 1);
			},
			selectionRow(val){
		     	this.selects = val;
		    },
			currenRow(row){
				this.row = row;
//				console.log(row);
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
			download(){
				utils.post('mx/pubTopic/exportCsv',{cmdID:'600053'},function(data){
					if(data.errcode < 0) return utils.weakTips(data.errinfo);
//					location.href = data.errinfo;
					var url = data.errinfo, ind = url.lastIndexOf('/');
					_this.csvName = url.substring(ind + 1);
					_this.csvUrl = url;
					_this.downCSV = true;
				});
			}
		},
		beforeCreate(){},
		mounted(){
			_this = this;
			this.selects = [];
			this.idName = this.info.pubUserID = this.info.topicName = '';
			this.size = 20;
			this.downCSV = false;
			getDay(7);
			search();
			var btn = utils.clearInput({
				pos: '.release',
				id: '#el-auto',
				clas: '.clearInput',
			});
			btn.clear(e => {
				_this.info.pubUserID = _this.idName = '';
			});
		},
//		components: {AddTheme, EditTheme, DetailTheme}
	};
	
	function search(num, size){
		var picker = _this.picker, info = _this.info;
		var userID = isInput ? _this.idName : info.pubUserID;
		
		info.cmdID = '600042';
		info.beginDate = picker[0] + ' 00:00:00';
		info.endDate = picker[1] + ' 23:59:59';
		info.pubUserID = userID;
		info.currentPage = num||_currentPage;
		info.pageSize = size||_this.size;
		utils.post('mx/pubTopic/queryLists', info, function(data){
//			console.log('已发布主题：',data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			if(_currentPage>data.totalPage){
				return search(_currentPage=data.totalPage);
			}
			_this.data = data.lists;
			_this.max = parseInt(data.totalSize)||_this.data.length;
		});
	}
	
	function getDay(num){
		var begin, end, time = 24 * 3600 * 1000;
		end = getTime(0);
		time *= num;
		begin = getTime(time);
		_this.picker = [begin, end];
	}
	function getTime(t){
		var day = new Date(Date.now()-t), str = '', t;
		str += day.getFullYear() + '-';
		t = day.getMonth() + 1;
		str += (t<10 ? '0'+t : t) + '-';
		t = day.getDate();
		str += (t<10 ? '0'+t : t);
		return str;
	}
	
	function isError(arr){
		if(arr.length != 1){
			utils.weakTips(pageTxt.tips.user);
			return true;
		}
		return false;
	}
</script>

<style scoped="scoped">
	.release{padding:0 20px;white-space: nowrap;color: #666;}
	.h2{font-size: 16px;line-height: 44px;color: #666;font-weight: bold;}
	._hr{min-width: 1080px;}
	.searchBox *{vertical-align: middle;}
	.txt{font-size: 14px;line-height: 30px;padding-right: 10px;}
	.elInput{width: 200px;line-height: 1;margin-right: 35px;}
	.el-button *{vertical-align: middle;}
	.blueBtn{margin-left: 10px;margin-left: 35px;}
	.btnBox{padding: 10px 0;}
	.btn{margin-right: 35px;margin-left: 0;padding: 0;}
	.btnTxt{vertical-align: middle;color: #5a769e;line-height: 30px;height: 30px;}
	._zero img{margin-right: 15px;}
	.clearInput{bottom: 8px;left:244px;}
</style>