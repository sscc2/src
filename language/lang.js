import globalVar from '@/libs/globalVar.js';
import zhcn      from '@/language/zh-CN.js';
import en        from '@/language/en.js';

var lang = sessionStorage.getItem('language');
if(lang){
	globalVar.set('lang', lang);
}

export default globalVar.get('lang')=='en' ? en : zhcn;