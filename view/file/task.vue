<template>
	<div id="task" class="task">
		<div class="nav" @click="nav">
			<el-button @click="tabs=0" plain>{{pageTxt.tabs[0]}}</el-button>
			<el-button @click="tabs=1" plain>{{pageTxt.tabs[1]}}</el-button>
			<el-button @click="tabs=2" plain>{{pageTxt.tabs[2]}}</el-button>
		</div>
		<hr class="hr" />
		<div class="tab1" v-show="tabs==0">
			<div class="btnBox">
	    		<label class="txt">{{pageTxt.tab1.lable[0]}}</label>
	    		<el-select v-model="tab1.type" class='wid1' placeholder="请选择">
					<el-option v-for="item in pageTxt.options.taskType" :key="item.val" :label="item.label" :value="item.val">
					</el-option>
				</el-select>
	    		<label class="txt">{{pageTxt.tab1.lable[1]}}</label>
	    		<el-input v-model="tab1.sendID" :disabled='tab1.taskType==3' :placeholder="pageTxt.tab1.lable[9]"></el-input>
	    		<label class="txt">{{pageTxt.tab1.lable[2]}}</label>
	    		<el-input v-model="tab1.jsID" :disabled='tab1.taskType==2' :placeholder="pageTxt.tab1.lable[9]"></el-input>
	    		<label class="txt">{{pageTxt.tab1.lable[3]}}</label>
	    		<el-input v-model="tab1.fileName"></el-input>
	    	</div><div class="btnBox">
	    		<label class="txt">{{pageTxt.tab1.lable[4]}}</label>
	    		<el-date-picker v-model="tab1.start" value-format="yyyy年MM月dd日 HH:mm:ss" type="datetime" :placeholder="pageTxt.tab1.lable[13]"></el-date-picker>
	    		<label class="txt">{{pageTxt.tab1.lable[5]}}</label>
	    		<el-date-picker v-model="tab1.end" value-format="yyyy年MM月dd日 HH:mm:ss" type="datetime" :placeholder="pageTxt.tab1.lable[13]"></el-date-picker>
	    		<label class="txt">{{pageTxt.tab1.lable[6]}}</label>
	    		<el-select v-model="tab1.state" placeholder="请选择">
					<el-option v-for="item in pageTxt.options.taskState" :key="item.val" :label="item.label" :value="item.val">
					</el-option>
				</el-select>
	    		<el-button @click='query' type="primary">{{pageTxt.tab1.lable[7]}}</el-button>
	    		<span class="txt">{{pageTxt.tab1.lable[8]}}</span>
	    		<span class="txt red">{{sum}}</span>
	    	</div><div class="btnBox">
	    	</div>
	    	<el-table :data="data" border tooltip-effect="dark" @current-change="currentRow">
				<el-table-column width="55" type="index"></el-table-column>
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="state" :label="pageTxt.tab1.list[0]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="sendUser" :label="pageTxt.tab1.list[1]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="jsUser" :label="pageTxt.tab1.list[2]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="time" :label="pageTxt.tab1.list[3]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="long" :label="pageTxt.tab1.list[4]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="fileName" :label="pageTxt.tab1.list[5]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="path1" :label="pageTxt.tab1.list[6]" width='162' show-overflow-tooltip></el-table-column>
				<el-table-column prop="path2" :label="pageTxt.tab1.list[7]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="check" :label="pageTxt.tab1.list[8]" show-overflow-tooltip></el-table-column>
			</el-table>
			<div class="pagination" v-show="data.length!=0">
				<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
			</div>
		</div>
		
		<div class="tab2" v-show="tabs==1">
			<ul class="form">
				<li>
					<div class="label">
						<p class="txt">{{pageTxt.tab2.lable[0]}}</p>
					</div><div class="rightInput">
						<el-select v-model="tab2.model" placeholder="请选择">
							<el-option v-for="item in pageTxt.options.userModel" :key="item.val" :label="item.label" :value="item.val">
							</el-option>
						</el-select>
					</div>
				</li><li v-show='tab2.model==1'>
					<div class="label">
						<p class="txt">{{pageTxt.tab2.lable[1]}}</p>
					</div><div class="rightInput">
						<el-input v-model="tab2.id" :placeholder="pageTxt.tab1.lable[9]"></el-input>
					</div>
				</li><li>
					<div class="label">
						<p class="txt">{{pageTxt.tab2.lable[2]}}</p>
					</div><div class="rightInput">
						<el-select v-model="tab2.libs" placeholder="请选择">
							<el-option v-for="item in pageTxt.options.libType" :key="item.val" :label="item.label" :value="item.val">
							</el-option>
						</el-select>
					</div>
				</li><li>
					<div class="label">
						<p class="txt">&nbsp;</p>
					</div><div class="rightInput">
						<el-button @click='clear' type="primary">{{pageTxt.tab2.lable[3]}}</el-button>
						<el-button @click='reset' type="primary">{{pageTxt.tab2.lable[4]}}</el-button>
					</div>
				</li>
			</ul>
			<div class="explain">
				<p class="tt">{{pageTxt.tab2.tips[0]}}</p>
				<p class="tt">{{pageTxt.tab2.tips[1]}}</p>
				<p class="tt">{{pageTxt.tab2.tips[2]}}</p>
				<p class="tt">&nbsp;</p>
				<p class="tt">{{pageTxt.tab2.tips[3]}}</p>
				<p class="tt">{{pageTxt.tab2.tips[4]}}</p>
				<p class="tt">{{pageTxt.tab2.tips[5]}}</p>
			</div>
		</div>
		
		<div class="tab3" v-show="tabs==2">
			<ul class="form">
				<li>
					<div class="label">
						<p class="txt">{{pageTxt.tab3[0]}}</p>
					</div><div class="rightInput">
						<el-select v-model="tab3.model" placeholder="请选择">
							<el-option v-for="item in pageTxt.options.userModel" :key="item.val" :label="item.label" :value="item.val">
							</el-option>
						</el-select>
					</div>
				</li><li v-show='tab3.model==1'>
					<div class="label">
						<p class="txt">{{pageTxt.tab3[1]}}</p>
					</div><div class="rightInput">
						<el-input v-model="tab3.id" :placeholder="pageTxt.tab1.lable[9]"></el-input>
					</div>
				</li><li>
					<div class="label">
						<p class="txt">{{pageTxt.tab3[2]}}</p>
					</div><div class="rightInput">
						<el-select v-model="tab3.node" placeholder="请选择">
							<el-option v-for="item in pageTxt.options.fileNode" :key="item.val" :label="item.label" :value="item.val">
							</el-option>
						</el-select>
					</div>
				</li><li>
					<div class="label">
						<p class="txt">{{pageTxt.tab3[3]}}</p>
					</div><div class="rightInput">
						<el-input v-model="tab3.path" :placeholder="pageTxt.tab1.lable[9]"></el-input>
						<p class="txt">{{pageTxt.tab3[5]}}</p>
					</div>
				</li><li>
					<div class="label">
						<p class="txt">&nbsp;</p>
					</div><div class="rightInput">
						<el-button @click='send' type="primary">{{pageTxt.tab3[4]}}</el-button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import kit from '@/libs/kit.js';
