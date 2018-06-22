import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store=new Vuex.Store({
    state:{
        tabv:"",            //选项卡切换
        transferEditID:"",  //点击row ID
        lists:[],           //全部lists date
        passShow: false,     //修改密码的显示
        userID:""  ,
        errInfo:''
    } 
})


export default store     