<template>
	<div id="fileTags" class="container">
		<el-tabs type='border-card' tabPosition="right" @tab-click='tabCK' value='user'>
			<el-tab-pane label="用户" name='user'>
			    <span slot="label">用户</span>
			    <fileUser></fileUser>
			</el-tab-pane>
			<el-tab-pane label="密钥" name='Ekey'>
				<fileEkey></fileEkey>
			</el-tab-pane>
			<el-tab-pane label="通信" name='signal'>
				<fileSignal></fileSignal>
			</el-tab-pane>
			<el-tab-pane label="任务" name='task'>
				<fileTask></fileTask>
			</el-tab-pane>
			<el-tab-pane label="配置" name='config'>
				<fileConfig></fileConfig>
			</el-tab-pane>
			<el-tab-pane label="分发" name='distr'>
				<fileDistr></fileDistr>
			</el-tab-pane>
			<el-tab-pane label="运维" name='operate'>
				<fileOperate></fileOperate>
			</el-tab-pane>
			<el-tab-pane label="统计" name='statist'>
				<fileStatist></fileStatist>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import User    from '@/view/file/user.vue';
import Ekey    from '@/view/file/Ekey.vue';
import Signal  from '@/view/file/signal.vue';
import Task    from '@/view/file/task.vue';
import Config  from '@/view/file/config.vue';
import Distr   from '@/view/file/distr.vue';
import Operate from '@/view/file/operate.vue';
import Statist from '@/view/file/statist.vue';

	export default {
		data() {
			return {};
		},
		methods: {
			tabCK: function(vm){
				
			},
		},
		components: {
			'fileUser': User,
			'fileEkey': Ekey,
			'fileSignal': Signal,
			'fileTask': Task,
			'fileConfig': Config,
			'fileDistr': Distr,
			'fileOperate': Operate,
			'fileStatist': Statist
		}
	}
</script>

<style scoped="scoped">
	.container{font-size:0;color:#606266;height:100%;padding:8px;white-space:nowrap}
	.container .el-tabs{height: 100%;}
</style>
<style>
	/*选卡*/
	.container .el-tabs__item{white-space: normal;width: 53px;line-height: 1.2;height: 70px;}
	.container .el-tabs__nav .is-right{padding-top: 40%;}
	.container .el-tabs__content{height: 100%;}
	.container .el-tab-pane{overflow-y: auto;height: 100%;}
	/*选卡*/
	.el-select .el-input .el-select__caret{line-height: 40px;}
</style>