<template>
  <div>
    <div class='header'>
        <span class='header_txt'>{{pageTxt.label[0]}}</span>
    </div>
    <div class="signal">
      <div class="userH">
        <span class="txt">{{pageTxt.label[1]}}：</span>
        <el-select class="input_normal" v-model="searchInfo.bizType" placeholder="">
          <el-option v-for="item in options1" :label="item.name" :key="item.id" :value="item.id"></el-option>
        </el-select>
        <span class="txt1">{{pageTxt.label[2]}}：</span>

        <el-autocomplete  @input='autoInput1' class="input_normal" v-model="searchInfo.userID1" :fetch-suggestions="fetch1" :trigger-on-focus="false" @select="idSelect1">
          <div slot-scope="{item}">
            <span class="name">{{item.userID}}</span>
            <span class="addr">({{item.userName}})</span>
          </div>
        </el-autocomplete>
        <span class="txt1">{{pageTxt.label[3]}}：</span>
        <el-autocomplete  @input='autoInput2' class="input_normal" v-model="searchInfo.userID2" :fetch-suggestions="fetch2" :trigger-on-focus="false" @select="idSelect2">
          <div slot-scope="{item}">
            <span class="name">{{item.userID}}</span>
            <span class="addr">({{item.userName}})</span>
          </div>
        </el-autocomplete>
        <el-button type="primary"  @click='search' class="btn">{{pageTxt.label[4]}}</el-button>
      </div>
      <div class="btnBox">
        <div @click="showCreate"><img src="@/img/creatico.png"><span>{{pageTxt.label[5]}}</span></div>
        <div @click="exportSignalInfo"><img src="@/img/creatico.png"><span>{{pageTxt.label[6]}}</span></div>
      </div>
      <el-table :data="list.lists"  tooltip-effect="dark" @current-change="currentRow" highlight-current-row>
        <el-table-column width="50" label=" " type="index"></el-table-column>
        <el-table-column prop="typeStr" :label="pageTxt.table[0]" show-overflow-tooltip></el-table-column>
        <el-table-column prop="userID1" :label="pageTxt.table[1]" show-overflow-tooltip></el-table-column>
        <el-table-column prop="userName1" :label="pageTxt.table[2]" show-overflow-tooltip></el-table-column>
        <el-table-column prop="userID2" :label="pageTxt.table[3]" show-overflow-tooltip></el-table-column>
        <el-table-column prop="userName2" :label="pageTxt.table[4]" show-overflow-tooltip></el-table-column>
        <el-table-column :label="pageTxt.table[5]" width="70" show-overflow-tooltip>
          <div slot-scope="scope" class="_zero">
            <el-tooltip :content="pageTxt.table[6]" placement="bottom" effect="light"><img @click="showPromptBox" src="@/img/deleticos.png"></el-tooltip>
          </div>
        </el-table-column>
      </el-table>
      <div class="_pagination" v-if="list.totalSize>pageSize">
        <el-pagination  @current-change='handleCurrentChange' background layout="prev, pager, next, jumper" @size-change="handleSizeChange" :page-size="pageSize" :total="list.totalSize"></el-pagination>
        <div class="rightTxt">共{{list.totalSize}}条数据</div>
      </div>
      <div class="onePage" v-else-if="list.totalSize>0&&list.totalSize<=pageSize">已显示全部{{list.totalSize}}个数据</div> 
      <el-dialog width='620px' :title="pageTxt.popup[0]" :visible.sync="dialogAdd">
        <ul class="_dialog">
          <li>
            <div class="leftBox">
              <p class="txt">{{pageTxt.popup[1]}}</p>
            </div>
            <div class="rightBox">
              <el-select  class="input_normal" v-model="creatInfo.bizType" placeholder="">
                <el-option v-for="item in optionsCreat" :label="item.name" :key="item.id"  :value="item.id"></el-option>
              </el-select>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt">{{pageTxt.popup[2]}}</p>
            </div>
            <div class="rightBox">
                <el-select id="statist_input" class="input_normal" v-model="creatInfo.user" filterable placeholder="" @change="changevalue" clearable>
                  <el-option v-for="item in options2" :key="item.userID" :label="item.userName" :value="item.userID"></el-option>
                </el-select>
            </div>
          </li>
          <li>
            <div class="leftBox bug">
              <p class="txt">{{pageTxt.popup[3]}}</p>
            </div>
            <div class="rightBox">
              <el-select id="statist_select" class="input_normal" :disabled="creatInfo.user?false:true"  v-model="creatInfo.other" multiple filterable default-first-option placeholder="">
                <el-option  v-for="item in options5" :key="item.userID" :label="item.userName" :value="item.userID"></el-option>  
              </el-select>
              <span class="cleartxt" @click="clear">{{pageTxt.popup[4]}}</span>
            </div>
          </li>
        </ul>
        <div class="bottom_btn">
          <el-button @click="dialogAdd = false">{{pageTxt.popup[6]}}</el-button>
          <el-button type="primary" @click="submit">{{pageTxt.popup[5]}}</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="Popup" v-show="showExportSignalInfo">
      <div class="_panle">
        <div>
          <p id="_title">{{pageTxt.popup[7]}}</p>
          <img id="_close" src="@/img/close.png" @click="showExportSignalInfo=false">
        </div>
        <div class="_messaga">
          <span class="txt">&nbsp;{{pageTxt.popup[8]}}<a :href="signalInfoSrc" style="color:#5C759D">{{signalInfoName}}</a></span>
          <div class="_messaga_info">
            <span class="info_txt">{{pageTxt.popup[9]}}</span>
          </div>
        </div>
        <div class="info_button">
          <el-button type="default" @click="showExportSignalInfo=false">{{pageTxt.popup[10]}}</el-button>
        </div>
      </div>
    </div> 
  </div>	
