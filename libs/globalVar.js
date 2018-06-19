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

function creatID(){
	for (var i = 0; i < 10; i++) {
		var obj = {userID:'userID'+i,userName:'userName'+(i+1)};
		obj.words = obj.userID + obj.userName;
		vars.useridList.push(obj);
	}
	console.log('creatID', vars.useridList);
}
//creatID();

//vars.urlIP = 'http://192.168.22.212:8081/fdep/';  //内网
// vars.urlIP = 'http://192.168.218.35:8081/fdep/';  //小焕
vars.urlIP = 'http://192.168.22.22:8081/fdep/';  //曼萍


export default {
	set(key, val){vars[key] = val;},
	get(key){
//		if(key == 'useridList') return console.warn('请用useridList()方法!');
		return vars[key];
	},
	useridList(){
		var arr = [], i, len = vars.useridList.length,obj;
		for (i = 0; i < len; i++) {
			obj = vars.useridList[i];
			arr.push({
				userID: obj.userID,
				userName: obj.userName,
				words: obj.userID+obj.userName
			});
		}
		return arr;
	}
};
/**
 * lang         语言
 * urlIP        请求的IP地址
 * loadTime     全局接口请求的等待时间
 * useridList   初始化用户ID
 */