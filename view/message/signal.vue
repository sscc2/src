<template>
<div>
	<div class='header'>
			<span class='header_txt'>通信关系</span>
	</div>

  <div class="signal">
		<div class="userH">
			<span class="txt">{{pageTxt.signal[0]}}：</span>
			<el-select class="input_normal" v-model="searchInfo.bizType" placeholder="请选择">
				<el-option v-for="item in options1" :label="item.name" :key="item.id"  :value="item.id"></el-option>
			</el-select>
			<span class="txt1">{{pageTxt.signal[1]}}：</span>

     <el-autocomplete  @input='autoInput1' class="input_normal" v-model="idName1" :fetch-suggestions="fetch1" 
				:trigger-on-focus="false" @select="idSelect1">
				<div slot-scope="{item}">
					<span class="name">{{item.userID}}</span>
				    <span class="addr">({{item.userName}})</span>
				</div>
			</el-autocomplete>

			<span class="txt1">{{pageTxt.signal[2]}}：</span>
      <el-autocomplete  @input='autoInput2' class="input_normal" v-model="idName2" :fetch-suggestions="fetch2" 
				:trigger-on-focus="false" @select="idSelect2">
				<div slot-scope="{item}">
					<span class="name">{{item.userID}}</span>
				    <span class="addr">({{item.userName}})</span>
				</div>
		</el-autocomplete>
			<el-button type="primary"  @click='search' class="btn">{{pageTxt.signal[3]}}</el-button>
		</div>

		<div class="btnBox">
			<div @click="showCreate"><img src="@/img/creatico.png"><span>{{pageTxt.signal[4]}}</span></div>
			<div @click="fn"><img src="@/img/deletico.png"><span>{{pageTxt.signal[5]}}</span></div>
			<div @click=""><img src="@/img/creatico.png"><span>批量导出通信关系</span></div>
		</div>

		<el-table :data="list.lists"  tooltip-effect="dark" @current-change="currentRow" @selection-change="selectionRow" highlight-current-row>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="typeStr" label="业务类型" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userID1" label="用户ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName1" label="用户名称" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userID2" label="用户ID" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName2" label="用户名称" show-overflow-tooltip></el-table-column>
			<el-table-column label="操作" width="70" show-overflow-tooltip>
				<div slot-scope="scope" class="_zero">
					<img @click="showPromptBox" src="@/img/deleticos.png">
				</div>
			</el-table-column>
		</el-table>

		<div class="_pagination"  v-show="list.totalPage>0">
      <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" background layout="prev, pager, next, jumper" :page-count="list.totalPage" :page-size="20"></el-pagination>
      <div class="rightTxt">共{{list.totalSize}}条数据</div>
    </div> 
		
		<el-dialog width='620px' :title="pageTxt.dialog[0]" :visible.sync="dialogAdd">
			<ul class="_dialog">
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[1]}}</p>
					</div>
					<div class="rightBox">
						<el-select  class="input_normal" v-model="creatInfo.bizType" placeholder="请选择">
							<el-option v-for="item in optionsCreat" :label="item.name" :key="item.id"  :value="item.id">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[2]}}</p>
					</div>
					<div class="rightBox">
						  <el-select class="input_normal" v-model="creatInfo.user" filterable placeholder="请选择" @change="changeCreatinfo">
                <el-option v-for="item in options2" :key="item.userName" :label="item.userID" :value="item.userID">
                </el-option>
              </el-select>
					</div>
				</li>
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.dialog[3]}}</p>
					</div>
					<div class="rightBox">
				<el-select class="input_normal"  v-model="creatInfo.other" multiple filterable allow-create default-first-option placeholder="请选择">
                	<el-option  v-for="item in options3" :key="item.userName" :label="item.userID" :value="item.userID"></el-option>  
            	</el-select>
						<p class="txt" @click="clear">{{pageTxt.dialog[4]}}</p>
					</div>
				</li>
			</ul>
			<div class="bottom_btn">
			    <el-button @click="dialogAdd = false">{{pageTxt.dialog[6]}}</el-button>
			    <el-button type="primary" @click="submit">{{pageTxt.dialog[5]}}</el-button>
			</div>
		</el-dialog>
	</div>

</div>	
</template>

<script>
import utils from "@/libs/utils.js";
import observer    from '@/libs/observer.js';
import globalVar   from '@/libs/globalVar.js';

var pageTxt= {
    tips: {
      user: "请在列表中选择一条记录！",
      del: "确认要删除该记录吗？",
      err: "请选择用户和对端用户！"
    },
    signal: [
      "业务类型 ",
      "用户ID",
      "用户ID",
      "查询",
      "创建通信关系",
      "删除通信关系",
      "业务类型",
      "操作"
    ],
    dialog: [
      "创建通信关系",
      "业务类型 ：",
      "用户ID ：",
      "用户ID ：",
      "",
      "提交",
      "返回"
    ]
  };

var autoTime1, isInput1=false,autoTime2, isInput2=false,options4;

