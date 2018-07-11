<template>
  <div>
    <div class='header'>
        <span class='header_txt'>Ekey</span>
    </div>	

    <div class="Ekey">     
      <div class="user">
        <span>{{pageTxt.Ekey[0]}}：</span>
        <el-radio v-model="search.type" :label="0">{{pageTxt.Ekey[1]}}</el-radio>
        <el-radio v-model="search.type" :label="1">{{pageTxt.Ekey[2]}}</el-radio>
        <span v-show='search.type==0' id="box" class="txt">{{pageTxt.Ekey[3]}}：</span>
        <el-input   class='input_normal picker' v-show='search.type==0' v-model="search.ekeyName" ></el-input>
        <span v-show='search.type==1' class="txt" id="box">{{pageTxt.Ekey[4]}}：</span>
        <el-autocomplete  v-show='search.type==1'  @input='autoInput' class="input_normal picker" v-model="idName" :fetch-suggestions="fetch" :trigger-on-focus="false" @select="idSelect">
          <div slot-scope="{item}">
            <span class="name">{{item.userID}}</span>
            <span class="addr">({{item.userName}})</span>
          </div>
        </el-autocomplete>
        <el-button type="primary" @click='searchfn'>{{pageTxt.Ekey[4]}}</el-button>
      </div>

      <div class="btnBox">
        <div @click="showAdd" id='Add' ><img src="@/img/creatico.png" ><span>{{pageTxt.Ekey[5]}}</span></div>
        <!-- <div @click="fn"><img src="@/img/deletico.png" ><span>{{pageTxt.Ekey[7]}}</span></div> -->
        <div @click="exportEkeyInfo"><img src="@/img/creatico.png"><span>批量导出Ekey</span></div>
      </div>
    
      <el-table  :data="EkeyData.lists"  tooltip-effect="dark" @current-change="currentRow"  @selection-change="selectionRow" highlight-current-row >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column width="50" label=" " type="index"></el-table-column>
        <el-table-column prop="userID" label="用户ID" show-overflow-tooltip></el-table-column>
        <el-table-column prop="userName" label="用户名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ekeyName" label="Ekey名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ekeyValidDate" label="Ekey有效期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="comment" label="Ekey描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="110">
          <div slot-scope="scope" class="_zero">
            <div @click="showEdit(scope.row)" id='Edit'><img src="@/img/altericos.png"> </div>
            <div @click="showDel"><img src="@/img/deleticos.png" ></div>
          </div>
        </el-table-column>
      </el-table>

      <div class="_pagination" v-if="EkeyData.totalSize>pageSize">
        <el-pagination @current-change='handleCurrentChange' background layout="prev, pager, next, jumper" @size-change="handleSizeChange" :page-size="pageSize" :total="EkeyData.totalSize"></el-pagination>
        <div class="rightTxt">
          共{{EkeyData.totalSize}}条数据
        </div>
      </div>
      <div class="onePage" v-else-if="EkeyData.totalSize>0&&EkeyData.totalSize<=pageSize">
        已显示全部{{EkeyData.totalSize}}个数据
      </div> 

      <el-dialog :title="pageTxt.dialog[0]" :visible.sync="addEkey" width='620px'>
        <ul class="_dialog">
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.dialog[2]}}</p>
            </div>
            <div class="rightBox" id="rightBox1">
              <el-select filterable v-model="ainfo.userID" placeholder="请选择">
                <el-option  v-for="item in options" :key="item.userID" :label="item.userID" :value="item.userID"></el-option>
              </el-select>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.dialog[3]}}</p>
            </div>
            <div class="rightBox">
              <el-input   class='picker' v-model="ainfo.ekeyName" :placeholder="pageTxt.dialog[13]"></el-input>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.dialog[6]}}</p>
            </div>
            <div class="rightBox">
              <el-date-picker class='picker' v-model="ainfo.ekeyValidDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]"></el-date-picker>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.dialog[5]}}</p>
            </div>
            <div class="rightBox">
              <el-input class='picker' v-model="ainfo.comment" :placeholder="pageTxt.dialog[13]"></el-input>
            </div>
          </li>				
        </ul>

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sendDown">立即下发</el-button>
            <el-button type="primary" @click="submitAdd">{{pageTxt.dialog[11]}}</el-button>            
            <el-button @click="addEkey = false">{{pageTxt.dialog[12]}}</el-button>
        </div>
      </el-dialog>
      
      <el-dialog :title="pageTxt.dialog[1]" :visible.sync="editEkdy" width='620px'>
        <ul class="_dialog">
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.dialog[2]}}</p>
            </div>
            <div class="rightBox">
              <el-input   class='picker' v-model="binfo.userID" :placeholder="pageTxt.dialog[13]" disabled></el-input>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.dialog[3]}}</p>
            </div>
            <div class="rightBox">
              <el-input  class='picker' v-model="binfo.ekeyName" :placeholder="pageTxt.dialog[13]"></el-input>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.dialog[6]}}</p>
            </div>
            <div class="rightBox">
              <el-date-picker class='picker' v-model="binfo.ekeyValidDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]"></el-date-picker>
            </div>
          </li>
          <li>
            <div class="leftBox">
              <p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.dialog[5]}}</p>
            </div>
            <div class="rightBox">
              <el-input class='picker' v-model="binfo.comment" :placeholder="pageTxt.dialog[13]"></el-input>
            </div>
          </li>
        </ul>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="lijixiafa">立即下发</el-button>
            <el-button type="primary" @click="submitEdit">{{pageTxt.dialog[11]}}</el-button>
            <el-button @click="editEkdy = false">{{pageTxt.dialog[12]}}</el-button>
        </div>
      </el-dialog>

    </div>

    <div class="Popup" v-show="showExportEkeyInfo">
        <div class="_panle">
          <div><p id="_title">批量导出Ekey</p>
                <img id="_close" src="@/img/close.png" @click="showExportEkeyInfo=false">
          </div>
          <div class="_messaga">
            <span class="txt">文件名：&nbsp;<a :href="EkeyInfoSrc" style="color:#5C759D">{{EkeyInfoName}}</a></span>
            <div class="_messaga_info">
              <span class="info_txt">请在文件名上点击右键，选择“将链接另存为...”菜单保存文件。</span>
            </div>
          </div>
          <div class="info_button">
            <el-button type="default" @click="showExportEkeyInfo=false">关闭</el-button>
          </div>
        </div>
      </div> 
  </div>	
