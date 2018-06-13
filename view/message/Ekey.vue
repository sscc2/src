<template>
<div>
	<!-- 头部 -->
	<div class='header'>
			<span class='header_txt'>Ekey</span>
	</div>	
	<!-- 文本 -->
	<div class="Ekey">
		<div class="user">
			<span class="txt">{{pageTxt.Ekey[0]}}：</span>
			<el-radio-group class='eRadio' v-model="radio">
			    <el-radio :label="1">{{pageTxt.Ekey[1]}}</el-radio>
			    <el-radio :label="2">{{pageTxt.Ekey[2]}}</el-radio>
			</el-radio-group>
			<span v-show='radio==1' class="txt">{{pageTxt.Ekey[3]}}：</span>
			<el-input v-show='radio==1' :model="EkeyData.EkeyName" placeholder="/C=CN/CN=" value='/C=CN/CN='></el-input>
			<span v-show='radio==2' class="txt">用户：</span>
			<el-input v-show='radio==2' :model="EkeyData.EkeyName" placeholder=""></el-input>
			<el-button type="primary" plain @click='search'>{{pageTxt.Ekey[4]}}</el-button>
		</div>
		<!-- 导航 -->
		<div class="btnBox">
			<div id='Add'  @click="showAdd" ><img src="@/img/creatico.png" ><span> {{pageTxt.Ekey[5]}}</span></div>
			<div id='Edit' @click="showEdit" ><img src="@/img/alterico.png" ><span>{{pageTxt.Ekey[6]}}</span></div>
			<div @click="del"><img src="@/img/deletico.png" > <span>{{pageTxt.Ekey[7]}}</span></div>
			<div @click="del"><img src="@/img/creatico.png" ><span>批量导出Ekey</span></div>
		</div>
		<!-- 表格 -->
		<el-table v-show='radio==1' :data="EkeyData.data"  tooltip-effect="dark" @current-change="currentRow" highlight-current-row >
			<el-table-column width="55" type="index"></el-table-column>
			<el-table-column prop="Ekey" label="Ekey名" show-overflow-tooltip></el-table-column>
			<el-table-column prop="id" label="用户ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="name" label="用户名" show-overflow-tooltip></el-table-column>
			<el-table-column label="操作" width="110">
				<div slot-scope="scope" class="_zero">
					<div><img src="@/img/altericos.png"> </div>
					<div><img src="@/img/deleticos.png" ></div>
				</div>
			</el-table-column>
		</el-table>
		<el-table v-show='radio==2' :data="data2" tooltip-effect="dark" @current-change="currentRow" highlight-current-row>
			<el-table-column width="55" type="index"></el-table-column>
			<el-table-column prop="Ekey" label="Ekey名"  show-overflow-tooltip></el-table-column>
			<el-table-column label="操作">
				<div slot-scope="scope" class="_zero">
					<div><img src="@/img/altericos.png"> </div>
					<div><img src="@/img/deleticos.png" ></div>
				</div>
			</el-table-column>
		</el-table>
		<el-dialog :title="pageTxt.dialog[0]" :visible.sync="addEkey" width='620px'>
			<ul class="_dialog">
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[2]}}</p>
					</div><div class="rightBox">
						<el-input @blur='checkAdd' name='id' class='picker' v-model="info.id" :placeholder="pageTxt.dialog[13]"></el-input>
						<span class="txt red" v-show="err1.id">{{pageTxt.tips.id}}</span>
					</div>
				</li><li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[3]}}</p>
					</div><div class="rightBox">
						<el-input @blur='checkAdd' name='Ekey' class='picker' v-model="info.Ekey" :placeholder="pageTxt.dialog[13]"></el-input>
						<span class="txt red" v-show="err1.Ekey">{{pageTxt.tips.Ekey}}</span>
					</div>
				</li><li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[4]}}</p>
					</div><div class="rightBox">
						<el-input @blur='checkAdd' name='pass' class='picker' v-model="info.pass" :placeholder="pageTxt.dialog[13]"></el-input>
						<span class="txt red" v-show="err1.pass">{{pageTxt.tips.pass}}</span>
					</div>
				</li><li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[5]}}</p>
					</div><div class="rightBox">
						<el-input class='picker' v-model="info.notes" :placeholder="pageTxt.dialog[13]"></el-input>
					</div>
				</li><li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[6]}}</p>
					</div><div class="rightBox">
						<el-date-picker class='picker' v-model="info.valid" value-format="yyyy年MM月dd日 HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]"></el-date-picker>
					</div>
				</li><li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[7]}}</p>
					</div><div class="rightBox">
						<el-checkbox class='checkbox' v-model="info.check"></el-checkbox>
					</div>
				</li><li v-show="info.check">
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[8]}}</p>
					</div><div class="rightBox">
						<el-date-picker @blur='checkAdd' name='start' class='picker' v-model="info.start" value-format="yyyy年MM月dd日 HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]">
						</el-date-picker>
						<span class="txt red" v-show="err1.start">{{pageTxt.tips.start}}</span>
					</div>
				</li><li v-show="info.check">
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[9]}}</p>
					</div><div class="rightBox">
						<el-date-picker @blur='checkAdd' name='end' class='picker' v-model="info.end" value-format="yyyy年MM月dd日 HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]">
						</el-date-picker>
						<span class="txt red" v-show="err1.end">{{pageTxt.tips.end}}</span>
					</div>
				</li>
			</ul>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="addEkey = false">{{pageTxt.dialog[12]}}</el-button>
			    <el-button type="primary" @click="submitAdd">{{pageTxt.dialog[11]}}</el-button>
			</div>
		</el-dialog>
		
		<el-dialog :title="pageTxt.dialog[1]" :visible.sync="editEkdy" width='620px'>
			<ul class="_dialog">
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[2]}}</p>
					</div><div class="rightBox">
						<el-input @blur='checkEdit' name='id' class='picker' v-model="eInfo.id" :placeholder="pageTxt.dialog[13]"></el-input>
						<span class="txt red" v-show="err2.id">{{pageTxt.tips.id}}</span>
					</div>
				</li><li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[3]}}</p>
					</div><div class="rightBox">
						<el-input @blur='checkEdit' name='Ekey' class='picker' v-model="eInfo.Ekey" :placeholder="pageTxt.dialog[13]"></el-input>
						<span class="txt red" v-show="err2.Ekey">{{pageTxt.tips.Ekey}}</span>
					</div>
				</li><li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[10]}}</p>
					</div><div class="rightBox">
						<el-checkbox class='checkbox' v-model="eInfo.check1"></el-checkbox>
					</div>
				</li><li v-show="eInfo.check1">
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[4]}}</p>
					</div><div class="rightBox">
						<el-input @blur='checkEdit' name='pass' class='picker' v-model="eInfo.pass" :placeholder="pageTxt.dialog[13]"></el-input>
						<span class="txt red" v-show="err2.pass">{{pageTxt.tips.pass}}</span>
					</div>
				</li><li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[5]}}</p>
					</div><div class="rightBox">
						<el-input class='picker' v-model="eInfo.notes" :placeholder="pageTxt.dialog[13]"></el-input>
					</div>
				</li><li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[6]}}</p>
					</div><div class="rightBox">
						<el-date-picker class='picker' v-model="eInfo.valid" value-format="yyyy年MM月dd日 HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]"></el-date-picker>
					</div>
				</li><li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[7]}}</p>
					</div><div class="rightBox">
						<el-checkbox class='checkbox' v-model="eInfo.check"></el-checkbox>
					</div>
				</li><li v-show="eInfo.check">
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[8]}}</p>
					</div><div class="rightBox">
						<el-date-picker @blur='checkEdit' name='start' class='picker' v-model="eInfo.start" value-format="yyyy年MM月dd日 HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]">
						</el-date-picker>
						<span class="txt red" v-show="err2.start">{{pageTxt.tips.start}}</span>
					</div>
				</li><li v-show="eInfo.check">
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[9]}}</p>
					</div><div class="rightBox">
						<el-date-picker @blur='checkEdit' name='end' class='picker' v-model="info.end" value-format="yyyy年MM月dd日 HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]">
						</el-date-picker>
						<span class="txt red" v-show="err2.end">{{pageTxt.tips.end}}</span>
					</div>
				</li>
			</ul>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="editEkdy = false">{{pageTxt.dialog[12]}}</el-button>
			    <el-button type="primary" @click="submitEdit">{{pageTxt.dialog[11]}}</el-button>
			</div>
		</el-dialog>
		<!-- 分页 -->
		<div class="_pagination" v-show="data2.length!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
			<div class="rightTxt">共{{maxData}}条数据</div>
		</div>

	</div>
