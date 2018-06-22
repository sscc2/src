<template>
<div>
	<div class='header'>
		<span class='header_txt'>{{pageTxt.tabs[0]}}</span>
	</div>
	
	<div class="statist">
		<div>
			<header>
				<div class='title'><span>历史业务操作统计</span></div>
				<div class="lined">
					<span class="txt">{{pageTxt.lable3[0]}}</span>
					<el-select v-model="search2.sort" placeholder="请选择">
						<el-option v-for="item in pageTxt.options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<span class="txt t1">{{pageTxt.lable3[1]}}&nbsp;</span>
					<el-input class='input' v-model="search2.name"></el-input>
					<span class="txt t1">{{pageTxt.lable3[2]}}&nbsp;</span>
					<el-input class='input' v-model="search2.type"></el-input>
				</div>

				<div class="lined">
					<span class="txt">{{pageTxt.lable1[6]}}</span>
					<el-date-picker class='picker' v-model="search2.start" type="date" placeholder="选择日期"></el-date-picker>
					<span class="txt t1">{{pageTxt.lable1[7]}}&nbsp;</span>
					<el-date-picker class='picker' v-model="search2.end" type="date" placeholder="选择日期"></el-date-picker>
					<el-button class=' t1' type="" @click="search2.btn = 0" plain>{{pageTxt.lable1[8]}}</el-button>
					<el-button type="" @click="search2.btn = 1" plain>{{pageTxt.lable1[9]}}</el-button>
					<el-button type="" @click="search2.btn = 2" plain>{{pageTxt.lable1[10]}}</el-button>
					<el-button type="" @click="search2.btn = 3" plain>{{pageTxt.lable1[11]}}</el-button>
					<el-button type="" @click="search2.btn = 4" plain>{{pageTxt.lable1[12]}}</el-button>
				</div>
			</header>

			<el-table highlight-current-row  @current-change="currentRow2" :data="data3"  tooltip-effect="dark">
				<el-table-column prop="name" :label="pageTxt.list3[0]" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="type" :label="pageTxt.list3[1]" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="detail" :label="pageTxt.list3[2]" width="300" show-overflow-tooltip></el-table-column>
				<el-table-column prop="time" :label="pageTxt.list3[3]" width="180" show-overflow-tooltip></el-table-column>
				<el-table-column prop="state" :label="pageTxt.list3[4]" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column :label="pageTxt.list3[5]">
					<template slot-scope="scope">
						<i class="el-icon-search iconBtn" @click="showDialog2"></i>
					</template>
				</el-table-column>
			</el-table>
		<div class="_pagination" v-show="data3.length!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
			<div class="rightTxt">共{{maxData}}条数据</div>
		</div>
			<el-dialog class='dialog' :title="dialog2.title" :visible.sync="dialog2.visible">
				<ul>
					<li>
						<div class="label">{{pageTxt.lable3[4]}}</div>
						<div class="details">{{dialog2.info.name}}</div>
					</li><li>
						<div class="label">{{pageTxt.lable3[5]}}</div>
						<div class="details">{{dialog2.info.type}}</div>
					</li><li>
						<div class="label">{{pageTxt.lable3[6]}}</div>
						<div class="details">{{dialog2.info.detail}}</div>
					</li><li>
						<div class="label">{{pageTxt.lable3[7]}}</div>
						<div class="details">{{dialog2.info.time}}</div>
					</li><li>
						<div class="label">{{pageTxt.lable3[8]}}</div>
						<div class="details">{{dialog2.info.state}}</div>
					</li>
				</ul>
				<div slot="footer" class="dialog-footer">
					<el-button type='primary' @click="dialog2.visible = false">{{pageTxt.lable3[9]}}</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</div>	

