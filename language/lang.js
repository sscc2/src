import globalVar from '@/libs/globalVar.js';
import zhcn      from '@/language/zh-CN.js';
import en        from '@/language/en.js';

//var lang = sessionStorage.getItem('language');
//console.log(navigator);
globalVar.set('lang', navigator.language);

/*
 * 0: "zh-CN"
1: "zh"
2: "zh-TW"
3: "zh-HK"
4: "en-US"
5: "en"
 */

export default globalVar.get('lang')=='en' ? en : zhcn;