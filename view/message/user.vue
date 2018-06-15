<template>
  <div>
		<div class='header'>
				<span class='header_txt'>{{pageTxt.userTxt[0]}}</span>
		</div>
		<div class="user">
			<div class="userH">
				<span class="txt">{{pageTxt.userTxt[1]}}：</span>
				<input type="text" v-model="userParam.id">
				<span class="txt">{{pageTxt.userTxt[2]}}：</span>
				<input type="text" v-model="userParam.name">
				<el-button type="primary"  @click='userSearch'>{{pageTxt.userTxt[3]}}</el-button>
			</div>
			<div class="btnBox">
				<div  @click="userAdd"><img src="@/img/creatico.png" ><span>{{pageTxt.userTxt[5]}}</span></div>
				<div  @click="editAll"><img src="@/img/alterico.png" ><span>{{pageTxt.userTxt[6]}}</span></div>
				<div  @click="delAll"><img src="@/img/deletico.png" ><span>{{pageTxt.userTxt[7]}}</span></div>
				<div  @click="userEncrypt"><img src="@/img/amendico.png" ><span>{{pageTxt.userTxt[8]}}</span></div>
				<div  @click="userImports"><img src="@/img/importico.png" ><span>{{pageTxt.userTxt[9]}}</span></div>
        <div  @click="userImports"><img src="@/img/defalutico.png" ><span>{{pageTxt.userTxt[10]}}</span></div>
        <div  @click="userImports"><img src="@/img/defalutico.png" ><span>{{pageTxt.userTxt[11]}}</span></div>
			</div>
			<el-table ref="multipleTable" @current-change="currentRow" :data="userData.lists.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark" @selection-change="selectionRow">
				<el-table-column type="index" width="55"></el-table-column>
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="userID" label="用户ID" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userName" label="用户名称" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="120" show-overflow-tooltip>
					<div slot-scope="scope" class="_zero">
						<div @click='userEdit'><img src="@/img/altericos.png"></div>
						<div @click="userDel(scope.$index, userData.lists)"><img src="@/img/deleticos.png" ></div>
						<div @click="userEncrypt"><img src="@/img/passwdico.png" ></div>
					</div>
				</el-table-column>
			</el-table>
			<div class="_pagination">
				<el-pagination class="userbottom" @size-change="handleSizeChange" @current-change='handleCurrentChange' :current-page="currentPage" :page-size="20" :total="userData.lists.length" background layout="prev, pager, next"></el-pagination>
        <div class="rightTxt">共{{userData.lists.length}}条数据</div>
      </div>        
			<Password :abc="b"></Password>
			<Upload></Upload>
		</div>	
  </div>
</template>

<script>
import kit from "@/libs/kit.js";
import observer from "@/libs/observer.js";
import Password from "@/view/message/user/password.vue";
import Upload from "@/view/message/user/upload.vue";
import utils from "@/libs/utils.js";
import bus from "@/libs/bus.js";

var _this, _keyObj;
var pageTxt = {
  userTxt: [
    "用户",
    "用户ID",
    "用户名称",
    "查询",
    "用户总数",
    "创建用户",
    "修改用户",
    "删除用户",
    "修改密码",
    "批量导入扩展信息",
    "批量导出拓展信息",
    "批量导出基础信息"
  ],
  listTxt: ["用户ID", "用户名称", "操作"],
  tips: {
    user: "请在列表中选择一条记录！",
    del: "是否确认要删除该用记录吗？",
    pass: "请在列表中记录!"
  }
};

