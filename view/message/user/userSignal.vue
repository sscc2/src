<template>
<div>
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

		<div class="btnBox">
			<div @click="dialogAdd=true"><img src="@/img/creatico.png"><span>{{pageTxt.signal[4]}}</span></div>
			<div @click="fn"><img src="@/img/deletico.png"><span>{{pageTxt.signal[5]}}</span></div>
			<div @click="delUser"><img src="@/img/creatico.png"><span>批量导出通信关系</span></div>
		</div>

		<el-table :data="list"  tooltip-effect="dark" @current-change="currentRow" @selection-change="selectionRow" highlight-current-row>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="bizType" label="业务类型" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userID1" label="用户ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName1" label="用户名称" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userID2" label="用户ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName2" label="用户名称" show-overflow-tooltip></el-table-column>
			<el-table-column label="操作" width="70" show-overflow-tooltip>
				<div slot-scope="scope" class="_zero">
					<img @click="showPromptBox(scope.$index,list)" src="@/img/deleticos.png">
				</div>
			</el-table-column>
		</el-table>

		<div class="_pagination" >
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
			<div class="rightTxt">共{{maxData}}条数据</div>
		</div>
		
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
						  <el-select v-model="value8" filterable placeholder="请选择">
    <el-option
      v-for="item in options5"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
					</div>
				</li>
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[3]}}</p>
					</div>
					<div class="rightBox">
						  <el-select v-model="value11" multiple filterable allow-create default-first-option placeholder="请选择文章标签">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value"></el-option>  
              </el-select>
						<p class="txt" @click="clear">{{pageTxt.dialog[4]}}</p>
					</div>
				</li>
			</ul>
			<div class="bottom_btn">
			    <el-button @click="dialogAdd = false">{{pageTxt.dialog[6]}}</el-button>
			    <el-button type="primary" @click="submit">{{pageTxt.dialog[5]}}</el-button>
			</div>
		</el-dialog>
      <el-dialog title="提示" :visible.sync="promptBoxShow1" width="600px">
          <span class="promptBox_content_txt">是否删除此用户信息？</span>
          <div class="promptBox_btn" >
            <el-button @click="promptBoxShow1=false">取消</el-button>
            <el-button type="primary" @click="delUser">确定</el-button>
          </div>
      </el-dialog>
    
      <el-dialog title="提示" :visible.sync="promptBoxShow" width="600px">
          <span class="promptBox_content_txt">是否删除此用户信息？</span>
          <div class="promptBox_btn" >
            <el-button @click="promptBoxShow=false">取消</el-button>
            <el-button type="primary" @click="delUser1">确定</el-button>
          </div>
      </el-dialog>


      <div class="delInfo" v-show="errInfo">
        <span class="delInfo_txt">{{$store.state.errInfo}}</span>
      </div>
	</div>
</div>	
</template>

<script>
import utils from "@/libs/utils.js";

var pageTxt= {
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
  };

