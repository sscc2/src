<template>
	<div class="userSet">
		<div class="searchBox">
			<h2 class="h2">{{pageTxt.label[0]}}</h2>
			<hr class="_hr" />
			<label class="txt">{{pageTxt.label[1]}}</label>
			<el-autocomplete @input='autoInput' class="autocomplete" v-model="idName" :fetch-suggestions="fetch" 
				:trigger-on-focus="false" @select="idSelect">
				<div slot-scope="{item}">
					<span class="name">{{item.userID}}</span>
				    <span class="addr">({{item.userName}})</span>
				</div>
			</el-autocomplete>
			<!--<label class="txt">{{pageTxt.label[2]}}</label>
			<el-input placeholder="" v-model="userName"></el-input>-->
			<el-button class='btnS' type='primary' @click='search'>{{pageTxt.label[3]}}</el-button>
			<label class="txt">{{pageTxt.label[4]}}</label>
			<span class="txt">{{max}}</span>
		</div>
		<div class="btnBox">
			<el-button @click='editAll' class='btn' type='text'>
				<img src="../../../img/theme/edit_1.png"/>
				<span class="btnTxt">{{pageTxt.label[5]}}</span>
			</el-button>
		</div>
		<el-table highlight-current-row  @current-change="currenRow" @selection-change="selectionRow" :data="data" tooltip-effect="dark">
			<!--<el-table-column width="50" type="index"></el-table-column>-->
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="userID" :label="pageTxt.list[0]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName" :label="pageTxt.list[1]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="maxPubsCount" :label="pageTxt.list[2]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="maxSubsCount" :label="pageTxt.list[3]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="maxDaysOfTopic" :label="pageTxt.list[4]" show-overflow-tooltip></el-table-column>
			<el-table-column :label="pageTxt.list[5]" width='60'>
				<div slot-scope="scope" class="_zero">
					<img @click="edit(scope.row)" src="@/img/theme/edit_2.png" alt="">
				</div>
			</el-table-column>
		</el-table>
		<div class="_pagination">
			<el-pagination @current-change='currentPage' @size-change="pageSize" :page-size='size' :total="100" 
				layout="total, sizes, prev, pager, next, jumper" background></el-pagination>
			<div class="rightTxt">
				共{{max}}条数据
			</div>
		</div>
	</div>
</template>

<script>
import utils     from '@/libs/utils.js';
import globalVar from '@/libs/globalVar.js';
import lang      from '@/language/lang.js';
import observer  from '@/libs/observer.js';


	var pageTxt, _this, autoTime;
	pageTxt = lang.themeUserSet;
	
	var data = {
		pageTxt,
		userID: '',
		userName: '',
		idName: '',
		data: [{userID:'用户ID',userName:'用户名称',maxPubsCount:'允许发布主题个数',maxSubsCount:'允许订阅主题个数',maxDaysOfTopic:'发布主题有效天数'}],
		row: '',
		selects: [],
		size: 20,
		max: 0
	};
//	for (var i = 0; i < 30; i++) {
//		data.data.push({userID:'49821',userName:'ABC',maxPubsCount:'5',maxSubsCount:'5',maxDaysoftTopic:'2020'});
//	}
//	observer.addBinding('messUpload', function(master, param){
//		if(master != 'messUpload') return;
//		data.obj = param;
//	});
	function autoInput(str, cb){
		if(!str) return;
//		console.time('请求用户ID...');
		utils.getUserid(str, function(data){
//			console.log('用户ID data',data);
			var i,len = data.length,tem=[];
			for (i = 0; i < len; i++) {
				if(data[i].label.indexOf(str)!=-1) tem.push(data[i]);
			}
			cb(tem);
//			console.timeEnd('请求用户ID...');
		});
	}
	export default {
		name: 'message_userSet',
		data() {
			return data;
		},
		methods: {
			fetch(str, cb){
				clearTimeout(autoTime);
				autoTime = setTimeout(autoInput, 300, str, cb);
			},
			idSelect(item){
				this.userID = item.userID;
				this.idName = item.userID+'('+item.userName+')';
			},
			autoInput(str){
//				clearTimeout(autoTime);
//				autoTime = setTimeout(autoInput, 300, str);
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
		    pageSize(val){
		    	this.size = val;
//		    	console.log(`每页 ${val} 条`);
		    },
			currentPage(val){
				console.log(`当前页: ${val}`,`每页 ${this.size} 条`);
			},
			editAll(){
				var row = this.selects;
				if(row.length != 1){
					utils.weakTips(this.pageTxt.tips.user);
					return;
				}
				this.$store.state.transferEditID = row[0].userID;
				this.$router.replace({ path: "/message/userEdit/mess_userSet" });
			},
			edit(row){
				this.$store.state.transferEditID = row.userID;
				this.$router.replace({ path: "/message/userEdit/mess_userSet" });
			}
		},
		mounted(){
			_this = this;
			search();
			useridList();
		}
	};
	function search(){
		var info = {cmdID: '600041', userID: _this.userID};
		utils.post('mx/userPsConfig/query', info, function(data){
//			console.log('订阅配置：',data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			_this.data = data.lists;
			_this.max = parseInt(data.count)||0;
		});
	}
	var idList = [];
	function useridList(){
		idList = globalVar.useridList();
		var call = function(master){
			if(master != 'useridReady') return;
			observer.delBinding('useridReady', call);
			idList = globalVar.useridList(); call = null;
		}
		if(!idList.length) observer.addBinding('useridReady', call);
	}
</script>

<style scoped="scoped">
	.userSet{padding: 0 20px;white-space: nowrap;color: #333;}
	.h2{font-size: 16px;line-height: 44px;color: #666;}
	._hr{margin: 0 0 10px;margin-left: -20px;}
	.searchBox *{vertical-align: middle;}
	.txt{font-size: 14px;line-height: 30px;padding-left: 10px;}
	.autocomplete{width: 240px;line-height: 30px;}
	.btnS{margin-left: 10px;line-height: 30px;padding: 0 14px;}
	.btnTxt{color: #5a769e;}
	.el-button *{vertical-align: middle;}
</style>