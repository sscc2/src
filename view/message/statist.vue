<template>
  <div>
    <div class='header'>
      <span class='header_txt'>{{pageTxt.label[0]}}</span>
    </div>    
    <div class="statist">
        <header>
          <div class="statist_herader">
            <span>{{pageTxt.label[1]}}</span>
            <el-input class='input_normal' v-model="modeType.user"></el-input>
            <span class="txt ml" >{{pageTxt.label[2]}}</span>
            <el-input class='input_normal' v-model="modeType.userType"></el-input>
            <span class="txt ml">{{pageTxt.label[3]}}</span>
            <el-radio v-model="statisticalMethod" label="0">{{pageTxt.label[4]}}</el-radio>
            <el-radio v-model="statisticalMethod" label="1">{{pageTxt.label[5]}}</el-radio>					
          </div>
          <div class="lined">
            <span class="txt">{{pageTxt.label[6]}}</span>
            <el-radio v-model="timeMethod" label="0" @change="getTimeFn">{{pageTxt.label[7]}}</el-radio>
            <el-radio v-model="timeMethod" label="1" @change="getTimeFn">{{pageTxt.label[8]}}</el-radio>
            <el-radio v-model="timeMethod" label="2" @change="getTimeFn">{{pageTxt.label[9]}}</el-radio>
            <el-radio v-model="timeMethod" label="3" @change="getTimeFn">{{pageTxt.label[10]}}</el-radio>
            <el-date-picker class="date_picker" :disabled="timeMethod!=3"  value-format="yyyy-MM-dd HH:mm:ss" :default-time="['12:00:00', '08:00:00']" format="yyyy-MM-dd HH:mm:ss" v-model="search" type="datetimerange" :range-separator="pageTxt.label[11]" :start-placeholder="pageTxt.label[12]" :end-placeholder="pageTxt.label[13]">
            </el-date-picker>				
            <el-button @click="searchFn" type="primary" class="searchBtn" >{{pageTxt.label[14]}}</el-button>        		
            <el-button @click="exportFn" type="primary" class="exportFn">{{pageTxt.label[15]}}</el-button>
          </div>
        </header>
        <el-table highlight-current-row :data="data.lists">
          <el-table-column width="50" label=" " type="index"></el-table-column>
          <el-table-column prop="operationTime" width="170" :label="pageTxt.table[0]" show-overflow-tooltip></el-table-column>
          <el-table-column prop="operationType" width="180" :label="pageTxt.table[1]" show-overflow-tooltip></el-table-column>
          <el-table-column prop="operator" width="100" :label="pageTxt.table[2]" show-overflow-tooltip></el-table-column>
          <el-table-column prop="operatorRole" width="100" :label="pageTxt.table[3]" show-overflow-tooltip></el-table-column>			
          <el-table-column prop="errorCode" width="100" :label="pageTxt.table[4]" show-overflow-tooltip></el-table-column>
          <el-table-column prop="errorInfo" :label="pageTxt.table[5]" show-overflow-tooltip></el-table-column>
          <el-table-column prop="errorInfo" width="55" :label="pageTxt.table[6]" show-overflow-tooltip>
            <div slot-scope="scope" class="_zero">
              <el-tooltip :content="pageTxt.table[7]" placement="bottom" effect="light"><div @click='showParticularsFn(scope.row)' v-if="data.lists[scope.$index].uuid != null"><img src="@/img/user/examine.png"></div></el-tooltip>
            </div>
          </el-table-column>
        </el-table>	
        <div class="Popup" v-show="showParticulars">
          <div class="_panle">
            <div><p id="_title">{{pageTxt.table[6]}}</p>
              <img id="_close" src="@/img/close.png" @click="showParticulars=false">
            </div>
            <div class="_content">
              <el-table highlight-current-row :data="responseDate" >
                <el-table-column prop="serviceID"  label="serviceID" show-overflow-tooltip></el-table-column>
                <el-table-column prop="errcode"  label="errcode" show-overflow-tooltip></el-table-column>
                <el-table-column prop="errinfo"  label="errinfo" show-overflow-tooltip></el-table-column>
              </el-table>	
            </div>
          </div> 
        </div>		
        <div class="_pagination" v-if="data.totalSize>pageSize">
          <el-pagination @current-change='handleCurrentChange' background layout="prev, pager, next, jumper" @size-change="handleSizeChange" :page-size="pageSize" :total="data.totalSize"></el-pagination>
          <div class="rightTxt">共{{data.totalSize}}条数据</div>
        </div>
        <div class="onePage" v-else-if="data.totalSize>0&&data.totalSize<=pageSize">已显示全部{{data.totalSize}}个数据</div>
    </div>
  </div>	
</template>
<script>
import utils from "@/libs/utils.js";
import lang from '@/language/lang.js';

var pageTxt = lang.statist,_this;

