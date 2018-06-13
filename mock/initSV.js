import axios from 'axios';
import Mock from 'mockjs';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users, Earalist } from './data';
let _Users = Users;

let list = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
});



export default {
	init() {
		let mock = new MockAdapter(axios,{ delayResponse: 300 });
		// mock success request
		mock.onGet('/success').reply(200, {
			msg: 'success'
		});

		// mock error request
		mock.onGet('/error').reply(500, {
			msg: 'failure'
		});

		//提交用户信息
		mock.onPost('/insert').reply(params => {
//			console.log(params.data);
			return new Promise((resolve, reject) => {
				resolve([200, {msg:'操作成功！', list, code: 0, r:Math.ceil(Math.random()*100)}]);
			});
		});
	}
};