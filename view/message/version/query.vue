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
				<el-date-picker class='daterange' v-model="picker" value-format="yyyy-MM-dd HH:mm:ss" :range-separator="pageTxt.label[8]" 
					type="daterange" :start-placeholder="pageTxt.label[9]" :end-placeholder="pageTxt.label[10]">
				</el-date-picker>
				<el-button class='btnS' type='primary' @click='search'>{{pageTxt.label[11]}}</el-button>
			</div>
		</div>
		<el-table highlight-current-row @row-dblclick="table"  @current-change="currenRow" @selection-change="selectionRow" :data="data" border tooltip-effect="dark">
			<el-table-column width="50" type="index"></el-table-column>
			<!--<el-table-column type="selection" width="55"></el-table-column>-->
			<el-table-column prop="verType" :label="pageTxt.list[0]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="version" :label="pageTxt.list[1]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="url" :label="pageTxt.list[2]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="time" :label="pageTxt.list[3]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="send" :label="pageTxt.list[4]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="sh" :label="pageTxt.list[5]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="sendType" :label="pageTxt.list[6]" show-overflow-tooltip></el-table-column>
			<el-table-column :label="pageTxt.list[7]" width='60'>
				<div slot-scope="scope" class="_zero">
					<img @click="see(scope.$index, scope.row, scope)" src="@/img/theme/version.png" alt="">
				</div>
			</el-table-column>
		</el-table>
		<div class="_pagination" v-show="max.length!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='pageSize' :total="max.length"></el-pagination>
			<div class="rightTxt">
				共{{data.length}}条数据
			</div>
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
import observer  from '@/libs/observer.js';


	var pageTxt;
	pageTxt = lang.versionQuery;
	
	var data = {
		pageTxt,
		config: '0',
		radio: 1,
		picker: '',
		info: {id:'',name:'',shuti:''},
		data: [{verType:'verType',version:'version',url:'url',time:'time',send:'send',sh:'sh',sendType:'sendType'}],
		row: '',
		selects: [],
		pageSize: 10,
		max: []
	};
//	for (var i = 0; i < 30; i++) {
//		data.data.push({userId:'49821',userName:'ABC',reNum:'5',subNum:'5',time:'2020'});
//	}
//	observer.addBinding('messUpload', function(master, param){
//		if(master != 'messUpload') return;
//		data.obj = param;
//	});
	var currentPage = 1;
	export default {
		name: 'message_query',
		data() {
			return data;
		},
		methods: {
			search(){
				var param = this.info;
				console.log('picker',this.picker);
				var tem = [],n=5;
				if(this.radio==2) n=100; 
				for (var i = 0; i < n; i++) {
					var obj = {verType:'verType',version:'version',url:'url',time:'time',send:'send',sh:'sh',sendType:'sendType'};
					obj.version = i
					tem.push(obj);
				}
				this.max = tem;
				var size = this.pageSize;
				this.data = tem.slice((currentPage-1)*size, currentPage*size);
				utils.weakTips('查询成功！');
//				utils.post('', param, function(res){
//					console.log(res);
//				});
			},
			currenRow(row){
				this.row = row;
//				console.log(row)
			},
			selectionRow(val){
		     	this.selects = val;
		    },
			currentPage(val){
				currentPage = val;
				var max = this.max;
				var size = this.pageSize;
				this.data = max.slice((currentPage-1)*size, currentPage*size);
			},
			see(ind, row){
				console.log(ind, row);
			},
			table(info, e){
				console.log(info, e)
			}
		},
		beforeCreate(){},
		mounted(){},
		watch:{
			data(cur){
				
			}
		},
		components: {}
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
	.btnS{margin-left: 10px;line-height: 30px;padding: 0 14px;}
	.btnTxt{color: #5a769e;}
	.el-button *{vertical-align: middle;}
</style>