</template>

<script>
import utils from "@/libs/utils.js";
import lang from '@/language/lang.js';

var pageTxt = lang.signal,autoTime1,isInput1 = false,autoTime2,isInput2 = false,_this,t;

export default {
  name: "mess_signal",
  data() {
    return {
      searchInfo: { bizType: "", userID1: "", userID2: "" },
      options1: [],
      userID1: "",
      userID2: "",
      creatInfo: { bizType: "", user: "", other: [] },
      options2: [],
      options3: [],
      options5: [],
      optionsCreat: [],
      pageSize: 20,
      currentPage: 1,
      dialogAdd: false,
      row: "",
      pageTxt,
      list: [],
      showExportSignalInfo: false,
      signalInfoSrc: "",
      signalInfoName: ""
    };
  },
  methods: {
    //查询
    search() {
      this.renderData(_this.searchInfo.bizType);
    },
    //创建
    showCreate() {
      this.getDate("statist_input", this.options2);
      setTimeout(function() {
        document.getElementsByClassName("el-select__input is-big")[0].addEventListener("input", function(e) {
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
                    _this.options3 = response.lists;
                    for (var i = 0; i < _this.options3.length; i++) {
                      _this.options3[i].userName = _this.options3[i].userID + "(" + _this.options3[i].userName + ")";
                    }
                    _this.options5 = [].concat(_this.options3);
                    for (var i = 0; i < _this.options5.length; i++) {
                      if (_this.options5[i].userID == _this.creatInfo.user) {
                        _this.options5.splice(i, 1);
                        break;
                      }
                    }
                  }
                }
              );
            }, 300);
          });
      }, 0);
      this.dialogAdd = true;
      this.creatInfo.user = "";
      this.creatInfo.other = [];
    },
    submit() {
      utils.post(
        "/mx/userComm/add",
        {
          cmdID: "600032",
          operator: "admin",
          bizType: _this.creatInfo.bizType,
          userID1: _this.creatInfo.user,
          lists: _this.creatInfo.other
        },
        function(response) {
          if (response.errcode == 0) {
            _this.dialogAdd = false;
            _this.renderData(_this.searchInfo.bizType);
            utils.weakTips(response.errinfo);
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    //导出通信关系
    exportSignalInfo() {
      utils.post(
        "mx/userComm/ExportCsv",
        {
          cmdID: "600034"
        },
        function(response) {
          if (response.errcode == 0) {
            _this.signalInfoSrc = response.errinfo;
            _this.signalInfoName = response.errinfo.split("/").pop();
            _this.showExportSignalInfo = true;
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    //刪除通信关系(row)
    showPromptBox() {
      utils.hints({
        txt: _this.pageTxt.tips[0],
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
            _this.renderData(_this.searchInfo.bizType);
            utils.weakTips(response.errinfo);
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    //清空用戶ID
    clear() {
      this.creatInfo.other = [];
    },
    currentRow: function(e) {
      this.row = e;
    },
    //分页
    handleSizeChange: function(size) {
      this.pageSize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.renderData(_this.searchInfo.bizType);
    },
    //更新数据
    renderData(type) {
      utils.post(
        "mx/userComm/query",
        {
          cmdID: "600031",
          bizType: type,
          userID1: isInput1 ? _this.searchInfo.userID1 : _this.userID1,
          userID2: isInput2 ? _this.searchInfo.userID2 : _this.userID2,
          pageSize: _this.pageSize,
          currentPage: _this.currentPage
        },
        function(response) {
          if (response.errcode == 0) {
            if (response.totalPage < _this.currentPage) {
              _this.currentPage = response.totalPage;
              _this.renderData(type);
            } else {
              _this.list = as(response);
            }
          }
        }
      );
    },
    getDate(id, options) {
      setTimeout(function() {
        document.getElementById(id).addEventListener("input", function(e) {
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
                }
              }
            );
          }, 300);
        });
      }, 1);
    },
    changevalue(){
      for (var i = 0; i < _this.options5.length; i++) {
        if (_this.options5[i].userID == _this.creatInfo.user) {
          _this.options5.splice(i, 1);
          break;
        }
      }
    },
    fetch1(str, cb) {
      clearTimeout(autoTime1);
      autoTime1 = setTimeout(autoInput, 300, str, cb);
    },
    idSelect1(item) {
      isInput1 = false;
      this.userID1 = item.userID;
      this.searchInfo.userID1 = item.userID + "(" + item.userName + ")";
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
      this.searchInfo.userID2 = item.userID + "(" + item.userName + ")";
    },
    autoInput2() {
      isInput2 = true;
    },
  },
  //初始化数据
  created() {
    this.searchInfo.bizType = "-1";
    this.creatInfo.bizType = "0";
    _this = this;
    _this.renderData("-1");
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
          _this.options1.unshift({ id: "-1", name: _this.pageTxt.tips[1] });
        }
      }
    );
    //业务类型
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
          _this.options2 = response.lists;

          for (var i = 0; i < _this.options2.length; i++) {
            _this.options2[i].userName =
              _this.options2[i].userID + "(" + _this.options2[i].userName + ")";
          }
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
        currentPage: "1",
        type: 2
      },
      function(response) {
        if (response.errcode == 0) {
          _this.options5 = response.lists;
          for (var i = 0; i < _this.options5.length; i++) {
            _this.options5[i].userName = _this.options5[i].userID + "(" + _this.options5[i].userName + ")";             
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
    for (var x = 0; x < _this.optionsCreat.length; x++) {
      if (obj.bizType == _this.optionsCreat[x].id) {
        obj.typeStr = _this.optionsCreat[x].name
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
.signal{margin: 20px;}
.signal .userH{height: 30px;}
.input_normal{margin-left: 10px;}
.txt{font-size: 14px; color: #666;}
.btn{margin-left: 35px;}
.btnBox{margin-bottom: 10px; margin-top: 10px; font-size: 14px; color: #5c759d; }
.btnBox div{display: inline-block; cursor: pointer; margin-right: 35px;}
.btnBox span{margin-left: 4px;height: 30px; line-height: 30px;}
._zero > img{cursor: pointer;}
.txt1{margin-left: 35px;font-size: 14px; color: #666;}
._dialog .leftBox{height: 30px;}
.bug{vertical-align:top}
.sel{width: 350px; line-height: 40px;}
.leftBox{height: 30px;}
.sel[data-v-50d0771e]{width: 202px;}
.txt1{margin-left: 30px;font-size: 13px; color: #666;}
.input_normal{height: auto;}
.cleartxt{margin-left: 20px;font-size:14px;color:#666;cursor: pointer;}
</style>

<style>
.signal .input_normal span {white-space: normal; word-break: keep-all; display: inline-block;}
</style>