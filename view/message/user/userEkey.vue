<template>
<div>	
	<div class="Ekey">
		<div class="btnBox">
			<div id='Add'  @click="showAdd" ><img src="@/img/creatico.png" ><span> {{pageTxt.Ekey[5]}}</span></div>
			<div @click="fn"><img src="@/img/deletico.png" > <span>{{pageTxt.Ekey[7]}}</span></div>
			<div @click="del"><img src="@/img/creatico.png" ><span>批量导出Ekey</span></div>
		</div>
	
		<el-table  :data="EkeyData"  tooltip-effect="dark" @current-change="currentRow"  @selection-change="selectionRow" highlight-current-row >
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="userID" label="用户ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName" label="用户名称" show-overflow-tooltip></el-table-column>
			<el-table-column prop="ekeyName" label="Ekey名称" show-overflow-tooltip></el-table-column>
			<el-table-column prop="ekeyValidDate" label="Ekey有效期" show-overflow-tooltip></el-table-column>
			<el-table-column prop="comment" label="Ekey描述" show-overflow-tooltip></el-table-column>
			<el-table-column label="操作" width="110">
				<div slot-scope="scope" class="_zero">
					<div  id='Edit'  @click="showEdit"><img src="@/img/altericos.png"> </div>
					<div @click="showPromptBox(scope.$index,EkeyData)"><img src="@/img/deleticos.png" ></div>
				</div>
			</el-table-column>
		</el-table>

		<el-dialog :title="pageTxt.dialog[0]" :visible.sync="addEkey" width='620px'>
			<ul class="_dialog">
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[2]}}</p>
					</div>
					<div class="rightBox">
						<el-input class='picker' v-model="ainfo.userID" :placeholder="pageTxt.dialog[13]" disabled></el-input>
						<span class="txt red" v-show="err1.id">{{pageTxt.tips.id}}</span>
					</div>
				</li>
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[3]}}</p>
					</div>
					<div class="rightBox">
						<el-input   class='picker' v-model="ainfo.ekeyName" :placeholder="pageTxt.dialog[13]"></el-input>
						<span class="txt red" v-show="err1.Ekey">{{pageTxt.tips.Ekey}}</span>
					</div>
				</li>
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[6]}}</p>
					</div>
					<div class="rightBox">
						<el-date-picker class='picker' v-model="ainfo.ekeyValidDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]"></el-date-picker>
					</div>
				</li>
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[5]}}</p>
					</div>
					<div class="rightBox">
						<el-input class='picker' v-model="ainfo.comment" :placeholder="pageTxt.dialog[13]"></el-input>
					</div>
				</li>				
			</ul>
			<div class="bottom_btn">
			    <el-button @click="addEkey = false">{{pageTxt.dialog[12]}}</el-button>
			    <el-button type="primary" @click="submitAdd">{{pageTxt.dialog[11]}}</el-button>
			</div>
		</el-dialog>
		

	
		<el-dialog :title="pageTxt.dialog[1]" :visible.sync="editEkdy" width='620px'>
			<ul class="_dialog">
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[2]}}</p>
					</div>
					<div class="rightBox">
						<el-input   class='picker' readonly="true" v-model="binfo.userID" :placeholder="pageTxt.dialog[13]"></el-input>
					</div>
				</li>
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[3]}}</p>
					</div>
					<div class="rightBox">
						<el-input  class='picker' v-model="binfo.ekeyName" :placeholder="pageTxt.dialog[13]"></el-input>
						<span class="txt red" v-show="err2.Ekey">{{pageTxt.tips.Ekey}}</span>
					</div>
				</li>
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[6]}}</p>
					</div><div class="rightBox">
						<el-date-picker class='picker' v-model="binfo.ekeyValidDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" :placeholder="pageTxt.dialog[13]"></el-date-picker>
					</div>
				</li>
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[5]}}</p>
					</div>
					<div class="rightBox">
						<el-input class='picker' v-model="binfo.comment" :placeholder="pageTxt.dialog[13]"></el-input>
					</div>
				</li>

			</ul>
			<div class="bottom_btn">
			    <el-button @click="editEkdy = false">{{pageTxt.dialog[12]}}</el-button>
			    <el-button type="primary" @click="submitEdit">{{pageTxt.dialog[11]}}</el-button>
			</div>
		</el-dialog>

		<div class="_pagination" >
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
			<!-- <div class="rightTxt">共{{EkeyData.length}}条数据</div> -->
		</div> 


      <el-dialog title="提示" :visible.sync="promptBoxShow1" width="600px">
          <span class="promptBox_content_txt">是否删除此用户信息？</span>
          <div class="promptBox_btn" >
            <el-button @click="promptBoxShow1=false">取消</el-button>
            <el-button type="primary" @click="del">确定</el-button>
          </div>
      </el-dialog>
    
      <el-dialog title="提示" :visible.sync="promptBoxShow" width="600px">
          <span class="promptBox_content_txt">是否删除此用户信息？</span>
          <div class="promptBox_btn" >
            <el-button @click="promptBoxShow=false">取消</el-button>
            <el-button type="primary" @click="delEkey">确定</el-button>
          </div>
      </el-dialog>

      <div class="delInfo" v-show="errInfo">
        <span class="delInfo_txt">{{$store.state.errInfo}}</span>
      </div>
	</div>

    
