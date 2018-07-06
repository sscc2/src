<template>
<div>
	<div class='header'>
		<span class='header_txt'>{{pageTxt.lable1[0]}}</span>
	</div>
	
	<div class="statist">
		<div>
			<header>
				<div class="statist_herader">
					<span>{{pageTxt.lable1[2]}}</span>
					<el-input class='input_normal' v-model="modeType.user"></el-input>
					<span class="txt ml" >{{pageTxt.lable1[3]}}</span>
					<el-input class='input_normal' v-model="modeType.userType"></el-input>
					<span class="txt ml">{{pageTxt.lable1[4]}}</span>
					<el-radio v-model="statisticalMethod" label="0">{{pageTxt.lable1[5]}}</el-radio>
					<el-radio v-model="statisticalMethod" label="1">{{pageTxt.lable1[6]}}</el-radio>					
				</div>

				<div class="lined">
					<span class="txt">{{pageTxt.lable1[7]}}</span>
					<el-radio v-model="timeMethod" label="0" @change="getTimeFn">{{pageTxt.lable1[8]}}</el-radio>
					<el-radio v-model="timeMethod" label="1" @change="getTimeFn">{{pageTxt.lable1[9]}}</el-radio>
					<el-radio v-model="timeMethod" label="2" @change="getTimeFn">{{pageTxt.lable1[10]}}</el-radio>
					<el-radio v-model="timeMethod" label="3" @change="getTimeFn">{{pageTxt.lable1[11]}}</el-radio>
          <el-date-picker class="date_picker" :disabled="timeMethod!=3"  value-format="yyyy-MM-dd HH:mm:ss" :default-time="['12:00:00', '08:00:00']" format="yyyy-MM-dd HH:mm:ss" v-model="search" type="datetimerange" :range-separator="pageTxt.lable1[12]" :start-placeholder="pageTxt.lable1[13]" :end-placeholder="pageTxt.lable1[14]">
          </el-date-picker>				
          <el-button class="searchBtn" type="primary" @click="searchFn">{{pageTxt.lable1[15]}}</el-button>        		
          <el-button @click="exportFn" type="primary">{{pageTxt.lable1[16]}}</el-button>
				</div>
			</header>

			<el-table highlight-current-row :data="data.lists"  >
				<el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="operationTime" width="250" :label="pageTxt.lable1[20]" show-overflow-tooltip></el-table-column>
        <el-table-column prop="operationType" width="150" :label="pageTxt.lable1[19]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="operator" width="150" :label="pageTxt.lable1[17]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="operatorRole" width="150" :label="pageTxt.lable1[18]" show-overflow-tooltip></el-table-column>			
        <el-table-column prop="errorCode" width="150" :label="pageTxt.lable1[21]" show-overflow-tooltip></el-table-column>
        <el-table-column prop="errorInfo" :label="pageTxt.lable1[22]" show-overflow-tooltip></el-table-column>
			</el-table>			

			<div class="_pagination" v-show="data.totalPage>0">
			<el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" background layout="prev, pager, next, jumper" :page-count="data.totalPage" :page-size="20"></el-pagination>
			<div class="rightTxt">共{{data.totalSize}}条数据</div>
			</div>

		</div>
	</div>
</div>	

</template>
<script>
import utils from "@/libs/utils.js";

var pageTxt_cn = {
  lable1: [
    "稽核",
    "历史业务操作统计",
    "操作员：",
    "操作类型：",
    "排序方式：",
    "最近",
    "最早",
    "时间段：",
    "今天",
    "本周",
    "本月",
    "其他",
    "至",
    "开始时间",
    "结束时间",
    "查询",
    "导出报表",
    "操作员",
    "操作员角色",
    "操作类型",
    "操作时间",
    "操作错误码",
    "操作错误描述",
  ]
};

var pageTxt = pageTxt_cn,_this;

