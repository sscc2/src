<template>
  <div>
		<div class='header'>
				<span class='header_txt'>{{pageTxt.label[0]}}</span>
		</div>
		<div class="user">
			<div class="userH">
				<span class="txt">{{pageTxt.label[1]}}</span>
				<el-input class="input_normal" v-model="userParam.id"></el-input>
				<span class="txt">{{pageTxt.label[2]}}</span>
				<el-input class="input_normal" v-model="userParam.name"></el-input>
				<el-button type="primary" @click='userSearch'>{{pageTxt.label[3]}}</el-button>
			</div>
			<div class="btnBox">
				<div @click="createUser"><img src="@/img/creatico.png" ><span>{{pageTxt.label[4]}}</span></div>
				<div @click="importExtInfo"><img src="@/img/defalutico.png"><span>{{pageTxt.label[5]}}</span></div>
        <div @click="exportExtInfo"><img src="@/img/importico.png"><span>{{pageTxt.label[6]}}</span></div>
        <div @click="exportBasicsInfo"><img src="@/img/importico.png"><span>{{pageTxt.label[7]}}</span></div>
			</div>
			<el-table ref="multipleTable" tooltip-effect="dark" @current-change="currentRow" :data="userData.lists">
				<el-table-column width="50" label=" " type="index" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userID" :label="pageTxt.table[0]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userName" :label="pageTxt.table[1]" show-overflow-tooltip></el-table-column>
				<el-table-column :label="pageTxt.table[2]" width="180" show-overflow-tooltip>
					<div slot-scope="scope" class="_zero">
            <el-tooltip :content="pageTxt.table[3]" placement="bottom" effect="light"><div @click='userEdit'><img src="@/img/altericos.png"></div></el-tooltip>
            <el-tooltip :content="pageTxt.table[4]" placement="bottom" effect="light"><div @click='userEkey'><img src="@/img/altericos.png"></div></el-tooltip>
            <el-tooltip :content="pageTxt.table[5]" placement="bottom" effect="light"><div @click='userComm'><img src="@/img/altericos.png"></div></el-tooltip>
						<el-tooltip :content="pageTxt.table[6]" placement="bottom" effect="light"><div @click="showPromptBox"><img src="@/img/deleticos.png" ></div></el-tooltip>
						<el-tooltip :content="pageTxt.table[7]" placement="bottom" effect="light"><div @click="eidtPasswd"><img src="@/img/passwdico.png"></div></el-tooltip>
					</div>
				</el-table-column>
			</el-table>
      <div class="_pagination" v-if="userData.totalSize>pageSize">
        <el-pagination @current-change='handleCurrentChange' @size-change="handleSizeChange" :page-size="pageSize" :total="userData.totalSize" background layout="prev, pager, next, jumper"></el-pagination>
        <div class="rightTxt">共{{userData.totalSize}}条数据</div>
      </div>
      <div class="onePage" v-else-if="userData.totalSize>0&&userData.totalSize<=pageSize">已显示全部{{userData.totalSize}}个数据</div> 
			<Password></Password>
      
      <div class="Popup" v-show="showImportExtInfo">
        <div class="_panle">
          <div><p id="_title">{{pageTxt.popup[0]}}</p>
               <img @click="showImportExtInfo=false" id="_close" src="@/img/close.png">
          </div>
          <div class="_messaga1">
            <span class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[1]}}</span>
            <el-input class="Popup_input" v-model="csvFileName"></el-input>
            <div class="_messaga1_info">
              <span class="info_txt">{{pageTxt.popup[2]}}</span><br/>
              <span class="info_txt">{{pageTxt.popup[3]}}</span>
            </div>
          </div>
          <div class="info_button1">
            <el-button type="primary" @click="importExtInfoSubmit">{{pageTxt.popup[4]}}</el-button>
            <el-button type="default" @click="showImportExtInfo=false" class="Popup_return">{{pageTxt.popup[5]}}</el-button>
          </div>
        </div>
      </div>
      <div class="Popup" v-show="showExportExtInfo">
        <div class="_panle">
          <div><p id="_title">{{pageTxt.popup[6]}}</p>
            <img @click="showExportExtInfo=false" id="_close" src="@/img/close.png">
          </div>
          <div class="_messaga">
            <span class="txt">{{pageTxt.popup[7]}}<a :href="exportCsvSrc" style="color:#5C759D">{{exportCsvName}}</a></span>
            <div class="_messaga_info">
              <span class="info_txt">{{pageTxt.popup[8]}}</span>
            </div>
          </div>
          <div class="info_button">
            <el-button type="default" @click="showExportExtInfo=false">{{pageTxt.popup[9]}}</el-button>
          </div>
        </div>
      </div>
      <div class="Popup" v-show="showExportBasicsInfo">
        <div class="_panle">
          <div><p id="_title">{{pageTxt.popup[10]}}</p>
            <img id="_close" src="@/img/close.png" @click="showExportBasicsInfo=false">
          </div>
          <div class="_messaga">
            <span class="txt">{{pageTxt.popup[7]}}&nbsp;<a :href="BasicsSrc" style="color:#5C759D">{{BasicsName}}</a></span>
            <div class="_messaga_info">
              <span class="info_txt">{{pageTxt.popup[8]}}</span>
            </div>
          </div>
          <div class="info_button">
            <el-button type="default" @click="showExportBasicsInfo=false">{{pageTxt.popup[9]}}</el-button>
          </div>
        </div>
      </div> 
		</div>	
  </div>
