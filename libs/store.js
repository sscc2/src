import Vue from 'vue';
import Vuex from 'vuex';
import { Header } from 'element-ui';
Vue.use(Vuex);

const store=new Vuex.Store({
    state:{
        tabv:"",            //选项卡切换
        transferEditID:"",  //点击row ID
        passShow: false,     //修改密码的显示
        dateListsUserID:{},
        HeaderText:"",      //修改创建标题
        creatAndEdit:'' ,     
        editBack:""   //修改返回路径
    } 
})


export default store     