<template>
  <div>
    <div class='header'>
        <span class='header_txt'>{{pageTxt.label[0]}}</span>
    </div>	
    <div class="Ekey">     
      <div class="user">
        <span>{{pageTxt.label[1]}}：</span>
        <el-radio v-model="search.type" :label="0">{{pageTxt.label[2]}}</el-radio>
        <el-radio v-model="search.type" :label="1">{{pageTxt.label[3]}}</el-radio>
        <span v-show='search.type==0' id="box" class="txt">{{pageTxt.label[4]}}：</span>
        <el-input   class='input_normal picker' v-show='search.type==0' v-model="search.ekeyName" ></el-input>
        <span v-show='search.type==1' class="txt" id="box">{{pageTxt.label[5]}}：</span>
        <el-autocomplete  v-show='search.type==1'  @input='autoInput' class="input_normal picker" v-model="idName" :fetch-suggestions="fetch" :trigger-on-focus="false" @select="idSelect">
          <div slot-scope="{item}">
            <span class="name">{{item.userID}}</span>
            <span class="addr">({{item.userName}})</span>
          </div>
        </el-autocomplete>
        <el-button type="primary" @click='searchfn'>{{pageTxt.label[6]}}</el-button>
      </div>
      <div class="btnBox">
        <div @click="showAdd" id='Add' ><img src="@/img/user/addEkey.png" ><span>{{pageTxt.label[7]}}</span></div>
        <div @click="exportEkeyInfo"><img src="@/img/user/importico1.png"><span>{{pageTxt.label[8]}}</span></div>
      </div>
      <el-table  :data="EkeyData.lists"  tooltip-effect="dark" @current-change="currentRow" highlight-current-row >
        <el-table-column width="50" label=" " type="index"></el-table-column>
        <el-table-column prop="userID" :label="pageTxt.table[0]" show-overflow-tooltip></el-table-column>
        <el-table-column prop="userName" :label="pageTxt.table[1]" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ekeyName" :label="pageTxt.table[2]" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ekeyValidDate" :label="pageTxt.table[3]" show-overflow-tooltip></el-table-column>
        <el-table-column prop="comment" :label="pageTxt.table[4]" show-overflow-tooltip></el-table-column>
        <el-table-column :label="pageTxt.table[5]" width="110">
          <div slot-scope="scope" class="_zero">
            <el-tooltip :content="pageTxt.table[6]" placement="bottom" effect="light"><div @click="showEdit(scope.row)" id='Edit'><img src="@/img/user/altericos.png"></div></el-tooltip>
            <el-tooltip :content="pageTxt.table[7]" placement="bottom" effect="light"><div @click="showDel"><img src="@/img/user/deleticos.png"></div></el-tooltip>
          </div>
        </el-table-column>
      </el-table>
      <div class="_pagination" v-if="EkeyData.totalSize>pageSize">
        <el-pagination @current-change='handleCurrentChange' background layout="prev, pager, next, jumper" @size-change="handleSizeChange" :page-size="pageSize" :total="EkeyData.totalSize"></el-pagination>
        <div class="rightTxt">共{{EkeyData.totalSize}}条数据</div>
      </div>
      <div class="onePage" v-else-if="EkeyData.totalSize>0&&EkeyData.totalSize<=pageSize">已显示全部{{EkeyData.totalSize}}个数据</div> 

      <el-dialog :title="pageTxt.popup[0]" :visible.sync="addEkey" width='620px'>
        <ul class="_dialog">
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[1]}}</p>
            </div>
            <div class="rightBox" id="rightBox1">
              <el-select id="Ekye_input" filterable v-model="ainfo.userID" placeholder="">
                <el-option  v-for="item in options" :key="item.userID" :label="item.userName" :value="item.userID"></el-option>
              </el-select>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[2]}}</p>
            </div>
            <div class="rightBox">
              <el-input   class='picker' v-model="ainfo.ekeyName" placeholder=""></el-input>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[3]}}</p>
            </div>
            <div class="rightBox">
              <el-date-picker class='picker' v-model="ainfo.ekeyValidDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder=""></el-date-picker>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[4]}}</p>
            </div>
            <div class="rightBox">
              <el-input class='picker' v-model="ainfo.comment" placeholder=""></el-input>
            </div>
          </li>				
        </ul>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sendDown">{{pageTxt.popup[5]}}</el-button>
            <el-button type="primary" @click="submitAdd">{{pageTxt.popup[6]}}</el-button>            
            <el-button @click="addEkey = false">{{pageTxt.popup[7]}}</el-button>
        </div>
      </el-dialog>
      
      <el-dialog :title="pageTxt.popup[8]" :visible.sync="editEkdy" width='620px'>
        <ul class="_dialog">
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[1]}}</p>
            </div>
            <div class="rightBox">
              <el-input   class='picker' v-model="binfo.userID" placeholder="" disabled></el-input>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[2]}}</p>
            </div>
            <div class="rightBox">
              <el-input  class='picker' v-model="binfo.ekeyName" placeholder=""></el-input>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[3]}}</p>
            </div>
            <div class="rightBox">
              <el-date-picker class='picker' v-model="binfo.ekeyValidDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder=""></el-date-picker>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[4]}}</p>
            </div>
            <div class="rightBox">
              <el-input class='picker' v-model="binfo.comment" placeholder=""></el-input>
            </div>
          </li>
        </ul>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="lijixiafa">{{pageTxt.popup[5]}}</el-button>
            <el-button type="primary" @click="submitEdit">{{pageTxt.popup[6]}}</el-button>
            <el-button @click="editEkdy = false">{{pageTxt.popup[7]}}</el-button>
        </div>
      </el-dialog>
      <div class="Popup" v-show="showExportEkeyInfo">
        <div class="_panle">
          <div><p id="_title">{{pageTxt.popup[9]}}</p>
            <img id="_close" src="@/img/close.png" @click="showExportEkeyInfo=false">
          </div>
          <div class="_messaga">
            <span class="txt">{{pageTxt.popup[10]}}&nbsp;<a :href="EkeyInfoSrc" style="color:#5C759D">{{EkeyInfoName}}</a></span>
            <div class="_messaga_info">
              <span class="info_txt">{{pageTxt.popup[11]}}</span>
            </div>
          </div>
          <div class="info_button">
            <el-button type="default" @click="showExportEkeyInfo=false">{{pageTxt.popup[12]}}</el-button>
          </div>
        </div>
      </div> 
    </div>
  </div>	
