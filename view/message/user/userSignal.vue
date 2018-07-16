<template>
  <div>
    <div class="signal">
      <div class="userH">
        <span class="txt">{{pageTxt.signal[0]}}：</span>
        <el-select class="input_normal" v-model="searchInfo.bizType" placeholder="请选择">
          <el-option v-for="item in options1" :label="item.name" :key="item.id"  :value="item.id"></el-option>
        </el-select>
        <span class="txt1">{{pageTxt.signal[1]}}：</span>
        <el-autocomplete  disabled  @input='autoInput1' class="input_normal" v-model="$store.state.transferEditID" :fetch-suggestions="fetch1" :trigger-on-focus="false" @select="idSelect1">
          <div slot-scope="{item}">
            <span class="name">{{item.userID}}</span>
            <span class="addr">({{item.userName}})</span>
          </div>
        </el-autocomplete>
        <span class="txt1">{{pageTxt.signal[2]}}：</span>
        <el-autocomplete  @input='autoInput2' class="input_normal" v-model="idName2" :fetch-suggestions="fetch2" :trigger-on-focus="false" @select="idSelect2">
          <div slot-scope="{item}">
            <span class="name">{{item.userID}}</span>
            <span class="addr">({{item.userName}})</span>
          </div>
        </el-autocomplete>
        <el-button type="primary"  @click='search' class="btn">{{pageTxt.signal[3]}}</el-button>
      </div>

      <div class="btnBox">
        <div @click="showCreate"><img src="@/img/creatico.png"><span>{{pageTxt.signal[4]}}</span></div>
      </div>
      <el-table :data="list.lists" tooltip-effect="dark" @current-change="currentRow" highlight-current-row>
        <el-table-column width="50" label=" " type="index"></el-table-column>
        <el-table-column prop="typeStr" label="业务类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="userID1" label="用户ID" show-overflow-tooltip></el-table-column>
        <el-table-column prop="userName1" label="用户名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="userID2" label="用户ID" show-overflow-tooltip></el-table-column>
        <el-table-column prop="userName2" label="用户名称" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="70" show-overflow-tooltip>
          <div slot-scope="scope" class="_zero">
            <el-tooltip content="删除通信关系" placement="bottom" effect="light"><img @click="showPromptBox" src="@/img/deleticos.png"></el-tooltip>
          </div>
        </el-table-column>
      </el-table>

      <div class="_pagination" v-if="list.totalSize>pageSize">
        <el-pagination @current-change='handleCurrentChange' background layout="prev, pager, next, jumper" @size-change="handleSizeChange" :page-size="pageSize" :total="list.totalSize"></el-pagination>
        <div class="rightTxt">共{{list.totalSize}}条数据</div>
      </div>
      <div class="onePage" v-else-if="list.totalSize>0&&list.totalSize<=pageSize">已显示全部{{list.totalSize}}个数据</div> 
      
      <el-dialog width='620px' :title="pageTxt.dialog[0]" :visible.sync="dialogAdd">
        <ul class="_dialog">
          <li>
            <div class="leftBox">
              <p class="txt">{{pageTxt.dialog[1]}}</p>
            </div>
            <div class="rightBox">
              <el-select  class="input_normal" v-model="creatInfo.bizType" placeholder="请选择">
                <el-option v-for="item in optionsCreat" :label="item.name" :key="item.id" :value="item.id">
                </el-option>
              </el-select>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt">{{pageTxt.dialog[2]}}</p>
            </div>
            <div class="rightBox">
              <el-input  class="input_normal" v-model="$store.state.transferEditID" disabled></el-input>
            </div>
          </li>
          <li>
            <div class="leftBox bug">
              <p class="txt">{{pageTxt.dialog[3]}}</p>
            </div>
            <div class="rightBox">
              <el-select class="input_normal"  v-model="creatInfo.other" multiple filterable default-first-option placeholder="请选择">
                <el-option  v-for="item in options" :key="item.userID" :label="item.userName" :value="item.userID"></el-option>  
              </el-select>
              <span class="cleartxt" @click="clear">清空用户</span>
            </div>
          </li>
        </ul>
        <div class="bottom_btn">
          <el-button @click="dialogAdd = false">{{pageTxt.dialog[6]}}</el-button>
          <el-button type="primary" @click="submit">{{pageTxt.dialog[5]}}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>	
