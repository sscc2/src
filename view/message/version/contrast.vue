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
				<el-autocomplete @input='autoInput1' class="elInput" v-model="info.ver1" :fetch-suggestions="fetch" 
					:placeholder="pageTxt.label[3]" :trigger-on-focus="true" @select="idSelect1">
					<div slot-scope="{item}">
						<span>{{item.version}}</span>
					</div>
				</el-autocomplete>
				<label class="txt">{{pageTxt.label[4]}}</label>
				<el-autocomplete @input='autoInput2' class="elInput" v-model="info.ver2" :fetch-suggestions="fetch" 
					:placeholder="pageTxt.label[5]" :trigger-on-focus="true" @select="idSelect2">
					<div slot-scope="{item}">
						<span class="name">{{item.version}}</span>
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
import lang      from '@/language/lang.js';


	var pageTxt, _this, _currentPage = 1, autoTime, isVer, verArr1, verArr2;
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
			version1: info.ver1,
			version2: info.ver2
		};
		utils.post('mx/version/compare', param, function(data){
//			console.log('版本对比：', data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			_this.data = data.lists;
			_this.max = parseInt(data.totalSize)||_this.data.length;
		});
	}
	
	function autoInput(str, cb){
		var param = {
			url: 'mx/version/queryCompare',
			cmdID: "600062",
			type: _this.info.config,
			pageSize: 200,
			currentPage: 1
		};
		utils.post(param, function(data){
//			console.log('自动输入版本：',data);
			if(data.errcode < 0) return console.log(data.errinfo);
			var obj, i, len = data.lists.length;
			for (i = 0; i < len; i++) {
				obj = data.lists[i];
				obj.key = i;
				obj.label = obj.version;
			}
			if(isVer == '1') verArr1 = data.lists;
			else verArr2 = data.lists;
			filt(str, data.lists, cb);
		});
	}
	function filt(str, data, cb){
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
				this.info.ver1 = item.version;
			},
			autoInput1(){
				isVer = '1';
			},
			idSelect2(item){
				this.info.ver2 = item.version;
			},
			autoInput2(){
				isVer = '2';
			},
			search(){
				var tips = pageTxt.tips, info = this.info;
				if(!hasVer(info.ver1,verArr1)) return utils.weakTips(tips.ver1);
				if(!hasVer(info.ver2,verArr2)) return utils.weakTips(tips.ver2);
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
			verArr1 = [];
			verArr2 = [];
			this.info.config = '3';
			_currentPage = 1;
		}
	};
	
	function hasVer(str, arr){
		var i, len = arr.length;
		for (i = 0; i < len; i++) {
			if(arr[i].version == str) return true;
		}
		return false;
	}
</script>

<style scoped="scoped">
	.contrast{padding: 0 20px;white-space: nowrap;color: #333;}
	.h2{font-size: 16px;line-height: 44px;color: #666;font-weight: bold;}
	._hr{margin: 0 0 10px;margin-left: -20px;}
	.searchBox *{vertical-align: middle;}
	.select{width: 180px;}
	.elInput{width: 240px;line-height: 1;}
	.txt{font-size: 14px;line-height: 30px;padding-left: 10px;}
	.el-input{width: 180px;line-height: 30px;}
	.ver{margin: 10px 0;}
	.btnS{margin-left: 10px;line-height: 30px;padding: 0 14px;}
	.btnTxt{color: #5a769e;}
	.el-button *{vertical-align: middle;}
</style>
