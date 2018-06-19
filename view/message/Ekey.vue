<template>
<div>
	<div class='header'>
			<span class='header_txt'>Ekey</span>
	</div>	

	<div class="Ekey">
		<div class="user">
			<span class="txt">{{pageTxt.Ekey[0]}}：</span>
			<el-radio v-model="ainfo.type" :label="0">{{pageTxt.Ekey[1]}}</el-radio>
  		<el-radio v-model="ainfo.type" :label="1">{{pageTxt.Ekey[2]}}</el-radio>
			<span v-show='ainfo.type==0' class="txt">{{pageTxt.Ekey[3]}}：</span>
			<el-input v-show='ainfo.type==0' v-model="ainfo.ekeyName" placeholder="" ></el-input>
			<span v-show='ainfo.type==1' class="txt">用户：</span>
			<el-input v-show='ainfo.type==1' v-model="ainfo.userID" placeholder=""></el-input>
			<el-button type="primary" plain @click='search'>{{pageTxt.Ekey[4]}}</el-button>
		</div>

		<div class="btnBox">
			<div id='Add'  @click="showAdd" ><img src="@/img/creatico.png" ><span> {{pageTxt.Ekey[5]}}</span></div>
			<!-- <div id='Edit' @click="showEdit" ><img src="@/img/alterico.png" ><span>{{pageTxt.Ekey[6]}}</span></div> -->
			<div @click="del"><img src="@/img/deletico.png" > <span>{{pageTxt.Ekey[7]}}</span></div>
			<div @click="fn"><img src="@/img/creatico.png" ><span>批量导出Ekey</span></div>
		</div>
	
		<el-table  :data="EkeyData"  tooltip-effect="dark" @current-change="currentRow"  @selection-change="selectionRow" highlight-current-row >
			<el-table-column width="55" type="index"></el-table-column>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="userID" label="用户ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName" label="用户名称" show-overflow-tooltip></el-table-column>
			<el-table-column prop="ekeyName" label="Ekey名称" show-overflow-tooltip></el-table-column>
			<el-table-column prop="ekeyValidDate" label="Ekey有效期" show-overflow-tooltip></el-table-column>
			<el-table-column prop="comment" label="Ekey描述" show-overflow-tooltip></el-table-column>
			<el-table-column label="操作" width="110">
				<div slot-scope="scope" class="_zero">
					<div  id='Edit'  @click="showEdit"><img src="@/img/altericos.png"> </div>
					<div><img src="@/img/deleticos.png" ></div>
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
						<el-input class='picker' v-model="ainfo.userID" :placeholder="pageTxt.dialog[13]"></el-input>
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
			<div slot="footer" class="dialog-footer">
			    <el-button @click="addEkey = false">{{pageTxt.dialog[12]}}</el-button>
			    <el-button type="primary" @click="submitAdd">{{pageTxt.dialog[11]}}</el-button>
			</div>
		</el-dialog>
		

		<!-- 修改Ekey -->
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
			<div slot="footer" class="dialog-footer">
			    <el-button @click="editEkdy = false">{{pageTxt.dialog[12]}}</el-button>
			    <el-button type="primary" @click="submitEdit">{{pageTxt.dialog[11]}}</el-button>
			</div>
		</el-dialog>
		<!-- 分页 -->
		<div class="_pagination" v-show="EkeyData.length!=0">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next" :page-size='20' :total="1000"></el-pagination>
			<div class="rightTxt">共{{EkeyData.length}}条数据</div>
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
        {
          userID: "AAA",
          userName: "2016-05-02",
          ekeyName: "王小虎"
        },
        {
          userID: "AAA",
          userName: "2016-05-02",
          ekeyName: "王小虎"
        }
      ],
      selects: [],
      oldEkeyName:'',

      pageTxt: pageTxt,
      radio: 1,
      info: {
        id: "",
        Ekey: "/C=CN/CN=",
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
        Ekey: "/C=CN/CN=",
        pass: "111111",
        notes: "",
        valid: "",
        check: true,
        start: "",
        end: "",
        check1: false
      },
      row1: {},
      data2: [{ Ekey: "AAA" }],
      err1: { id: false, Ekey: false, pass: false, start: false, end: false },
      err2: { id: false, Ekey: false, pass: false, start: false, end: false }
    };
  },
  methods: {
    fn() {
      var _this = this;
    },
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

    submitAdd() {
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
            alert(response.errinfo);
          } else {
            alert("创建失败");
          }
        }
      );
    },

    showEdit() {
      
        // this.oldEkeyName=this.selects[0].ekeyName
        console.log(this.oldEkeyName)
        this.editEkdy = true;
        var _this = this;
        utils.post(
          "mx/userEkey/query",
          {
            cmdID: 600021,
            userID: this.selects[0].userID,
            ekeyName: this.selects[0].ekeyName,
            type: 2
          },
          function(response) {
            _this.binfo = response.lists[0];
          }
        );  
    },

    submitEdit() {
      var _this = this;
      utils.post(
        "mx/userEkey/modify",
        {
          cmdID: 600023,
          operator: "admin",
          userID: _this.binfo.userID,
          oldEkeyName:_this.oldEkeyName,
          ekeyName: _this.binfo.ekeyName,
          ekeyValidDate: _this.ekeyValidDate,
          comment: _this.binfo.comment
        },
        function(response) {
          if (response.errcode == 0) {
            alert(response.errinfo);
          } else {
            alert("提交失败");
          }
        }
      );
    },

    del() {
      if (this.selects.length != 1) {
        utils.confirm({ message: "请在列表中选择一条记录！", type: 2 });
      } else {
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
              alert(response.errinfo);
            } else {
              alet("删除失败");
            }
          }
        );
      }
    },

    selectionRow(val) {
      this.selects = val;
      // console.log(this.selects);
    },

    showAdd() {
      var info = this.info,
        err = this.err1;
      for (var key in info) {
        info[key] = "";
        err[key] = false;
      }
      info.Ekey = "/C=CN/CN=";
      info.pass = "111111";
      info.check = false;
      this.addEkey = true;
    },

    currentRow: function(e) {
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
    }
  },
  created() {
    ainfo.type = 0;
    ainfo.ekeyName = "/C=CN/CN=";
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
/* 头部 */
.header {
  height: 47px;
  border-bottom: 1px solid #ccc;
}
.header_txt {
  font-size: 16px;
  color: #656a73;
  line-height: 47px;
  margin-left: 17px;
  font-weight: bold;
}

/* 文本 */
.Ekey * {
  vertical-align: middle;
}
.user .el-input {
  width: 210px;
  margin-right: 10px;
}
.user .el-button {
  margin-left: 35px;
  width: 90px;
  height: 30px;
  line-height: 0;
}
.user .red {
  color: #f56c6c;
}
.txt {
  font-size: 14px;
  color: #666666;
}
.user > .el-button {
  margin-left: 35px;
  width: 90px;
  height: 30px;
  background-color: #32ccf9;
  line-height: 0px;
  border: 0;
  color: white;
}

/* 导航 */
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

/* 表格 */
.Ekey {
  padding: 22px;
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
._zero {
  overflow: hidden;
}
.el-input {
  margin-left: 10px;
}

</style>