<template>
<div>
	<!-- 头部 -->
	<div class='header'>
		<span class='header_txt'>分发</span>
	</div>
	<div class="distr">
		<el-form :model="form" >
			<el-form-item :label="pageTxt.distr[0]" :label-width="labelWidth">
				<el-select v-model="form.type" placeholder="请选择">
					<el-option v-for="item in pageTxt.options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<span v-if="form.type==1">({{pageTxt.distr[6]}}: userinfo.cfg,userekey.cfg,usercomm.cfg,srvparam.cfg)</span>
				<span v-else-if="form.type==2">({{pageTxt.distr[7]}}: srv.ini,*_currsrv.ini)</span>
			</el-form-item>
			<el-form-item :label="pageTxt.distr[1]" :label-width="labelWidth">
				<el-table class='suList' :data="data" tooltip-effect="dark" @current-change="currentRow" @selection-change="selectionRow">
					<el-table-column width="55" type="index"></el-table-column>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="pcName" :label="pageTxt.distr[5]" ></el-table-column>
				</el-table>
				<!--<div class="pagination" v-show="data.length!=0">
					<el-pagination @current-change='userChange($event)' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
				</div>-->
			</el-form-item>
			<el-form-item :label="pageTxt.distr[2]" :label-width="labelWidth">
				<el-input v-model="form.man" auto-complete="off" :placeholder='pageTxt.distr[4]'></el-input>
			</el-form-item>
			<el-form-item :label="pageTxt.distr[3]" :label-width="labelWidth" :placeholder='pageTxt.distr[4]'>
				<el-input v-model="form.pass" auto-complete="off" :placeholder='pageTxt.distr[4]'></el-input>
			</el-form-item>
			<el-form-item label="" :label-width="labelWidth">
		    	<el-button type="primary" @click="onSubmit">{{pageTxt.distr[6]}}</el-button>
			</el-form-item>
		</el-form>
	</div>
</div>	
</template>

<script>
import kit      from '@/libs/kit.js';
import utils    from '@/libs/utils.js';
import observer from '@/libs/observer.js';
import globalVar from '@/libs/globalVar.js';
	
	
	var pageTxt_cn = {
		tips: {pc:'请选择主机！',man:'复核操作员不能为空！',pass:'复核密码不能为空！'},
		distr: ['配置文件: ','分发主机: ','复核操作员: ','复核密码: ','必填项...','主机名','提交'],
		options: [{value: '1',label:'系统动态配置文件为'},{value: '2',label:'系统静态配置文件为'}]
	},
	pageTxt_en = {};
	
	var pageTxt = pageTxt_cn;
	
	export default {
		name: 'file_distr',
		data() {
			return {
				pageTxt: pageTxt,
		        data: [{pcName: 'SU-06'}],
		        form: {
		        	type: '1',
		        	pc: '',
		        	man: '',
		        	pass:''
		        },
		        labelWidth: '120px',
		        selects: []
			};
		},
		methods: {
			currentRow: function(e){
		    	console.log(e)
			},
		    currentPage: function(e){
		    	console.log(e)
			},
			selectionRow(val) {
		        this.selects = val;
		        console.log(val)
		    },
			onSubmit(e){
				var info = this.form, err = this.pageTxt.tips, flag = false,
				must= ('pc,man,pass').split(','),str='',num=0;
				info.pc = this.selects.length;
				for(var i=0; i<must.length;i++){
					if(!info[must[i]]){
						str += (++num) + '.' + err[must[i]] + '<br>'
						flag = true;
					}
				}
				if(flag) {
					utils.confirm({message:str})
					return;
				}
			}
		}
	}
</script>

<style scoped="scoped">
/* 头部 */
.header {height: 47px;border-bottom: 1px solid #ccc;}
.header_txt {font-size: 16px;  color: #656a73;  line-height: 47px;  margin-left: 17px;  font-weight: bold;}

.distr{padding:22px}
	.messTag{height: 100%;}
	.messTag>div{height: 100%;}
	
	.component{font-size:0;color:#606266;height:100%;padding:8px;white-space:nowrap}
	.user *{vertical-align:middle}
	.user .txt{font-size:16px;line-height:40px;height:40px}
	.user .el-input{width:210px;margin-right:10px}
	.user .el-button{margin-right:10px}
	.user .red{color:#f56c6c}
	.btnBox .el-button{margin:0;border-left-width:none}
	.iconSize1{font-size:20px;color:#409eff}
	.iconSize2{font-size:20px;color:#f56c6c}
	.pagination{text-align: right;padding: 0px 0;}
	
	.distr .el-input{width: 240px;}
	.distr .suList{border: 1px solid #C0C4CC;max-height: 400px;overflow: auto;}
</style>