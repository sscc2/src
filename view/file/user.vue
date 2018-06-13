<template>
	<div>
		<div class="user">
			<span class="txt">{{pageTxt.userTxt[0]}}：</span>
			<el-input :model="userParam.ID"></el-input>
			<span class="txt">{{pageTxt.userTxt[1]}}：</span>
			<el-input :model="userParam.name"></el-input>
			<el-button type="primary" plain @click='userSearch($event)'>{{pageTxt.userTxt[2]}}</el-button>
			<span class="txt">{{pageTxt.userTxt[3]}}：</span>
			<span class="txt red" >{{userParam.max}}</span>
		</div>
		<div class="btnBox">
			<el-button id='Add' type="" @click="userAdd($event)" icon="el-icon-circle-plus-outline" plain>{{pageTxt.userTxt[4]}}</el-button>
			<el-button id='Edit' type="" @click="userEdit($event)" icon="el-icon-edit" plain>{{pageTxt.userTxt[5]}}</el-button>
			<el-button type="" @click="userDel($event)" icon="el-icon-circle-close-outline" plain>{{pageTxt.userTxt[6]}}</el-button>
			<el-button type="" @click="userEncrypt($event)" icon="el-icon-edit" plain>{{pageTxt.userTxt[7]}}</el-button>
			<el-button type="" @click="userImports($event)" icon="el-icon-edit-outline" plain>{{pageTxt.userTxt[8]}}</el-button>
		</div>
		<el-table ref="multipleTable" @current-change="currentRow" :data="userData" border tooltip-effect="dark" @selection-change="selectionRow">
			<el-table-column width="55" type="index"></el-table-column>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="id" label="用户ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="name" label="用户名称" show-overflow-tooltip>
			</el-table-column>
			<el-table-column label="操作" width="100" show-overflow-tooltip>
				<template slot-scope="scope">
					<i class="el-icon-edit-outline iconSize1"></i>
					<i class="el-icon-close iconSize2"></i>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination" v-show="userData.length!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
		</div>
	</div>
</template>

<script>
	var pageTxt_cn = {
		userTxt: ['用户ID','用户名称','查询','用户总数','创建用户','修改用户','删除用户','修改软加密','批量导入扩展信息'],
		listTxt: ['用户ID','用户名称','操作'],
		pass: [],
		tips: {},
	},
	pageTxt_en = {};
	
	var pageTxt = pageTxt_cn;
	
	export default {
		name: 'file_user',
		data() {
			return {
				pageTxt: pageTxt,
				pageTxt: pageTxt,
				userParam: {ID:'',name:'',max:'20'},
				userData: [{
			        id: '2016-05-03',
			        name: '王小虎'
		        }, {
			        id: '2016-05-02',
			        name: '王小虎'
		        }],
		        userSelection: [],
			};
		},
		methods: {
			userSearch: function(e){
				console.log('userSearch');
			},
			userAdd: function(e){
				this.$router.replace({path: '/message/userAdd/add'});
			},
			userEdit: function(e){
				this.$router.replace({path: '/message/userEdit/edit'});
			},
			userDel: function(e){
				console.log('userDel');
			},
			userEncrypt: function(e){
				console.log('userEncrypt');
			},
			userImports: function(e){
				console.log('userEmports');
			},
			toggleSelection(rows) {
		        if (rows) {
			        rows.forEach(row => {
			        	this.$refs.multipleTable.toggleRowSelection(row);
			        });
		        } else {
		        	this.$refs.multipleTable.clearSelection();
		        }
		    },
		    selectionRow(val) {
		        this.userSelection = val;
		        console.log(val)
		    },
		    currentRow: function(e){
		    	console.log(e)
		    },
		    currentPage: function(e){
		    	console.log(e)
			},
			prev: function(e){
				this.$router.replace({path});
			},
			next: function(e){
				
			},
			imports: function(e){
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
</style>