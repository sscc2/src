<template>
<div>
	<!-- 头部 -->
	<div class='header'>
			<span class='header_txt'>通信关系</span>
	</div>

	<!-- 文本 -->
	<div class="signal">
		<div class="userH">
			<span class="txt">{{pageTxt.signal[0]}}：</span>
			<el-select class='searchSel' v-model="searchInfo.type" placeholder="请选择">
				<el-option v-for="item in pageTxt.options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<span class="txt">{{pageTxt.signal[1]}}：</span>
			<el-input :model="searchInfo.ID"></el-input>
			<span class="txt">{{pageTxt.signal[2]}}：</span>
			<el-input :model="searchInfo.name"></el-input>
			<el-button type="primary" plain @click='search'>{{pageTxt.signal[3]}}</el-button>
		</div>

		<!-- 导航 -->
		<div class="btnBox">
			<div @click="dialogAdd=true"><img src="@/img/creatico.png"><span>{{pageTxt.signal[4]}}</span></div>
			<div @click="delUser"><img src="@/img/deletico.png"><span>{{pageTxt.signal[5]}}</span></div>
			<div @click=""><img src="@/img/creatico.png"><span>批量导出通信关系</span></div>
		</div>

		<!-- 表格 -->
		<el-table :data="list"  tooltip-effect="dark" @current-change="currentRow" highlight-current-row>
			<el-table-column width="55" type="index"></el-table-column>
			<el-table-column prop="type" label="业务类型" show-overflow-tooltip></el-table-column>
			<el-table-column prop="oId" label="源用户ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="oName" label="源用户名" show-overflow-tooltip></el-table-column>
			<el-table-column prop="nId" label="目的用户ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="nName" label="目的用户名" show-overflow-tooltip></el-table-column>
			<el-table-column label="操作" width="70" show-overflow-tooltip>
				<div slot-scope="scope" class="_zero">
					<img @click="delUser" src="@/img/deleticos.png">
				</div>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<div class="_pagination" v-show="list.length!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
			<div class="rightTxt">共{{maxData}}条数据</div>
		</div>
		<el-dialog width='620px' :title="pageTxt.dialog[0]" :visible.sync="dialogAdd">
			<ul class="_dialog">
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[1]}}</p>
					</div><div class="rightBox">
						<el-select class='sel' v-model="creatInfo.type" placeholder="请选择">
							<el-option v-for="item in pageTxt.options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li><li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[2]}}</p>
					</div><div class="rightBox">
						<el-select class='sel' v-model="creatInfo.user" placeholder="请选择">
							<el-option v-for="item in userOption" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li><li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[3]}}</p>
					</div><div class="rightBox">
						<el-select class='sel' v-model="creatInfo.other" multiple filterable allow-create default-first-option placeholder="请选择">
							<el-option v-for="item in otherOption" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<p class="txt" @click="clear">{{pageTxt.dialog[4]}}</p>
					</div>
				</li>
			</ul>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogAdd = false">{{pageTxt.dialog[6]}}</el-button>
			    <el-button type="primary" @click="submit">{{pageTxt.dialog[5]}}</el-button>
			</div>
		</el-dialog>
	</div>
</div>	
</template>

<script>
import utils    from '@/libs/utils.js';


	var pageTxt_cn = {
		tips: {user:'请在列表中选择一条记录！',del:'确认要删除该记录吗？',err:'请选择用户和对端用户！'},
		signal: ['业务类型 ','用户','对端用户','查询','创建通信关系','删除通信关系','业务类型','','','','','操作'],
		options: [{value: '0',label: '全部'},{value: '1',label: '三方存管'},{value: '2',label: '银期转账'},
			{value: '3',label: '银基转账'},{value: '4',label: '资金划拔'},{value: '5',label: '信证报盘'},
			{value: '6',label: '电子对账'},{value: '7',label: '融资融券'},{value: '8',label: '基金盘后'},
			{value: '9',label: '转融通'},{value: '10',label: 'B转H'},{value: '11',label: '交叉销售'},
			{value: '12',label: '报价回购'},{value: '13',label: '个股期权'},{value: '14',label: 'FISP'},
			{value: '15',label: '私券报转'},{value: '16',label: '云证通'},{value: '17',label: '基金实时业务'},
			{value: '18',label: '基金费用对账'}],
		dialog: ['创建通信关系','业务类型 ：','用户：','对端用户：','清空对端用户','提交','返回']
	},
	pageTxt_en = {};
	
	var pageTxt = pageTxt_cn;
	
	export default {
		name: 'mess_signal',
		data() {
			return {
				maxData:478,
				pageTxt,
				searchInfo: {type:'0',ID:'',name:''},
	        	list: [{type: '电子对账', oId: 'ftcsTest1000', oName: '王小虎',nId: 'ftcsTest2222',nName: '王小虎'}],
		        selects: [],
		        row: '',
		        dialogAdd: false,
		        creatInfo: {type:'0',user:'',other: []},
		        userOption: [],
		        otherOption: []
			};
		},
		methods: {
			search(e){
				utils.post('/info/query', this.searchInfo, function(res){
					console.log(res)
				});
			},
		    currentRow: function(e){
		    	this.row = e;
		    },
		    currentPage: function(e){
		    	console.log(e)
			},
			delUser(e){
				var _this = this;
				setTimeout(function(){
					var obj = _this.row;
					if(!obj){
						utils.confirm({message:pageTxt.tips.user,type:'2'});
						return;
					}
					utils.confirm({message:pageTxt.tips.user, fn:function(vm){
						utils.post('/info/delete',{},function(res){
							console.log(res)
						});
//						utils.confirm({message:'删除成功！',type:'1'});
						
					}, btn: 2});
				},0);
			},
			clear(e){
				this.creatInfo.other = [];
			},
			submit(){
				console.log(this.creatInfo.other)
			}
		}
	}
</script>

<style scoped="scoped">
	/* 头部 */
	.header{height:47px;  border-bottom:1px solid #ccc;}
	.header_txt{line-height:47PX;  font-size:16px;  color:#656a73;  line-height:47px;  margin-left:17px;  font-weight:bold;}

	/* 文本 */
	.signal{padding:22px}
	.user *{vertical-align:middle}
	.userH .el-input{width:210px;margin-right:10px}
	.searchSel{width: 120px;margin-right: 20px;line-height: 30px;}
	.userH >.el-button{margin-left:35px; width:90px; height:30px; background-color: #32ccf9; line-height:0px; border:0; color:white}
	.txt{font-size:13px; color:#666666;}

	/* 导航 */
	.btnBox{margin-bottom: 10px; margin-top: 18px; font-size: 13px; color:#5C759D; overflow: hidden;}
	.btnBox div{float: left; cursor: pointer; margin-left: 30px}
	.btnBox span{margin-left: 5px;}
	.btnBox div:nth-child(1){margin-left: 0;}

	/* 表格 */
	._zero > img{cursor: pointer; margin-left: 14px;}
	
	/* 分页 */
	.sel{width: 350px;line-height: 40px;}	

	.leftBox{height: 30px;  margin-top: 10px;}
</style>