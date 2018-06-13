<template>
	<el-dialog :title="pageTxt.lable[0]" width='620px' :visible.sync="isShow">
		<ul class="_dialog">
			<li>
				<div class="leftBox">
					<p class="txt">{{pageTxt.lable[1]}}</p>
				</div><div class="rightBox">
					<el-input class='input' v-model="info.id" @blur='check' name='id' :placeholder="pageTxt.lable[8]"></el-input>
					<span class="txt red" v-show="err.id">{{pageTxt.tips.id}}</span>
				</div>
			</li><li>
				<div class="leftBox">
					<p class="txt">{{pageTxt.lable[2]}}</p>
				</div><div class="rightBox">
					<el-input class='input' v-model="info.usernam" @blur='check' name='usernam' :placeholder="pageTxt.lable[8]"></el-input>
				
					<span class="txt red" v-show="err.usernam">{{pageTxt.tips.usernam}}</span>
				</div>
			</li><li>
				<div class="leftBox">
					<p class="txt">{{pageTxt.lable[3]}}</p>
				</div><div class="rightBox">
					<el-input class='input' v-model="info.npasswd" @blur='check' name='npasswd' :placeholder="pageTxt.lable[8]"></el-input>
					<span class="txt red" v-show="err.npasswd">{{pageTxt.tips.npasswd}}</span>
				</div>
			</li><li>
				<div class="leftBox">
					<p class="txt">{{pageTxt.lable[10]}}</p>
				</div><div class="rightBox">
					<el-input class='input' v-model="info.again" @blur='check' name='again' :placeholder="pageTxt.lable[8]"></el-input>
					<span class="txt red" v-show="err.again">{{pageTxt.tips.again}}</span>
				</div>
			</li><li>
				<div class="leftBox">
					<p class="txt">{{pageTxt.lable[4]}}</p>
				</div><div class="rightBox">
					<el-input @blur='check' name='assessor' class='input' v-model="info.assessor" :placeholder="pageTxt.lable[8]"></el-input>
					<span class="txt red" v-show="err.assessor">{{pageTxt.tips.assessor}}</span>
				</div>
			</li><li>
				<div class="leftBox">
					<p class="txt">{{pageTxt.lable[5]}}</p>
				</div><div class="rightBox">
					<el-input @blur='check' name='pass' class='input' v-model="info.pass" :placeholder="pageTxt.lable[8]"></el-input>
					<span class="txt red" v-show="err.pass">{{pageTxt.tips.pass}}</span>
				</div>
			</li>
		</ul>
		<div slot="footer" class="dialog-footer">
		    <el-button @click="isShow = false">{{pageTxt.lable[7]}}</el-button>
		    <el-button type="primary" @click="submit">{{pageTxt.lable[6]}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
import kit      from '@/libs/kit.js';
import utils    from '@/libs/utils.js';
import observer from '@/libs/observer.js';

	var pageTxt_cn = {
		tips: {
			id: '请填写用户ID',usernam:'请填写用户名',npasswd:'请输入新密码',
			again:'重复新密码',assessor:'请填写审核人',pass:'请填写复核密码',
		},
		lable: ['修改密码','用户ID：','用户名：','新密码：','审核人：','审核pass：','提交','返回','必填项...','选择日期','确认：'],
		error: ['请选择软加密开始时间','束时间不能小于开始时间','请填写复核操作员','请填写复核密码']
	},
	pageTxt_en = {};
	
	var pageTxt = pageTxt_cn;

	var data = {
		pageTxt,
		isShow: false,
		msg: '',
		info: {id:'',usernam:'',npasswd:'',again:'',assessor:'',pass:''},
		err: {id:false,usernam:false,npasswd:false,again:false,assessor:false,pass:false}
	};
	
	observer.addBinding('messUserPass', function(master, param){
		if(master != 'messUserPass') return;
		var id = '',i;
		for(i in data.err){
			data.err[i] = false;
			data.info[i] = '';
		}
		for (i = 0; i < param.length; i++) {
			id += ',' + param[i].id;
		}
		data.info.id = id.replace(/,/,'');
		data.isShow = true;
	});
	
	export default {
		name: 'mess_userPass',
		data() {
			return data;
		},
		methods: {
			submit(){
				var flag = false;
				for(var i in this.info){
					if(!this.info[i]){
						this.err[i] = true;
						flag = true;
					}
				}
				if(flag) return;
				
			},
			check(e){
				var key, el;
				el = e.type=='blur' ? e.target : e.$el.children[0];
				key = el.name;
				console.log()
				if(!this.info[key]){
					this.err[key] = true;
				} else this.err[key] = false;
				
			}
		},
//		watch: {
//			info: {
//				handler(cur, old){
//					console.log(cur, cur);
//　　　　　　　　　　},
//　　　　　　　　　　deep:true
//			}
//		}
	}
</script>

<style scoped="scoped">
	.txt{font-size: 16px;line-height: 40px;height: 40px;}	
	.userPass{width: 600px;margin: 0 auto;border: 1px solid #dcdfe6;}
	.input{width: 180px;}
	.red{color: #F56C6C;margin-left: 10px;}
</style>