<template>
	<div class="addTheme">
		<el-dialog :title="pageTxt.label[0]" :visible.sync="sync" width='1040px'>
			<ul class="list">
				<li>
					<label class="txt">{{pageTxt.label[1]}}</label>
					<div class="rightBox">
						<el-input :disabled='disabled' placeholder="" v-model="info.name" clearable></el-input>
					</div>
				</li><li v-show="disabled">
					<label class="txt">{{pageTxt.label[2]}}</label>
					<div class="rightBox">
						<el-input :disabled='disabled' placeholder="" v-model="info.man" clearable></el-input>
					</div>
				</li><li v-show="disabled">
					<label class="txt">{{pageTxt.label[3]}}</label>
					<div class="rightBox">
						<el-input :disabled='disabled' placeholder="" v-model="info.time" clearable></el-input>
					</div>
				</li><li>
					<label class="txt">{{pageTxt.label[4]}}</label>
					<div class="rightBox">
						<el-input placeholder="" v-model="info.describe" clearable></el-input>
					</div>
				</li><li>
					<label class="txt">{{pageTxt.label[5]}}</label>
					<div class="rightBox">
						<el-input placeholder="" type='textarea' v-model="info.content" :autosize="{ minRows: 4, maxRows: 40}"></el-input>
					</div>
				</li><li>
					<label class="txt">{{pageTxt.label[6]}}</label>
					<div class="rightBox">
						<!--<el-transfer :filter-method="filterMethod" v-model="value" :data="list"
							filterable filter-placeholder="请输入关键字">
						</el-transfer>-->
						<div class="transfer">
							<el-transfer style="text-align: left; display: inline-block" v-model="value" filterable :left-default-checked="allLeft"
								:right-default-checked="allRight" :titles="[pageTxt.label[7], pageTxt.label[8]]"  @change="handleChange" :data="list"
								:button-texts="[]" :format="{ noChecked: '${total}',hasChecked: '${checked}/${total}'}"
								@left-check-change='leftCheck' @right-check-change='rightCheck'>
								<div slot-scope="{option}">
									<span class="itemTxt">{{option.id}}</span>
									<span class="itemTxt">{{option.name}}</span>
									<!--<span class="itemTxt leIN">{{option.other}}</span>-->
									<input class="riIN" type="text" placeholder="请输入AppID" />
								</div>
							</el-transfer>
						</div>
					</div>
				</li>
			</ul>
			<div slot="footer" class="dialog-footer">
				<el-button @click="sync = false">取 消</el-button>
				<el-button type="primary" @click="submit">确 定</el-button>
			</div>
		</el-dialog>
		<div id="slotTitle">
			<div class="slotTitle">
				<div id="all" class="all">
					<el-checkbox></el-checkbox>
				</div>
				<span class="itemTxt">{{pageTxt.list[0]}}</span>
				<span class="itemTxt">{{pageTxt.list[1]}}</span>
				<span class="itemTxt">{{pageTxt.list[2]}}</span>
			</div>
		</div>
	</div>
</template>