</template>
<script>
import kit from '@/libs/kit.js';
import utils from '@/libs/utils.js';
	var pageTxt_cn = {
		tabs: ['稽核'],
		lable1: ['统计方式：','用户','用户类型','业务类型','SU','用户：','开始时间：','结束时间：','查询','今天','本周','本月','导出报表'],
		list1: ['用户ID','用户名','业务类型','业务类型','收包数','发包数'],
		lable2: ['用户','的离线记录','离线时间点','返回'],
		list2: ['用户ID','用户名','开始时间','结束时间','离线次数','操作'],
		lable3: ['排序方式：','操作员：','操作类型：','操作结果描述详情','操作员：','操作类型：','操作结果描述：','操作时间：','操作结果：','关闭'],
		options: [{value: '1',label: '最近'},{value: '2',label: '最早'}],
		list3: ['操作员','操作类型','操作结果描述','操作时间','操作结果','操作']
	};
	
	var pageTxt = pageTxt_cn;
	export default {
		name: 'message_statist',
		data(){
			return{
				maxData:124,
				pageTxt,
				tabs: 0,
				radio: 1,
				search0:{input:'',start:'',end:'',btn:''},
				search1:{start:'',end:'',btn:''},
				search2:{sort:'1',name:'',type:'',start:'',end:'',btn:''},
				data1: [{userId:'122',name:'罗春天',type:'类型1',collect:'5G',send:'500M'}],
				data2: [{userId:'AAC',name:'周冬天',start:'20180405',end:'20180505',num:'9'}],
				data3: [{name:'罗春天',type:'分发用户配置',detail:'detail操作详情',time:'2018-05-06 14:18:36',state:'成功'}],
				dialog1: {
					visible: false,
					title: '',
					data: [{time: 20180319}],
					info: {}
				},
				dialog2: {
					visible: false,
					title: pageTxt.lable3[3],
					info: {
						name: '',
						type: '',
						detail: '',
						time: '',
						state: ''
					}
				},
				itemWidth1: '120',
				itemWidth2: '180px'
			};
		},
		methods: {
			nav(e){
				var nav = kit('.nav .el-button', '#statist').delClass('navActive');
				nav.setAttr('style','').eq(this.tabs).addClass('navActive');
			},
			currentRow1(row){
				this.dialog1.info = row;
			},
			currentRow2(row){
				this.dialog2.info = row;
			},
			showDialog1(){
				var vm = this;
				setTimeout(function(){
					vm.dialog1.title = pageTxt.lable2[0]+vm.dialog1.info.name+pageTxt.lable2[1];
					vm.dialog1.visible = true;
				}, 0);
			},
			showDialog2(){
				this.dialog2.visible = true;
			},
			selectionChange(){},
			currentPage(){}
		},
		mounted: function(){
			var nav = kit('#statist .nav .el-button').eq(this.tabs);
			if(nav) nav.addClass('navActive');
		},
	};
</script>
<style scoped="scoped">
/* 头部 */
.header {height: 47px;border-bottom: 1px solid #ccc;}
.header_txt {font-size: 16px;  color: #656a73;  line-height: 47px;  margin-left: 17px;  font-weight: bold;}

 /* 文本 */
.statist{padding:22px;padding-top: 10px;}
.lined{margin-top: 15px; font-size: 14px; color: #666}
.lined *{vertical-align: middle;}
.t1{margin-left: 10px;}
.statist .input{width: 200px;}
.statist .picker{width: 200px;}
.lined .el-button{padding: 10px 12px;}


 /* 表格 */

 /* 分页 */

	.pagination{text-align: right;padding: 20px 0;}
	.t{font-size:20px;color:#409eff} 
	.iconBtn{padding: 6px 10px;font-size:20px;} 
 	
	.dialogList{max-height: 400px;overflow-y: auto;}
	.dialog li{display: block;}
	.dialog .label{ width: 120px;text-align: right;display: inline-block;vertical-align: top;}
	.dialog .details{display: inline-block;white-space: normal;vertical-align: top;width: calc(100% - 140px);} 

	.el-select{width: 200px;}

	.title{border-bottom:1px solid #EBEFF4}
	.title span{font-size: 16px; color:#333; line-height: 40px}

	.el-table{margin-top: 15px;}
	
</style>
