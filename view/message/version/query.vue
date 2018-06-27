<template>
	<div class="query">
		<div class="searchBox">
			<h2 class="h2">{{pageTxt.label[0]}}</h2>
			<hr class="_hr" />
			<div>
				<label class="txt">{{pageTxt.label[1]}}</label>
				<el-select class='select' v-model="config">
					<el-option v-for="obj in pageTxt.option" :key="obj.c" :label="obj.t" :value="obj.c">
					</el-option>
				</el-select>
			</div>
			<div class="ver">
				<label class="txt">{{pageTxt.label[2]}}</label>
				<el-radio-group v-model="radio">
				    <el-radio :label="0">{{pageTxt.label[3]}}</el-radio>
				    <el-radio :label="1">{{pageTxt.label[4]}}</el-radio>
				    <el-radio :label="2">{{pageTxt.label[5]}}</el-radio>
				    <el-radio :label="3">{{pageTxt.label[6]}}</el-radio>
				</el-radio-group>
				<label class="txt">{{pageTxt.label[7]}}</label>
				<el-date-picker class='daterange' v-model="picker" value-format="yyyy-MM-dd" type="daterange" 
					:start-placeholder="pageTxt.label[9]" :range-separator="pageTxt.label[8]" :end-placeholder="pageTxt.label[10]">
				</el-date-picker>
				<button class='blueBtn' type='primary' @click='search'>{{pageTxt.label[11]}}</button>
			</div>
		</div>
		<el-table highlight-current-row @row-dblclick="dbl"  @current-change="currenRow" @selection-change="selectionRow" :data="data" border tooltip-effect="dark">
			<el-table-column width="50" type="index"></el-table-column>
			<!--<el-table-column type="selection" width="55"></el-table-column>-->
			<el-table-column prop="type" :label="pageTxt.list[0]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="version" :label="pageTxt.list[1]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="versionPath" :label="pageTxt.list[2]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="operationTime" :label="pageTxt.list[3]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="operation" :label="pageTxt.list[4]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="reviewer" :label="pageTxt.list[5]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="operationType" :label="pageTxt.list[6]" show-overflow-tooltip></el-table-column>
			<el-table-column :label="pageTxt.list[7]" width='60'>
				<div slot-scope="scope" class="_zero">
					<img @click="roolback(scope.row, scope.$index, scope)" src="@/img/theme/version.png" alt="">
				</div>
			</el-table-column>
		</el-table>
		<div class="_pagination" v-if="max>size">
			<el-pagination @current-change='currentPage' @size-change="pageSize" :page-size='size' :total="max" 
				layout="prev, pager, next, jumper" background></el-pagination>
			<div class="rightTxt">
				共{{max}}条数据
			</div>
		</div>
		<div class="onePage" v-else-if="max>0&&max<=size">
			已显示全部{{max}}个数据
		</div>
		<!--<div id="_weakTips">
			<div class="panle">
				<div class="container"></div>
			</div>
		</div>-->
	</div>
</template>

<script>
import utils     from '@/libs/utils.js';
import globalVar from '@/libs/globalVar.js';
import lang      from '@/language/lang.js';


	var pageTxt, _this, _currentPage = 1;
	pageTxt = lang.versionQuery;
	
	var data = {
		pageTxt,
		config: '0',
		radio: 1,
		picker: [],
		data: [{type:'verType',version:'version',versionPath:'url',operationTime:'time',
			operation:'send',reviewer:'sh',operationType:'sendType'}],
		row: {},
		selects: [],
		size: 20,
		max: 0
	};

	function search(num, size){
		var param = {
			cmdID: '600061', type: _this.config,
			pageSize: size||_this.size,
			currentPage: num||_currentPage,
		};
		param.beginDate = _this.picker[0] + ' 00:00:00';
		param.endDate = _this.picker[1] + ' 23:59:59';
		utils.post('mx/version/queryLists', param, function(data){
			console.log('版本信息列表：', data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			_this.data = data.lists;
			_this.max = parseInt(data.totalSize)||_this.data.length;
		});
	}
	
	export default {
		name: 'message_query',
		data() {
			return data;
		},
		methods: {
			search(){
				search(_currentPage = 1);
			},
			currenRow(row){
				this.row = row;
			},
			selectionRow(val){
		     	this.selects = val;
		    },
		    pageSize(val){ //`每页 ${val} 条`
		    	this.size = val;
		    	search();
		    },
			currentPage(val){ //`当前页: ${val}`
				_currentPage = val;
				search();
			},
			roolback(row){
				utils.hints({
					txt: pageTxt.tips.roolback,
					yes: function(){
						var param = {
							url: 'mx/version/rollback',
							cmdId: '600063',
							type: row.type,
							version: row.version
						};
						utils.post(param, function(data){
							console.log('版本回退：', data);
							utils.weakTips(data.errinfo);
							if(data.errcode >= 0) search(_currentPage = 1);
						});
					}
				});
			},
			dbl(info, e){
//				console.log(info, e)
			}
		},
		beforeCreate(){},
		mounted(){
			_this = this;
			getDay(this.radio = 1);
		},
		watch:{
			radio(cur){
				getDay(cur);
			}
		},
		components: {}
	};
	function getDay(radio){
		if(radio > 2) return;
		var begin, end, time = 24 * 3600 * 1000;
		end = getTime(0);
		switch (radio){
			case 0: time = 0;break;
			case 1: time *= 7;break;
			case 2: time *= 30;break;
			default: break;
		}
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
</script>

<style scoped="scoped">
	.query{padding: 0 20px;white-space: nowrap;color: #333;min-width: 912px;}
	.h2{font-size: 16px;line-height: 44px;color: #666;}
	._hr{margin: 0 0 10px;margin-left: -20px;}
	.searchBox *{vertical-align: middle;}
	.txt{font-size: 14px;line-height: 30px;padding-left: 10px;}
	.select{width: 180px;}
	.el-input{width: 180px;line-height: 30px;}
	.ver{margin: 10px 0;}
	.blueBtn{margin-left: 10px;}
	.btnTxt{color: #5a769e;}
	.el-button *{vertical-align: middle;}
	.onePage{font-size: 13px;line-height: 28px;color: #999;text-align: center;margin-top: 23px;}
</style>
