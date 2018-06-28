<template>
	<div class="contrast">
		<div class="searchBox">
			<h2 class="h2">{{pageTxt.label[0]}}</h2>
			<hr class="_hr" />
			<div>
				<label class="txt">{{pageTxt.label[1]}}</label>
				<el-select class='select' v-model="info.config">
					<el-option v-for="obj in pageTxt.option" :key="obj.c" :label="obj.t" :value="obj.c">
					</el-option>
				</el-select>
			</div>
			<div class="ver">
				<label class="txt">{{pageTxt.label[2]}}</label>
				<el-autocomplete id='9' @input='autoInput1' class="elInput" v-model="idName1" :fetch-suggestions="fetch" 
					:placeholder="pageTxt.label[3]" :trigger-on-focus="false" @select="idSelect1">
					<div slot-scope="{item}">
						<span class="name">{{item.userID}}</span>
						<span class="addr">({{item.userName}})</span>
					</div>
				</el-autocomplete>
				<label class="txt">{{pageTxt.label[4]}}</label>
				<el-autocomplete @input='autoInput2' class="elInput" v-model="idName2" :fetch-suggestions="fetch" 
					:placeholder="pageTxt.label[5]" :trigger-on-focus="false" @select="idSelect2">
					<div slot-scope="{item}">
						<span class="name">{{item.userID}}</span>
						<span class="addr">({{item.userName}})</span>
					</div>
				</el-autocomplete>
				<el-button class='btnS' type='primary' @click='search'>{{pageTxt.label[6]}}</el-button>
			</div>
		</div>
		<el-table highlight-current-row  @current-change="currenRow" @selection-change="selectionRow" :data="data" border tooltip-effect="dark">
			<el-table-column width="50" type="index"></el-table-column>
			<!--<el-table-column type="selection" width="55"></el-table-column>-->
			<el-table-column prop="type" :label="pageTxt.list[0]" width='180px'  show-overflow-tooltip></el-table-column>
			<el-table-column prop="detail" :label="pageTxt.list[1]"  show-overflow-tooltip></el-table-column>
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
	</div>
</template>

<script>
import utils     from '@/libs/utils.js';
import globalVar from '@/libs/globalVar.js';
import lang      from '@/language/lang.js';


	var pageTxt, _this, _currentPage = 1, autoTime, isInput1, isInput2;
	pageTxt = lang.versionContrast;
	
	var data = {
		pageTxt,
		idName1: '',
		idName2: '',
		info: {config:'3', ver1:'', ver2:''},
		data: [/*{type:'verType',detail:'detail'}*/],
		row: {},
		selects: [],
		size: 20,
		max: 0
	};
	
	function search(num, size){
		var info = _this.info;
		var param = {
			cmdID: '600064', type: info.config,
			pageSize: size||_this.size,
			currentPage: num||_currentPage,
			version1: isInput1 ? info.ver1 : _this.idName1,
			version2: isInput2 ? info.ver2 : _this.idName2
		};
		utils.post('mx/version/compare', param, function(data){
			console.log('版本对比：', data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			_this.data = data.lists;
			_this.max = parseInt(data.totalSize)||_this.data.length;
		});
	}
	
	function autoInput(str, cb){
		if(!str) return;
		var param = {
			url: 'mx/version/queryCompare',
			cmdID: "600062",
			type: _this.info.config,
			pageSize: 200,
			currentPage: 1
		};
		utils.post(param, function(data){
			console.log('自动输入版本：',data);
			if(data.errcode < 0) return console.log(data.errinfo);
			var obj, i;
			for (i = 0; i < data.lists.length; i++) {
				obj = data.lists[i];
				obj.key = i;
				obj.label = obj.userID+obj.userName;
			}
			filt(data.lists, cb);
		});
	}
	function filt(data, cb){
		var i,len = data.length,tem=[];
		for (i = 0; i < len; i++) {
			if(data[i].label.indexOf(str)!=-1) tem.push(data[i]);
		}
		cb(tem);
	}
	
	export default {
		name: 'message_query',
		data() {
			return data;
		},
		methods: {
			fetch(str, cb){
				clearTimeout(autoTime);
				autoTime = setTimeout(autoInput, 300, str, cb);
			},
			idSelect1(item){
				isInput1 = false;
				this.info.ver1 = item.userID;
				this.idName1 = item.userID+'('+item.userName+')';
			},
			autoInput1(){
				isInput1 = true;
			},
			idSelect2(item){
				isInput2 = false;
				this.info.ver2 = item.userID;
				this.idName1 = item.userID+'('+item.userName+')';
			},
			autoInput2(){
				isInput2 = true;
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
		    	this.size = val;
		    	search();
		    },
			currentPage(val){
				_currentPage = val;
				search();
			}
		},
		mounted(){
			_this = this;
			isInput1 = isInput2 = false;
			this.info.config = '3';
			search(_currentPage = 1);
		}
	}
</script>

<style scoped="scoped">
	.contrast{padding: 0 20px;white-space: nowrap;color: #333;}
	.h2{font-size: 16px;line-height: 44px;color: #666;}
	._hr{margin: 0 0 10px;margin-left: -20px;}
	.searchBox *{vertical-align: middle;}
	.select{width: 180px;}
	.autocomplete{width: 200px;}
	.txt{font-size: 14px;line-height: 30px;padding-left: 10px;}
	.el-input{width: 180px;line-height: 30px;}
	.ver{margin: 10px 0;}
	.btnS{margin-left: 10px;line-height: 30px;padding: 0 14px;}
	.btnTxt{color: #5a769e;}
	.el-button *{vertical-align: middle;}
</style>