export default {
  name: "file_user",
  data() {
    return {
      pageTxt,
      userParam: { id: "", name: "" },
      // userData,
      userData: {
        count: 30,
        lists: [
          { userID: "A", userName: "123" },
          { userID: "A", userName: "123" },
          { userID: "A", userName: "123" }
        ]
      },
      selects: [],
      b: "",
      row: "",
      currentPage: 1,
      pagesize: 20
    };
  },

  methods: {

    // 查询用户
    userSearch: function(e) {
      var _this = this;
      utils.post(
        "mx/userinfo/queryLists",
        {
          cmdID: 600001,
          userID: _this.userParam.id,
          userName: _this.userParam.name
        },
        function(response) {
          _this.userData = response;
        }
      );
    },

    // 增加用户
    userAdd: function() {
      this.$router.replace({ path: "/message/userAdd/mess" });
    },

    // 修改用户
    editAll: function() {
      if (this.selects.length != 1) {
        utils.confirm({ message: pageTxt.tips.user, type: 2 });
      } else {
        this.$router.replace({ path: "/message/userEdit/mess" });
        bus.$emit("msg", this.selects[0].userID);
      }
    },

    // 删除用户
    delAll: function() {
      if (this.selects.length != 1) {
        utils.confirm({ message: pageTxt.tips.user, type: 2 });
      } else {
        var _this = this;
        utils.post(
          "mx/userinfo/delete",
          {
            cmdID: 600005,
            operator: "admin",
            userID: this.selects[0].userID
          },
          function(response) {
            if (response.errcode == 0) {
              var index = _this.userData.lists.indexOf(_this.selects[0]);
              if (index > -1) {
                _this.userData.lists.splice(index, 1);
              }
            }
          }
        );
      }
    },

    // 修改密码
    userEncrypt: function(e) {
      if (this.selects.length != 1) {
        utils.confirm({ message: pageTxt.tips.pass, type: 2 });
      } else {
        this.b = this.selects[0].userID;
        observer.execute("messUserPass", this.row);
      }
    },

    // 导入拓展
    userImports: function(e) {
      // observer.execute("messUpload", true);
    },    

    // 修改用户（表）
    userEdit: function(e) {
      this.$router.replace({ path: "/message/userEdit/mess" });
      gotoEdit();
    },

    // 删除用户（表）
    userDel: function(index, rows) {
      rows.splice(index, 1);
    },


    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    selectionRow(val) {
      this.selects = val;
    },
    currentRow: function(e) {
      this.row = e;
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    prev: function(e) {
      this.$router.replace({ path });
    },
    next: function(e) {},
    imports: function(e) {}
  },

  //初始化数据
  created() {
    var _this = this;
    utils.post(
      "mx/userinfo/queryLists",
      {
        cmdID: 600001,
        userID: "",
        userName: ""
      },
      function(response) {
        _this.userData = response;
      }
    );
  },

  //更新视图
  watch: {
    schfilter: function(val, oldVal) {
      this.tableData = this.otableData.filter(item => ~item.name.indexOf(val));
    }
  },
  mounted() {},
  components: { Password, Upload }
};
</script>

<style scoped="scoped">
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
.user {
  padding: 22px;
  white-space: nowrap;
}
.user * {
  vertical-align: middle;
}
.user input {
  width: 160px;
  height: 30px;
  margin-left: 10px;
  border: 1px solid #d7d8da;
  text-indent: 12px;
}
.user .txt {
  font-size: 14px;
  line-height: 30px;
  height: 30px;
  color: #666666;
}
.user .el-button {
  margin-left: 35px;
}
.userH > span:nth-child(3) {
  margin-left: 35px;
}
.userH > span:nth-child(6) {
  margin-left: 10px;
}
.userH > input:focus {
  border: 2px solid #32ccf9;
}
.btnBox {
  font-size: 13px;
  color: #5c759d;
  margin-top: 18px;
  margin-bottom: 10px;
}
.btnBox div {
  margin-left: 15px;
  cursor: pointer;
  display: inline-block;
}
.btnBox > div > span {
  margin-left: 3px;
}
.btnBox div:nth-child(1) {
  margin-left: 0;
}
._zero > div {
  display: inline-block;
  margin-right: 14px;
  cursor: pointer;
}
</style>
