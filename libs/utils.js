import Vue from 'vue'
import axios from 'axios'
import kit from '@/libs/kit.js'
import globalVar from '@/libs/globalVar.js'
	
	
function utils(){
	
	var exp = {}, vm = new Vue(), ip = globalVar.get('urlIP');
	var lang = {};
	lang.en = {
		title:'Reminder', message:'You are sure to do the following?',
		okBtn: 'Yes', cBtn: 'No'
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
				case 3: type = 'info'; break;
				case 4: type = ''; break;
				default: type = 'warning'; break;
			}
			vm.$message({
				dangerouslyUseHTMLString: true,
		        message: txt,
		        type: type,
		        center: true,
		        showClose: true
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
			if(talk == 'cn'){
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
	        	text: option.txt||'waiting...',
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
		
		var weakHtml = '<div id="_weakTips"><div class="panle"><div class="container"></div></div></div>';
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
		weakTips.txt = weakTips.el.find('.container')[0];
		weakTips.el.click(function(e){
			if(e.target == this) weakTips.hide();
		});
		
		this.weakTips = function(txt){
			weakTips.show(txt);
		};
		var hintHtml = "";
		this.hints = function(txt){
			
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
		function callback(response, fn){
//			console.log(response);
			if(response.status!==200) return console.log(response);
			var data = response.data;
			if(!data.errinfo) data.errinfo = data.errcode < 0 ? '操作失败！' : '操作成功！';
			if(fn instanceof Function) fn(data);
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
			exp.loadShow();
			if(params instanceof Function){
				fn = params;
				params = '';
			}
			axios.post(getUrl(url), params).then(function(response){
				callback(response, fn);
			}).catch(function (e) {
				exp.loadClose();
				console.log(e.message+'\nURL: ', e.config.url);
			});
		};
		//同上
		this.get = function(url, params, fn){
			exp.loadShow();
			if(params instanceof Function){
				fn = params;
				params = '';
			}
			axios.get(getUrl(url), {params}).then(function(response){
				callback(response, fn);
			}).catch(function (e) {
				exp.loadClose();
				console.log(e.message+'\nURL: ', e.config.url);
			});
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
	
	return exp;
}

export default utils();
