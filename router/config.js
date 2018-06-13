import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'

Vue.use(Router);

export default new Router({
	routes: [
//  {
//    path: '/',
//    name: 'HelloWorld',
//    component: HelloWorld
//  },
	{
		path: '/',
	    component: resolve => require(['../view/home.vue'], resolve)
	}, {
	    path: '/home',
	    component: resolve => require(['../view/home.vue'], resolve),
	    children:[
            {
                path: '/FDEPMessage',
                component: resolve => require(['../view/FDEPMessage.vue'], resolve),
                children: [
                	{
	                	path: '/message/user',
		                component: resolve => require(['@/view/message/user.vue'], resolve),
	                },{
	                	path: '/message/Ekey',
		                component: resolve => require(['@/view/message/Ekey.vue'], resolve),
	                },{
	                	path: '/message/signal',
		                component: resolve => require(['@/view/message/signal.vue'], resolve),
	                },{
	                	path: '/message/config',
		                component: resolve => require(['@/view/message/config.vue'], resolve),
	                },{
	                	path: '/message/host',
		                component: resolve => require(['@/view/message/host.vue'], resolve),
	                },{
	                	path: '/message/operate',
		                component: resolve => require(['@/view/message/operate.vue'], resolve),
	                },{
	                	path: '/message/distr',
		                component: resolve => require(['@/view/message/distr.vue'], resolve),
	                },{
	                	path: '/message/statist',
		                component: resolve => require(['@/view/message/statist.vue'], resolve),
	                }
                ]
            },{
                path: '/FDEPFile',
                component: resolve => require(['../view/FDEPFile.vue'], resolve),
                children: [
                	{
	                	path: '/file/user',
		                component: resolve => require(['@/view/file/user.vue'], resolve),
	                },{
	                	path: '/file/Ekey',
		                component: resolve => require(['@/view/file/Ekey.vue'], resolve),
	                },{
	                	path: '/file/signal',
		                component: resolve => require(['@/view/file/signal.vue'], resolve),
	                },{
	                	path: '/file/task',
		                component: resolve => require(['@/view/file/task.vue'], resolve),
	                },{
	                	path: '/file/config',
		                component: resolve => require(['@/view/file/config.vue'], resolve),
	                },{
	                	path: '/file/distr',
		                component: resolve => require(['@/view/file/distr.vue'], resolve),
	                },{
	                	path: '/file/operate',
		                component: resolve => require(['@/view/file/operate.vue'], resolve),
	                },{
	                	path: '/file/statist',
		                component: resolve => require(['@/view/file/statist.vue'], resolve),
	                }
                ]
            },{
                path: '/message/userEdit/:id',
                component: resolve => require(['../view/message/userEdit.vue'], resolve)
            },{
                path: '/message/userAdd/:id',
                component: resolve => require(['../view/message/userAdd.vue'], resolve)
            }
        ]
	}, 
	
  ]
})
