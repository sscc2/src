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
				<el-autocomplete class='autocomplete' v-model="info.ver1" :fetch-suggestions="querySearch" @select="handleSelect"
					:placeholder="pageTxt.label[3]" :trigger-on-focus="false" clearable>
				</el-autocomplete>
				<!--<el-input placeholder="" v-model="" clearable></el-input>-->
				<label class="txt">{{pageTxt.label[4]}}</label>
				<el-autocomplete class='autocomplete' v-model="info.ver1" :fetch-suggestions="querySearch" @select="handleSelect"
					:placeholder="pageTxt.label[5]" :trigger-on-focus="false" clearable>
				</el-autocomplete>
				<!--<el-input :placeholder="pageTxt.label[5]" v-model="info.man" clearable></el-input>-->
				<el-button class='btnS' type='primary' @click='search'>{{pageTxt.label[6]}}</el-button>
			</div>
		</div>
		<el-table highlight-current-row  @current-change="currenRow" @selection-change="selectionRow" :data="data" border tooltip-effect="dark">
			<el-table-column width="50" type="index"></el-table-column>
			<!--<el-table-column type="selection" width="55"></el-table-column>-->
			<el-table-column prop="type" :label="pageTxt.list[0]" width='180px'  show-overflow-tooltip></el-table-column>
			<el-table-column prop="detail" :label="pageTxt.list[1]"  show-overflow-tooltip></el-table-column>
		</el-table>
		<div class="_pagination" v-show="data.length!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
			<div class="rightTxt">
				共{{maxData}}条数据
			</div>
		</div>
	</div>
</template>

<script>
import utils     from '@/libs/utils.js';
import globalVar from '@/libs/globalVar.js';
import lang      from '@/language/lang.js';
import observer  from '@/libs/observer.js';


	var pageTxt;
	pageTxt = lang.versionContrast;
	
	var data = {
		pageTxt,
		info: {config:'0', ver1:'', ver2:''},
		data: [{type:'verType',detail:'detail'}],
		row: '',
		maxData: '2000',
		selects: []
	};
//	for (var i = 0; i < 30; i++) {
//		data.data.push({userId:'49821',userName:'ABC',reNum:'5',subNum:'5',time:'2020'});
//	}
//	observer.addBinding('messUpload', function(master, param){
//		if(master != 'messUpload') return;
//		data.obj = param;
//	});
	
	export default {
		name: 'message_query',
		data() {
			return data;
		},
		methods: {
			search(){
				var param = this.info;
				console.log(this.picker)
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
			querySearch(){
				
			},
			handleSelect(){
				
			}
		},
		beforeCreate(){},
		mounted(){},
		components: {}
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
