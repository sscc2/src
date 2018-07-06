<template>
  <div>
		<div class='header'>
				<span class='header_txt'>{{pageTxt.userTxt[0]}}</span>
		</div>

		<div class="user">
			<div class="userH">
				<span class="txt">{{pageTxt.userTxt[1]}}：</span>
				<el-input class="input_normal" v-model="userParam.id"></el-input>
				<span class="txt">{{pageTxt.userTxt[2]}}：</span>
				<el-input class="input_normal" v-model="userParam.name"></el-input>
				<el-button type="primary"  @click='userSearch'>{{pageTxt.userTxt[3]}}</el-button>
			</div>

			<div class="btnBox">
				<div  @click="createUser"><img src="@/img/creatico.png" ><span>{{pageTxt.userTxt[5]}}</span></div>
				<div  @click="deleteUser"><img src="@/img/deletico.png" ><span>{{pageTxt.userTxt[7]}}</span></div>
				<div  @click="importExtInfo"><img src="@/img/defalutico.png" ><span>{{pageTxt.userTxt[9]}}</span></div>
        <div  @click="exportExtInfo"><img src="@/img/importico.png" ><span>{{pageTxt.userTxt[10]}}</span></div>
        <div  @click="exportBasicsInfo"><img src="@/img/importico.png" ><span>{{pageTxt.userTxt[11]}}</span></div>
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

      <div class="Popup" v-show="showImportExtInfo">
        <div class="_panle">
          <div><p id="_title">{{pageTxt.userTxt[9]}}</p>
               <img id="_close" src="@/img/close.png" @click="showImportExtInfo=false">
          </div>
          <div class="_messaga1">
            <span class="txt"><span class="red">*&nbsp;</span>{{pageTxt.userTxt[12]}}</span>
            <el-input class="Popup_input" v-model="csvFileName"></el-input>
            <div class="_messaga1_info">
              <span class="info_txt">请将扩展信息文件放到服务器路路径：/home/fdep/notice内；</span><br/>
              <span class="info_txt">在输入框中填入扩展信息文件名。</span>
            </div>
          </div>
          <div class="info_button1">
            <el-button type="primary" @click="importExtInfoSubmit">提交</el-button>
            <el-button type="default" class="Popup_return" @click="showImportExtInfo=false">返回</el-button>
          </div>
        </div>
      </div>

      <div class="Popup" v-show="showExportExtInfo">
        <div class="_panle">
          <div><p id="_title">{{pageTxt.userTxt[9]}}</p>
               <img id="_close" src="@/img/close.png" @click="showExportExtInfo=false">
          </div>
          <div class="_messaga">
            <span class="txt">文件名：<a :href="exportCsvSrc" style="color:#5C759D">{{exportCsvName}}</a></span>
            <div class="_messaga_info">
              <span class="info_txt">请在文件名上点击右键，选择“将链接另存为...”菜单保存文件。</span>
            </div>
          </div>
          <div class="info_button">
            <el-button type="default" @click="showExportExtInfo=false">关闭</el-button>
          </div>
        </div>
      </div>

      <div class="Popup" v-show="showExportBasicsInfo">
        <div class="_panle">
          <div><p id="_title"></p>
                <img id="_close" src="@/img/close.png" @click="showExportBasicsInfo=false">
          </div>
          <div class="_messaga">
            <span class="txt">文件名：&nbsp;<a :href="BasicsSrc" style="color:#5C759D">{{BasicsName}}</a></span>
            <div class="_messaga_info">
              <span class="info_txt">请在文件名上点击右键，选择“将链接另存为...”菜单保存文件。</span>
            </div>
          </div>
          <div class="info_button">
            <el-button type="default" @click="showExportBasicsInfo=false">关闭</el-button>
          </div>
        </div>
      </div> 

		</div>	
  </div>
</template>

