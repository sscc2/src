<template>
	<div class="config">
		<el-radio-group v-model="radio" @change='change' style="margin-bottom: 15px;">
		    <el-radio-button label="1">{{pageTxt.config[0]}}(plugin.ini)</el-radio-button>
		    <el-radio-button label="2">{{pageTxt.config[1]}}(log.ini)</el-radio-button>
		</el-radio-group>
		<hr class="hr"/>
		<div v-show="radio==1">
			<el-checkbox v-model="checked">{{pageTxt.config[2]}}</el-checkbox>
			<textarea class="txtArea" :disabled="!checked" :value="txt1"></textarea>
			<div>
				<el-button type="success" @click='submit1'>{{pageTxt.config[3]}}</el-button>
			</div>
		</div>
		<div v-show="radio==2">
			<el-checkbox v-model="checked">{{pageTxt.config[2]}}</el-checkbox>
			<textarea class="txtArea" :disabled="!checked" :value="txt2"></textarea>
			<div>
				<el-button type="success" @click='submit2'>{{pageTxt.config[3]}}</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	var pageTxt_cn = {
		tips: {},
		config: ['插件配置','插件日志配置','编辑','提交修改'],
	},
	pageTxt_en = {};
	
	var pageTxt = pageTxt_cn;
	
	export default {
		name: 'file_config',
		data() {
			return {
				pageTxt: pageTxt,
	        	radio: 1,
	        	checked: false,
	        	txt1:'ABC',
	        	txt2:'HJK',
			};
		},
		methods: {
			change(){
				this.checked = false;
			},
			submit1(){},
			submit2(){}
		}
	}
</script>

<style scoped="scoped">
	.hr{margin: 15px 0;border: none;height: 1px;background: #C0C4CC;}
	.txt{font-size:16px;line-height:40px;height:40px}
	.config .txtArea{display: block;padding: 10px;font-size: 14px;color: #606266;margin: 15px 0;width: 700px;height: 500px;}
	.config .el-button{font-size: 16px;}
</style>