</template>

<script>
import utils from "@/libs/utils.js";

var ainfo = {},
  def = ["operator", "userID", "ekeyName", "type", "ekeyValidDate", "comment"];
for (var i = 0; i < def.length; i++) {
  ainfo[def[i]] = "";
}

var binfo = {},
  det = ["operator", "userID", "ekeyName", "type", "ekeyValidDate", "comment"];
for (var i = 0; i < det.length; i++) {
  binfo[det[i]] = "";
}

var pageTxt_cn = {
  Ekey: [
    "查询方式 ",
    "按Ekey查询",
    "按用户查询",
    "Ekey名称",
    "用户名称",
    "创建Ekey",
    "修改Ekey",
    "删除Ekey",
    "Ekey名",
    "用户ID",
    "用户名",
    "操作"
  ],
  dialog: [
    "创建Ekey",
    "修改Ekey",
    "用户ID：",
    "Ekey名称：",
    "软加密密码：",
    "Ekey描述：",
    "Ekey有效期：",
    "启用软加密：",
    "软加密开始时间：",
    "软加密结束时间：",
    "修改软加密密码",
    "提 交",
    "返 回",
    "必填项..."
  ]
};

var pageTxt = pageTxt_cn,autoTime,_currentPage = 1,isInput = false,_this;

