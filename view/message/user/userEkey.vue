<template>
  <div>
    <div class="Ekey">
      <div class="btnBox">
        <div id='Add'  @click="showAdd" ><img src="@/img/user/addEkey.png" ><span> {{pageTxt.label[7]}}</span></div>
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
            <el-tooltip :content="pageTxt.table[7]" placement="bottom" effect="light"><div @click="showDel"><img src="@/img/user/deleticos.png" ></div></el-tooltip>
          </div>
        </el-table-column>
      </el-table>
      <el-dialog :title="pageTxt.popup[0]" :visible.sync="addEkey" width='620px'>
        <ul class="_dialog">
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[1]}}</p>
            </div>
            <div class="rightBox">     					
              <el-input type="text" v-model="ainfo.userID" disabled class='picker'></el-input>
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
          <el-button type="primary" @click="submitAdd">{{pageTxt.popup[6]}}</el-button>
          <el-button @click="addEkey = false">{{pageTxt.popup[7]}}</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="pageTxt.popup[1]" :visible.sync="editEkdy" width='620px'>
        <ul class="_dialog">
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[2]}}</p>
            </div>
            <div class="rightBox">
              <el-input   class='picker' v-model="binfo.userID" :placeholder="pageTxt.popup[13]" disabled></el-input>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[3]}}</p>
            </div>
            <div class="rightBox">
              <el-input  class='picker' v-model="binfo.ekeyName" :placeholder="pageTxt.popup[13]"></el-input>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[6]}}</p>
            </div><div class="rightBox">
              <el-date-picker class='picker' v-model="binfo.ekeyValidDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" :placeholder="pageTxt.popup[13]"></el-date-picker>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[5]}}</p>
            </div>
            <div class="rightBox">
              <el-input class='picker' v-model="binfo.comment" :placeholder="pageTxt.popup[13]"></el-input>
            </div>
          </li>
        </ul>
        <div slot="footer" class="dialog-footer">
          <el-button @click="submitEdit" type="primary">{{pageTxt.popup[6]}}</el-button>
          <el-button @click="editEkdy = false">{{pageTxt.popup[7]}}</el-button>
        </div>
      </el-dialog>
      <div class="_pagination" v-if="EkeyData.totalSize>pageSize">
        <el-pagination @current-change='handleCurrentChange' background layout="prev, pager, next, jumper" @size-change="handleSizeChange" :page-size="pageSize" :total="EkeyData.totalSize"></el-pagination>
        <div class="rightTxt">共{{EkeyData.totalSize}}条数据</div>
      </div>
      <div class="onePage" v-else-if="EkeyData.totalSize>0&&EkeyData.totalSize<=pageSize">已显示全部{{EkeyData.totalSize}}个数据</div> 
    </div>
  </div>	
</template>

<script>
import utils from "@/libs/utils.js";
import lang from '@/language/lang.js';

var pageTxt = lang.Ekey,autoTime,_currentPage = 1,_this;

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
      EkeyData: [],
      oldEkeyName: "",
      pageTxt,
      radio: 1,
      addEkey: false,
      editEkdy: false,
      row: {},
      data2: [],
      currentPage1: 1,
      pageSize: 20,
      options: []
    };
  },
  methods: {
    //创建Ekey
    showAdd() {
      this.addEkey = true;
      this.ainfo.userID = this.$store.state.transferEditID;
      this.ainfo.ekeyName = "";
      this.ainfo.ekeyValidDate = "";
      this.ainfo.comment = "";
    },
    submitAdd() {
      if (this.ainfo.ekeyName == "") {
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
                    if (_this.$store.state.creatAndEdit) {
                      _this.addEkey = false;
                      _this.renderDate(1);
                      utils.weakTips(response.errinfo);
                    } else {
                      _this.renderDate(1);
                      _this.addEkey = false;
                      utils.hints({
                        txt: response.errinfo+" Whether the jump is added comm ?",
                        yes: function(){
                           _this.$store.state.tabv = "v3";
                           _this.$router.replace({ path: "/message/userEdit/mess" });
                        },
                        no: function(){
                          _this.$store.state.tabv = "v2";
                          _this.$router.replace({ path: "/message/userEdit/mess" });
                        }
                      })
                    }
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
                _this.renderDate(1);
                utils.weakTips(response.errinfo);
              } else {
                utils.weakTips(response.errinfo);
              }
            }
          );
        }
      }
    },
    //删除(row)
    showDel() {
      utils.hints({
        txt: _this.pageTxt.tips[6],
        yes: _this.ekeyDel,
        btn: 2
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
            _this.renderDate(1);
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
    // 分页
    handleSizeChange: function(size) {
      this.pageSize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage1 = currentPage;
      _this.renderDate(0);
    },
    // 更新数据
    renderDate(type) {
      utils.post(
        "mx/userEkey/query",
        {
          cmdID: "600021",
          userID: _this.$store.state.transferEditID,
          ekeyName: _this.search.ekeyName,
          type: type,
          pageSize: _this.pageSize,
          currentPage: _this.currentPage1
        },
        function(response) {
          if(response.errcode==0){
             if (response.totalPage < _this.currentPage1) {
              _this.currentPage1 = response.totalPage;
              _this.renderDate(type);
            } else {
              _this.EkeyData = response;
            }
          }
        }
      );
    },
  },
  //初始化数据
  created() {
    _this = this;
    _this.renderDate(1);
    utils.post(
      "mx/userinfo/queryLists",
      {
        cmdID: "600001",
        userID: _this.$store.state.transferEditID,
        userName: "",
        pageSize: 200,
        currentPage: 1,
        type: 0
      },
      function(response) {
        if(response == 0){
          _this.options = response.lists;
        }        
      }
    );
  }
};
</script>

<style scoped="scoped">
.Ekey *{vertical-align: middle;}
.user{height: 30px; font-size: 14px; color: #666666;}
.user .el-button{margin-left: 35px;}
.txt{margin-left: 35px;font-size: 14px; color: #666666;}
.btnBox{margin-bottom: 10px;}
.btnBox div{font-size: 14px; color: #5c759d; cursor: pointer; margin-right: 35px; display: inline-block;}
.btnBox span{margin-left: 4px;height: 30px; line-height: 30px;}
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