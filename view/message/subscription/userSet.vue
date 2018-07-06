<template>
	<div class="userSet">
		<div class="searchBox">
			<h2 class="h2">{{pageTxt.label[0]}}</h2>
			<hr class="_hr" />
			<label class="txt">{{pageTxt.label[1]}}</label>
			<el-autocomplete @input='autoInput' class="elInput" v-model="idName" :fetch-suggestions="fetch" 
				:trigger-on-focus="false" @select="idSelect">
				<div slot-scope="{item}">
					<span>{{item.userID}}</span>
				    <span>({{item.userName}})</span>
				</div>
			</el-autocomplete>
			<!--<label class="txt">{{pageTxt.label[2]}}</label>
			<el-input placeholder="" v-model="userName"></el-input>-->
			<button class='blueBtn' type='primary' @click='search'>{{pageTxt.label[3]}}</button>
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
	</div>
</template>

<script>
import utils     from '@/libs/utils.js';
import lang      from '@/language/lang.js';


	var pageTxt, _this, autoTime, _currentPage = 1, isInput = false;
	pageTxt = lang.themeUserSet;
	
	var data = {
		pageTxt,
		userID: '',
		userName: '',
		idName: '',
		data: [/*{userID:'用户ID',userName:'用户名称',maxPubsCount:'允许发布主题个数',maxSubsCount:'允许订阅主题个数',maxDaysOfTopic:'发布主题有效天数'}*/],
		row: '',
		selects: [],
		size: 20,
		max: 0
	};

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
				isInput = false;
				this.userID = item.userID;
				this.idName = item.userID+'('+item.userName+')';
			},
			autoInput(){
				isInput = true;
			},
			search(){
				search(_currentPage=1);
			},
			currenRow(row){
				this.row = row;
//				console.log(row)
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
			editAll(){
				var row = this.selects;
				if(row.length != 1){
					utils.weakTips(this.pageTxt.tips.user);
					return;
				}
				this.$store.state.tabv = 'v1';
				this.$store.state.transferEditID = row[0].userID;
				this.$store.state.editBack = "/message/userSet"
				utils.goto('/message/userEdit/mess_userSet');
			},
			edit(row){
				this.$store.state.tabv = 'v1';
				this.$store.state.transferEditID = row.userID;
				this.$store.state.editBack = "/message/userSet"
				utils.goto('/message/userEdit/mess_userSet');
			}
		},
		mounted(){
			_this = this;
			this.idName = this.userID = '';
			this.size = 20;
			search(_currentPage = 1);
		}
	};
	function search(num, size){
		var userID = isInput ? _this.idName : _this.userID;
		var info = {
			cmdID: '600041', userID: userID,
			pageSize: size||_this.size,
			currentPage: num||_currentPage,
		};
		utils.post('mx/userPsConfig/query', info, function(data){
//			console.log('订阅配置：',data);
			if(data.errcode < 0) return utils.weakTips(data.errinfo);
			_this.data = data.lists;
			_this.max = parseInt(data.totalSize)||_this.data.length;
		});
	}
</script>

<style scoped="scoped">
	.userSet{padding: 0 20px;white-space: nowrap;color: #333;}
	.h2{font-size: 16px;line-height: 44px;color: #666;font-weight: bold;}
	._hr{margin: 0 0 10px;margin-left: -20px;}
	.searchBox *{vertical-align: middle;}
	.txt{font-size: 14px;line-height: 30px;padding-right: 10px;}
	.elInput{width: 240px;line-height: 1;margin-right: 35px;}
	.blueBtn{margin-right: 35px;}
	.btnTxt{color: #5a769e;}
	.el-button *{vertical-align: middle;}
	.onePage{font-size: 13px;line-height: 28px;color: #999;text-align: center;margin-top: 23px;}
</style>