</template>

<script>
import utils from "@/libs/utils.js";

var pageTxt = {
  signal: [
    "业务类型 ","用户ID","用户ID","查询","创建通信关系","删除通信关系","业务类型","操作"
  ],
  dialog: [
    "创建通信关系","业务类型 ：","用户ID ：","用户ID ：","","提交","返回"
  ]
},autoTime1,isInput1 = false,autoTime2,isInput2 = false,options4,_this,t;

export default {
  name: "mess_signal",
  data() {
    return {
      options: "",
      userID1: "",
      idName2: "",
      userID2: "",
      searchInfo: { bizType: "", userID1: "", userID2: "" },
      creatInfo: { bizType: "", user: "", other: [] },
      options1: [],
      options2: [],
      options3: [],
      optionsCreat: [],
      restaurants: [],
      userOption: [],
      otherOption: [],
      pageSize: "20",
      currentPage: "1",
      dialogAdd: false,
      state1: "",
      index: "",
      rows: "",
      row: "",
      pageTxt,
      list: []
    };
  },
  methods: {
    fetch1(str, cb) {
      clearTimeout(autoTime1);
      autoTime1 = setTimeout(autoInput, 300, str, cb);
    },
    idSelect1(item) {
      isInput1 = false;
      this.userID1 = item.userID;
      this.idName1 = item.userID + "(" + item.userName + ")";
    },
    autoInput1() {
      isInput1 = true;
    },

    fetch2(str, cb) {
      clearTimeout(autoTime2);
      autoTime2 = setTimeout(autoInput, 300, str, cb);
    },
    idSelect2(item) {
      isInput2 = false;
      this.userID2 = item.userID;
      this.idName2 = item.userID + "(" + item.userName + ")";
    },
    autoInput2() {
      isInput2 = true;
    },
    //查询
    search() {
      this.renderData();
    },
    //创建
    showCreate() {
      this.dialogAdd = true;
      this.creatInfo.other = [];

      setTimeout(function() {
        document
          .getElementsByClassName("el-select__input is-big")[0]
          .addEventListener("input", function(e) {
            clearTimeout(t);
            t = setTimeout(function() {
              utils.post(
                "mx/userinfo/queryLists",
                {
                  cmdID: "600001",
                  userID: e.target.value,
                  userName: e.target.value,
                  pageSize: 200,
                  currentPage: 1,
                  type: 2
                },
                function(response) {
                  if (response.errcode == 0) {
                    _this.options = response.lists;
                    for (var i = 0; i < _this.options.length; i++) {
                      _this.options[i].userName = _this.options[i].userID + "(" + _this.options[i].userName + ")";
                    }
                    for (var i = 0; i < _this.options.length; i++) {
                      if ( _this.options[i].userID ==  _this.$store.state.transferEditID ) {
                        _this.options.splice(i, 1);
                        break;
                      }
                    }
                  }
                }
              );
            }, 300);
          });
      }, 0);
    },
    submit() {
      this.dialogAdd = false;
      utils.post(
        "/mx/userComm/add",
        {
          cmdID: "600032",
          operator: "admin",
          bizType: _this.creatInfo.bizType,
          userID1: _this.$store.state.transferEditID,
          lists: _this.creatInfo.other
        },
        function(response) {
          if (response.errcode == 0) {
            if (_this.$store.state.creatAndEdit) {
              _this.renderData();
              utils.weakTips(response.errinfo);
            } else {
              _this.renderData();
              _this.open6(response.errinfo);
            }
          } else {
            utils.weakTips(response.errinfo);
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
          this.$router.replace({ path: "/message/userEdit/mess" });
        })
        .catch(() => {
          this.$store.state.tabv = "v3";
          this.$router.replace({ path: "/message/userEdit/mess" });
        });
    },
    // 刪除通信关系(row)
    showPromptBox() {
      utils.hints({
        txt: "是否确定删除该用户记录",
        yes: _this.delUser1,
        btn: 2
      });
    },
    delUser1() {
      utils.post(
        "mx/userComm/delete",
        {
          cmdID: "600033",
          operator: "admin",
          bizType: _this.row.bizType,
          userID1: _this.row.userID1,
          userID2: _this.row.userID2
        },
        function(response) {
          if (response.errcode == 0) {
            _this.renderData();
            utils.weakTips(response.errinfo);
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    clear() {
      this.creatInfo.other = [];
    },
    currentRow: function(e) {
      this.row = e;
    },
    // 分页
    handleSizeChange: function(size) {
      this.pageSize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      _this.renderData();
    },
    // 更新数据
    renderData() {
      utils.post(
        "mx/userComm/query",
        {
          cmdID: "600031",
          bizType: _this.searchInfo.bizType,
          userID1: _this.$store.state.transferEditID,
          userID2: isInput2 ? _this.idName2 : _this.userID2,
          pageSize: _this.pageSize,
          currentPage: _this.currentPage
        },
        function(response) {
          if (response.errcode == 0) {
            if (response.totalPage < _this.currentPage) {
              _this.currentPage = response.totalPage;
              _this.renderData();
            } else {
              _this.list = as(response);
            }
          }
        }
      );
    }
  },
  //初始化数据
  created() {
    this.searchInfo.bizType = "-1";
    this.creatInfo.bizType = "0";
    _this = this;
    _this.renderData();
    utils.post(
      "mx/dict/query",
      {
        cmdID: "600000",
        language: 0,
        type: 3
      },
      function(response) {
        if (response.errcode == 0) {
          _this.options1 = response.lists;
          _this.options1.unshift({ id: "-1", name: "全部" });
        } else {
          utils.weakTips(response.errinfo);
        }
      }
    );
    utils.post(
      "mx/dict/query",
      {
        cmdID: "600000",
        language: 0,
        type: 3
      },
      function(response) {
        if (response.errcode == 0) {
          _this.optionsCreat = response.lists;
        }
      }
    );
    utils.post(
      "mx/userinfo/queryLists",
      {
        cmdID: "600001",
        userID: "",
        userName: "",
        pageSize: 200,
        currentPage: 1,
        type: 2
      },
      function(response) {
        if (response.errcode == 0) {
          _this.options = response.lists;
          for (var i = 0; i < _this.options.length; i++) {
            _this.options[i].userName = _this.options[i].userID + "(" + _this.options[i].userName + ")";
          }
        }
        for (var i = 0; i < _this.options.length; i++) {
          if (_this.options[i].userID == _this.$store.state.transferEditID) {
            _this.options.splice(i, 1);
            break;
          }
        }
      }
    );
  }
};
function as(data) {
  var arr = data.lists,obj;
  for (var i = 0; i < arr.length; i++) {
     obj = arr[i];
    for (var x = 0; x < _this.options1.length; x++) {
      if (obj.bizType == _this.options1[x].id) {
        obj.typeStr = _this.options1[x].name
      }
    }
  }
  return data;
}
function autoInput(str, cb) {
  if (!str) return;
  utils.getUserid(str, function(data) {
    var i,
      len = data.length,
      tem = [];
    for (i = 0; i < len; i++) {
      if (data[i].label.indexOf(str) != -1) tem.push(data[i]);
    }
    cb(tem);
  });
}
</script>
<style scoped="scoped">
.signal *{vertical-align: middle;}
.signal .userH{height: 30px;}
.input_normal{margin-left: 10px;}
.txt{font-size: 14px; color: #666666;}
.btn{margin-left: 35px;}
.btnBox{margin-bottom: 10px; margin-top: 10px; font-size: 14px; color: #5c759d; }
.btnBox div{display: inline-block; cursor: pointer; margin-right: 35px;}
.btnBox span{margin-left: 4px;height: 30px; line-height: 30px;}
._zero > img{cursor: pointer;}
.txt1{margin-left: 35px;font-size: 14px; color: #666666;}
._dialog .leftBox{height: 30px;}
.bug{vertical-align:top}
.sel{width: 350px; line-height: 40px;}
.leftBox{height: 30px;}
.sel[data-v-50d0771e]{width: 202px;}
.txt1{margin-left: 30px;font-size: 13px; color: #666666;}
.input_normal{width: 250px;height: auto;}
.cleartxt{margin-left: 20px;font-size:14px;color:#666;cursor: pointer;}
</style>

<style>
	.signal .input_normal span{white-space: normal;word-break: keep-all;display: inline-block;}
</style>