</template>

<script>
import utils from "@/libs/utils.js";
import lang from '@/language/lang.js';

var pageTxt = lang.Ekey,autoTime,isInput = false,_this,t;

var ainfo = {},def = ["operator", "userID", "ekeyName", "type", "ekeyValidDate", "comment"];
for (var i = 0; i < def.length; i++) {
  ainfo[def[i]] = "";
}

var binfo = {},det = ["operator", "userID", "ekeyName", "type", "ekeyValidDate", "comment"];
for (var i = 0; i < det.length; i++) {
  binfo[det[i]] = "";
}

export default {
  data() {
    return {
      idName: "",
      userID: "",
      search: { userID: "", type: "", ekeyName: "" },
      ainfo,
      binfo,
      EkeyData: {},
      oldEkeyName: "",
      EkeyInfoSrc: "",
      EkeyInfoName: "",
      pageTxt: pageTxt,
      row: {},
      currentPage1: 1,
      pageSize: 20,
      options: [],
      addEkey: false,
      editEkdy: false,
      showExportEkeyInfo: false
    };
  },
  methods: {
    fetch(str, cb) {
      clearTimeout(autoTime);
      autoTime = setTimeout(autoInput, 300, str, cb);
    },
    idSelect(item) {
      isInput = false;
      this.userID = item.userID;
      this.idName = item.userID + "(" + item.userName + ")";
    },
    autoInput() {
      isInput = true;
    },
    //查询Ekey
    searchfn() {
      this.renderDate(_this.search.type);
    },
    //创建Ekey
    showAdd() {
      this.addEkey = true;
      this.ainfo.userID = "";
      this.ainfo.ekeyName = "";
      this.ainfo.ekeyValidDate = "";
      this.ainfo.comment = "";
      setTimeout(function() {
        document.getElementById("Ekye_input").addEventListener("input", function(e) {
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
                      _this.options[i].userName =_this.options[i].userID +"(" + _this.options[i].userName + ")";
                    }
                  }
                }
              );
            }, 300);
          });
      }, 1);
    },
    //立即下发
    sendDown() {
      if (this.ainfo.userID == "") {
        utils.weakTips(_this.pageTxt.tips[0]);
      } else {
        if (this.ainfo.ekeyName == "") {
          utils.weakTips(_this.pageTxt.tips[1]);
        } else {
          if (this.ainfo.ekeyValidDate == "") {
            utils.weakTips(_this.pageTxt.tips[2]);
          } else {
            if (this.ainfo.comment == "") {
              utils.weakTips(_this.pageTxt.tips[3]);
            } else {
              this.addEkey = false;
              utils.review({
                yes: function(info) {
                  utils.hints({
                    txt: _this.pageTxt.tips[7],
                    yes: function() {
                      utils.post(
                        "mx/userEkey/addImmediately",
                        {
                          cmdID: "600025",
                          operator: "admin",
                          reviewer: info.name,
                          userID: _this.ainfo.userID,
                          ekeyName: _this.ainfo.ekeyName,
                          ekeyValidDate: _this.ainfo.ekeyValidDate,
                          comment: _this.ainfo.comment
                        },
                        function(response) {
                          if (response.errcode == 0) {
                            _this.addEkey = false;
                            _this.renderDate(_this.search.type);
                            utils.wheelReq(response);
                          }
                        }
                      );
                    }
                  });
                }
              });
            }
          }
        }
      }
    },
    submitAdd() {
      if (this.ainfo.userID == "") {
        utils.weakTips(_this.pageTxt.tips[0]);
      } else {
        if (this.ainfo.ekeyName == "") {
          utils.weakTips(_this.pageTxt.tips[1]);
        } else {
          if (this.ainfo.ekeyValidDate == "") {
            utils.weakTips(_this.pageTxt.tips[2]);
          } else {
            if (this.ainfo.comment == "") {
              utils.weakTips(_this.pageTxt.tips[3]);
            } else {
              utils.post(
                "mx/userEkey/add",
                {
                  cmdID: "600022",
                  operator: "admin",
                  userID: _this.ainfo.userID,
                  ekeyName: _this.ainfo.ekeyName,
                  ekeyValidDate: _this.ainfo.ekeyValidDate,
                  comment: _this.ainfo.comment
                },
                function(response) {
                  if (response.errcode == 0) {
                    _this.addEkey = false;
                    _this.renderDate(_this.search.type);
                    utils.weakTips(response.errinfo);
                  } else {
                    utils.weakTips(response.errinfo);
                  }
                }
              );
            }
          }
        }
      }
    },
    modifydel(id, name) {
      utils.review({
        yes: function(info) {
          utils.hints({
            txt: _this.pageTxt.tips[7],
            yes: function() {
              utils.post(
                "mx/userEkey/deleteImmediately",
                {
                  cmdID: "600027",
                  operator: "admin",
                  reviewer: info.name,
                  userID: id,
                  ekeyName: name
                },
                function(response) {
                  if (response.errcode == 0) {
                    utils.wheelReq(response);
                    _this.renderDate(_this.search.type);
                  }
                }
              );
            }
          });
        }
      });
    },
    //修改
    showEdit(row) {
      this.editEkdy = true;
      this.oldEkeyName = row.ekeyName;
      this.binfo.userID = row.userID;
      this.binfo.userName = row.userName;
      this.binfo.ekeyName = row.ekeyName;
      this.binfo.ekeyValidDate = row.ekeyValidDate;
      this.binfo.comment = row.comment;
    },
    lijixiafa() {
      this.editEkdy = false;
      utils.review({
        yes: function(info) {
          utils.hints({
            txt: _this.pageTxt.tips[7],
            yes: function() {
              utils.post(
                "mx/userEkey/modifyImmediately",
                {
                  cmdID: "600026",
                  operator: "admin",
                  reviewer: info.name,
                  oldEkeyName: _this.oldEkeyName,
                  userID: _this.binfo.userID,
                  ekeyName: _this.binfo.ekeyName,
                  ekeyValidDate: _this.binfo.ekeyValidDate,
                  comment: _this.binfo.comment
                },
                function(response) {
                  _this.renderDate();
                  utils.wheelReq(response);
                }
              );
            }
          });
        }
      });
    },
    submitEdit() {
      if (binfo.userID == "") {
        utils.weakTips(_this.pageTxt.tips[4]);
      } else {
        if (binfo.ekeyName == "") {
          utils.weakTips(_this.pageTxt.tips[5]);
        } else {
          utils.post(
            "mx/userEkey/modify",
            {
              cmdID: "600023",
              operator: "admin",
              userID: _this.binfo.userID,
              oldEkeyName: _this.oldEkeyName,
              ekeyName: _this.binfo.ekeyName,
              ekeyValidDate: _this.binfo.ekeyValidDate,
              comment: _this.binfo.comment
            },
            function(response) {
              if (response.errcode == 0) {
                _this.editEkdy=false;
                _this.renderDate(_this.search.type);
                utils.weakTips(response.errinfo);
              } else {
                utils.weakTips(response.errinfo);
              }
            }
          );
        }
      }
    },
    //导出Ekey
    exportEkeyInfo() {
      utils.post(
        "mx/userEkey/ExportCsv",
        {
          cmdID: "600028"
        },
        function(response) {
          if (response.errcode == 0) {
            _this.EkeyInfoSrc = response.errinfo;
            _this.EkeyInfoName = response.errinfo.split("/").pop();
            _this.showExportEkeyInfo = true;
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    //删除(row)
    showDel() {
      utils.hints({
        txt: _this.pageTxt.tips[6],
        yes: _this.ekeyDel,
        now: function() {
          _this.modifydel(_this.row.userID, _this.row.ekeyName);
        },
        btn: 3
      });
    },
    ekeyDel() {
      utils.post(
        "mx/userEkey/delete",
        {
          cmdID: "600024",
          operator: "admin",
          userID: _this.row.userID,
          ekeyName: _this.row.ekeyName
        },
        function(response) {
          if (response.errcode == 0) {
            _this.renderDate(_this.search.type);
            utils.weakTips(response.errinfo);
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    currentRow: function(e) {
      this.row = e;
    },
    //分页
    handleSizeChange: function(size) {
      this.pageSize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage1 = currentPage;
      this.renderDate(_this.search.type);
    },
    //更新数据
    renderDate(type) {
      utils.post(
        "mx/userEkey/query",
        {
          cmdID: "600021",
          userID: isInput ? _this.idName : _this.userID,
          ekeyName: _this.search.ekeyName,
          type: type,
          pageSize: _this.pageSize,
          currentPage: _this.currentPage1
        },
        function(response) {
          if (response.errcode == 0) {
            if (response.totalPage < _this.currentPage1) {
              _this.currentPage1 = response.totalPage;
              _this.renderDate(type);
            } else {
              _this.EkeyData = response;
            }
          }
        }
      );
    }
  },
  //初始化数据
  created() {
    _this = this;
    this.search.type = 0;
    this.ainfo.type = 0;
    this.renderDate(3);
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
            _this.options[i].userName =_this.options[i].userID +"(" + _this.options[i].userName + ")";
          }
        }
      }
    );
  }
};
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
.Ekey *{vertical-align: middle;}
.Ekey{padding: 20px;}
.user{height: 30px; font-size: 14px; color: #666666;}
.user .el-button{margin-left: 35px;}
.txt{margin-left: 35px;font-size: 14px; color: #666666;}
.btnBox{margin-bottom: 10px; margin-top: 10px;}
.btnBox div{font-size: 14px; color: #5c759d; cursor: pointer; margin-right: 35px; display: inline-block;}
.btnBox span{margin-left: 4px; height: 30px; line-height: 30px;}
.Ekey .eRadio{margin-right: 30px;}
.Ekey .el-radio__label{font-size: 16px;}
.picker{width: 200px;}
._zero div{float: left; margin-right: 14px; cursor: pointer;}
._zero{overflow: hidden;}
.el-input{margin-left: 10px;}
.promptBox_content_txt{font-size: 14px; color: #666; text-align: center; display: block; margin-top: 60px;}
.promptBox_btn{text-align: center; margin-top: 60px; margin-bottom: 50px;}
.promptBox_btn button:nth-child(1){margin-left: 0;}
#rightBox1{margin-left: 10px; width: 210px;}
.red{color:#f56c6c; font-size: 14px;}
</style>