import utils from '@/libs/utils.js';

	var pageTxt_cn = {
		tabs: ['文件任务管理','文件任务库管理','建立中枢任务',''],
		options: {
			taskType:  [{val:'1', label:'全部'},{val:'2', label:'发送'},{val:'3', label:'接收'}],
			taskState: [{val:'1', label:'全部'},{val:'2', label:'在源端'},{val:'3', label:'在中枢'},{val:'4', label:'在目的端'},{val:'5', label:'错误'}],
			userModel: [{val:'1', label:'单个用户'},{val:'2', label:'所有用户'}],
			libType:   [{val:'1', label:'所有任务库'},{val:'2', label:'发送任务库'},{val:'3', label:'接收任务库'}],
			fileNode:  [{val:'1', label:'深圳'},{val:'2', label:'北京'}],
		},
		tab1: {
			lable: ['任务类型:','发关用户ID:','接收用户ID:','文件名字:','开始时间:','结束时间:','任务状态:','查询',
				'总任务个数:','必填项...','暂停任务','重新开始任务','在主站','选择日期'],
			list: ['任务状态','发送用户','接收用户','任务建立','文件长度','落地节点名称','源用户端文件全路径名','中枢文件路径','文件校验码']
		},
		tab2: {
			lable: ['用户模式:','用户ID:','任务库类型:','清空任务库','重置任务库'],
			tips: ['清空任务库操作说明:','1、对V3版客户端：清空中枢任库；','2、对V4版以上客户端：清空客户端的任务库，该操作只对在线用户有效；',
				'重置任务库操作说明:','1、对V3版客户端：重置中枢任库；','2、对V4版以上客户端：重置客户端的任务库，该操作只对在线用户有效；']
		},
		tab3: ['用户模式:','接收用户ID:','文件节点:','文件路径:','发送文件',
			'从中枢发送文件到客户端，中枢文件路径：/home/ftcs/user_pub/文件名，客户端文件保存路径：FxClient/hub/'],
		tips: {
			queryAll: '查询全部任务必指定发送用户和接收用户!', querySend: '查询发送任务必指定发送用户！',
			queryJS: '查询接收任务必指定接收用户！', userID: '用户ID不能为空！'
		}
	},
	pageTxt_en = {};
	var pageTxt = pageTxt_cn;
	
	export default {
		name: 'file_task',
		data() {
			return {
				pageTxt,
				tabs: '0',
				sum: '0',
				data: [{state:'on',sendUser:'ftcs1001',jsUser:'ABC001',time:'20180515',long:'500kb',fileName:'ABC',path1:'/user/',path2:'/user/',check:'MD5'}],
				tab1: {type:'1',sendID:'',jsID:'',fileName:'',start:'',end:'',state:'1'},
				tab2: {model:'1',id:'',libs:''},
				tab3: {model:'1',id:'',node:'1',path:''},
			};
		},
		methods: {
			nav(e){
				var nav = kit('.nav .el-button','#task').delClass('navActive');
				nav.setAttr('style','').eq(this.tabs).addClass('navActive');
			},
			query(){
				var info = this.tab1;
				console.log(info);
				if(info.type == '1'){
					if(info.sendID=='' || info.jsID=='') return utils.confirm({message: pageTxt.tips.queryAll});
				} else if(info.type=='2' && info.sendID=='') return utils.confirm({message: pageTxt.tips.querySend});
				else if(info.type=='3' && info.jsID=='') return utils.confirm({message: pageTxt.tips.queryJS});
				
				
			},
			currentRow: function(e){
		    	console.log(e)
			},
		    currentPage: function(e){
		    	console.log(e)
			},
			clear(){
				var info = this.tab2;
				console.log(info);
				if(info.id == '') return utils.confirm({message: pageTxt.tips.userID});
			},
			reset(){
				var info = this.tab2;
				console.log(info);
				if(info.id == '') return utils.confirm({message: pageTxt.tips.userID});
			},
			send(){
				var info = this.tab3;
				console.log(info);
				if(info.id == '') return utils.confirm({message: pageTxt.tips.userID});
			}
		},
		mounted: function(){
			var nav = kit('#task .nav .el-button').eq(this.tabs);
			if(nav) nav.addClass('navActive');
		},
	}
</script>

<style scoped="scoped">
	.task{height: 100%;}
	.navActive{color: #3a8ee6;border-color: #3a8ee6;}
	.txt{font-size:16px;line-height:40px;height:40px}
	.hr{margin: 15px 0;border: none;height: 1px;background: #C0C4CC;}
	.btnBox{margin-bottom: 15px;}
	.btnBox *{vertical-align:middle;margin-right: 10px;}
	.el-input{width:200px;margin-right:10px}
	.red{color:#f56c6c}
	.iconSize1{font-size:20px;color:#409eff}
	.iconSize2{font-size:20px;color:#f56c6c}
	.pagination{text-align: right;padding: 20px 0;}
	
	.tab1{min-width: 1120px;}
	.wid1{width: 120px;}
	.form{margin-top: 30px;}
	.form li{margin-top: 15px;}
	.label{display: inline-block;width: 180px;text-align: right;vertical-align: top;}
	.rightInput{display: inline-block;vertical-align: top;padding-left: 10px;}
	.explain{padding-left: 140px;margin-top: 50px;}
	.tt{font-size:16px;line-height: 1.2}
</style>
