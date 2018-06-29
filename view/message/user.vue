<template>
  <div>
		<div class='header'>
				<span class='header_txt'>{{pageTxt.userTxt[0]}}</span>
		</div>

		<div class="user">
			<div class="userH">
				<span class="txt">{{pageTxt.userTxt[1]}}：</span>
				<input class="input_normal" type="text" v-model="userParam.id">
				<span class="txt">{{pageTxt.userTxt[2]}}：</span>
				<input class="input_normal" type="text" v-model="userParam.name">
				<el-button type="primary"  @click='userSearch'>{{pageTxt.userTxt[3]}}</el-button>
			</div>

			<div class="btnBox">
				<div  @click="createUser"><img src="@/img/creatico.png" ><span>{{pageTxt.userTxt[5]}}</span></div>
				<div  @click="deleteUser"><img src="@/img/deletico.png" ><span>{{pageTxt.userTxt[7]}}</span></div>
				<div  @click="importExtInfo"><img src="@/img/importico.png" ><span>{{pageTxt.userTxt[9]}}</span></div>
        <div  @click=""><img src="@/img/defalutico.png" ><span>{{pageTxt.userTxt[10]}}</span></div>
        <div  @click=""><img src="@/img/defalutico.png" ><span>{{pageTxt.userTxt[11]}}</span></div>
			</div>

			<el-table ref="multipleTable" tooltip-effect="dark" @current-change="currentRow"  @selection-change="selectionRow" :data="userData.lists">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="userID" label="用户ID" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userName" label="用户名称" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="120" show-overflow-tooltip>
					<div slot-scope="scope" class="_zero">
						<div @click='userEdit'><img src="@/img/altericos.png"></div>
						<div @click="showPromptBox(scope.$index,userData.lists)"><img src="@/img/deleticos.png" ></div>
						<div @click="eidtPasswd"><img src="@/img/passwdico.png"></div>
					</div>
				</el-table-column>
			</el-table>

			<div class="_pagination" v-show="userData.totalPage>0">
        <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" background layout="prev, pager, next, jumper" :page-count="userData.totalPage" :page-size="20"></el-pagination>
        <div class="rightTxt">共{{userData.totalSize}}条数据</div>
      </div>  
			<Password></Password>
			<Upload></Upload>
		</div>	
  </div>
</template>