</div>	
</template>

<script>
import kit   from '@/libs/kit.js';
import utils from '@/libs/utils.js';

	var pageTxt_cn = {
		tips: {
			id:'请输入用户ID',Ekey:'请输入Ekey名称',pass:'请输入软加密密码',
			start:'请选择软加密开始时间',end:'束时间不能小于开始时间'
		},
		Ekey: ['查询方式 ','按Ekey查询','按用户查询','Ekey名称','查询','创建Ekey','修改Ekey','删除Ekey','Ekey名','用户ID','用户名','操作'],
		dialog: ['创建Ekey','修改Ekey','用户ID：','Ekey名称：','软加密密码：','注释：','Ekey有效期：',
		'启用软加密：','软加密开始时间：','软加密结束时间：','修改软加密密码','提 交','返 回','必填项...']
	},
	pageTxt_en = {};
	
	var pageTxt = pageTxt_cn;
	
	export default {
		name: 'file_Ekey',
		data() {
			return {
				maxData:1234,
				pageTxt: pageTxt,
				radio: 1,
				EkeyData: {
		        	EkeyName: '/C=CN/CN=',
		        	data: [{
		        		Ekey: 'AAA',
				        id: '2016-05-02',
				        name: '王小虎'
			        }],
					selects: []
					
		        },
		        info:{id:'',Ekey:'/C=CN/CN=',pass:'111111',notes:'',
		        	valid:'',check:false,start:'',end:''},
				addEkey: false,
				editEkdy: false,
				eInfo:{id:'',Ekey:'/C=CN/CN=',pass:'111111',notes:'',
		        	valid:'',check:true,start:'',end:'',check1:false},
		        row1: {},
		        data2: [{Ekey: 'AAA'}],
		        err1: {id:false,Ekey:false,pass:false,start:false,end:false},
		        err2: {id:false,Ekey:false,pass:false,start:false,end:false}
			};
		},
		methods: {
			showAdd(){
				var info = this.info, err = this.err1;
				for(var key in info){
					info[key] = '';
					err[key] = false;
				}
				info.Ekey = '/C=CN/CN=';
				info.pass = '111111';
				info.check = false;
				this.addEkey = true;
			},
			showEdit(){
				var info = this.eInfo, err = this.err2;
				for(var key in info){
					info[key] = '';
					err[key] = false;
				}
				info.check = true;
				info.Ekey = '/C=CN/CN=';
				info.pass = '111111';
				info.check1 = false;
				this.editEkdy = true;
			},
			del(){},
			search(){},
			currentRow: function(e){
		    	console.log(e)
			},
		    currentPage: function(e){
		    	console.log(e)
			},
			checkAdd(e){
				var key, el;
				el = e.type=='blur' ? e.target : e.$el.children[0];
				key = el.name;
				console.log(key)
				if(!this.info[key]){
					this.err1[key] = true;
				} else this.err1[key] = false;
				
			},
			checkEdit(e){
				var key, el;
				el = e.type=='blur' ? e.target : e.$el.children[0];
				key = el.name;
				console.log(key)
				if(!this.eInfo[key]){
					this.err2[key] = true;
				} else this.err[key] = false;
				
			},
			submitAdd(){
				this.$axios;
				var info = this.info, err = this.err1, flag = false,
				must= ('id,Ekey,pass,start,end').split(',');
				for(var i=0; i<must.length;i++){
					if(!info[must[i]]){
						err[must[i]] = true;
						flag = true;
					}
				}
				if(flag) return;
			},
			submitEdit(){
				var info = this.eInfo, err = this.err2, flag = false,
				must= ('id,Ekey,pass,start,end').split(',');
				for(var i=0; i<must.length;i++){
					if(!info[must[i]]){
						err[must[i]] = true;
						flag = true;
					}
				}
				if(flag) return;
			}
		}
	}