</div>	
</template>

<script>
import kit from "@/libs/kit.js";
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

var pageTxt = pageTxt_cn;

export default {
  data() {
    return {
      ainfo,
      binfo,
      EkeyData: [
        // {
        //   userID: "AAA",
        //   userName: "2016-05-02",
        //   ekeyName: "王小虎"
        // },
        // {
        //   userID: "AAA",
        //   userName: "2016-05-02",
        //   ekeyName: "王小虎"
        // }
      ],
      selects: [],
      row: [],
      oldEkeyName: "",
      promptBoxShow: false,
      promptBoxShow1: false,
      errInfo:false,
      index: "",
      rows: "",

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

      data2: [{ Ekey: "AAA" }],
      err1: { id: false, Ekey: false, pass: false, start: false, end: false },
      err2: { id: false, Ekey: false, pass: false, start: false, end: false }
    };
  },
  methods: {
    // 显示创建Ekey
    showAdd() {
      // var info = this.info,
      //   err = this.err1;
      // for (var key in info) {
      //   info[key] = "";
      //   err[key] = false;
      // }
      // info.Ekey = "/C=CN/CN=";
      // info.pass = "111111";
      // info.check = false;
      this.addEkey = true;
    },

    // 创建Ekey
    submitAdd() {
      this.addEkey = false;
      this.open6("response.errinfo");

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
            _this.addEkey = false;
            _this.open6(response.errinfo);
          } else {
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
          this.$store.state.tabv = "v3";
          console.log(this.$store.state.tabv);
          this.$router.replace({ path: "/message/userEdit/mess" });
        })
        .catch(() => {
          console.log("111");
        });
    },

    // 删除Ekey
    fn() {
      if (this.selects.length != 1) {
        this.$store.state.errInfo = "请在列表中选择一条记录！";
        this.errInfo = true;
        setTimeout(() => {
          this.errInfo = false;
        }, 2000);    
      } else {
        this.promptBoxShow1 = true;
      }
    },
    del() {
      this.promptBoxShow1 = false;
      var _this = this;
      utils.post(
        "mx/userEkey/delete",
        {
          cmdID: 600024,
          operator: "admin",
          userID: this.selects[0].userID,
          ekeyName: this.selects[0].ekeyName
        },
        function(response) {
          if (response.errcode == 0) {
            var index = _this.EkeyData.indexOf(_this.selects[0]);
            if (index > -1) {
              _this.EkeyData.splice(index, 1);
              _this.showDelInfo1 = true;
              setTimeout(function() {
                _this.showDelInfo1 = false;
              }, 1500);
            }
          } else {
            
          }
        }
      );
    },

    //查询Ekey
    search() {
      var _this = this;
      utils.post(
        "mx/userEkey/query",
        {
          cmdID: 600021,
          userID: _this.ainfo.userID,
          ekeyName: _this.ainfo.ekeyName,
          type: _this.ainfo.type
        },
        function(response) {
          _this.EkeyData = response.lists;
        }
      );
    },

    // 显示修改Ekey(row)
    showEdit() {
      // this.oldEkeyName=this.selects[0].ekeyName
      console.log(this.oldEkeyName);
      this.editEkdy = true;
      var _this = this;
      utils.post(
        "mx/userEkey/query",
        {
          cmdID: 600021,
          userID: _this.row.userID,
          ekeyName: _this.row.ekeyName,
          type: 2
        },
        function(response) {
          _this.binfo = response.lists;
        }
      );
    },
    //修改Ekey(row)
    submitEdit() {
      var _this = this;
      utils.post(
        "mx/userEkey/modify",
        {
          cmdID: 600023,
          operator: "admin",
          userID: _this.binfo.userID,
          oldEkeyName: _this.oldEkeyName,
          ekeyName: _this.binfo.ekeyName,
          ekeyValidDate: _this.ekeyValidDate,
          comment: _this.binfo.comment
        },
        function(response) {
          if (response.errcode == 0) {
            // _this.open6(response.errinfo)
          } else {
          }
        }
      );
    },
    // 刪除Ekey(row)
    showPromptBox(index, rows) {
      this.promptBoxShow = true;
      this.index = index;
      this.rows = rows;
    },
    delEkey(index, rows) {
      this.promptBoxShow = false;
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
            rows.splice(index, 1);
          }
        }
      );
    },

    selectionRow(val) {
      this.selects = val;
      // console.log(this.selects);
    },

    currentRow: function(e) {
      this.row = e;
      console.log(e);
    },
    currentPage: function(e) {
      console.log(e);
    },
    checkAdd(e) {
      var key, el;
      el = e.type == "blur" ? e.target : e.$el.children[0];
      key = el.name;
      console.log(key);
      if (!this.info[key]) {
        this.err1[key] = true;
      } else this.err1[key] = false;
    },
    checkEdit(e) {
      var key, el;
      el = e.type == "blur" ? e.target : e.$el.children[0];
      key = el.name;
      console.log(key);
      if (!this.eInfo[key]) {
        this.err2[key] = true;
      } else this.err[key] = false;
    },
    closePromptBox() {
      this.promptBoxShow = false;
    },
    closePromptBox1() {
      this.promptBoxShow1 = false;
    }
  },

  //初始化数据
  created() {
    ainfo.userID = this.$store.state.transferEditID;
    ainfo.type = 0;
    // ainfo.ekeyName = "";
    var _this = this;
    utils.post(
      "mx/userEkey/query",
      {
        cmdID: 600021,
        userID: "",
        ekeyName: "",
        type: 3
      },
      function(response) {
        _this.EkeyData = response.lists;
      }
    );
  }
};
</script>