<script>
import Password from "@/view/message/user/password.vue";
import Upload from "@/view/message/user/upload.vue";
import utils from "@/libs/utils.js";

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
  data() {
    return {
      pageTxt,
      userParam: { id: "", name: "" },
      userData: {},
      selects: [],
      currentPage: 1,
      pageSize: 20,
    };
  },

  methods: {
    // 查询用户
    userSearch: function() {
      var _this = this;
      utils.post(
        "mx/userinfo/queryLists",
        {
          cmdID: "600001",
          userID: _this.userParam.id,
          userName: _this.userParam.name,
          pageSize: _this.pageSize,
          currentPage: _this.currentPage,
          type: "0"
        },
        function(response) {
          _this.userData = response;
          if(response.totalPage<_this.currentPage){
            utils.post(
              "mx/userinfo/queryLists",
              {
                cmdID: "600001",
                userID: _this.userParam.id,
                userName: _this.userParam.name,
                pageSize: _this.pageSize,
                currentPage: response.totalPage,
                type: "0"
              },
              function(response){
                _this.userData = response;
              }
            )
          }
        }
      );
    },
    // 增加用户
    createUser: function() {
      this.$store.state.creatAndEdit = false;
      this.$store.state.headerText = "创建用户";
      this.$router.replace({ path: "/message/userAdd/mess" });
    },
    // 删除用户
    deleteUser() {
      if (this.selects.length != 1) {
        utils.weakTips("请在列表中选择一条记录！");
      } else {
          var _this=this
          utils.hints({
          txt:"是否确定删除该用户记录",
          yes:_this.delAll,
          btn: 2
        })
      }
    },
    delAll: function() {
      var _this = this;
      utils.post(
        "mx/userinfo/delete",
        {
          cmdID: "600005",
          operator: "admin",
          userID: _this.selects[0].userID
        },
        function(response) {
          if (response.errcode == 0) {
            _this.renderDate()
            utils.weakTips(response.errinfo);
          } else {
            utils.weakTips(response.errInfo);
          }
        }
      );
    },
    // 导入扩展信息
    importExtInfo: function() {
    },
    // 修改用户(row)
    userEdit: function(e) {
      this.$store.state.tabv = "v1";
      this.$store.state.headerText="修改用户"
      this.$store.state.creatAndEdit= true;
      this.$router.replace({ path: "/message/userEdit/mess" });
    },
    // 删除用户(row)
    showPromptBox() {
      var _this=this
        utils.hints({
          txt:"是否确定删除该用户记录",
          yes:_this.userDel,
          btn: 2
        })
    },
    userDel() {
      var _this = this;
      utils.post(
        "mx/userinfo/delete",
        {
          cmdID: 600005,
          operator: "admin",
          userID: _this.$store.state.transferEditID
        },
        function(response) {
          if (response.errcode == 0) {
            _this.renderDate()
            utils.weakTips(response.errinfo);
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    // 修改密码(row)
    eidtPasswd() {
      this.$store.state.passShow = true;
    },
    // 分页
    handleSizeChange: function(size) {
      this.pageSize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.renderDate()
    },    

    selectionRow(val) {
      this.selects = val;
    },
    currentRow: function(e) {
      this.$store.state.transferEditID = e.userID;
    },
    renderDate(){
      var _this = this;
      utils.post(
        "mx/userinfo/queryLists",
        {
          cmdID: "600001",
          userID: _this.userParam.id,
          userName: _this.userParam.name,
          pageSize: _this.pageSize,
          currentPage: _this.currentPage,
          type: 1
        },
        function(response) {
          _this.userData = response;
          if(response.totalPage<_this.currentPage){
            utils.post(
              "mx/userinfo/queryLists",
              {
                cmdID: "600001",
                userID: _this.userParam.id,
                userName: _this.userParam.name,
                pageSize: _this.pageSize,
                currentPage: response.totalPage,
                type: 1
              },
              function(response){
                _this.userData = response;
              }
            )
          }
        }
      );
    }
  },
  //初始化数据
  created() {
    var _this = this;
    utils.post(
      "mx/userinfo/queryLists",
      {
        cmdID: "600001",
        userID: "",
        userName: "",
        pageSize: _this.pageSize,
        currentPage: _this.currentPage,
        type: "0"
      },
      function(response) {
        _this.userData = response;
      }
    );
  },
  components: { Password, Upload }
};
</script>

<style scoped="scoped">
.user{padding: 22px; white-space: nowrap;}
.user *{vertical-align: middle;}
.user input{margin-left: 10px; border: 1px solid #d7d8da; text-indent: 12px;}
.user .txt{font-size: 14px; line-height: 30px; height: 30px; color: #666666;}
.user .el-button{margin-left: 35px;}
.userH > span:nth-child(3){margin-left: 35px;}
.userH > span:nth-child(6){margin-left: 10px;}
.userH > input:focus{border: 2px solid #32ccf9;}
.btnBox{font-size: 13px; color: #5c759d; margin-top: 18px; margin-bottom: 10px;}
.btnBox div{margin-left: 15px; cursor: pointer; display: inline-block;}
.btnBox > div > span{margin-left: 3px;}
.btnBox div:nth-child(1){margin-left: 0;}
._zero > div{display: inline-block; margin-right: 14px; cursor: pointer;}
.promptBox_btn{text-align: center; margin-top: 60px; margin-bottom: 50px;}
.promptBox_btn button:nth-child(1){margin-left: 0;}
.delInfo{width: 328px; height: 132px; background-color: #262626; border-radius: 8px; margin: 0 auto; opacity: 0.7; position: relative; margin-top: 10px; z-index: 101;}
.delInfo_txt{font-size: 14px; color: #fff; display: block; text-align: center; line-height: 132px;}
.promptBox_content_txt{font-size: 14px; color: #666; text-align: center; display: block; margin-top: 60px;}
.promptBox_btn{text-align: center; margin-top: 60px; margin-bottom: 50px;}
.promptBox_btn button:nth-child(1){margin-left: 0;}
</style>

