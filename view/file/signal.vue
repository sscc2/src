<template>
	<div class="signal">
		<header>
			<div class="user">
				<span class="txt">{{pageTxt.signal[0]}}：</span>
				<el-select v-model="signalData.value" placeholder="请选择">
					<el-option v-for="item in signalData.options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<span class="txt">{{pageTxt.signal[1]}}：</span>
				<el-input :model="userParam.name"></el-input>
				<span class="txt">{{pageTxt.signal[2]}}：</span>
				<el-input :model="userParam.name"></el-input>
				<el-button type="primary" plain @click='userSearch($event)'>{{pageTxt.signal[3]}}</el-button>
			</div>
			<div class="btnBox">
				<el-button type="" @click="userAdd($event)" icon="el-icon-circle-plus-outline" plain>{{pageTxt.signal[4]}}</el-button>
				<el-button type="" @click="userEdit($event)" icon="el-icon-edit" plain>{{pageTxt.signal[5]}}</el-button>
			</div>
		</header>
		<el-table :data="signalData.data" border tooltip-effect="dark" @current-change="currentRow" highlight-current-row>
			<el-table-column width="55" type="index"></el-table-column>
			<!--<el-table-column type="selection" width="55"></el-table-column>-->
			<el-table-column prop="type" label="业务类型" width="240"></el-table-column>
			<el-table-column prop="oId" label="源用户ID" width="240"></el-table-column>
			<el-table-column prop="oName" label="源用户名" width="240"></el-table-column>
			<el-table-column prop="nId" label="目的用户ID" width="240"></el-table-column>
			<el-table-column prop="nName" label="目的用户名" width="240"></el-table-column>
			<el-table-column label="操作" show-overflow-tooltip>
				<template slot-scope="scope">
					<!--<i class="el-icon-edit-outline iconSize1"></i>-->
					<i class="el-icon-close iconSize2"></i>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination" v-show="signalData.data.length!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
		</div>
	</div>
</template>

<script>
	var pageTxt_cn = {
		tips: [''],
		signal: ['业务类型 ','用户','对端用户','查询','创建通信关系','删除通信关系','业务类型','','','','','操作'],
	},
	pageTxt_en = {};
	
	var pageTxt = pageTxt_cn;
	
	export default {
		name: 'file_signal',
		data() {
			return {
				pageTxt: pageTxt,
				userParam: {ID:'',name:'',max:'20'},
				signalData: {
		        	type: '',
		        	oName: '',
		        	nName: '',
		        	options: [{
			        	value: '0',
			        	label: '全部'
			        },{
			        	value: '1',
			        	label: '三方存管'
			        },{
			        	value: '2',
			        	label: '银期转账'
			        },{
			        	value: '3',
			        	label: '银基转账'
			        },{
			        	value: '4',
			        	label: '资金划拔'
			        },{
			        	value: '5',
			        	label: '信证报盘'
			        },{
			        	value: '6',
			        	label: '电子对账'
			        }],
			        value: '0',
		        	data: [{type: '电子对账', oId: 'ftcsTest1000', oName: '王小虎',nId: 'ftcsTest2222',nName: '王小虎'}],
			        selects: []
		        }
			};
		},
		methods: {
		    currentRow: function(e){
		    	console.log(e)
		    },
		    currentPage: function(e){
		    	console.log(e)
			},
			
		}
	}
</script>

<style scoped="scoped">
	.user{padding:16px 8px}.user *{vertical-align:middle}
	.user .txt{font-size:16px;line-height:40px;height:40px}
	.user .el-input{width:210px;margin-right:10px}
	.user .el-button{margin-right:10px}
	.user .red{color:#f56c6c}
	.btnBox .el-button{margin:0;border-left-width:none}
	.iconSize1{font-size:20px;color:#409eff}
	.iconSize2{font-size:20px;color:#f56c6c}
	.pagination{text-align: right;padding: 20px 0;}
	
	.signal .el-select{width: 120px;margin-right: 10px;}
	
</style>