<template>
    <div>
        <div class='header'>
				<img  class="header_img" src="@/img/ico.png">
				<span class="header_txt1" @click="del($event)">返回</span>
				<div class="header_line"></div>
				<span class='header_txt2'>修改用户</span>
		</div>
    </div>
</template>

<script>
import kit       from '@/libs/kit.js';
import utils     from '@/libs/utils.js';
import globalVar from '@/libs/globalVar.js';
// import observer  from '@/libs/observer.js';



    export default{
        data(){
            return{

            }
        },
        methods:{
            del(){
                this.$router.replace({ path: "/message/userEdit/mess" });
                // observer.execute('messUserEdit',{type:'b'});
            }
           
        }
    }
</script>

<style  scoped="scoped">
    /* 头部 */
	.header{height:47px; border-bottom:1px solid #ccc; overflow:hidden;}
	.header_img{float:left; margin-top:15px; margin-left:20px;}
	.header_txt1{font-size:13px; color:#5C759D; float:left; line-height:47px; margin-left:5px; cursor:pointer;}
	.header_line{border-right:1px solid #EBEFF4; height:30px; float: left; margin-left:20px; margin-top:9px;}
	.header_txt2{font-size:16px; color: #656A73; line-height:47px; margin-left:20px; font-weight:bold;}
</style>
