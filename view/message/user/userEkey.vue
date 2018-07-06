<template>
<div>
	<div class="Ekey">
		<div class="btnBox">
			<div id='Add'  @click="showAdd" ><img src="@/img/creatico.png" ><span> {{pageTxt.Ekey[5]}}</span></div>
			<div @click="fn()"><img src="@/img/deletico.png" > <span>{{pageTxt.Ekey[7]}}</span></div>
			<!-- <div @click=""><img src="@/img/creatico.png" ><span>批量导出Ekey</span></div> -->
		</div>
	
		<el-table  :data="EkeyData.lists"  tooltip-effect="dark" @current-change="currentRow"  @selection-change="selectionRow" highlight-current-row >
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="userID" label="用户ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName" label="用户名称" show-overflow-tooltip></el-table-column>
			<el-table-column prop="ekeyName" label="Ekey名称" show-overflow-tooltip></el-table-column>
			<el-table-column prop="ekeyValidDate" label="Ekey有效期" show-overflow-tooltip></el-table-column>
			<el-table-column prop="comment" label="Ekey描述" show-overflow-tooltip></el-table-column>
			<el-table-column label="操作" width="110">
				<div slot-scope="scope" class="_zero">
					<div  id='Edit'  @click="showEdit(scope.row)"><img src="@/img/altericos.png"> </div>
					<div @click="showDel"><img src="@/img/deleticos.png" ></div>
				</div>
			</el-table-column>
		</el-table>

		<el-dialog :title="pageTxt.dialog[0]" :visible.sync="addEkey" width='620px'>
			<ul class="_dialog">
				<li>
					<div class="leftBox">
						<p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.dialog[2]}}</p>
					</div>
					<div class="rightBox">     					
						<el-input type="text" v-model="ainfo.userID" disabled class='picker'></el-input>
					</div>
				</li>
				<li>
					<div class="leftBox">
						<p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.dialog[3]}}</p>
					</div>
					<div class="rightBox">
						<el-input   class='picker' v-model="ainfo.ekeyName" :placeholder="pageTxt.dialog[13]"></el-input>
						<span class="txt red" v-show="err1.Ekey">{{pageTxt.tips.Ekey}}</span>
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
			    <el-button @click="addEkey = false">{{pageTxt.dialog[12]}}</el-button>
			    <el-button type="primary" @click="submitAdd">{{pageTxt.dialog[11]}}</el-button>
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
						<span class="txt red" v-show="err2.Ekey">{{pageTxt.tips.Ekey}}</span>
					</div>
				</li>
				<li>
					<div class="leftBox">
						<p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.dialog[6]}}</p>
					</div><div class="rightBox">
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
			    <el-button @click="editEkdy = false">{{pageTxt.dialog[12]}}</el-button>
			    <el-button type="primary" @click="submitEdit">{{pageTxt.dialog[11]}}</el-button>
			</div>
		</el-dialog>

		<div class="_pagination" v-show="EkeyData.totalPage>0">
      <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" background layout="prev, pager, next, jumper" :page-count="EkeyData.totalPage" :page-size="20"></el-pagination>
      <div class="rightTxt">共{{EkeyData.totalSize}}条数据</div>
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
  tips: {
    id: "请输入用户ID",
    Ekey: "请输入Ekey名称",
    pass: "请输入软加密密码",
    start: "请选择软加密开始时间",
    end: "束时间不能小于开始时间"
  },
  Ekey: [
    "查询方式 ",
    "按Ekey查询",
    "按用户查询",
    "Ekey名称",
    "查询",
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

var pageTxt = pageTxt_cn,
  autoTime,
  _currentPage = 1;

export default {
  data() {
    return {
      idName: "",
      userID: "",
      search: { userID: "", type: "", ekeyName: "" },
      ainfo,
      binfo,
      EkeyData: [],
      selects: [],
      oldEkeyName: "",

      pageTxt: pageTxt,
      radio: 1,
      info: {
        id: "",
        Ekey: "",
        pass: "111111",
        notes: "",
        valid: "",
        check: false,
        start: "",
        end: ""
      },
      addEkey: false,
      editEkdy: false,
      eInfo: {
        id: "",
        Ekey: "",
        pass: "111111",
        notes: "",
        valid: "",
        check: true,
        start: "",
        end: "",
        check1: false
      },
      row: {},
      data2: [{ Ekey: "AAA" }],
      err1: { id: false, Ekey: false, pass: false, start: false, end: false },
      err2: { id: false, Ekey: false, pass: false, start: false, end: false },
      currentPage1: 1,
      pageSize: 20,
      options: []
    };
  },
  methods: {
    // 创建Ekey
    showAdd() {
      this.addEkey = true;
      this.ainfo.userID = this.$store.state.transferEditID;
      this.ainfo.ekeyName = "";
      this.ainfo.ekeyValidDate = "";
      this.ainfo.comment = "";
    },
    submitAdd() {
      if (this.ainfo.ekeyName == "") {
        utils.weakTips("Ekey名称不能为空");
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
              var _this = this;
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
                    if (_this.$store.state.creatAndEdit) {
                      _this.addEkey = false;
                      _this.renderDate();
                      utils.weakTips(response.errinfo);
                    } else {
                      _this.renderDate();
                      _this.addEkey = false;
                      _this.open6("跳转至通信关系");
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
    open6(msg) {
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {
          this.$store.state.tabv = "v3";
          this.$router.replace({ path: "/message/userEdit/mess" });
        })
        .catch(() => {
          this.$store.state.tabv = "v2";
          this.$router.replace({ path: "/message/userEdit/mess" });
        });
    },

    // 删除Ekey
    fn() {
      if (this.selects.length != 1) {
        utils.weakTips("请在列表中选择一条记录！");
      } else {
        var _this = this;
        utils.hints({
          txt: "是否删除该用户信息",
          yes: _this.del,
          btn: 2
        });
      }
    },
    del() {
      var _this = this;
      utils.post(
        "mx/userEkey/delete",
        {
          cmdID: 600024,
          operator: "admin",
          userID: _this.selects[0].userID ? _this.selects[0].userID : "",
          ekeyName: _this.selects[0].ekeyName
        },
        function(response) {
          if (response.errcode == 0) {
            _this.renderDate();
            utils.weakTips(response.errinfo);
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },

    // 修改
    showEdit(row) {
      this.editEkdy = true;
      this.oldEkeyName = this.row.ekeyName;
      var _this = this;
      _this.binfo.userID = row.userID;
      _this.binfo.userName = row.userName;
      _this.binfo.ekeyName = row.ekeyName;
      _this.binfo.ekeyValidDate = row.ekeyValidDate;
      _this.binfo.comment = row.comment;
    },
    submitEdit() {
      if (binfo.userID == "") {
        utils.weakTips("用户名不能为空");
      } else {
        if (binfo.ekeyName == "") {
          utils.weakTips("Ekey名不能为空");
        } else {
          var _this = this;
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
                _this.renderDate();
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
      var _this = this;
      utils.hints({
        txt: "是否删除该用户信息",
        yes: _this.ekeyDel,
        btn: 2
      });
    },
    ekeyDel() {
      var _this = this;
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
            _this.renderDate();
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
      var _this = this;
      utils.post(
        "mx/userEkey/query",
        {
          cmdID: "600021",
          userID: _this.$store.state.creatAndEdit ? "" : _this.$store.state.transferEditID,
          ekeyName: "",
          pageSize: _this.pageSize,
          currentPage: _this.currentPage1,
          type: 1
        },
        function(response) {
          if(response.errcode == 0){
            if (response.totalPage < _this.currentPage1) {
            utils.post("mx/userEkey/query", {
              cmdID: "600021",
              userID: _this.$store.state.creatAndEdit? "" : _this.$store.state.transferEditID,
              ekeyName: "",
              type: 1,
              pageSize: _this.$store.state.creatAndEdit ? 2 : 1,
              currentPage: response.totalPage
            },
            function(response){
              if(response.errcode==0){
                 _this.EkeyData = response;
              }             
            }
            );
          }else{
            _this.EkeyData = response;
          }
          }                    
        }
      );
    },
    // 更新数据
    renderDate() {
      var _this = this;
      utils.post(
        "mx/userEkey/query",
        {
          cmdID: "600021",
          userID: _this.$store.state.transferEditID,
          ekeyName: _this.search.ekeyName,
          type: 1,
          pageSize: _this.pageSize,
          currentPage: _this.currentPage1
        },
        function(response) {
          if(response.errcode == 0){
            if (response.totalPage < _this.currentPage1) {
            utils.post(
              "mx/userEkey/query",
              {
                cmdID: "600021",
                userID: _this.$store.state.transferEditID,
                ekeyName: _this.search.ekeyName,
                type: _this.$store.state.creatAndEdit ? _this.search.type : _this.search.type,
                pageSize: _this.pageSize,
                currentPage: response.totalPage
              },
              function(response) {
                if(response.errcode == 0){
                  _this.EkeyData = response;
                }               
              }
            );
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
    var _this = this;
    utils.post(
      "mx/userEkey/query",
      {
        cmdID: "600021",
        userID: _this.$store.state.transferEditID,
        ekeyName: "",
        type: 1,
        pageSize: _this.pageSize,
        currentPage: _this.currentPage1
      },
      function(response) {
        if(response.errcode == 0){
          _this.EkeyData = response;
        }        
      }
    );
    utils.post(
      "mx/userinfo/queryLists",
      {
        cmdID: "600001",
        userID: _this.$store.state.transferEditID,
        userName: "",
        pageSize: "210000",
        currentPage: "1",
        type: "0"
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
._zero div{float: left; margin-left: 14px; cursor: pointer;}
._zero{overflow: hidden;}
.el-input{margin-left: 10px;}
.promptBox_content_txt{font-size: 14px; color: #666; text-align: center; display: block; margin-top: 60px;}
.promptBox_btn{text-align: center; margin-top: 60px; margin-bottom: 50px;}
.promptBox_btn button:nth-child(1){margin-left: 0;}
#rightBox1{margin-left: 10px; width: 210px;}
.red{color:#f56c6c; font-size: 14px;}
</style>
 