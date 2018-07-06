import Vue        from 'vue';
import axios      from 'axios';
import kit        from '@/libs/kit.js';
import globalVar  from '@/libs/globalVar.js';
import observer   from '@/libs/observer.js';
import md5        from '@/libs/md5.js';
	
	
function utils(){
	
	var exp = {}, vm = new Vue(), ip = globalVar.get('urlIP'),
		app = globalVar.get('vm'), lang = {};
	lang.en = {
		title:'Reminder', message:'You are sure to do the following?',
		okBtn: 'Yes', cBtn: 'No', nowBtn: 'Now', review: 'review'
	}
	function MessageMask(){
		var time = null, load, isLoading = false;
		/**
		 * @param type 默认:一般; 1:成功; 2:失败; 3:警告; 4:消息提示;
		 */
		this.weakEl = function(txt, type){
			switch (type){
				case 1: type = 'success'; break;
				case 2: type = 'error'; break;
				case 3: type = 'warning'; break;
				case 4: type = ''; break;
				default: type = 'info'; break;
			}
			vm.$message({
				dangerouslyUseHTMLString: true,
		        message: txt,
		        type: type,
//		        center: true,
//		        showClose: true,
				duration: 5000
	        });
	        return exp;
		};
		/**
		 * title：标题；
		 * messaga：内容；
		 * btn：数字 2 为两个按钮；
		 * fn：确认回调函数；
		 * cancel：取消回调函数；
		 * type： 1成功，2失败，3消息，4通知，默认：警告
		 * @param opt {title,message,fn,cancel,btn,confirmButtonText,
		 * 	cancelButtonText,lockScroll,center,type,iconClass,customClass,center,onClose}
		 */
		this.confirm = function(opt){
			var talk = globalVar.get('lang');
			if(typeof(opt)!="object") opt = {message: opt};
			opt.dangerouslyUseHTMLString = true;
			opt.showCancelButton = (opt.btn == 2);
			if(talk != 'en'){
				opt.title = opt.title || '提示';
				opt.message = opt.message ||'您确定要进行以下操作？';
			} else {
				opt.title = opt.title || lang[talk].title;
				opt.message = opt.message || lang[talk].message;
				opt.confirmButtonText = lang[talk].okBtn;
				opt.cancelButtonText = lang[talk].cBtn;
			}
			switch (parseInt(opt.type)){
				case 1: opt.type = 'success'; break;
				case 2: opt.type = 'error'; break;
				case 3: opt.type = 'info'; break;
				case 4: opt.type = ''; break;
				default: opt.type = 'warning'; break;
			}
//			opt.type = opt.type || 'warning';
			opt.callback = function(res, vm){
				if(res == 'confirm'){
					if(opt.fn instanceof Function) opt.fn(vm);
				} else {
					if(opt.cancel instanceof Function) opt.cancel(vm);
				}
			};
	        vm.$confirm('', '', opt).catch(function(res,vm){
		    	if(opt.cancel instanceof Function) opt.cancel(vm);
//		    	vm.$message({type: 'info', message: '已取消操作！'});
		    });
		    return exp;
		};
		/**
		 * @param opt {title,message,duration,position,type,onClose,onClick
		 * 	offset,iconClass,customClass,cancel,cancelBtn}
		 */
		this.notify = function(opt){
			if(!opt.title){
				switch (opt.type){
					case 1: opt.title = '成功'; break;
					case 2: opt.title = '错误'; break;
					case 3: opt.title = '消息'; break;
					case 4: opt.title = '通知'; break;
					default: opt.title = '警告'; break;
				}
			}
			switch (opt.type){
				case 1: opt.type = 'success'; break;
				case 2: opt.type = 'error'; break;
				case 3: opt.type = 'info'; break;
				case 4: opt.type = ''; break;
				default: opt.type = 'warning'; break;
			}
			opt.dangerouslyUseHTMLString = true;
			vm.$notify(opt);
			return exp;
		};
		this.loadShow = function(option){
			if(isLoading) return;
			if(typeof(option)!="object") option = {};
			isLoading = true;
			clearTimeout(time);
			var icon = '';
			if(option.icon=='1') icon = 'el-icon-loading';
			else if(option.icon) icon = option.icon;
			load = vm.$loading({
				lock: true,
	        	text: option.txt||'',
	      		spinner: icon,
	        	target: option.el,
	        	background: 'rgba(255, 255, 255, 0.5)'
			});
			if(typeof(option.time)!="number") option.time = globalVar.get('loadTime');
			if(option.time > 0){
				time = setTimeout(function(){
					exp.loadClose();
				}, option.time * 1000);
			}
			return exp;
		};
		
		this.loadClose = function(){
			if(!load) return;
			clearTimeout(time);
			load.close();
			isLoading = false;
			return exp;
		};
		
		// 弱提示
		var weakHtml = '<div id="_weakTips"><div class="_panle"><div class="_container"></div></div></div>';
		var weakTips = {
			el: kit(weakHtml),
			show: function(txt){
				weakTips.txt.innerHTML = txt;
				kit.body().appendChild(this.el[0]);
				clearTimeout(weakTips.time);
				weakTips.time = setTimeout(weakTips.hide, 8000);
			},
			hide: function(){
				var el = weakTips.el[0];
				if(el.parentNode)
					el.parentNode.removeChild(el);
			},
			time: 0
		};
		weakTips.txt = weakTips.el.find('._container')[0];
		weakTips.el.click(function(e){
			if(e.target == this) weakTips.hide();
		});
		this.weakTips = function(txt, type){
			this.weakEl(txt, type);
//			weakTips.show(txt);
		};
		
		// 带按钮的消息框
		var hintHtml = '<div id="_hints"><div class="_panle">'+
			'<div><p id="_title">提示</p><img id="_close" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z'+
			'0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOVJREFUeNqMk90NgjAURmvjCDKFiDsormCI8cUNNO7hgw4hO/ATRxBwC9lBv5vcJtcbKm1yeLA9h2sTJrv9ITLG5OAMni'+
			'ZsLcEFZBaPO1iBgjdC5IKdnAJH8AYzUI5EnByxc6LAi2tjkUTJKWgtb1JkLSL67yQc/pFpw4pDnYhEIuKVaU3VmB0fKEXECHkjZT2BWy1H3CRSbvRh67ntT+Bvg4EYVPzmXk'+
			'xS8n38DZBcCznl0b0ROyI3jI4sdEDL+sJ0pHIRCswH5KGPykV6EYkpcA2QZSQVkRsFMvAIkHWEnO1XgAEAy8ZNZzb9vqAAAAAASUVORK5CYII=" />'+
			'</div><div class="_messaga"><p id="_ctxt"></p></div>'+
			'<div><button id="_yes" class="blueBtn">确定</button><button id="_now" class="blueBtn">立即下发</button>'+
			'<button id="_no" class="defBtn">取消</button></div></div></div>';
		var $hints = kit(hintHtml);
		var hintsObj = {
			el: $hints[0],
			title: $hints.find('#_title'),
			yes: $hints.find('#_yes'),
			no: $hints.find('#_no'),
			ctxt: $hints.find('#_ctxt'),
			now: $hints.find('#_now'),
			show: function(opt){
				hintsObj.ctxt[0].innerHTML = opt.txt;
				if(opt.btn==3) hintsObj.now.show('inline-block');
				else hintsObj.now.hide();
				kit.body().appendChild(this.el);
			},
			hide: function(){
				var el = hintsObj.el;
				if(el.parentNode)
					el.parentNode.removeChild(el);
			},
			runNo:function(){
				if(typeof(_opt.no)=="function") _opt.no.call(_opt.that, _opt.noArgs);
			}
		};
		if(globalVar.get('lang')=='en'){
			hintsObj.title.text('Tips');
			hintsObj.yes.text('Yes');
			hintsObj.no.text('No');
			hintsObj.now.text('Now');
		}
		$hints.click(function(e){
			if(e.target != this) return;
			hintsObj.runNo();
			hintsObj.hide();
		});
		hintsObj.yes.click(function(e){
			if(typeof(_opt.yes)=="function") _opt.yes.call(_opt.that, _opt.yesArgs);
			hintsObj.hide();
		});
		hintsObj.no.click(function(e){
			hintsObj.runNo();
			hintsObj.hide();
		});
		hintsObj.now.click(function(e){
			if(typeof(_opt.now)=="function") _opt.now.call(_opt.that, _opt.nowArgs);
			hintsObj.hide();
		});
		$hints.find('#_close').click(function(e){
			hintsObj.runNo();
			hintsObj.hide();
		});
		var _opt;
		/**
		 * @param {Object} opt {txt,yes,no,now,param,that}
		 * txt: 文本，
		 * yes，no，now：为回调函数，
		 * yesArgs，noArgs，nowArgs：回调函数的传参，类型为数组，
		 * that：修改this的指向
		 */
		this.hints = function(opt){
			if(typeof(opt)!="object") opt = {};
			_opt = opt;
			hintsObj.show(opt);
		};
		
		// 复核操作员
		var reviewHtml = '<div id="_review"><div class="_panle">'+
			'<div><p id="_title">复核操作</p><img id="_close" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z'+
			'0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOVJREFUeNqMk90NgjAURmvjCDKFiDsormCI8cUNNO7hgw4hO/ATRxBwC9lBv5vcJtcbKm1yeLA9h2sTJrv9ITLG5OAMni'+
			'ZsLcEFZBaPO1iBgjdC5IKdnAJH8AYzUI5EnByxc6LAi2tjkUTJKWgtb1JkLSL67yQc/pFpw4pDnYhEIuKVaU3VmB0fKEXECHkjZT2BWy1H3CRSbvRh67ntT+Bvg4EYVPzmXk'+
			'xS8n38DZBcCznl0b0ROyI3jI4sdEDL+sJ0pHIRCswH5KGPykV6EYkpcA2QZSQVkRsFMvAIkHWEnO1XgAEAy8ZNZzb9vqAAAAAASUVORK5CYII=" />'+
			'</div><ul class="_messaga"><li><label class="lab">复核操作员：</label><input id="_name" class="inp" type="text" /></li>'+
			'<li><label class="lab">复核员密码：</label><input id="_pass" class="inp" type="password" /></li></ul>'+
			'<div><button id="_yes" class="blueBtn">提 交</button><button id="_no" class="defBtn">返 回</button></div></div></div>';
		var $review = kit(reviewHtml), _rept;
		var reObj = {
			el: $review[0],
			title: $review.find('#_title'),
			yes: $review.find('#_yes'),
			no: $review.find('#_no'),
			label: $review.find('.lab'),
			pass: $review.find('#_pass'),
			name: $review.find('#_name'),
			show: function(opt){
				reObj.pass.val('');
				reObj.name.val('');
				kit.body().appendChild(this.el);
			},
			hide: function(){
				var el = reObj.el;
				if(el.parentNode)
					el.parentNode.removeChild(el);
			},
			runNo:function(){
				if(typeof(_rept.no)=="function") _rept.no.call(_rept.that, _rept.noArgs);
			}
		};
		if(globalVar.get('lang')=='en'){
			reObj.title.text('review');
			reObj.yes.text('Yes');
			reObj.no.text('No');
			reObj.label[0].innerText = 'review name:';
			reObj.label[1].innerText = 'password:';
		}
		$review.click(function(e){
			if(e.target != this) return;
			reObj.runNo();
			reObj.hide();
		});
		$review.find('#_close').click(function(e){
			reObj.runNo();
			reObj.hide();
		});
		reObj.no.click(function(e){
			reObj.runNo();
			reObj.hide();
		});
		reObj.yes.click(function(e){
			if(typeof(_rept.yes)!="function") return console.warn('回调函数不正确！');
			var name=reObj.name.val(), pass=reObj.pass.val();
			if(name==''||pass=='') return exp.weakTips('复核员或密码不能为空！', 2);
			reObj.hide();
			return _rept.yes.call(_rept.that, {name});
			var param = {
				url: 'mx/userinfo/review',
				cmdID: '90001',
				name: reObj.name.val(),
				pass: md5.hex_md5(reObj.pass.val()),
				that: _rept.that,
				args: {name},
				that: _rept.that
			};
			exp.post(param, _rept.yes);
			reObj.hide();
		});
		this.review = function(opt){
			if(typeof(opt)!="object") opt = {};
			_rept = opt;
			reObj.show(opt);
		}
		// 复核操作员
		this.reviewHide = function(){
			reObj.runNo();
			reObj.hide();
		};
	};
	kit.extend(exp, new MessageMask());
//		axios.request（config）
//		axios.get（url [，config]）
//		axios.delete（url [，config]）
//		axios.head（url [，config]）
//		axios.post（url [，data [，config]]）
//		axios.put（url [，data [，config]]）
//		axios.patch（url [，data [，config]]）
	function ReqHttp()
	{
		function callback(response, fn, that, args){
//			console.log(response);
			if(response.status!==200) return console.log(response);
			var data = response.data;
			if(!data.errinfo) data.errinfo = data.errcode < 0 ? '操作失败！' : '操作成功！';
			if(fn instanceof Function) fn.call(that, data, args);
			exp.loadClose();
		}
		function getUrl(url){
			if((/^http:/i).test(url)||(/^https:/i).test(url)) return url;
			return ip + url;
		}
		/**
		 * @param url： 请求地址；
		 * @param params： 发到后台的参数，只有两个入参时为回调函数；
		 * @param fn： 请求成功回调函数；
		 */
		this.post = function(url, params, fn){
			exp.loadShow({icon:'none'});
			if(arguments.length == 2){
				fn = params;
				if(typeof(url)=="object"){
					params = url;
					url = params.url;
					delete params.url;
				}
			}
			var that = params.that, args = params.args;
			delete params.that; delete params.args;
			axios.post(getUrl(url), params).then(function(response){
				callback(response, fn, that, args);
			}).catch(function (e) { error(e); });
		};
		function error(e){
			exp.loadClose();
			if(e.message == 'Network Error') return;
			if(e.response){
				var res = e.response;
				if(res.status == 404) return;
				console.warn(res.config.data);
				console.warn(res.data);
			} else  console.warn(e);
		}
		//同上
		this.get = function(url, params, fn){
			exp.loadShow();
			if(params instanceof Function){
				fn = params;
				params = '';
			}
			axios.get(getUrl(url), {params}).then(function(response){
				callback(response, fn);
			}).catch(function (e) { error(); });
		};
	}
	kit.extend(exp, new ReqHttp());

	exp.toUtf8 = function (str) {
	    var out = '', i, len = str.length, c;
	    for(i = 0; i < len; i++) {
	        c = str.charCodeAt(i);
	        if ((c >= 0x0001) && (c <= 0x007F)) {
	            out += str.charAt(i);
	        } else if (c > 0x07FF) {
	            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
	            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
	            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
	        } else {
	            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
	            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
	        }
	    }
	    return out;
	};
	var router = app.$router;
	exp.goto = function (url, key, val, fn, abort){
		var obj;
		if(typeof(url)=="object"){
			obj = url; key = obj.key;
			val = obj.val; fn = obj.fn;
			abort = obj.abort;
		}
		if(key) globalVar.set(key, val);
		router.replace({ path: url }, fn, abort);
	};
	exp.route = function(){return app.$route.params;};
	
	exp.getUserid = function(str, call){
		var param = {
			url: 'mx/userinfo/queryLists',
			cmdID: "600001",
			userID: str,
			userName: str,
			pageSize: 200,
			currentPage: 1,
			type: 1
		};
		exp.post(param, function(data){
//			console.log('getUserid：',data);
			if(data.errcode < 0) return console.log(data.errinfo);
			var obj, i;
			for (i = 0; i < data.lists.length; i++) {
				obj = data.lists[i];
				obj.key = i;
				obj.label = obj.userID+obj.userName;
			}
			globalVar.set('useridList', data.lists);
			call(data.lists);
//			observer.execute('useridReady');
		});
	};
	
	function WheelReq(uuid){
		var begin, over = 30*1000, once;
		var param = {
			cmdID: '600073',
			uuid: uuid,
			lastQueryFlag: 0 //1最后一次，0不是；
		};
		
		function req(){
			if(Date.now()-begin>=over){
				clearInterval(once);
				param.lastQueryFlag = 1;
				hide();
			}
			exp.post('mx/batchDispatch/queryBatchDisptachDispatchResponse', param, response);
		}
		function response(data){
			if(data.errcode < 0){
				clearInterval(once);
				hide();
				return;
			}
			if(data.endQueryFlag==0) return;
			clearInterval(once);
			var list = data.lists, len = list.length, obj, str = '',
				dom = '<p>serviceID：{serviceID}；errcode：{errcode}；errinfo：{errinfo}</p>';
			for (var i = 0; i < len; i++) {
				obj = list[i];
				if(obj.errcode<0){
					str += kit.template(obj, dom);
				}
			}
			if(str) exp.weakTips(str, 2);
			else exp.weakTips(data.errinfo, 1);
			hide();
		}
		function show(){
			kit.body().appendChild(WheelReq.el);
		}
		function hide(){
			var parent = WheelReq.el.parentNode;
			if(parent) parent.removeChild(WheelReq.el);
		}
		this.start = function(){
			begin = Date.now();
			show();
			req();
			clearInterval(once);
			once = setInterval(req, 2000);
		};
	}
	WheelReq.el = kit(`<div id="_wheel"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular">
		<circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg></div></div>`)[0];
	exp.wheelReq = function(sv){
		if(sv.endQueryFlag==1||!sv.uuid) return exp.weakTips(sv.errinfo);
		var w = new WheelReq(sv.uuid);
		w.start();
	};
	
	return exp;
}

export default utils();
