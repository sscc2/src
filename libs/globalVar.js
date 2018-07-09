var vars = {};
vars.lang = 'cn';
vars.useridList = [];
vars.loadTime = 2;

(function(){
	var local = window.location; //localhost
//	console.log(local);
	var origin = local.origin || local.protocol+'//'+local.host;
	vars.urlIP = origin + '/fdep/';
	vars.hash = function(){return local.hash;};
	vars.search = function(){return local.search;};
}());

//vars.urlIP = 'http://192.168.218.35:8081/fdep/';  // 小焕
//vars.urlIP = 'http://192.168.22.22:8081/fdep/';   // 曼萍
//vars.urlIP = 'http://120.78.209.133:8080/fdep/';  // 外网
//vars.urlIP = 'http://127.0.0.1:8081/fdep/';	    // 本机




export default {
	set(key, val){vars[key] = val;},
	get(key){ return vars[key]; }
};
/**
 * lang         语言
 * urlIP        请求的IP地址
 * loadTime     全局接口请求的等待时间
 * useridList   初始化用户ID
 */