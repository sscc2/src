<template>
	<div id="messTags" class="container">
		<el-tabs type='border-card' tabPosition="right" @tab-click='tabCK' value='user'>
			<el-tab-pane label="用户" name='user'>
			    <span slot="label">用户</span>
			    <messUser></messUser>
			</el-tab-pane>
			<el-tab-pane label="密钥" name='Ekey'>
				<messEkey></messEkey>
			</el-tab-pane>
			<el-tab-pane label="通信" name='signal'>
				<messSignal></messSignal>
			</el-tab-pane>
			<!--<el-tab-pane label="配置" name='config'>
				<messConfig></messConfig>
			</el-tab-pane>-->
			<el-tab-pane label="主机" name='host'>
				<messHost></messHost>
			</el-tab-pane>
			<!--<el-tab-pane label="运维" name='operate'>
				<messOperate></messOperate>
			</el-tab-pane>-->
			<el-tab-pane label="分发" name='distr'>
				<messDistr></messDistr>
			</el-tab-pane>
			<el-tab-pane label="统计" name='statist'>
				<messStatist></messStatist>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import User    from '@/view/message/user.vue';
import Ekey    from '@/view/message/Ekey.vue';
import Signal  from '@/view/message/signal.vue';
import Config  from '@/view/message/config.vue';
import Host    from '@/view/message/host.vue';
import Operate from '@/view/message/operate.vue';
import Distr   from '@/view/message/distr.vue';
import Statist from '@/view/message/statist.vue';

	var pageTxt_cn = {
		tabs: ['用户','密钥','通信','配置','主机','运维','分发','统计']
	},
	pageTxt_en = {};
	
	var pageTxt = pageTxt_cn;
	
	export default {
		data() {
			return {};
		},
		methods: {
			tabCK: function(vm){
				
			},
		},
//		watch: {},
		components: {
			'messUser': User,
			'messEkey': Ekey,
			'messSignal': Signal,
			'messConfig': Config,
			'messHost': Host,
			'messOperate': Operate,
			'messDistr': Distr,
			'messStatist': Statist
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
	/* .el-select .el-input .el-select__caret{line-height: 40px;} */
</style>