<template>
	<div class="distr">
		<h2 class="h2">{{pageTxt.label[0]}}</h2>
		<hr class="_hr" />
		<ul class="list">
			<li>
				<label class="txt">{{pageTxt.label[1]}}</label>
				<div class="rightBox">
					<el-select v-model="type" placeholder="请选择">
						<el-option v-for="item in pageTxt.options" :key="item.val" :label="item.label" :value="item.val">
						</el-option>
					</el-select>
					<span class="txt2" v-if="type==1">
						({{pageTxt.label[5]}}: userinfo.cfg,userekey.cfg,usercomm.cfg,srvparam.cfg)
					</span>
					<span class="txt2" v-else-if="type==2">
						({{pageTxt.label[6]}}: srv.ini,*_currsrv.ini)
					</span>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[2]}}</label>
				<div class="rightBox">
					<p class="txt2">{{pageTxt.label[7]}}</p>
					<el-table class='suList' :data="data" tooltip-effect="dark" @current-change="currentRow" @selection-change="selectionRow">
						<!--<el-table-column width="55" type="index"></el-table-column>-->
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="suName" :label="pageTxt.list[0]" ></el-table-column>
					</el-table>
					<!--<div class="pagination" v-show="data.length!=0">
						<el-pagination @current-change='userChange($event)' background layout="prev, pager, next" 
							:page-size='20' :total="1000">
						</el-pagination>
					</div>-->
				</div>
			</li>
			<!--<li>
				<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[3]}}</label>
				<div class="rightBox">
					<el-input auto-complete="off" :placeholder='pageTxt.label[8]'></el-input>
				</div>
			</li><li>
				<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[4]}}</label>
				<div class="rightBox">
					<el-input auto-complete="off" :placeholder='pageTxt.label[8]'></el-input>
				</div>
			</li>-->
			<li>
				<label class="txt">&nbsp;</label>
				<div class="rightBox">
					<p class="jg"></p>
					<button class="blueBtn" @click="submit">{{pageTxt.label[9]}}</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import utils  from '@/libs/utils.js';
import lang   from '@/language/lang.js';


	var pageTxt, _this, _currentPage = 1;
	pageTxt = lang.distr;
	
	export default {
		name: 'message_distr',
		data() {
			return {
				pageTxt,
		        data: [/*{suName: 'SU-06'},{suName: 'AU-01'}*/],
		        type: '1',
		        selects: []
			};
		},
		methods: {
			currentRow: function(row){
			},
			selectionRow(arr) {
		        this.selects = arr;
		    },
		    currentPage: function(e){
//		    	console.log(e)
			},
			submit(e){
				var arr = this.selects;
				if(arr.length < 1) return utils.weakTips(pageTxt.tips.pc);
				utils.hints({
					txt:pageTxt.tips.submit,
					yes: fullDose,
					yesParam: arr
				});
			}
		},
		mounted(){
			_this = this;
			var param = {
				url: 'mx/batchDispatch/querySuName',
				cmdID: '600071',
				currentPage: 1,
				pageSize: 300
			};
			utils.post(param, function(data){
				if(data.errcode < 0) return utils.weakTips(data.errinfo);
				_this.data = data.lists;
			});
		}
	};
	function fullDose(arr){
		var param = {
			cmdID: '600072',
			url: 'mx/batchDispatch/dispatch',
			type: _this.type,
			lists: arr,
			count: arr.length,
		};
		utils.post(param, function(data){
			utils.weakTips(data.errinfo);
		});
	}
</script>

<style scoped="scoped">
	.distr{padding: 0 20px;white-space: nowrap;color: #333;}
	.h2{font-size: 16px;line-height: 44px;color: #666;font-weight: bold;}
	._hr{margin: 0 0 10px;margin-left: -20px;}
	
	.list li{margin-bottom: 10px;}
	.txt,.txt2{display: inline-block;font-size: 14px;line-height: 30px;width: 120px;vertical-align: top;text-align: right;padding-right: 10px;}
	.txt2{width: auto;text-align: left;}
	.red{color: #F00;line-height: 1;vertical-align: text-bottom;}
	.rightBox{vertical-align: top;display: inline-block;}
	.rightBox .el-input{width: 255px;}
	.rightBox .el-textarea{width: 835px;}
	.el-select{width: 200px;margin-right: 10px;}
	.blueBtn{margin-right: 40px;}
	.jg{padding-bottom: 30px;}
	.distr .suList{max-height: 400px;overflow: auto;width: 710px;}
</style>