export default {
  name: "mess_signal",
  data() {
    return {
      options5: [
        {
          value: "HTML",
          label: "HTML"
        },
        {
          value: "CSS",
          label: "CSS"
        },
        {
          value: "JavaScript",
          label: "JavaScript"
        }
      ],
      value8: '',
      value11: [],

      restaurants: [],
      state1: "",
      promptBoxShow: false,
      promptBoxShow1: false,
      errInfo:false,
      index: "",
      rows: "",

      maxData: 478,
      pageTxt,
      searchInfo: { bizType: "-1", userID1: "", userID2: "" },
      list: [
        {
          bizType: "电子对账",
          userID1: "ftcsTest1000",
          userName1: "王小虎",
          userID2: "ftcsTest2222",
          userName2: "王小虎"
        },
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
      var _this = this;
      utils.post(
        "/mx/userComm/query",
        {
          cmdID: 600031,
          bizType: _this.searchInfo.type,
          userID1: _this.searchInfo.userID1,
          userID2: _this.searchInfo.userID2
        },
        function(response) {
          _this.list = response.lists;
        }
      );
    },
    submit() {
      // this.dialogAdd=false
      // this.open6("response.errinfo");
      var _this = this;
      utils.post(
        "/mx/userComm/add",
        {
          cmdID: 600032,
          operator: "admin",
          bizType: 0,
          userID1: 1,
          lists: ["2", "3", "4", "5"]
        },
        function(response) {
          if (response.errcode == 0) {
            _this.dialogAdd=false
            _this.open6(response.errinfo);
          }
        }
      );
    },

    open6(msg) {
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {
          this.$store.state.tabv = "v4";
        })
        .catch(() => {});
    },

    // 刪除通信关系
        fn() {
      if (this.selects.length != 1) {
        this.$store.state.errInfo="请在列表中选择一条记录！";
        this.errInfo = true;
        setTimeout(() => {
          this.errInfo = false;
        }, 2000);    
      } else {
        this.promptBoxShow1 = true;
      }
        }, 
    delUser() {
        this.promptBoxShow1 = false;
        var _this = this;
        utils.post(
          "mx/userComm/delete",
          {
            cmdID: 600033,
            operator: "admin",
            bizType: -1,
            userID1: _this.selects[0].userID1,
            userID2: _this.selects[0].userID2
          },
          function(response) {
            if (response.errcode == 0) {
              var index = _this.list.indexOf(_this.selects[0]);
              if (index > -1) {
                _this.list.splice(index, 1);
                  _this.showDelInfo1=true;
              setTimeout(function() {
              _this.showDelInfo1 = false;
            }, 2000);
              }
            }
          }
        );
      
    },

    // 刪除通信关系(row)
    showPromptBox(index, rows) {
      this.promptBoxShow = true;
      this.index = index;
      this.rows = rows;
    },
    delUser1(index, rows) {
      this.promptBoxShow = false;
      var _this = this;
      utils.post(
        "mx/userComm/delete",
        {
          cmdID: 600033,
          operator: "admin",
          bizType: -1,
          userID1: _this.row.userID1,
          userID2: _this.row.userID2
        },
        function(response) {
          if (response.errcode == 0) {
            rows.splice(index, 1);
               _this.showDelInfo = true;
            setTimeout(function() {
              _this.showDelInfo = false;
            }, 1500);
          } 
        }
      );
    },
    clear(e) {
      this.creatInfo.other = [];
    },

    currentRow: function(e) {
      this.row = e;
    },
    currentPage: function(e) {},

    selectionRow(val) {
      this.selects = val;
      console.log(this.selects);
    },

    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "user1" },
        { value: "user2" },
        { value: "user3" },
        { value: "user4" },
        { value: "user5" },
        { value: "user6" }
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
        closePromptBox() {
      this.promptBoxShow = false;
    },
    closePromptBox1() {
      this.promptBoxShow1 = false;
    }
  },

  mounted() {
    this.restaurants = this.loadAll();
  },
  created() {
     var _this=this;
     utils.post(
      "mx/dict/query",
      {
        cmdID: 600000,
        language: 0,
        type: 3
      },
      function(response) {
        _this.options = response.lists;
      }
    );
  
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
      }
    );
  }
};
</script>

<style scoped="scoped">
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
._zero > img {
  cursor: pointer;
}
.sel {
  width: 350px;
  line-height: 40px;
}
.leftBox {
  height: 30px;
  margin-top: 10px;
}
.sel[data-v-50d0771e] {
  width: 202px;
}
  .delInfo{
	width: 328px;
	height: 132px;
	background-color: #262626;
	border-radius: 8px;
	margin: 0 auto;
	opacity:0.7;
	position: relative;
	margin-top: -15%;
	z-index: 101;
  }
  .delInfo_txt{
	font-size: 14px;
	color:#fff;
	display: block;
	text-align:center;
	line-height: 132px;
  }
  .promptBox_content_txt {
  font-size: 14px;
  color: #666;
  text-align: center;
  display: block;
  margin-top: 60px;
}
.promptBox_btn {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 50px;
}
.promptBox_btn button:nth-child(1) {
  margin-left: 0;
}
</style>