<style scoped="scoped">
.Ekey * {
  vertical-align: middle;
}
.txt {
  font-size: 14px;
  color: #666666;
  margin-left: 20px;
}

.btnBox {
  overflow: hidden;
  margin-bottom: 10px;
  margin-top: 18px;
}
.btnBox div {
  font-size: 13px;
  color: #5c759d;
  float: left;
  cursor: pointer;
  margin-left: 30px;
}
.btnBox div:nth-child(1) {
  margin-left: 0;
}
.Ekey .eRadio {
  margin-right: 30px;
}
.Ekey .el-radio__label {
  font-size: 16px;
}
.picker {
  width: 200px;
}
.red {
  color: #f56c6c;
  margin-left: 10px;
}
._zero div {
  float: left;
  margin-left: 14px;
  cursor: pointer;
}
._zero div:nth-child(1){
  margin-left: 0;
}
._zero {
  overflow: hidden;
}
.el-input {
  margin-left: 10px;
}
.user > span:nth-child(1) {
  margin-left: 0;
}
.delInfo {
  width: 328px;
  height: 132px;
  background-color: #262626;
  border-radius: 8px;
  margin: 0 auto;
  opacity: 0.7;
  position: relative;
  margin-top: -15%;
  z-index: 101;
}
.delInfo_txt {
  font-size: 14px;
  color: #fff;
  display: block;
  text-align: center;
  line-height: 132px;
}
.bottom_btn{
  margin-top: 30px !important;
  width: 200px;
  margin: 0 auto;
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