export default {
  name: "message_statist",
  data() {
    return {
      pageTxt,
      search: "",
      currentPage: 1,
      pageSize: 20,
      timeMethod: "",
      statisticalMethod: "",
      modeType: { user: "", userType: "" },
      data: {}
    };
  },
  methods: {
    // 查询
    searchFn() {
      utils.post(
        "mx/operationRecording/query",
        {
          cmdID: "600091",
          operator: _this.modeType.user,
          operationType: _this.modeType.userType,
          operationBeginTime: _this.search?_this.search[0]:'',
          operationEndTime: _this.search?_this.search[1]:'',
          sequence: _this.statisticalMethod,
          type: 0,
          pageSize: _this.pageSize,
          currentPage: _this.currentPage
        },
        function(response) {
          if (response.errcode == 0) {
            _this.data = response;
          } else {
            utils.weakTips(response.errinfo);
          }
        }
      );
    },
    // 导出报表
    exportFn() {
      utils.post(
        "mx/operationRecording/query",
        {
          cmdID: "600091",
          operator: _this.modeType.user,
          operationType: _this.modeType.userType,
          operationBeginTime: _this.search?_this.search[0]:'',
          operationEndTime: _this.search?_this.search[1]:'',
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
    // 获得指定时间
    getTimeFn() {
      if (this.timeMethod == 0) {
        var toDate = new Date();
        toDate = this.transferDate(toDate);
        this.search = [toDate+" 00:00:00", toDate+ " 23:59:59"];
      }
      if (this.timeMethod == 1) {
        var beforeTime = new Date();
        beforeTime = this.transferDate(beforeTime);
        var nowTime = new Date();
        nowTime.setDate(nowTime.getDate() - 7);
        nowTime = this.transferDate(nowTime);
        this.search = [nowTime+" 00:00:00", beforeTime+ " 23:59:59"];
      }
      if (this.timeMethod == 2) {
        var beforeTime = new Date();
        beforeTime = this.transferDate(beforeTime);
        var nowTime = new Date();
        nowTime.setDate(nowTime.getDate() - 30);
        nowTime = this.transferDate(nowTime);
        this.search = [nowTime+" 00:00:00", beforeTime+ " 23:59:59"];
      }
      if (this.timeMethod == 3) {
         this.search = ""
      }
    },
    // 转换日期格式
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
    // 转换时间格式
    // transferTime(beforeTime){
    //   var hours=beforeTime.getHours(),
    //       minutes=beforeTime.getMinutes(),
    //       seconds=beforeTime.getSeconds();
    //   if(hours<10){
    //     hours = "0" + hours;
    //   }
    //   if(minutes < 10){
    //     minutes = "0" +minutes;
    //   }
    //   if(seconds < 10){
    //     seconds = "0" +seconds
    //   }
    //   return hours + ":" + minutes + ":" + seconds
    // },
    // 自定义时间
    // changeDate() {
      // this.search[0] = this.transferDate(this.search[0]) + " " + this.transferTime(this.search[0]);
      // this.search[1] = this.transferDate(this.search[1]) + " " +this.transferTime(this.search[1]);
    // },

    // 分页
    handleSizeChange(size) {
      this.pageSize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    }
  },
  // 初始化数据
  created() {
    this.statisticalMethod = "0";
    this.timeMethod = "0";
    var toDate = new Date();
    toDate = this.transferDate(toDate);
    this.search = [toDate+" 00:00:00", toDate+" 23:59:59"];
    _this = this;
    utils.post(
      "mx/operationRecording/query",
      {
        cmdID: "600091",
        operator: _this.modeType.user,
        operationType: _this.modeType.userType,
        operationBeginTime: _this.search?_this.search[0]:'',
        operationEndTime: _this.search?_this.search[1]:'',
        sequence: _this.statisticalMethod,
        type: 0,
        pageSize: _this.pageSize,
        currentPage: _this.currentPage
      },
      function(response) {
        if (response.errcode == 0) {
          _this.data = response;
        }
      }
    );
  }
};
</script>

<style scoped="scoped">
.statist *{vertical-align: middle;}
.statist{padding: 20px;font-size: 14px; color: #666;}
.statist_herader{height: 30px;}
.statist .lined{margin-top: 20px;height: 30px;}
.lined .date_picker{margin-left: 30px;height: 30px;width: 360px;}
.lined {margin-bottom: 10px;}
.lined .searchBtn{margin-left: 35px;}
.ml{margin-left: 30px;}
.el-radio+.el-radio{margin-left: 18px;} 
</style>
