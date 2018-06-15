<template>
<div>
	<!-- 头部 -->
	<div class='header'>
			<span class='header_txt'>通信关系</span>
	</div>

	<!-- 文本 -->
	<div class="signal">
		<div class="userH">
			<span class="txt">{{pageTxt.signal[0]}}：</span>
			<el-select class='searchSel' v-model="searchInfo.type" placeholder="请选择">
				<el-option v-for="item in pageTxt.options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<span class="txt">{{pageTxt.signal[1]}}：</span>
			<el-input v-model="searchInfo.userID1"></el-input>
			<span class="txt">{{pageTxt.signal[2]}}：</span>
			<el-input v-model="searchInfo.userID2"></el-input>
			<el-button type="primary" plain @click='search'>{{pageTxt.signal[3]}}</el-button>
		</div>

		<!-- 导航 -->
		<div class="btnBox">
			<div @click="dialogAdd=true"><img src="@/img/creatico.png"><span>{{pageTxt.signal[4]}}</span></div>
			<div @click="delUser"><img src="@/img/deletico.png"><span>{{pageTxt.signal[5]}}</span></div>
			<div @click=""><img src="@/img/creatico.png"><span>批量导出通信关系</span></div>
		</div>

		<!-- 表格 -->
		<el-table :data="list"  tooltip-effect="dark" @current-change="currentRow" @selection-change="selectionRow" highlight-current-row>
			<el-table-column width="55" type="index"></el-table-column>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="bizType" label="业务类型" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userID1" label="用户ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName1" label="用户名称" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userID2" label="用户ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName2" label="用户名称" show-overflow-tooltip></el-table-column>
			<el-table-column label="操作" width="70" show-overflow-tooltip>
				<div slot-scope="scope" class="_zero">
					<img @click="delUser" src="@/img/deleticos.png">
				</div>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<div class="_pagination" v-show="list.length!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
			<div class="rightTxt">共{{maxData}}条数据</div>
		</div>
		
		<!-- 增加 -->
		<el-dialog width='620px' :title="pageTxt.dialog[0]" :visible.sync="dialogAdd">
			<ul class="_dialog">
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[1]}}</p>
					</div>
					<div class="rightBox">
						<el-select class='sel' v-model="creatInfo.type" placeholder="请选择">
							<el-option v-for="item in pageTxt.options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[2]}}</p>
					</div>
					<div class="rightBox">
						 <!-- <el-autocomplete class="inline-input" v-model="state1" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete> -->
             <el-input  placeholder="请输入内容"></el-input>
					</div>
				</li>
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[3]}}</p>
					</div>
					<div class="rightBox">
						<el-autocomplete class="inline-input" v-model="state1" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
						<p class="txt" @click="clear">{{pageTxt.dialog[4]}}</p>
					</div>
				</li>
			</ul>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogAdd = false">{{pageTxt.dialog[6]}}</el-button>
			    <el-button type="primary" @click="submit">{{pageTxt.dialog[5]}}</el-button>
			</div>
		</el-dialog>
	</div>
</div>	
</template>

<script>
import utils from "@/libs/utils.js";

var pageTxt_cn = {
    tips: {
      user: "请在列表中选择一条记录！",
      del: "确认要删除该记录吗？",
      err: "请选择用户和对端用户！"
    },
    signal: [
      "业务类型 ",
      "用户ID",
      "用户ID",
      "查询",
      "创建通信关系",
      "删除通信关系",
      "业务类型",
      "",
      "",
      "",
      "",
      "操作"
    ],
    options: [
      { value: "0", label: "全部" },
      { value: "1", label: "三方存管" },
      { value: "2", label: "银期转账" },
      { value: "3", label: "银基转账" },
      { value: "4", label: "资金划拔" },
      { value: "5", label: "信证报盘" },
      { value: "6", label: "电子对账" },
      { value: "7", label: "融资融券" },
      { value: "8", label: "基金盘后" },
      { value: "9", label: "转融通" },
      { value: "10", label: "B转H" },
      { value: "11", label: "交叉销售" },
      { value: "12", label: "报价回购" },
      { value: "13", label: "个股期权" },
      { value: "14", label: "FISP" },
      { value: "15", label: "私券报转" },
      { value: "16", label: "云证通" },
      { value: "17", label: "基金实时业务" },
      { value: "18", label: "基金费用对账" }
    ],
    dialog: [
      "创建通信关系",
      "业务类型 ：",
      "用户ID ：",
      "用户ID ：",
      "",
      "提交",
      "返回"
    ]
  },
  pageTxt_en = {};

