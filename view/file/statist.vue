<!--消息统计-->
<template>
	<div>
		<!-- <div>
			<span>{{pageTxt.tabs[2]}}</span>
		</div> -->
		<!-- <hr class="hr"/> -->
		<div class="" v-show="tabs==0">
			<header>
				<div class="lined">
					<span class="txt">{{pageTxt.lable1[0]}}</span>
					<el-radio-group v-model="radio">
					    <el-radio :label="1">{{pageTxt.lable1[1]}}</el-radio>
					    <!-- <el-radio :label="2">{{pageTxt.lable1[2]}}</el-radio>
					    <el-radio :label="3">{{pageTxt.lable1[3]}}</el-radio>
					    <el-radio :label="4">{{pageTxt.lable1[4]}}</el-radio> -->
					</el-radio-group>
					<div class="inline">
						<span class="txt t1" v-show="radio==1">{{pageTxt.lable1[5]}}&nbsp;</span>
						<el-input class='input' v-model="search0.input" v-show="radio==1"></el-input>
					</div>
				</div>
				<div class="lined">
					<span class="txt">{{pageTxt.lable1[6]}}&nbsp;</span>
					<el-date-picker class='picker' v-model="search0.start" type="date" placeholder="选择日期"></el-date-picker>
					<span class="txt t1">{{pageTxt.lable1[7]}}&nbsp;</span>
					<el-date-picker class='picker' v-model="search0.end" type="date" placeholder="选择日期"></el-date-picker>
					<el-button class=' t1' type="" @click="search0.btn = 0" plain>{{pageTxt.lable1[8]}}</el-button>
					<el-button type="" @click="search0.btn = 1" plain>{{pageTxt.lable1[9]}}</el-button>
					<el-button type="" @click="search0.btn = 2" plain>{{pageTxt.lable1[10]}}</el-button>
					<el-button type="" @click="search0.btn = 3" plain>{{pageTxt.lable1[11]}}</el-button>
					<el-button type="" @click="search0.btn = 4" plain>{{pageTxt.lable1[12]}}</el-button>
				</div>
			</header>
			<el-table highlight-current-row ref="multipleTable" :data="data1" border tooltip-effect="dark" style="width: 100%" @selection-change="selectionChange">
				<el-table-column width="50" type="index"></el-table-column>
				<!--<el-table-column type="selection" width="55"></el-table-column>-->
				<el-table-column prop="userId" :label="pageTxt.list1[0]" :width="itemWidth1" show-overflow-tooltip></el-table-column>
				<el-table-column prop="name" :label="pageTxt.list1[1]" :width="itemWidth1" show-overflow-tooltip></el-table-column>
				<el-table-column prop="type" :label="pageTxt.list1[2]" :width="itemWidth1" show-overflow-tooltip></el-table-column>
				<el-table-column prop="collect" :label="pageTxt.list1[3]" :width="itemWidth1" show-overflow-tooltip></el-table-column>
				<el-table-column prop="send" :label="pageTxt.list1[4]" show-overflow-tooltip></el-table-column>
			</el-table>
			<div class="pagination" v-show="data1.length!=0">
				<el-pagination @current-change='' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
			</div>
		</div>
		<div class="" v-show="tabs==1">
			<header>
				<div class="lined">
					<span class="txt">{{pageTxt.lable1[6]}}&nbsp;</span>
					<el-date-picker class='picker' v-model="search1.start" type="date" placeholder="选择日期"></el-date-picker>
					<span class="txt t1">{{pageTxt.lable1[7]}}&nbsp;</span>
					<el-date-picker class='picker' v-model="search1.end" type="date" placeholder="选择日期"></el-date-picker>
					<el-button class=' t1' type="" @click="search1.btn = 0" plain>{{pageTxt.lable1[8]}}</el-button>
					<el-button type="" @click="search1.btn = 1" plain>{{pageTxt.lable1[9]}}</el-button>
					<el-button type="" @click="search1.btn = 2" plain>{{pageTxt.lable1[10]}}</el-button>
					<el-button type="" @click="search1.btn = 3" plain>{{pageTxt.lable1[11]}}</el-button>
					<el-button type="" @click="search1.btn = 4" plain>{{pageTxt.lable1[12]}}</el-button>
				</div>
			</header>
			<el-table highlight-current-row @current-change="currentRow1" :data="data2" border tooltip-effect="light" style="width: 100%" @selection-change="selectionChange">
				<el-table-column width="55" type="index"></el-table-column>
				<!--<el-table-column type="selection" width="55"></el-table-column>-->
				<el-table-column prop="userId" :label="pageTxt.list2[0]" :width="itemWidth1" show-overflow-tooltip></el-table-column>
				<el-table-column prop="name" :label="pageTxt.list2[1]" :width="itemWidth1" show-overflow-tooltip></el-table-column>
				<el-table-column prop="start" :label="pageTxt.list2[2]" :width="itemWidth2" show-overflow-tooltip></el-table-column>
				<el-table-column prop="end" :label="pageTxt.list2[3]" :width="itemWidth2" show-overflow-tooltip></el-table-column>
				<el-table-column prop="num" :label="pageTxt.list2[4]" :width="itemWidth1" show-overflow-tooltip></el-table-column>
				<el-table-column :label="pageTxt.list2[5]" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-button type='primary' plain class="el-icon-search iconBtn"  @click="showDialog1"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination" v-show="data2.length!=0">
				<el-pagination @current-change='' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
			</div>
			<el-dialog class='dialog' :title="dialog1.title" :visible.sync="dialog1.visible">
				<el-table class='dialogList' :data="dialog1.data"  highlight-current-row ref="multipleTable" border tooltip-effect="dark"><!--light-->
					<el-table-column width="55" type="index"></el-table-column>
					<!--<el-table-column type="selection" width="55"></el-table-column>-->
					<el-table-column prop="time" :label="pageTxt.lable2[2]"></el-table-column>
				</el-table>
				<div slot="footer" class="dialog-footer">
					<el-button type='primary' @click="dialog1.visible = false">{{pageTxt.lable2[3]}}</el-button>
				</div>
			</el-dialog>
		</div>
		<div class="" v-show="tabs==2">
			<header>
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
					<span class="txt">{{pageTxt.lable1[6]}}&nbsp;</span>
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
			<el-table highlight-current-row  @current-change="currentRow2" :data="data3" border tooltip-effect="dark">
				<el-table-column width="50" type="index"></el-table-column>
				<!--<el-table-column type="selection" width="55"></el-table-column>-->
				<el-table-column prop="name" :label="pageTxt.list3[0]" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="type" :label="pageTxt.list3[1]" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="detail" :label="pageTxt.list3[2]" width="300" show-overflow-tooltip></el-table-column>
				<el-table-column prop="time" :label="pageTxt.list3[3]" width="180" show-overflow-tooltip></el-table-column>
				<el-table-column prop="state" :label="pageTxt.list3[4]" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column :label="pageTxt.list3[5]">
					<template slot-scope="scope">
						<el-button type='primary' plain class="el-icon-search iconBtn" @click="showDialog2"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination" v-show="data1.length!=0">
				<el-pagination @current-change='' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
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
</template>
<script>
import kit from '@/libs/kit.js';
import utils from '@/libs/utils.js';
	var pageTxt_cn = {
		tabs: ['历史业务量统计', '离线历史统计', '历史业务操作统计'],
		lable1: ['统计方式:','用户','用户类型','业务类型','SU','用户:','开始时间:','结束时间:','查询','今天','本周','本月','导出报表'],
		list1: ['用户ID','用户名','业务类型','业务类型','收包数','发包数'],
		lable2: ['用户','的离线记录','离线时间点','返回'],
		list2: ['用户ID','用户名','开始时间','结束时间','离线次数','操作'],
		lable3: ['排序方式:','操作员:','操作类型:','操作结果描述详情','操作员：','操作类型：','操作结果描述：','操作时间：','操作结果：','关闭'],
		options: [{value: '1',label: '最近'},{value: '2',label: '最早'}],
		list3: ['操作员','操作类型','操作结果描述','操作时间','操作结果','操作']
	};
	
	var pageTxt = pageTxt_cn;
	export default {
		name: 'message_statist',
		data(){
			return{
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
			selectionChange(){}
		},
		mounted: function(){
			var nav = kit('#statist .nav .el-button').eq(this.tabs);
			if(nav) nav.addClass('navActive');
		},
	};
</script>
<style scoped="scoped">
	.el-button{font-size: 16px;}
	.navActive{color: #3a8ee6;border-color: #3a8ee6;}
	.hr{margin: 15px 0;border: none;height: 1px;background: #C0C4CC;}
	.lined{margin-bottom: 15px;}
	.lined *{vertical-align: middle;}
	.inline{display: inline-block; height: 40px;}
	.txt{font-size: 16px;}
	.t1{margin-left: 10px;}
	.statist .el-radio{margin-left:10px}
	.statist .input{width: 240px;}
	.statist .picker{width: 200px;}
	.lined .el-button{padding: 10px 12px;}
	
	.pagination{text-align: right;padding: 20px 0;}
	.t{font-size:20px;color:#409eff}
	.iconBtn{padding: 6px 10px;font-size:20px;}
	
	.dialogList{max-height: 400px;overflow-y: auto;}
	.dialog li{display: block;}
	.dialog .label{ width: 120px;text-align: right;display: inline-block;vertical-align: top;}
	.dialog .details{display: inline-block;white-space: normal;vertical-align: top;width: calc(100% - 140px);}
	
</style>
<style>
	.statist .el-radio, .statist .el-radio__label{font-size: 16px;}
	/*.statist .el-radio__inner{width: 16px;height: 16px;}*/
</style>