export default {
  data() {
    return {
      idName: "",
      userID: "",
      search: { userID: "", type: "", ekeyName: "" },
      ainfo,
      binfo,
      EkeyData: {/*lists:[{"userID":"1"}]*/},
      selects: [],
      oldEkeyName: "",
      EkeyInfoSrc:"",
      EkeyInfoName:"",
      pageTxt: pageTxt,
      radio: 1,
      addEkey: false,
      editEkdy: false,
      row: {},
      data2: [/*{ Ekey: "test" }*/],
      currentPage1: 1,
      pageSize: 20,
      options: [],
      showExportEkeyInfo:false,
      EkeyInfoSrc:"",
      EkeyInfoName:"",
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
      this.renderDate(_this.search.type)
    },
    // 创建Ekey
    showAdd() {
      this.addEkey = true;
      this.ainfo.userID = "";
      this.ainfo.ekeyName = "";
      this.ainfo.ekeyValidDate = "";
      this.ainfo.comment = "";
    },
    // 立即下发
    sendDown() {
      this.addEkey = false;
      utils.review({
        yes:function(info){
          utils.hints({
						txt: "是否立即下发",
						yes: function(){
              utils.post('mx/userEkey/addImmediately',
               {
                  cmdID: "600025",
                  operator: "admin",
                  reviewer: info.name,
                  userID: _this.ainfo.userID,
                  ekeyName: _this.ainfo.ekeyName,
                  ekeyValidDate: _this.ainfo.ekeyValidDate,
                  comment: _this.ainfo.comment                                       
               }, 
               function(response){
                 if(response.errcode == 0){
                  _this.addEkey = false;
                  _this.renderDate(_this.search.type);
                  utils.wheelReq(response); 
                 }                
							});
						}
					});
        }
      });
    },
    submitAdd() {
      if (this.ainfo.userID == "") {
        utils.weakTips("用户ID不能为空");
      } else {
        if (this.ainfo.ekeyName == "") {
          utils.weakTips("Ekey名称不能为空");
        } else {
          if (this.ainfo.ekeyValidDate == "") {
            utils.weakTips("Ekey有效期不能为空");
          } else {
            if (this.ainfo.comment == "") {
              utils.weakTips("Ekey描述不能为空");
            } else {
              utils.post(
                "mx/userEkey/add",
                {
                  cmdID: 600022,
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
    // 删除Ekey
    // fn() {
    //   if (this.selects.length != 1) {
    //     utils.weakTips("请在列表中选择一条记录！");
    //   } else {
    //     utils.hints({
    //       txt: "是否删除该用户信息",
    //       yes: _this.del,
    //       now: function(){_this.modifydel(_this.selects[0].userID ? _this.selects[0].userID : "",_this.selects[0].ekeyName)},
    //       btn: 3
    //     });
    //   }
    // },
    // del() {
    //   utils.post(
    //     "mx/userEkey/delete",
    //     {
    //       cmdID: 600024,
    //       operator: "admin",
    //       userID: _this.selects[0].userID ? _this.selects[0].userID : "",
    //       ekeyName: _this.selects[0].ekeyName
    //     },
    //     function(response) {
    //       if (response.errcode == 0) {
    //         _this.renderDate(_this.search.type);
    //         utils.weakTips(response.errinfo);
    //       } else {
    //         utils.weakTips(response.errinfo);
    //       }
    //     }
    //   );
    // },
    modifydel(id,name){
      utils.review({
        yes:function(info){
          utils.hints({
						txt: "是否立即下发",
						yes: function(){
              utils.post('mx/userEkey/deleteImmediately',
               {
                  cmdID: "600027",
                  operator: "admin",
                  reviewer: info.name,
                  userID: id,
                  ekeyName: name                                    
               }, 
               function(response){
                 if(response.errcode == 0){
                  utils.wheelReq(response);
                 _this.renderDate(_this.search.type) 
                 }                                
							});
						}
					});
        }
      });
    },
    // 修改
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
        yes:function(info){
          utils.hints({
						txt: "是否立即下发",
						yes: function(){
              utils.post('mx/userEkey/modifyImmediately',
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
               function(response){
                 _this.renderDate()
                 utils.wheelReq(response);                
							});
						}
					});
        }
      });
    },
    submitEdit() {
      if (binfo.userID == "") {
        utils.weakTips("用户名不能为空");
      } else {
        if (binfo.ekeyName == "") {
          utils.weakTips("Ekey名不能为空");
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
    // 导出Ekey
    exportEkeyInfo(){
      utils.post(
        "mx/userEkey/ExportCsv",
        {
          cmdID:"600028"
        },
        function(response){
          if(response.errcode ==0 ){
            _this.EkeyInfoSrc=response.errinfo
            _this.EkeyInfoName=response.errinfo.split("/").pop()
            _this.showExportEkeyInfo=true;
          }else{
            utils.weakTips(response.errinfo)
          }
        }
      )     
    },
    //删除(row)
    showDel() {
      utils.hints({
        txt: "是否删除该用户信息",
        yes: _this.ekeyDel,
        now: function(){_this.modifydel( _this.row.userID,_this.row.ekeyName)},
        btn: 3
      });
    },
    ekeyDel() {
      utils.post(
        "mx/userEkey/delete",
        {
          cmdID: 600024,
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
    selectionRow(val) {
      this.selects = val;
    },
    currentRow: function(e) {
      this.row = e;
    },
    // 分页
    currentPage: function(e) {
      this.currentPage = e;
    },
    handleSizeChange: function(size) {
      this.pageSize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage1 = currentPage;
      this.renderDate(_this.search.type);
    },
    // 更新数据
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
    }
  },
  //初始化数据
  created() {
    this.search.type = 0;
    this.ainfo.type = 0;
    _this = this;
    this.renderDate(3);
    utils.post(
      "mx/userinfo/queryLists",
      {
        cmdID: "600001",
        userID: "",
        userName: "",
        pageSize: "210000",
        currentPage: "1",
        type: "0"
      },
      function(response) {
        if (response.errcode == 0) {
          _this.options = response.lists;
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