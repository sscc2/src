<template>
	<div class="userSet">
		<div class="searchBox">
			<h2 class="h2">{{pageTxt.label[0]}}</h2>
			<hr class="_hr" />
			<label class="txt">{{pageTxt.label[1]}}</label>
			<el-input placeholder="" v-model="userID" clearable></el-input>
			<!--<label class="txt">{{pageTxt.label[2]}}</label>
			<el-input placeholder="" v-model="userName" clearable></el-input>-->
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
		<el-table highlight-current-row  @current-change="currenRow" :data="data" tooltip-effect="dark">
			<!--<el-table-column width="50" type="index"></el-table-column>-->
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="userID" :label="pageTxt.list[0]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName" :label="pageTxt.list[1]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="maxPubsCount" :label="pageTxt.list[2]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="maxSubsCount" :label="pageTxt.list[3]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="maxDaysOfTopic" :label="pageTxt.list[4]" show-overflow-tooltip></el-table-column>
			<el-table-column :label="pageTxt.list[5]" width='60'>
				<div slot-scope="scope" class="_zero">
					<!--<el-button class='_iBtn' type='primary' plain @click="edit">
						<img src="@/img/altericos.png" alt="">
					</el-button>-->
					<img @click="edit" src="@/img/theme/edit_2.png" alt="">
				</div>
			</el-table-column>
		</el-table>
		<div class="_pagination" v-show="max!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='15' :total="max"></el-pagination>
			<div class="rightTxt">
				共{{max}}条数据
			</div>
		</div>
	</div>
</template>

<script>
import kit       from '@/libs/kit.js';
import utils     from '@/libs/utils.js';
import globalVar from '@/libs/globalVar.js';
import observer  from '@/libs/observer.js';


	var lang = {}, pageTxt, _this;
	lang.cn = {
		tips: {},
		label: ['用户配置','用户ID：','用户名称：','查询','用户总数：','修改配置信息'],
		list: ['用户ID','用户名称','允许发布主题个数','允许订阅主题个数','发布主题有效天数','操作']
	};
	lang.en = {};
	pageTxt = lang[globalVar.get('lang')];
	
	var data = {
		pageTxt,
		userID: '',
		userName: '',
		data: [/*{userID:'用户ID',userName:'用户名称',maxPubsCount:'允许发布主题个数',maxSubsCount:'允许订阅主题个数',maxDaysOfTopic:'发布主题有效天数'}*/],
		row: '',
		selects: [],
		max: 0
	};
//	for (var i = 0; i < 30; i++) {
//		data.data.push({userID:'49821',userName:'ABC',maxPubsCount:'5',maxSubsCount:'5',maxDaysoftopic:'2020'});
//	}
//	observer.addBinding('messUpload', function(master, param){
//		if(master != 'messUpload') return;
//		data.obj = param;
//	});
	
	export default {
		name: 'message_userSet',
		data() {
			return data;
		},
		methods: {
			search(){
				var param = {
					id: this.userID,
					name: this.userName
				};
				utils.post('mx/userinfo/add', param, function(res){
					console.log(res);
				});
			},
			currenRow(row){
				this.row = row;
				console.log(row)
			},
			currentPage(){
				
			},
			editAll(){
				this.$router.replace({ path: "/message/userEdit/mess_userSet" });
			},
			edit(){
				this.$router.replace({ path: "/message/userEdit/mess_userSet" });
			}
		},
		mounted(){
			_this = this;
			utils.post('mx/userPsConfig/query',{cmdID: '600041',userID:''},function(data){
				console.log('订阅配置：',data);
				if(data.errcode < 0) return utils.weakTips(data.errinfo);
				_this.data = data.lists;
				_this.max = data.count;
			});
		}
	}
</script>

<style scoped="scoped">
	.userSet{padding: 0 20px;white-space: nowrap;color: #333;}
	.h2{font-size: 16px;line-height: 44px;color: #666;}
	._hr{margin: 0 0 10px;margin-left: -20px;}
	.searchBox *{vertical-align: middle;}
	.txt{font-size: 14px;line-height: 30px;padding-left: 10px;}
	.el-input{width: 180px;line-height: 30px;}
	.btnS{margin-left: 10px;line-height: 30px;padding: 0 14px;}
	.btnTxt{color: #5a769e;}
	.el-button *{vertical-align: middle;}
</style>