export default {
  name: "message_statist",
  data() {
    return {
      pageTxt,
      search: "",      
      timeMethod: "",
      statisticalMethod: "",
      modeType: { user: "", userType: "" },
      data: {/* lists: [{ operationTime: "2018-01-01" }] */},
      showParticulars: false,
      responseDate: [],
      pageSize: 20,
      currentPage: 1,
    };
  },
  methods: {
    //查询
    searchFn() {
      this.renderDate();
    },
    //导出报表
    exportFn() {
      utils.post(
        "mx/operationRecording/query",
        {
          cmdID: "600091",
          operator: _this.modeType.user,
          operationType: _this.modeType.userType,
          operationBeginTime: _this.search ? _this.search[0] : "",
          operationEndTime: _this.search ? _this.search[1] : "",
          sequence: _this.statisticalMethod,
          type: 1,
          pageSize: _this.pageSize,
          currentPage: _this.currentPage
        },
        function(response) {
          if (response.errcode == 0) {
            window.location.href = response.errinfo;
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    //详情
    showParticularsFn(row) {
      this.showParticulars = true;
      utils.post(
        "mx/batchDispatch/queryBatchDispatchResponse",
        {
          cmdID: "600073",
          uuid: row.uuid,
          lastQueryFlag: 1,
          type: 0
        },
        function(response) {
          if (response.errcode == 0) {
            _this.responseDate = response.lists;
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    //获得指定时间
    getTimeFn() {
      if (this.timeMethod == 0) {
        var toDate = new Date();
        toDate = this.transferDate(toDate);
        this.search = [toDate + " 00:00:00", toDate + " 23:59:59"];
      }
      if (this.timeMethod == 1) {
        var beforeTime = new Date();
        beforeTime = this.transferDate(beforeTime);
        var nowTime = new Date();
        nowTime.setDate(nowTime.getDate() - 7);
        nowTime = this.transferDate(nowTime);
        this.search = [nowTime + " 00:00:00", beforeTime + " 23:59:59"];
      }
      if (this.timeMethod == 2) {
        var beforeTime = new Date();
        beforeTime = this.transferDate(beforeTime);
        var nowTime = new Date();
        nowTime.setDate(nowTime.getDate() - 30);
        nowTime = this.transferDate(nowTime);
        this.search = [nowTime + " 00:00:00", beforeTime + " 23:59:59"];
      }
      if (this.timeMethod == 3) {
        this.search = "";
      }
    },
    //转换日期格式
    transferDate(beforeTime) {
      var year = beforeTime.getFullYear(),
          month = beforeTime.getMonth() + 1,
          date = beforeTime.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      return year + "-" + month + "-" + date;
    },
    //分页
    handleSizeChange(size) {
      this.pageSize = size;
    },
    handleCurrentChange(current) {
      this.currentPage = current;
      this.renderDate();
    },
    //数据更新
    renderDate() {
      utils.post(
        "mx/operationRecording/query",
        {
          cmdID: "600091",
          operator: _this.modeType.user,
          operationType: _this.modeType.userType,
          operationBeginTime: _this.search ? _this.search[0] : "",
          operationEndTime: _this.search ? _this.search[1] : "",
          sequence: _this.statisticalMethod,
          type: 0,
          pageSize: _this.pageSize,
          currentPage: _this.currentPage
        },
        function(response) {
          if (response.errcode == 0) {
            if (response.totalPage < _this.currentPage ) {
              _this.currentPage = response.totalPage;
              _this.renderDate();
            } else {
              _this.data = response;
              for (var i = 0; i < _this.data.lists.length; i++) {
                if (_this.data.lists[i].operatorRole == 1) {
                  _this.data.lists[i].operatorRole = _this.pageTxt.tips[0];
                } else {
                  _this.data.lists[i].operatorRole = _this.pageTxt.tips[1];
                }
              }
            }
          }
        }
      );
    }
  },
  //初始化数据
  created() {
    this.statisticalMethod = "0";
    this.timeMethod = "0";
    var toDate = new Date();
    toDate = this.transferDate(toDate);
    this.search = [toDate + " 00:00:00", toDate + " 23:59:59"];
    _this = this;
    _this.renderDate();
  }
};
</script>

<style scoped="scoped">
.statist{min-width: 1010px;}
.statist *{vertical-align: middle;}
.statist{padding: 20px;font-size: 14px; color: #666;}
.statist_herader{height: 30px;}
.statist .lined{margin-top: 20px;height: 30px;}
.lined .date_picker{margin-left: 30px;height: 30px;width: 360px;}
.lined {margin-bottom: 20px;}
.lined .searchBtn{margin-left: 35px;}
.ml{margin-left: 30px;}
.el-radio+.el-radio{margin-left: 18px;} 
._zero{cursor: pointer;}
.content{display: inline-block;font-size: 14px;margin-right: 40px; }
._content{margin-left: 40px; margin-top: 20px;width: 520px; height: 280px; overflow-y:auto; }
._panle{width: 600px; height: 410px;}
.exportFn{float: right;}
</style>