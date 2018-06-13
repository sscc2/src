
import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    name: '张三'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

const Earalist = [
    {
      "date": "1997-11-11",
      "name": "林丽",
      "address": "吉林省 辽源市 龙山区"
  }, {
      "date": "1987-09-24",
      "name": "文敏",
      "address": "江西省 萍乡市 芦溪县"
  }, {
      "date": "1996-08-08",
      "name": "杨秀兰",
      "address": "黑龙江省 黑河市 五大连池市"
  }, {
      "date": "1978-06-18",
      "name": "魏强",
      "address": "广东省 韶关市 始兴县"
  }, {
      "date": "1977-07-09",
      "name": "石秀兰",
      "address": "江苏省 宿迁市 宿豫区"
  }, {
      "date": "1994-09-20",
      "name": "朱洋",
      "address": "海外 海外 -"
  }, {
      "date": "1980-01-22",
      "name": "傅敏",
      "address": "海外 海外 -"
  }, {
      "date": "1985-10-10",
      "name": "毛明",
      "address": "内蒙古自治区 包头市 九原区"
  }, {
      "date": "1975-09-08",
      "name": "何静",
      "address": "西藏自治区 阿里地区 普兰县"
  }, {
      "date": "1970-06-07",
      "name": "郭秀英",
      "address": "四川省 巴中市 恩阳区"
  }];

export { LoginUsers, Users ,Earalist};