<script>
import Password from "@/view/message/user/password.vue";
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
    "批量导出扩展信息",
    "批量导出基础信息",
    "扩展信息文件名"
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
      userData: {lists:[{userID:'test01'}]},
      selects: [],
      currentPage: 1,
      pageSize: 20,
      showImportExtInfo:false,
      showExportExtInfo:false,
      showExportBasicsInfo:false,
      csvFileName:"",
      exportCsvSrc:"",
      exportCsvName:"",
      BasicsSrc:"",
      BasicsName:""
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
    // 创建用户
    createUser: function() {
      this.$store.state.creatAndEdit = false;
      this.$store.state.headerText = "创建用户";
      this.$store.state.editBack = "/message/user"
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
          now: function(){},
          btn: 3,
          that: _this
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
    importExtInfo(){
      this.csvFileName=""
      this.showImportExtInfo=true;
    },
    importExtInfoSubmit(){
      var _this=this
      utils.post(
        "mx/userinfoExt/ImportCsv",
        {
          cmdID:"600016",
          csvFileName: _this.csvFileName 
        },
        function(response){
          if(response.errcode == 0){
            utils.weakTips(response.errinfo)
          }else{
            utils.weakTips(response.errinfo)
          }
        }
      )
    },
    // 导出扩展信息
    exportExtInfo(){          
      var _this=this;
      utils.post(
        "mx/userinfoExt/ExportCsv",
        {
          cmdID:"600015"
        },
        function(response){
          if(response.errcode == 0){
            _this.exportCsvSrc=response.errinfo;            
            _this.exportCsvName=response.errinfo.split("/").pop();
            _this.showExportExtInfo=true;           
          }else{
            utils.weakTips(response.errinfo)
          }
        }
      )
    },
    // 导出基本信息
    exportBasicsInfo(){
      var _this=this;
      utils.post(
        "mx/userinfo/ExportCsv",
        {
          cmdID:"600014"
        },
        function(response){
          if(response.errcode == 0 ){
            _this.BasicsSrc=response.errinfo
            _this.BasicsName=response.errinfo.split("/").pop();
            _this.showExportBasicsInfo=true;
          }else{
              utils.weakTips(response.errinfo)
          }
        }
      )
    },
    // 修改用户(row)
    userEdit: function(e) {
      this.$store.state.tabv = "v1";
      this.$store.state.headerText="修改用户"
      this.$store.state.creatAndEdit= true;
      this.$store.state.editBack = "/message/user"
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
          if(response.errcode==0){
              if(response.totalPage<_this.currentPage){
                _this.currentPage = response.totalPage;
                _this.renderDate()
          }else{
             _this.userData = response;
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
        if(response.errcode==0){
          _this.userData = response;
        }
        
      }
    );
  },
  components: { Password }
};
</script>

<style scoped="scoped">
.user *{vertical-align: middle;}
.user{padding: 20px; white-space: nowrap;}
.user .userH{height: 30px;}
.userH .txt{font-size: 14px; line-height: 30px; height: 30px; color: #666666;}
.userH > span:nth-child(3){margin-left: 35px;}
.userH .el-button{margin-left: 35px;}
.userH .el-input{margin-left: 10px;}
.btnBox{font-size: 14px; color: #5c759d; margin-top: 20px; margin-bottom: 10px;}
.btnBox div{margin-left: 35px; cursor: pointer; display: inline-block;}
.btnBox div:nth-child(1){margin-left: 0;}
.btnBox > div > span{margin-left: 4px; line-height: 30px; height: 30px}
._zero > div{display: inline-block; margin-right: 14px; cursor: pointer;}
.Popup ._messaga1{margin-top: 40px;margin-left: 40px;text-align: left;}
.Popup ._messaga1_info{margin-left: 125px;margin-top: 15px;line-height: 20px;}
.Popup_input{width: 360px;margin-left: 18px;}
.Popup .info_button1{text-align: left;margin-left: 165px;margin-top: 40px;}
.Popup_return{margin-left: 40px;}
.Popup .red{color:#FF6B6B;}
</style>

