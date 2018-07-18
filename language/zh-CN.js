export default {
	sidebar:{
		tabs: ['用户','Ekey','通信关系','配置','主机配置','运维','分发','稽核','任务',
			'订阅发布','用户配置','已发布主题','已订阅主题','版本','查询','对比']
	},
	themeRelease: {
		tips: {user: "请在列表中选择一条记录！",del: "是否确认要删除该用记录吗？",success:'删除成功！'},
		label: ['已发布主题','发布者：','发布者名称：','主题名：','日期：','起始日期','至','结束日期',
			'查 询','添加用户主题','修改用户主题','删除用户主题','主题详情','批量导出主题信息',
			'请在文件名上点击右键，选择“将链接另存为...”菜单保存文件。','关 闭'],
		list: ['发布者ID','发布者名称','主题名','发布时间','订阅个数','操作']
	},
	themeSubscription: {
		tips: {user: "请在列表中选择一条记录！"},
		label: ['已订阅主题','订阅者：','订阅者名：','主题名：','查 询','主题详情'],
		list: ['订阅者ID','订阅者名','订阅者AppID','发布者ID','发布者名称','主题名','发布时间','操作']
	},
	themeUserSet: {
		tips: {user: "请在列表中选择一条记录！"},
		label: ['用户配置','用户：','用户名称：','查 询','用户总数：','修改配置信息'],
		list: ['用户ID','用户名称','允许发布主题个数','允许订阅主题个数','发布主题有效天数','操作']
	},
	themeAddTheme: {
		tips: {topicName:'主题名称不能为空！', pubUserID:'发布者ID不能为空！', pubUserName:'发布者名称不能为空！',
			topicDescr:'主题描述不能为空！',topicInfo:'主题内容不能为空！', effectiveDays: '有效天数必须为数字！',
			send:'是否要提交?',now:'是否要立即下发?'},
		label: ['添加用户主题','主题名称：','发布者：','发布者名称：','主题描述：','主题内容：','有效天数：',
			'接收方：','操作员：','用户列表','可订阅用户','立即下发','提 交','返 回'],
		list: ['用户ID','用户名','AppID','其他'],
		must:'必须...'
	},
	themeDetailTheme: {
		tips: {},
		label: ['主题详情','主题名称：','主题描述：','主题内容：','接收方：','可订阅用户','已订阅用户','发布者：','返 回'],
		list: ['用户ID','用户名','appid']
	},
	themeEditTheme: {
		tips: {appid:'AppId 不能为空！',send:'是否要提交?',now:'是否要立即下发?',topicDescr:'主题描述不能为空！',
			topicInfo:'主题内容不能为空！', nextNow:'此次修改可能影响已订阅用户，请跳转至已订阅用户页面进行确认！'},
		label: ['修改信息','修改用户主题','主题名称：','发布者：','发布时间：','主题描述：','主题内容：', '接收方：','对端用户',
			'已选对端用户','提 交','返 回','修改已订阅用户','已订阅用户：','立即下发','可订阅用户','已订阅用户'],
		list: ['用户ID','用户名','appid'],
		must:'必须...'
	},
	versionContrast: {
		tips: {user: "请在列表中选择一条记录！",ver1: "您输入的版本 1 不正确！",ver2: "您输入的版本 2 不正确！"},
		label: ['对比','配置文件：','版本1：','请输入版本号','版本2：','请输入对比版本号','对 比'],
		list: ['操作类型','详情'],
		option:[{c: '3',t: '用户密码信息表'},{c: '4',t: '用户主题关联信息表'}]
	},
	versionQuery: {
		tips: {roolback: "您确定要回退到此版本？"},
		label: ['查询','配置文件：','查询时间：','今天','近一周','近一个月','指定时间段','指定时间段：','至','开始日期','结束日期','查 询','版本回滚'],
		list: ['版本类型','版本号','版本路径','操作时间','操作人员','审核人员','下发类型','操作'],
		option:[{c: '0',t: '全部'},{c: '1',t: '系统动态配置'},{c: '2',t: '系统静态配置'},
			{c: '3',t: '用户密码信息表'},{c: '4',t: '用户主题关联信息表'},{c: '5',t: '回滚'}]
	},
	distr: {
		tips: {pc:'请选择主机！',man:'复核操作员不能为空！',pass:'复核密码不能为空！',submit:'是否要提交？'},
		label: ['分发','配置文件：','分发主机：','复核操作员：','复核密码：','系统动态配置文件为：', '系统静态配置文件为：',
			'主机列表', '必填项...', '提 交', '用户密码信息表文件为：', '用户主题关联信息表文件为：'],
		list: ['主机名'],
		options: [{val: '1',label:'系统动态配置'},{val: '2',label:'系统静态配置'},{val: '3',label:'用户密码信息表'},{val: '4',label:'用户主题关联信息表'}]
	},


	user: {
		label: ["用户","用户ID：","用户名称：","查询","创建用户","批量导入扩展信息","批量导出扩展信息","批量导出基础信息"],
		table: ["用户ID","用户名称","操作","修改基本信息","修改Ekey","创建通信关系","删除用户","修改密码"],
		popup: ["批量导入扩展信息","扩展信息文件名","请将扩展信息文件放到服务器路路径：/home/fdep/notice内；","在输入框中填入扩展信息文件名。","提交","返回",
				"批量导出扩展信息","文件名：","请在文件名上点击右键，选择“将链接另存为...”菜单保存文件。","关闭","批量导出基础信息"],
		tips: ["创建用户","是否立即下发","修改用户","是否确定删除该用户记录"]
	  },
	Ekey: {
		label: ["Ekey","查询方式","按Ekey查询","按用户查询","Ekey名称","用户ID","查询","创建Ekey","批量导出Ekey"],
		table: ["用户ID","用户名称","Ekey名称","Ekey有效期","Ekey描述","操作","修改Ekey信息","删除Ekey信息"],
		popup: ["创建Ekey","用户ID：","Ekey名称：","Ekey有效期：","Ekey描述：","立即下发","提 交","返 回",
				"修改Ekey","批量导出Ekey","文件名：","请在文件名上点击右键，选择“将链接另存为...”菜单保存文件。","关闭"],
		tips: ["Ekey名称不能为空","用户ID不能为空","Ekey有效期不能为空","Ekey描述不能为空","用户名不能为空","Ekey名不能为空","是否删除该用户信息",
					 "是否立即下发",]
	  },
	signal: {
		label: ["通信关系","业务类型 ","用户ID","用户ID","查询","创建通信关系","批量导出通信关系"],
		table: ["业务类型","用户ID","用户名称","用户ID","用户名称","操作","删除通信关系"],
		popup: ["创建通信关系","业务类型 ：","用户ID ：","用户ID ：","清空用户ID","提交","返回",
				"批量导出通信关系","文件名：","请在文件名上点击右键，选择“将链接另存为...”菜单保存文件。","关闭"],
		tips: ["是否确定删除该用户记录","全部","提示","确定","取消"]
	  },
	host:{
		label: [ "主机配置","全局静态配置","静态配置文件：","提交","全局动态配置","动态配置文件：","只读","编辑","是否提交当前修改",
				 "(全局静态配置文件为：mxstatic.ini，文件仅支持UTF-8格式)",
				 "(全局动态配置文件为：mxdynamic.ini，文件仅支持UTF-8格式)"],
		popup: ["复核操作","复核操作员","复核员密码","提 交","返 回"]
	  },
	statist: {
		label: ["稽核","操作员：","操作类型：","排序方式：","最近","最早","时间段：","今天","本周","本月","其他","至","开始时间","结束时间","查询","导出报表",],
		table: ["操作时间","操作类型","操作员","操作员角色","操作错误码","操作错误描述","详情","应答详情"],
		tips: ["运维","用户"]
	  },
	userEdit: {
		label: ["返回","用户ID","用户名称","用户类型","所属地区","速度","(Kbit/s)-1或0:不限速","用户联系方式信息","用户组","离线是否告警",
		  "软加密开始时间","软加密结束时间","是否允许收发文件","发布主题个数上限","订阅主题个数上限","最大主题过期天数","立即下发","修改","返回",
		  "创建用户","使用默认密码","重置","不重置","密码","选择日期时间","创建"],
		tab: ["基本信息", "Ekey", "通信关系", "扩展信息"],
		connect :[
			{ value: "0", label: "Group0" },{ value: "1", label: "Group1" },{ value: "2", label: "Group2" },{ value: "3", label: "Group3" },
			{ value: "4", label: "Group4" },{ value: "5", label: "Group5" },{ value: "6", label: "Group6" }
		  ],
		online :[{ value: "1", label: "是" }, { value: "0", label: "否" }],
		tips: ["是否立即下发","密码必须包含大小写字母、数字、特殊字符中两项且大于8位","用户ID或用户名不能为空","修改用户"]
	  },
	password: {
		label: ["修改密码","用户ID：","重置密码：","默认","手动","新密码：","确认：","立即下发","提交","返回"],
		tips: ["两次输入的应该一致","密码必须包含大小写字母、数字、特殊字符中两项且大于8位","是否立即下发"]
	  },
	extendIfo:{
		tips:['只能输入数字"-" ";"','只能输入数字"-" ";"','只能输入数字和";"','只能输入数字"-" ";"','只能输入数字"-" ";"',"只能输入英文字符、数字","提交","返回"],
		label:["短信报警号码：","负责人座机号码：","负责人手机号码：","运维传真：","运维电话：","邮箱：","SSCC客户经理："]
	  }
};