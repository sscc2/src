export default {
	sidebar:{
		tabs: ['用户','Ekey','通信关系','配置','主机配置','运维','分发','稽核','任务',
			'订阅发布','用户配置','已发布主题','已订阅主题','版本','查询','对比']
	},
	themeRelease: {
		tips: {user: "请在列表中选择一条记录！",del: "是否确认要删除该用记录吗？",success:'删除成功！'},
		label: ['已发布主题','发布者ID：','发布者名称：','主题名：','日期：','起始日期','至','结束日期',
			'查询','添加用户主题','修改用户主题','删除用户主题','主题详情'],
		list: ['发布者ID','发布者名称','主题名','发布时间','订阅个数','操作']
	},
	themeSubscription: {
		tips: {user: "请在列表中选择一条记录！"},
		label: ['已订阅主题','订阅者ID：','订阅者名：','主题名：','查询','主题详情'],
		list: ['订阅者ID','订阅者名','订阅者AppID','发布者ID','发布者名称','主题名','发布时间','操作']
	},
	themeUserSet: {
		tips: {},
		label: ['用户配置','用户ID：','用户名称：','查询','用户总数：','修改配置信息'],
		list: ['用户ID','用户名称','允许发布主题个数','允许订阅主题个数','发布主题有效天数','操作']
	},
	themeAddTheme: {
		tips: {},
		label: ['添加用户主题','主题名称：','发布者：','发布者名称：','主题描述：','主题内容：','有效天数：',
			'接收方：','操作员：','通信关系用户','可订阅用户','提 交','取 消'],
		list: ['用户ID','用户名','AppID','其他']
	},
	themeDetailTheme: {
		tips: {},
		label: ['主题详情','主题名称：','主题描述：','主题内容：','接收方：','可订阅用户','已订阅用户','发布者：'],
		list: ['用户ID','用户名','appid']
	},
	themeEditTheme: {
		tips: {},
		label: ['修改用户主题','主题名称：','发布者：','发布时间：','主题描述：','主题内容：','接收方：',
			'可订阅用户','已订阅用户','提 交','取 消'],
		list: ['用户ID','用户名','其他']
	},
	versionContrast: {
		tips: {user: "请在列表中选择一条记录！"},
		label: ['对比','配置文件：','版本1：','请输入版本号','版本2：','请输入对比版本号','对 比'],
		list: ['操作类型','详情'],
		option:[{c: '0',t: '用户主题关联信息表'},{c: '1',t: '用户密码信息表'}]
	},
	versionQuery: {
		tips: {user: "请在列表中选择一条记录！"},
		label: ['查询','配置文件：','查询时间：','今天','近一周','近一个月','指定时间段','指定时间段：','至','开始日期','结束日期','查 询'],
		list: ['版本类型','版本号','版本路径','下发时间','下发人员','审核人员','下发类型','操作'],
		option:[{c: '0',t: '全部'},{c: '1',t: '系统动态配置'},{c: '2',t: '系统静态配置'},
			{c: '3',t: '用户主题关联信息表'},{c: '4',t: '用户密码信息表'}]
	},
};