var pageTxt = pageTxt_cn;

export default {
  name: "mess_signal",
  data() {
    return {
		restaurants: [],
		state1: '',

      maxData: 478,
      pageTxt,
      searchInfo: { bizType: "-1", userID1: "", userID2:"" },
      list: [
        {
          bizType: "电子对账",
          userID1: "ftcsTest1000",
          userName1: "王小虎",
          userID2: "ftcsTest2222",
          userName2: "王小虎"
        }
      ],
      selects: [],
      row: "",
      dialogAdd: false,
      creatInfo: { type: "0", user: "", other: [] },
      userOption: [],
      otherOption: []
    };
  },
  methods: {
    search() {
		var _this=this
	  utils.post("/mx/userComm/query",{
		  cmdID:600031,
		  bizType: "-1",
		  userID1: _this.searchInfo.userID1,
		  userID2: _this.searchInfo.userID2
	  } ,function(response){
		_this.list = response.lists
	  });
	},
    submit() {
	var _this=this
	  utils.post("/mx/userComm/add",{
		  cmdID:600032,
		  operator: "admin",		  
		  bizType: 0,
		  userID1: 1,
      lists: ["2","3","4","5"],

	  } ,function(response){
      if(response.errcode==0){
          alert(response.errinfo)
      }
	  });     
    },	
    currentRow: function(e) {
      this.row = e;
    },
    currentPage: function(e) {
    
	},
	selectionRow(val){
	 this.selects=val
	 console.log(this.selects)
	},
    delUser(e) {
      if (this.selects.length != 1) {
        utils.confirm({ message: "请在列表中选择一条记录！", type: 2 });
      } else {
        utils.post(
          "mx/userComm/delete",
          {
            cmdID: 600033,
			      operator: "admin",
			      bizType: -1,
            userID1: this.selects[0].userID1,
            userID2: this.selects[0].userID2
          },
          function(response) {
            if (response.errcode == 0) {
              alert(response.errinfo);
            } else {
              alet("删除失败");
            }
          }
        );
      }		
    },
    clear(e) {
      this.creatInfo.other = [];
	},
	

	    querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "user1" },
          { "value": "user2" },
          { "value": "user3" },
          { "value": "user4" },
          { "value": "user5" },
          { "value": "user6" }
        ];
      },
      handleSelect(item) {
        console.log(item);
      }



  },

  mounted() {
      this.restaurants = this.loadAll();
    },
  created() {
    var _this = this;
    utils.post(
      "mx/userComm/query",
      {
        cmdID: 600031,
        bizType: -1,
        userID1: "",
        userID2: ""
      },
      function(response) {
        _this.list = response.lists;
            console.log("this",this)
      }
    );
  }
};


</script>

<style scoped="scoped">
/* 头部 */
.header {
  height: 47px;
  border-bottom: 1px solid #ccc;
}
.header_txt {
  line-height: 47px;
  font-size: 16px;
  color: #656a73;
  line-height: 47px;
  margin-left: 17px;
  font-weight: bold;
}

/* 文本 */
.signal {
  padding: 22px;
}
.user * {
  vertical-align: middle;
}
.userH .el-input {
  width: 210px;
  margin-right: 10px;
}
.searchSel {
  width: 120px;
  margin-right: 20px;
  line-height: 30px;
}
.userH > .el-button {
  margin-left: 35px;
  width: 90px;
  height: 30px;
  background-color: #32ccf9;
  line-height: 0px;
  border: 0;
  color: white;
}
.txt {
  font-size: 13px;
  color: #666666;
}

/* 导航 */
.btnBox {
  margin-bottom: 10px;
  margin-top: 18px;
  font-size: 13px;
  color: #5c759d;
  overflow: hidden;
}
.btnBox div {
  float: left;
  cursor: pointer;
  margin-left: 30px;
}
.btnBox span {
  margin-left: 5px;
}
.btnBox div:nth-child(1) {
  margin-left: 0;
}

/* 表格 */
._zero > img {
  cursor: pointer;
  margin-left: 14px;
}

/* 分页 */
.sel {
  width: 350px;
  line-height: 40px;
}

.leftBox {
  height: 30px;
  margin-top: 10px;
}
.sel[data-v-50d0771e]{
  width: 202px;
}

</style>



