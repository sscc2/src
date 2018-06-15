
var vars = {};
vars.lang = 'cn';
vars.useridList = null;
vars.loadTime = 2;

(function(){
	var local = window.location; //localhost
//	console.log(local);
	var origin = local.origin || local.protocol+'//'+local.host;
	vars.urlIP = origin + '/fdep/';
	vars.hash = function(){return local.hash;};
	vars.search = function(){return local.search;};
}());

//vars.urlIP = 'http://192.168.22.212:8081/fdep/';  //内网
//vars.urlIP = 'http://192.168.218.35:8081/fdep/';  //小焕
//vars.urlIP = 'http://192.168.22.110:8081/fdep/';  //曼萍


export default {
	set(key, val){vars[key] = val;},
	get(key){return vars[key];}
};
/**
 * lang         语言
 * urlIP        请求的IP地址
 * loadTime     全局接口请求的等待时间
 * useridList   初始化用户ID
 */