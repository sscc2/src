<template>
	<div>
		<div class='extendInfo'>
			<!-- 左列表 -->
			<div class='left_list'>
				<ul>
					<li>{{this.pageTxt.tips[0]}}</li>
					<li>{{this.pageTxt.tips[1]}}</li>
					<li>{{this.pageTxt.tips[2]}}</li>
					<li>{{this.pageTxt.tips[3]}}</li>
					<li>{{this.pageTxt.tips[4]}}</li>
					<li>{{this.pageTxt.tips[5]}}</li>
					<li>{{this.pageTxt.tips[6]}}</li>
				</ul>
			</div>
			<!-- 中间 -->
			<div class='center_list'>
				<ul>
					<li><el-input v-model="inputValue.smsAlarmNun" placeholder="请输入内容"></el-input></li>
					<li><el-input v-model="inputValue.leaderTelePhone" placeholder="请输入内容"></el-input></li>
					<li><el-input v-model="inputValue.leaderMobilePhone" placeholder="请输入内容"></el-input></li>
					<li><el-input v-model="inputValue.PerationPerationFax" placeholder="请输入内容"></el-input></li>
					<li><el-input v-model="inputValue.PerationPhone" placeholder="请输入内容"></el-input></li>
					<li><el-input v-model="inputValue.email" placeholder="请输入内容"></el-input></li>
					<li><el-input v-model="inputValue.SSCCAM" placeholder="请输入内容"></el-input></li>
				</ul>
			</div>
			<!-- 右 -->
			<div class='right_list'>
				<ul>
					<li>{{this.pageTxt.lable[0]}}</li>
					<li>{{this.pageTxt.lable[1]}}</li>
					<li>{{this.pageTxt.lable[2]}}</li>
					<li>{{this.pageTxt.lable[3]}}</li>
					<li>{{this.pageTxt.lable[4]}}</li>
					<li>{{this.pageTxt.lable[5]}}</li>
				</ul>
			</div>	
		</div>
		<div class='bottom_btn'>
			<el-button type="success" @click='submit'>提交</el-button>
			<el-button type="danger" @click='goBack'>返回</el-button>
		</div>
	</div>
</template>


<script>
// import kit      from '@/libs/kit.js';
// import utils    from '@/libs/utils.js';
// import observer from '@/libs/observer.js';
	var pageTxt_cn = {
		tips:['短信报警号码：','负责人座机号码：','负责人手机号码：','运维传真：','运维电话：','邮箱：','SSCC客户经理：'],
		lable: ['只能输入数字"、" +" ";"','只能输入数字"、" +" ";"','只能输入数字和";"','只能输入数字"、" +" ";"','只能输入数字"、" +" ";"','只能输入英文字符']},
	pageTxt_en = {};
	
	var pageTxt = pageTxt_cn;

	var inputValue=['smsAlarmNun','leaderTelePhone','leaderMobilePhone','PerationFax','PerationPhone','email','SSCCAM'];
	
	
	// observer.addBinding('messUserID', function(master, param){
	// 	if(master != 'messUserID') return;
	// 	data.userId = param;
	// });
	
	export default {
		name : 'extendifo',
		data : function(){
			 return{
				pageTxt,
				inputValue
			}
		},
		methods: {
			submit : function(){
				var _this=this;				
				this.$axios.post('http://localhost/sv.php',{
					//键值对格式需要传输的数据
				})
				.then(function(response){
				_this.userData=response.data.userData
				})
				.catch(function(error){
				console.log(error);
				});
			},
			goBack : function(){
				this.$router.replace({ path: "/message/userEdit/mess" });
			}
		}
	}
</script>

<style  scoped="scoped">
.extendInfo{overflow: hidden; margin-top: 10px; font-size: 14px;  color:#666666;}
.left_list{ float:left; width: 145px; margin-left: 5px;}
.left_list li{line-height:30px; text-align: right; margin-top: 10px;}
.center_list{float: left; margin-left: 10px; }
.center_list li{margin-top: 10px;}
.right_list{font-size: 14px; float: left; margin-left: 10px;}
.right_list li{line-height:30px; text-align: left; margin-left: 5px; margin-top: 10px;}

.bottom_btn{margin-left: 160px;}
.el-button:nth-child(1){width: 90px; height: 30px; background-color:#32CCF9; line-height: 7px; border:1px solid #32CCF9}
.el-button:nth-child(2){margin:20px; width: 90px; height: 30px; background-color: #fff; border:1px solid #32CCF9;color:#32CCF9;line-height: 7px}
</style>
