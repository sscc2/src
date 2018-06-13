<template>
	<div class="signal">
		<header>
			<!-- 文本 -->
			<div class="user">
				<span class="txt">用户ID：313213</span>
				<span class="txt">{{pageTxt.signal[0]}}：</span>
				<el-select v-model="signalData.value" placeholder="请选择">
					<el-option v-for="item in pageTxt.options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>

				<span class="txt">{{pageTxt.signal[2]}}：</span>
				<el-input :model="userParam.name"></el-input>
				<el-button type="primary" plain @click='userSearch($event)'>{{pageTxt.signal[3]}}</el-button>
			</div>
			<!-- 导航 -->
			<div class="btnBox">
				<div><img src="@/img/creat2.png" > {{pageTxt.signal[4]}}</div>
				<div><img src="@/img/delet2.png" > {{pageTxt.signal[5]}}</div>
			</div>
		</header>
		<!-- 表格 -->
		<el-table :data="signalData.data" border tooltip-effect="dark" @current-change="currentRow" highlight-current-row>
			<el-table-column width="55" type="index"></el-table-column>
			<el-table-column prop="type" label="业务类型" show-overflow-tooltip></el-table-column>
			<el-table-column prop="oId" label="源用户ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="oName" label="源用户名" show-overflow-tooltip></el-table-column>
			<el-table-column prop="nId" label="目的用户ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="nName" label="目的用户名" show-overflow-tooltip></el-table-column>
			<el-table-column label="操作" width="70" show-overflow-tooltip>
				<template slot-scope="scope">
					<img src="@/img/delet2.png">			
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination" v-show="signalData.data.length!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
		</div>
		<el-dialog :title="pageTxt.dialog[0]" :visible.sync="editEkdy">
			
			<div slot="footer" class="dialog-footer">
			    <el-button @click="editEkdy = false">{{pageTxt.dialog[12]}}</el-button>
			    <el-button type="primary" @click="currentRow">{{pageTxt.dialog[11]}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	var pageTxt_cn = {
		tips: {},
		signal: ['业务类型 ','用户','对端用户','查询','创建通信关系','删除通信关系','业务类型','','','','','操作'],
		options: [{value: '0',label: '全部'},{value: '1',label: '三方存管'},{value: '2',label: '银期转账'},
		{value: '3',label: '银基转账'},{value: '4',label: '资金划拔'},{value: '5',label: '信证报盘'},
		{value: '6',label: '电子对账'}],
		dialog: ['创建通信关系']
	},
	pageTxt_en = {};
	
	var pageTxt = pageTxt_cn;
	
	export default {
		name: 'userSignal',
		data() {
			return {
				pageTxt: pageTxt,
				userParam: {ID:'',name:'',max:'20'},
				signalData: {
		        	type: '',
		        	oName: '',
		        	nName: '',
			        value: '0',
		        	data: [{type: '电子对账', oId: 'ftcsTest1000', oName: '王小虎',nId: 'ftcsTest2222',nName: '王小虎'}],
			        selects: []
		        },
		        info:{},
		        editEkdy:false
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
	/* 头部 */
	.user *{vertical-align:middle}
	.user .txt{font-size:14px;line-height:40px;height:40px; color:#666}
	.user .el-input{width:160px;margin-right:10px; height:30px !important;}
	.user .el-button{margin-left:40px; width: 90px; height: 30px; line-height: 7px}
	.user .red{color:#f56c6c}
	/* 文本 */

	/* 导航 */

	/* 表格 */

	/* 分页 */



	.btnBox{overflow: hidden; margin-bottom: 10px;}
	.btnBox div{font-size: 13px; color:#5C759D; float: left;cursor: pointer;}
	.btnBox div:last-child{margin-left: 35px;  }


	.iconSize1{font-size:20px;color:#409eff}
	.iconSize2{font-size:20px;color:#f56c6c}
	.pagination{text-align: right;padding: 20px 0;}
	
	.signal .el-select{width: 120px;margin-right: 10px;}
	.form li{margin-bottom: 10px;}
	.label{display: inline-block;width: 150px;text-align: right;vertical-align: top;}
	.rightInput{display: inline-block;vertical-align: top;padding-left: 10px;}
	.txt:nth-child(2){margin-left: 55px;}
	.txt:nth-child(4){margin-left: 65px;}
	.el-input__inner{height: 30px; width: 160px !important;}
	.el-input .el-input--big .el-input--suffix{height: 30px !important;}
 /* 啊时间来得及菲拉斯建立防控 */
</style>