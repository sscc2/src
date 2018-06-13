<template>
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
		<div class="btnBox">
			<el-button id='Add' type="" @click="add" icon="el-icon-circle-plus-outline" plain>{{pageTxt.Ekey[5]}}</el-button>
			<el-button id='Edit' type="" @click="edit" icon="el-icon-edit" plain>{{pageTxt.Ekey[6]}}</el-button>
			<el-button type="" @click="del" icon="el-icon-circle-close-outline" plain>{{pageTxt.Ekey[7]}}</el-button>
		</div>
		<el-table v-show='radio==1' :data="EkeyData.data" border tooltip-effect="dark" @current-change="currentRow" highlight-current-row>
			<el-table-column width="55" type="index"></el-table-column>
			<!--<el-table-column type="selection" width="55"></el-table-column>-->
			<el-table-column prop="Ekey" label="Ekey名" width="230"></el-table-column>
			<el-table-column prop="id" label="用户ID" width="230"></el-table-column>
			<el-table-column prop="name" label="用户名" width="230"></el-table-column>
			<el-table-column label="操作" show-overflow-tooltip>
				<template slot-scope="scope">
					<i class="el-icon-edit-outline iconSize1"></i>
					<i class="el-icon-close iconSize2"></i>
				</template>
			</el-table-column>
		</el-table>
		<el-table v-show='radio==2' :data="data2" border tooltip-effect="dark" @current-change="currentRow" highlight-current-row>
			<el-table-column width="55" type="index"></el-table-column>
			<!--<el-table-column type="selection" width="55"></el-table-column>-->
			<el-table-column prop="Ekey" label="Ekey名" width="230"></el-table-column>
			<el-table-column label="操作" show-overflow-tooltip>
				<template slot-scope="scope">
					<i class="el-icon-edit-outline iconSize1"></i>
					<i class="el-icon-close iconSize2"></i>
				</template>
			</el-table-column>
		</el-table>
		<!--<div class="pagination" v-show="EkeyData.data.length!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
		</div>-->
		<el-dialog :title="pageTxt.dialog[0]" :visible.sync="addEkey">
			<ul class="form">
				<li>
					<div class="label">
						<p class="txt">{{pageTxt.dialog[2]}}</p>
					</div><div class="rightInput">
						<el-input v-model="info.id" :placeholder="pageTxt.dialog[13]"></el-input>
					</div>
				</li><li>
					<div class="label">
						<p class="txt">{{pageTxt.dialog[3]}}</p>
					</div><div class="rightInput">
						<el-input v-model="info.Ekey" :placeholder="pageTxt.dialog[13]"></el-input>
					</div>
				</li><li>
					<div class="label">
						<p class="txt">{{pageTxt.dialog[4]}}</p>
					</div><div class="rightInput">
						<el-input v-model="info.pass" :placeholder="pageTxt.dialog[13]"></el-input>
					</div>
				</li><li>
					<div class="label">
						<p class="txt">{{pageTxt.dialog[5]}}</p>
					</div><div class="rightInput">
						<el-input v-model="info.notes" :placeholder="pageTxt.dialog[13]"></el-input>
					</div>
				</li><li>
					<div class="label">
						<p class="txt">{{pageTxt.dialog[6]}}</p>
					</div><div class="rightInput">
						<el-date-picker v-model="info.valid" value-format="yyyy年MM月dd日 HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]"></el-date-picker>
					</div>
				</li><li>
					<div class="label">
						<p class="txt">{{pageTxt.dialog[7]}}</p>
					</div><div class="rightInput">
						<el-checkbox class='checkbox' v-model="info.check"></el-checkbox>
					</div>
				</li><li v-show="info.check">
					<div class="label">
						<p class="txt">{{pageTxt.dialog[8]}}</p>
					</div><div class="rightInput">
						<el-date-picker v-model="info.start" value-format="yyyy年MM月dd日 HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]"></el-date-picker>
					</div>
				</li><li v-show="info.check">
					<div class="label">
						<p class="txt">{{pageTxt.dialog[9]}}</p>
					</div><div class="rightInput">
						<el-date-picker v-model="info.end" value-format="yyyy年MM月dd日 HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]"></el-date-picker>
					</div>
				</li>
			</ul>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="addEkey = false">{{pageTxt.dialog[12]}}</el-button>
			    <el-button type="primary" @click="addSubmit">{{pageTxt.dialog[11]}}</el-button>
			</div>
		</el-dialog>
		<el-dialog :title="pageTxt.dialog[1]" :visible.sync="editEkdy">
			<ul class="form">
				<li>
					<div class="label">
						<p class="txt">{{pageTxt.dialog[2]}}</p>
					</div><div class="rightInput">
						<el-input v-model="eInfo.id" :placeholder="pageTxt.dialog[13]"></el-input>
					</div>
				</li><li>
					<div class="label">
						<p class="txt">{{pageTxt.dialog[3]}}</p>
					</div><div class="rightInput">
						<el-input v-model="eInfo.Ekey" :placeholder="pageTxt.dialog[13]"></el-input>
					</div>
				</li><li>
					<div class="label">
						<p class="txt">{{pageTxt.dialog[4]}}</p>
					</div><div class="rightInput">
						<el-input v-model="eInfo.pass" :placeholder="pageTxt.dialog[13]"></el-input>
					</div>
				</li><li>
					<div class="label">
						<p class="txt">{{pageTxt.dialog[5]}}</p>
					</div><div class="rightInput">
						<el-input v-model="eInfo.notes" :placeholder="pageTxt.dialog[13]"></el-input>
					</div>
				</li><li>
					<div class="label">
						<p class="txt">{{pageTxt.dialog[6]}}</p>
					</div><div class="rightInput">
						<el-date-picker v-model="eInfo.valid" value-format="yyyy年MM月dd日 HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]"></el-date-picker>
					</div>
				</li><li>
					<div class="label">
						<p class="txt">{{pageTxt.dialog[7]}}</p>
					</div><div class="rightInput">
						<el-checkbox class='checkbox' v-model="eInfo.check"></el-checkbox>
					</div>
				</li><li v-show="eInfo.check">
					<div class="label">
						<p class="txt">{{pageTxt.dialog[8]}}</p>
					</div><div class="rightInput">
						<el-date-picker v-model="eInfo.start" value-format="yyyy年MM月dd日 HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]"></el-date-picker>
					</div>
				</li><li v-show="eInfo.check">
					<div class="label">
						<p class="txt">{{pageTxt.dialog[9]}}</p>
					</div><div class="rightInput">
						<el-date-picker v-model="info.end" value-format="yyyy年MM月dd日 HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]"></el-date-picker>
					</div>
				</li>
			</ul>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="editEkdy = false">{{pageTxt.dialog[12]}}</el-button>
			    <el-button type="primary" @click="editSubmit">{{pageTxt.dialog[11]}}</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	var pageTxt_cn = {
		tips: {},
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
		        data2: [{Ekey: 'AAA'}]
			};
		},
		methods: {
			add(){
				var info = this.info;
				for(var key in info) info[key] = '';
				info.Ekey = '/C=CN/CN=';
				info.pass = '111111';
				info.check = false;
				this.addEkey = true;
			},
			edit(){
				var info = this.eInfo;
				info.check = true;
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
			addSubmit(){
				this.$axios;
				var info = this.info;
				console.log(info);
			},
			editSubmit(){
				
			}
		}
	}
</script>

<style scoped="scoped">
	.user{padding:0px 8px}.user *{vertical-align:middle}
	.txt{font-size:16px;line-height:40px;height:40px}
	.user .el-input{width:210px;margin-right:10px}
	.user .el-button{margin-right:10px}
	.user .red{color:#f56c6c}
	.btnBox .el-button{margin:0;border-left-width:none}
	.iconSize1{font-size:20px;color:#409eff}
	.iconSize2{font-size:20px;color:#f56c6c}
	.pagination{text-align: right;padding: 20px 0;}
	
	.Ekey{}
	.Ekey .eRadio{margin-right: 30px;}
	.Ekey .el-radio__label{font-size: 16px;}
	.form li{margin-bottom: 10px;}
	.label{display: inline-block;width: 150px;text-align: right;vertical-align: top;}
	.rightInput{display: inline-block;vertical-align: top;padding-left: 10px;}
	.checkbox{font-size: 16px;line-height: 40px;}
</style>