<script>
import kit       from '@/libs/kit.js';
import utils     from '@/libs/utils.js';
import globalVar from '@/libs/globalVar.js';
import observer  from '@/libs/observer.js';


	var lang = {}, pageTxt, slotTitle, first = false;
	lang.cn = {
		tips: {},
		label: ['添加用户主题','主题名称：','发布者：','发布时间：','主题描述：','主题内容：','接收方：','可订阅用户','已订阅用户'],
		list: ['用户ID','用户名','AppID','其他']
	};
	lang.en = {};
	pageTxt = lang[globalVar.get('lang')];
	
	var list = [];
	for (var i = 0; i < 10; i++) {
		list.push({
			label:'全部的数据'+i, key:i, id: kit.randomNum(10,99),
			name: '用户'+i,other:'其它'
		});
	}
	
	var data = {
		pageTxt,
		sync: false,
		disabled: false,
		obj: null,
		info: {name:'',man:'',time:'',describe:'',content:''},
		list: list,
		value: [],
		allLeft: [],
		allRight: [],
		check_0: false,
		check_1: false,
		filterMethod(a, b){
//			console.log(a);
//			console.log(b);
//			return true
		}
	};
	var submitList = [];
	
	observer.addBinding('messAddTheme', function(master, param){
		if(master != 'messAddTheme') return;
		data.sync = param.sync;
		data.disabled = param.disabled;
		var info = data.info, obj = param.obj;
		for(var k in info) info[k] = '';
		if(obj){
			info.name = obj.theme;
			info.man = obj.userName;
			info.time = obj.time;
		}
	});
	
	export default {
		name: 'message_addTheme',
		data() {
			return data;
		},
		methods: {
			handleChange(remain, direction, moved){
				kit('.slotTitle').each(function(el){
					el.check = true;
				}).trigger('click');
//				console.log(remain, moved);
				submitList = remain;
//				if(direction == 'left'){}
			},
			leftCheck(arr, i){
				var curLen = arr.length, remainLen = submitList.length,
					listLen = this.list.length, el = kit('.addTheme .slotTitle').eq(0);
//				console.log(curLen, remainLen, listLen);
				el[0].check = false;
				if(listLen - remainLen == curLen){
					el.trigger('click');
				} else {
					el.find('.el-checkbox__input')[0].className ='el-checkbox__input';
				}
				
				
			},
			rightCheck(arr, i){},
			submit(e){
				if(submitList.length==0) return this.sync = false;
			}
		},
		mounted(){
			_this = this;
			slotTitle = kit('.addTheme #slotTitle').html();
			first = false;
		},
		watch: {
			sync(cur, old){
//				if(!cur) return;
				if(!first){
					first = true;
					setTimeout(addTitle, 40);
				}
			},
			allLeft(cur){
				setTimeout(function(){
					_this.allLeft = [0,1,2,3,4,5,6,7,8,9];
				},100)
				
			}
		},
		components: {}
	};
	var _this;
	function addTitle(){
		kit('.addTheme .el-checkbox-group').each(function(el, i){
			el.className += ' _transfer_group_' + i;
			var parent = el.parentNode;
			var tiel = kit(slotTitle).click(ck);
			parent.insertBefore(tiel[0], el);
			var checkBox = tiel.find('.el-checkbox__input');
			tiel = tiel[0];
			tiel.index = i;
			tiel.check = false;
			
			
			function ck(e){
//				e.stopImmediatePropagation();
//				e.preventDefault();
//				var qq=document.querySelector('.addTheme .el-checkbox-group .el-checkbox__original');
				console.log(_this)
				tiel.check = !tiel.check;
//				debugger;
				if(tiel.check){
					var len = _this.list.length, temp = [];
					for (var i = 0; i < len; i++) temp.push(i);
					if(tiel.index == 0){
						_this.allLeft = temp;
					} else {
						_this.allRight = temp;
					}
					checkBox[0].className ='el-checkbox__input is-checked';
				} else {
					if(tiel.index == 0){
						_this.allLeft = [];
					} else {
						_this.allRight = [];
					}
					checkBox[0].className ='el-checkbox__input';
				}
			}
		});
//		kit('.transfer .el-transfer-panel__header .el-checkbox__input').detach();
//		kit('.el-transfer-panel__header .el-checkbox__original').css('display','none');
	}
			
</script>

<style scoped="scoped">
	.list li{margin-bottom: 10px;}
	.txt{display: inline-block;font-size: 14px;line-height: 30px;width: 160px;vertical-align: top;text-align: right;padding-right: 10px;}
	.rightBox{vertical-align: top;display: inline-block;}
	.rightBox .el-input{width: 255px;}
	.rightBox .el-textarea{width: 835px;}
	
	.transfer{text-align: center;}
	.itemTxt{display: inline-block;width: 100px;font-size: 13px;line-height: 40px;color: #666;vertical-align: middle;}
	#slotTitle{display: none;}
	.slotTitle{background: #F6F6F6;border: 1px solid #D8D8D8;border-width: 1px 0;}
	.all{font-size: 14px;width: 36px;display: inline-block;padding-left: 15px;pointer-events: none;}
	._transfer_group_0 .leIN{display: inline-block;}
	._transfer_group_0 .riIN{display: none;}
	._transfer_group_1 .leIN{display: none;}
	._transfer_group_1 .riIN{display: inline-block;}
	.riIN{width: 104px;vertical-align: middle;height: 25px;color: #666;font-size: 12px;}
</style>
