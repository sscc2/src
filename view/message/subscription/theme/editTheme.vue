<template>
	<div class="editTheme">
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
							<el-transfer style="text-align: left; display: inline-block" v-model="value" filterable :left-default-checked="[]"
								:right-default-checked="[]" :titles="[pageTxt.label[7], pageTxt.label[8]]"  @change="handleChange" :data="list"
								:button-texts="[]" :format="{ noChecked: '${total}',hasChecked: '${checked}/${total}'}">
								<div slot-scope="{option}">
									<span class="itemTxt">{{option.id}}</span>
									<span class="itemTxt">{{option.name}}</span>
									<span class="itemTxt">{{option.other}}</span>
								</div>
							</el-transfer>
						</div>
					</div>
				</li>
			</ul>
			<div slot="footer" class="dialog-footer">
				<el-button @click="sync = false">取 消</el-button>
				<el-button type="primary" @click="sync = false">确 定</el-button>
			</div>
		</el-dialog>
		<div id="slotTitle">
			<div class="slotTitle">
				<button id="all" class="all">ALL</button>
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
		label: ['修改用户主题','主题名称：','发布者：','发布时间：','主题描述：','主题内容：','接收方：','可订阅用户','已订阅用户'],
		list: ['用户ID','用户名','其他']
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
		filterMethod(a, b){
//			console.log(a);
//			console.log(b);
//			return true
		}
	};
	
	observer.addBinding('messEditTheme', function(master, param){
		if(master != 'messEditTheme') return;
		data.sync = param.sync;
		data.disabled = param.disabled;
		var info = data.info, obj = param.obj;
//		for(var k in info) info[k] = '';
		if(obj){
			info.name = obj.theme;
			info.man = obj.userName;
			info.time = obj.time;
		}
	});
	
	export default {
		name: 'message_editTheme',
		data() {
			return data;
		},
		methods: {
			handleChange(remain, direction, moved){
				if(direction == 'right'){
					
				} else {
					
				}
			},
			down(){
				
			}
		},
		mounted(){
			slotTitle = kit('#slotTitle').html();
			first = false;
		},
		watch: {
			sync(cur,old){
				if(!cur) return;
				if(!first){
					first = true;
					setTimeout(addTitle, 40);
				}
			}
		},
		components: {}
	};
	
	function addTitle(){
		kit('.editTheme .el-checkbox-group').each(function(el){
			var parent = el.parentNode;
			parent.insertBefore(kit(slotTitle)[0], el);
		});
		all[0].onclick = function(){
//			console.log(46465);
			var p=kit('.editTheme .el-transfer-panel__header .el-checkbox__input');
//			p[0].checked = true;
//			p.eq(0).trigger('click').trigger('mousedown').trigger('mouseup')[0].className='el-checkbox is-checked';
			console.log(p[0].getEventListeners());
			for (var k in p[0]){
				
				if(/^on/.test(k)){
//					console.log(typeof(p[0][k])=="function")
					if(typeof(p[0][k])=="function")
					console.log(k)
				}
			}
		}
//		kit('.el-transfer-panel__header .el-checkbox__original').css('display','none')
		
	}
</script>

<style scoped="scoped">
	.list li{margin-bottom: 10px;}
	.txt{display: inline-block;font-size: 14px;line-height: 30px;width: 160px;vertical-align: top;text-align: right;padding-right: 10px;}
	.rightBox{vertical-align: top;display: inline-block;}
	.rightBox .el-input{width: 255px;}
	.rightBox .el-textarea{width: 835px;}
	
	.transfer{text-align: center;}
	.itemTxt{display: inline-block;width: 102px;font-size: 13px;line-height: 40px;color: #666;vertical-align: top;}
	#slotTitle{display: none;}
	.slotTitle{background: #F6F6F6;border: 1px solid #D8D8D8;border-width: 1px 0;}
	.all{font-size: 14px;width: 39px;}
</style>