</template>

<script>
import Password from "@/view/message/user/password.vue";
import utils from "@/libs/utils.js";
import lang from '@/language/lang.js';

var pageTxt = lang.user,_this;

export default {
  data() {
    return {
      pageTxt,
      userParam: { id: "", name: "" },
      userData: {
        lists: [{ userID: "test01" }] 
        },
      currentPage: 1,
      pageSize: 20,
      csvFileName: "",
      showImportExtInfo: false,
      exportCsvSrc: "",
      exportCsvName: "",
      showExportExtInfo: false,
      BasicsSrc: "",
      BasicsName: "",
      showExportBasicsInfo: false,
      tabHTML:""
    };
  },
  methods: {
    //查询用户
    userSearch() {
      this.renderDate(1);
    },
    //创建用户
    createUser() {
      this.$store.state.headerText = this.pageTxt.tips[0];
      this.$store.state.creatAndEdit = false;
      this.$store.state.editBack = "/message/user";
      this.$router.replace({ path: "/message/userAdd/mess" });
    },
    //删除立即下发
    deleteSendDown(id) {
      utils.review({
        yes: function(info) {
          utils.hints({
            txt: _this.pageTxt.tips[1],
            yes: function() {
              utils.post(
                "mx/userinfo/deleteImmediately",
                {
                  cmdID: "600008",
                  operator: "admin",
                  reviewer: info.name,
                  userID: id
                },
                function(response) {
                  if(response == 0) {
                    utils.wheelReq(response);
                    _this.renderDate(1);
                  }                 
                }
              );
            }
          });
        }
      });
    },
    //导入扩展信息
    importExtInfo() {
      this.csvFileName = "";
      this.showImportExtInfo = true;
    },
    importExtInfoSubmit() {
      _this.tabHTML='';
      utils.post(
        "mx/userinfoExt/ImportCsv",
        {
          cmdID: "600016",
          csvFileName: _this.csvFileName
        },
        function(response) {
          _this.showImportExtInfo = false;
          if (response.errcode != -1) {
            utils.weakTips(response.errinfo);
          } else {
            for(var i=0; i<3; i++){
              _this.tabHTML+="<tr >"+"<td class='l1'>"+response.lists[i].line+"</td>"+"<td class='l1'>"+response.lists[i].userID +"</td>"+"<td class='l1'>"+response.lists[i].errInfo+"</td>"+"</tr>"
            }
              utils.weakTips("<table class='_whellError'>"+"<tr id='table_header'>"+"<td class='l1'>"+"line"+"</td>"+"<td class='l1'>"+"user"+"ID"+"</td>"+"<td class='l1'>"+"errinfo"+"</td>"+"</tr>"+ _this.tabHTML +"<tr>"+"<td class='l1'>"+"..."+"</td>"+"<td class='l1'>"+"..."+"</td>"+"<td class='l1'>"+"..."+"</td>"+"</tr>"+"</table>")
          }
        }
      );
    },
    //导出扩展信息
    exportExtInfo() {
      utils.post(
        "mx/userinfoExt/ExportCsv",
        {
          cmdID: "600015"
        },
        function(response) {
          if (response.errcode == 0) {
            _this.exportCsvSrc = response.errinfo;
            _this.exportCsvName = response.errinfo.split("/").pop();
            _this.showExportExtInfo = true;
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    //导出基本信息
    exportBasicsInfo() {
      utils.post(
        "mx/userinfo/ExportCsv",
        {
          cmdID: "600014"
        },
        function(response) {
          if (response.errcode == 0) {
            _this.BasicsSrc = response.errinfo;
            _this.BasicsName = response.errinfo.split("/").pop();
            _this.showExportBasicsInfo = true;
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    //修改用户(row)
    userEdit() {
      this.$store.state.tabv = "v1";
      this.$store.state.headerText = this.pageTxt.tips[2];
      this.$store.state.creatAndEdit = true;
      this.$store.state.editBack = "/message/user";
      this.$router.replace({ path: "/message/userEdit/mess" });
    },
    userEkey() {
      this.$store.state.tabv = "v2";
      this.$store.state.headerText = this.pageTxt.tips[2];
      this.$store.state.creatAndEdit = true;
      this.$store.state.editBack = "/message/user";
      this.$router.replace({ path: "/message/userEdit/mess" });
    },
    userComm(){
      this.$store.state.tabv = "v3";
      this.$store.state.headerText = this.pageTxt.tips[2];
      this.$store.state.creatAndEdit = true;
      this.$store.state.editBack = "/message/user";
      this.$router.replace({ path: "/message/userEdit/mess" });
    },
    //删除用户(row)
    showPromptBox() {
      utils.hints({
        txt: pageTxt.tips[3],
        yes: _this.userDel,
        now: function() {
          _this.deleteSendDown(_this.$store.state.transferEditID);
        },
        btn: 3
      });
    },
    userDel() {
      utils.post(
        "mx/userinfo/delete",
        {
          cmdID: "600005",
          operator: "admin",
          userID: _this.$store.state.transferEditID
        },
        function(response) {
          if (response.errcode == 0) {
            _this.renderDate(0);
            utils.weakTips(response.errinfo);
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    //修改密码(row)
    eidtPasswd() {
      this.$store.state.passShow = true;
    },
    //分页
    handleSizeChange: function(size) {
      this.pageSize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.renderDate(0);
    },
    currentRow: function(e) {
      this.$store.state.transferEditID = e.userID;
    },
    //数据更新
    renderDate(type) {
      utils.post(
        "mx/userinfo/queryLists",
        {
          cmdID: "600001",
          userID: _this.userParam.id,
          userName: _this.userParam.name,
          pageSize: _this.pageSize,
          currentPage: _this.currentPage,
          type: type
        },
        function(response) {
          if (response.errcode == 0) {
            if (response.totalPage < _this.currentPage) {
              _this.currentPage = response.totalPage;
              _this.renderDate(type);
            } else {
              _this.userData = response;
            }
          }
        }
      );
    }
  },
  //初始化数据
  created() {
    _this = this;
    this.renderDate(0);
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
.btnBox{font-size: 14px; color: #5c759d; margin-top: 10px; margin-bottom: 10px;}
.btnBox div{margin-right: 35px; cursor: pointer; display: inline-block;}
.btnBox > div > span{margin-left: 4px; line-height: 30px; height: 30px}
._zero > div{display: inline-block; margin-right: 14px; cursor: pointer;}
.Popup ._messaga1{margin-top: 40px;margin-left: 40px;text-align: left;}
.Popup ._messaga1_info{margin-left: 125px;margin-top: 15px;line-height: 20px;}
.Popup_input{width: 360px;margin-left: 18px;}
.Popup .info_button1{text-align: left;margin-left: 165px;margin-top: 40px;}
.Popup_return{margin-left: 40px;}
.Popup .red{color:#FF6B6B;}
</style>
<style>
._whellError #table_header .l1{font-size: 14px;font-weight: bold} 
</style>