</script>

<style scoped="scoped">
	/* 头部 */
	.header {height: 47px; border-bottom: 1px solid #ccc;}
	.header_txt {font-size: 16px; color: #656a73;line-height: 47px;margin-left: 17px;font-weight: bold;}

	/* 文本 */
	.Ekey *{vertical-align:middle}
	.user .el-input{width:210px;margin-right:10px}
	.user .el-button{margin-left:35px; width: 90px; height: 30px; line-height:0; }
	.user .red{color:#f56c6c}
	.txt{font-size:14px;color:#666666}
	.user>.el-button{margin-left:35px; width:90px; height:30px; background-color: #32ccf9; line-height:0px; border:0; color:white}

	/* 导航 */
	.btnBox{overflow: hidden; margin-bottom: 10px; margin-top: 18px;}
	.btnBox div{font-size:13px;color:#5C759D;float: left;cursor: pointer; margin-left: 30px;}
	.btnBox div:nth-child(1){margin-left: 0;}	

	/* 表格 */
	.Ekey{padding:22px}
	.Ekey .eRadio{margin-right: 30px;}
	.Ekey .el-radio__label{font-size: 16px;}
	.picker{width: 200px;}
	.red{color: #F56C6C;margin-left: 10px;}
	._zero div{float: left; margin-left: 14px; cursor: pointer;}
	._zero{overflow: hidden;}

	/* 分页 */







	


	
</style>