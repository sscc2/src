<template>
	<div class="Ekey">
		<!-- 头部 -->
		<div class="header_txt">
			<span>用户id：{{transmitData.userID}}</span>
			<span>用户名称：{{transmitData.userName}}</span>
			<span>Ekey总数：{{transmitData.EkeyCount}}</span>
		</div>
		<!-- 导航栏 -->
		<div class="btnBox">
			<div @click="showAdd"><img src="@/img/creat2.png"> <span>{{pageTxt.lable[0]}}</span></div>
			<div @click="showEdit" ><img src="@/img/edit2.png"><span>{{pageTxt.lable[1]}}</span></div>
			<div @click="del" ><img src="@/img/delet2.png"><span>{{pageTxt.lable[2]}}</span></div>
		</div>
		<!-- 表格 -->
		<el-table ref="multipleTable" @current-change="currentRow" :data="list" border tooltip-effect="dark" highlight-current-row>
			<el-table-column width="55" type="index"></el-table-column>
			<el-table-column prop="ekeyName" :label="pageTxt.lable[5]" show-overflow-tooltip></el-table-column>
			<el-table-column :label="pageTxt.lable[6]" width="110" show-overflow-tooltip>
				<div slot-scope="scope" class="_zero">
					<div><img src="@/img/creat2.png"></div>
					<div><img src="@/img/edit2.png"></div>
					<div><img src="@/img/delet2.png"></div>
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
	</div>
</template>

<script>
import kit      from '@/libs/kit.js';
import utils    from '@/libs/utils.js';
import observer from '@/libs/observer.js';
import md5      from '@/libs/md5.js';

	var pageTxt_cn = {
		tips: {
			ekey:'请在列表中选择一条记录！',del:'是否确认删除！',
			id:'请输入用户ID',Ekey:'请输入Ekey名称',pass:'请输入软加密密码',
			start:'请选择软加密开始时间',end:'束时间不能小于开始时间'
		},
		lable: ['创建Ekey','修改Ekey','删除Ekey','提交','返回','Ekey主题名','操作'],
		dialog: ['创建Ekey','修改Ekey','用户ID：','Ekey名称：','软加密密码：','注释：','Ekey有效期：',
		'启用软加密：','软加密开始时间：','软加密结束时间：','修改软加密密码','提 交','返 回','必填项...']
	},
	pageTxt_en = {};
	
	var pageTxt = pageTxt_cn;
	var data = {
		pageTxt,
		userID: {},
		list: [{ekeyName:'/C=CN/CN=ABC'}],
		selects: [],
		addEkey: false,
		editEkdy: false,
		info:{id:'',Ekey:'/C=CN/CN=',pass:'111111',notes:'',
        	valid:'',check:false,start:'',end:''},
		addEkey: false,
		editEkdy: false,
		eInfo:{id:'',Ekey:'/C=CN/CN=',pass:'111111',notes:'',
        	valid:'',check:true,start:'',end:'',check1:false},
        err1: {id:false,Ekey:false,pass:false,start:false,end:false},
		err2: {id:false,Ekey:false,pass:false,start:false,end:false},
		transmitData:{userID:"123",userName:"31",EkeyCount:"1"}	
	};
	
	observer.addBinding('messUserEkey', function(master, param){
		if(master != 'messUserEkey') return;
		if(param){
			data.userID = param;
			data.info.id = data.eInfo.id = param.id;
		}
		console.log('messUserEkey',param)
	});
	
	export default {
		name: 'user-Ekey',
		data() {
			return data;
		},
		methods: {
			created(){
				
			},
			showAdd(){
				var info = this.info, err = this.err1;
				for(var key in info){
					info[key] = '';
					err[key] = false;
				}
				info.id = data.userID.id;
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
				info.id = data.userID.id;
				info.Ekey = '/C=CN/CN=';
				info.pass = '111111';
				info.check1 = false;
				this.editEkdy = true;
			},
			del(){},
			back(){
				this.$router.replace({path: '/message/user'});
			},
			currentRow: function(e){
		    	console.log(e);
			},
		    currentPage: function(e){
		    	console.log(e);
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
				console.log(key);
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
	};
	observer.execute('componentInit', 'userEkey', true);
</script>

<style scoped="scoped">
	/* 头部 */
	.header_txt{font-size: 14px ;color: #666666; margin-bottom: 27px;  margin-top: 10px;}
	.header_txt > span:nth-child(2),.header_txt > span:nth-child(3){margin-left: 55px;}
	
	/* 导航栏 */
	.btnBox{margin-bottom: 12px; font-size: 13px; color:#5C759D; overflow: hidden;}
	.btnBox div{float: left; cursor: pointer}
	.btnBox div:nth-child(2){margin-left: 32px;}
	.btnBox div:nth-child(3){margin-left: 32px;}
	.btnBox div span {margin-left: 5px; }

	.picker{width: 200px;}
	.red{color: #F56C6C;margin-left: 10px;}
	.txt{font-size: 16px;line-height: 40px;}

	/* 表格 */
	._zero div{overflow: hidden;float: left;cursor: pointer}
	._zero div:nth-child(2),._zero div:nth-child(3){margin-left: 15px;}


	._dialog li{margin-bottom: 10px;}
	.txt[data-v-43ebc1a0] {line-height: 30px;}
	.txt[data-v-43ebc1a0] {top:-3px}
	._dialog .checkbox{line-height: 25px;}

</style>