function autoInput(str, cb){
		if(!str) return;
		utils.getUserid(str, function(data){
			var i,len = data.length,tem=[];
			for (i = 0; i < len; i++) {
				if(data[i].label.indexOf(str)!=-1) tem.push(data[i]);
			}
			cb(tem);
		});
	}

export default {
  name: "mess_signal",
  data() {
    return {
      idName1: '',
      userID1: '',
      idName2: '',
      userID2: '',
      searchInfo: { bizType: "", userID1: "", userID2: ""  },
      creatInfo: { bizType: "", user: "", other: [] },
      options1:[{userID:'0',userID:'1aaa'},{userID:'1',userID:'2aaa'}],
      options2:[{userID:'0',userID:'1aaa'},{userID:'1',userID:'2aaa'}],
      options3:[],
      optionsCreat:[],
      restaurants: [],
      userOption: [],
      otherOption: [],
      selects: [],
      pageSize:"20",
      currentPage:"1",
      dialogAdd: false,
      state1: "",
      row: "",
      pageTxt,     
      list: [],
    };
  },
  methods: {
    fetch1(str, cb){
      clearTimeout(autoTime1);
      autoTime1 = setTimeout(autoInput, 300, str, cb);
    },
    idSelect1(item){
      isInput1 = false;
      this.userID1 = item.userID;
      this.idName1 = item.userID+'('+item.userName+')';
    },
    autoInput1(){
      isInput1 = true;
    },

    fetch2(str, cb){
      clearTimeout(autoTime2);
      autoTime2 = setTimeout(autoInput, 300, str, cb);
    },
    idSelect2(item){
      isInput2 = false;
      this.userID2 = item.userID;
      this.idName2 = item.userID+'('+item.userName+')';
    },
    autoInput2(){
      isInput2 = true;
    },
    // 查询
    search() {
      var _this = this;
      utils.post(
        "/mx/userComm/query",
        {
          cmdID: "600031",
          bizType: _this.searchInfo.bizType,
          userID1: isInput1?_this.idName1: _this.userID1,
          userID2: isInput2?_this.idName2: _this.userID2,
          pageSize: _this.pageSize,
          currentPage: _this.currentPage
        },
        function(response) {
          _this.list = as(response);
          if(response.totalPage<_this.currentPage){
            utils.post(
            "/mx/userComm/query",
            {
              cmdID: "600031",
              bizType: _this.searchInfo.bizType,
              userID1: isInput1?_this.idName1: _this.userID1,
              userID2: isInput2?_this.idName2: _this.userID2,
              pageSize: _this.pageSize,
              currentPage: response.totalPage
            },
            function(response){
              _this.list = as(response);
              }
            )
          }
        }
      );
    },
    // 创建
    showCreate(){
      this.dialogAdd=true;
      this.creatInfo.user= "";
      this.creatInfo.other = [];
    },
    submit() {
      var _this = this;
      utils.post(
        "/mx/userComm/add",
        {
          cmdID: 600032,
          operator: "admin",
          bizType: _this.creatInfo.bizType,
          userID1: _this.creatInfo.user,
          lists: _this.creatInfo.other
        },
        function(response) {
          if (response.errcode == 0) {
            _this.renderData()
            utils.weakTips(response.errinfo);
          }else{
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    changeCreatinfo(){
      var options5=[].concat(options4);
      for(var i=0; i<options5.length; i++){
        if(options5[i].userID==this.creatInfo.user){
           console.log(options5[i])
           options5.splice(i,1);
          break;
        }
      };
      this.options3=options5
    },
    // 刪除通信关系
    fn() {
      if (this.selects.length != 1) {
        utils.weakTips("请在列表中选择一条记录！") ;    
      } else {
        var _this=this
        utils.hints({
          txt:"是否确定删除该用户记录",
          yes:_this.delUser,
          btn: 2
        })
      }
    }, 
    delUser() {
        var _this = this;
        utils.post(
          "mx/userComm/delete",
          {
            cmdID: "600033",
            operator: "admin",
            bizType: _this.selects[0].bizType,
            userID1: _this.selects[0].userID1,
            userID2: _this.selects[0].userID2
          },
          function(response) {
            if (response.errcode == 0) {
              _this.renderData();
              utils.weakTips(response.errinfo);
            }else{
              utils.weakTips(response.errinfo);
            }
          }
        );    
    },
    // 刪除通信关系(row)
    showPromptBox() {
      var _this=this
        utils.hints({
          txt:"是否确定删除该用户记录",
          yes:_this.delUser1,
          btn: 2
        })
    },
    delUser1(index, rows) {
      var _this = this;
      utils.post(
        "mx/userComm/delete",
        {
          cmdID: 600033,
          operator: "admin",
          bizType: _this.row.bizType,
          userID1: _this.row.userID1,
          userID2: _this.row.userID2
        },
        function(response) {
          if (response.errcode == 0) {
            _this.renderData();
            utils.weakTips(response.errinfo);  
          }else{
            utils.weakTips(response.errinfo);
          } 
        }
      );
    },
    clear(e) {
      this.creatInfo.other = [];
    },
    currentRow: function(e) {
      this.row = e;
    },
    selectionRow(val) {
      this.selects = val;
    },
    // 分页
    currentPagefn: function(e) {
      this.currentPage=e
    },
    handleSizeChange: function(size) {
      this.pageSize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      var _this = this;
      _this.renderData();
    },
    // 更新数据
    renderData(){
        var _this=this
        utils.post(
         "mx/userComm/query",
        {
        cmdID: "600031",
        bizType: _this.searchInfo.bizType,
        userID1: isInput1?_this.idName1: _this.userID1,
        userID2: isInput2?_this.idName2: _this.userID2,
        pageSize: _this.pageSize,
        currentPage: _this.currentPage,
        },
        function(response) {
          if(response.totalPage<_this.currentPage){
              utils.post(
              "mx/userComm/query",
              {
              cmdID: "600031",
              bizType: _this.searchInfo.bizType,
              userID1: isInput1?_this.idName1: _this.userID1,
              userID2: isInput2?_this.idName2: _this.userID2,
              pageSize: _this.pageSize,
              currentPage: response.totalPage,
              },
              function(response){
                _this.list = as(response);
              }
            )
          }else{
            _this.list = as(response);
          } 
        }
      );
    }   
  },
  // 初始化数据
  created() {
     this.searchInfo.bizType="-1";
     this.creatInfo.bizType="0";
     var _this=this;
     utils.post(          
      "mx/dict/query",
      {
        cmdID: "600000",
        language: "0",
        type: "3"
      },
      function(response) {
        _this.options1 = response.lists;
        _this.options1.unshift({"id":"-1","name":"全部"});
      }
    );
     utils.post(          
      "mx/dict/query",
      {
        cmdID: "600000",
        language: "0",
        type: "3"
      },
      function(response) {
        _this.optionsCreat=response.lists;
      }
    );
    utils.post(
      "mx/userComm/query",
      {
        cmdID: "600031",
        bizType: "-1",
        userID1: "",
        userID2: "",
        pageSize: _this.pageSize,
        currentPage: _this.currentPage,
      },
      function(response) {
        _this.list = as(response);
      }
    );
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
        _this.options2 = response.lists;
        options4=[].concat( _this.options2)
      }
    );
  }, 
}
function as(data){
  var arr = data.lists,obj;
  for (var i = 0; i < arr.length; i++) {
    obj = arr[i];
    switch (obj.bizType) {
        case 0:
        obj.typeStr = '三方存管'
        break;
        case 10:
        obj.typeStr = '银期转账'
        break;
        case 11:
        obj.typeStr = '银基转账'
        break;
        case 12: 
        obj.typeStr = '资金划拨'
        break;
        case 13:
        obj.typeStr = '信证报盘'
        break;
        case 14:
        obj.typeStr = '电子对账'
        break;
        case 15:
        obj.typeStr = '融资融券'
        break;
        case 16:
        obj.typeStr = '基金盘后'
        break;
        case 17:
        obj.typeStr = '转融通'
        break;
        case 18:
        obj.typeStr = 'B转H'
        break;
        case 19:
        obj.typeStr = '交叉销售'
        break;
        case 20:
        obj.typeStr = '报价回购'
        break;
        case 21:
        obj.typeStr = '个股期权'
        break;
        case 22:
        obj.typeStr = 'FISP'
        break;
        case 23:
        obj.typeStr = '私幕转报'
        break;
        case 24:
        obj.typeStr = '云证通'
        break;
        case 26:
        obj.typeStr = '基金时实业务'
        break;
        case 27:
        obj.typeStr = '基金费用对账'
        break;
      default:  
    }
  }
  return data;

}
var idList = [];
	function useridList(){
		idList = globalVar.get('useridList');
		var call = function(master, list){
			if(master != 'useridReady') return;
			observer.delBinding('useridReady', call);
			idList = list; call = null;
		}
		if(!idList.length) observer.addBinding('useridReady', call);
	}
</script>

<style scoped="scoped">
.user *{vertical-align: middle;}
.userH .el-input{width: 160px; height: 30px; margin-right: 10px;}
.txt{font-size: 13px; color: #666666;}
.btnBox{margin-bottom: 10px; margin-top: 18px; font-size: 13px; color: #5c759d; overflow: hidden;}
.btnBox div{float: left; cursor: pointer; margin-left: 30px;}
.btnBox span{margin-left: 5px;}
.btnBox div:nth-child(1){margin-left: 0;}
._zero > img{cursor: pointer;}
.sel{width: 350px; line-height: 40px;}
.leftBox{height: 30px;}
.sel[data-v-50d0771e]{width: 202px;} 
.delInfo{width: 328px;height: 132px;background-color: #262626;border-radius: 8px;margin: 0 auto;opacity:0.7;position: relative;margin-top: -15%;z-index: 101;} 
.delInfo_txt{font-size: 14px;color:#fff;display: block;text-align:center;line-height: 132px;} 
.txt1{margin-left: 30px;font-size: 13px; color: #666666;}
.signal{margin: 22px;}
.btn{margin-left: 35px;}
.input_normal{width: 250px;height: auto;}
</style>
<style>
	.signal .input_normal span{white-space: normal;word-break: keep-all;display: inline-block;}
</style>



