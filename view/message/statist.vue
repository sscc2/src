<template>
<div>
	<div class='header'>
		<span class='header_txt'>{{pageTxt.lable1[0]}}</span>
	</div>
	
	<div class="statist">
		<div>
			<header>
				<div class='title'><span>{{pageTxt.lable1[1]}}</span></div>

				<div class="lined">
					<span>{{pageTxt.lable1[2]}}</span>
					<el-input class='input_normal' v-model="modeType.user"></el-input>
					<span class="txt t1" >{{pageTxt.lable1[3]}}</span>
					<el-input class='input' v-model="modeType.userType"></el-input>
					<span class="txt t1">{{pageTxt.lable1[4]}}</span>
					<el-radio v-model="statisticalMethod" label="0">{{pageTxt.lable1[5]}}</el-radio>
					<el-radio v-model="statisticalMethod" label="1">{{pageTxt.lable1[6]}}</el-radio>					
				</div>

				<div class="lined">
					<span class="txt">{{pageTxt.lable1[7]}}</span>
					<el-radio v-model="timeMethod" label="0" @change="getTimeFn">{{pageTxt.lable1[8]}}</el-radio>
					<el-radio v-model="timeMethod" label="1" @change="getTimeFn">{{pageTxt.lable1[9]}}</el-radio>
					<el-radio v-model="timeMethod" label="2" @change="getTimeFn">{{pageTxt.lable1[10]}}</el-radio>
					<el-radio v-model="timeMethod" label="3" @change="getTimeFn">{{pageTxt.lable1[11]}}</el-radio>
          <el-date-picker class="date_picker" :disabled="timeMethod!=3"  @change="changeDate" :clearable=false format="yyyy-MM-dd" v-model="search" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>				
          <el-button class="searchBtn" type="primary" @click="searchFn">{{pageTxt.lable1[14]}}</el-button>
					<a :href="operationRecordingSrc" @click="exportFn"><el-button  type="primary">{{pageTxt.lable1[15]}}</el-button></a>			
				</div>

			</header>

			<el-table highlight-current-row  @current-change="currentRow2" :data="data.lists"  >
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="operator" :label="pageTxt.lable2[0]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="operatorRole" :label="pageTxt.lable2[1]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="operationType" :label="pageTxt.lable2[2]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="operationTime" :label="pageTxt.lable2[3]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="state" :label="pageTxt.lable2[0]" show-overflow-tooltip></el-table-column>
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
    "",
    "至",
    "查询",
    "导出报表"
  ],
  lable2: ["操作员", "操作员角色", "操作类型", "操作时间"]
};

var pageTxt = pageTxt_cn;

export default {
  name: "message_statist",
  data() {
    return {
    search:[],
    pageTxt,
	  currentPage: 1,
	  pageSize: 20,
	  timeMethod: "",
    statisticalMethod: "",
    operationRecordingSrc: "",
    modeType: { user: "", userType: "", businessType: "" },
	  data: {
        // lists: [{ operator: "test01", operationType: "01" }],
        // totalSize: "12"
      },    
    };
  },
  methods: {
    searchFn() {
      var _this = this;
      utils.post(
        "mx/operationRecording/query",
        {
          cmdID: "600091",
          operator: _this.modeType.user,
          operationType: _this.modeType.userType,
          operationBeginTime: _this.search[0] + " 00:00:00",
          operationEndTime: _this.search[1] + " 23:59:59",
          sequence: _this.statisticalMethod,
          type: 0,
          pageSize: 20,
          currentPage: 1
        },
        function(response) {
          if (response.errcode == 0) {
            _this.data = response;
          }
        }
      );
    },
    // 导出报表
    exportFn() {
      var _this = this;
      utils.post(
        "mx/operationRecording/query",
        {
          cmdID: "600091",
          operator: _this.modeType.user,
          operationType: _this.modeType.userType,
          operationBeginTime: _this.search[0] + " 00:00:00",
          operationEndTime: _this.search[1] + " 23:59:59",
          sequence: _this.statisticalMethod,
          type: 1,
          pageSize: 20,
          currentPage: 1
        },
        function(response) {
          if (response.errcode == 0) {
            _this.operationRecordingSrc=response.errinfo;
          }else{
			      utils.weakTips(response.errinfo);
		      }
        }
      );
    },
    getTimeFn() {
      if (this.timeMethod == 0) {
        var toDate = new Date();
        toDate = this.transferTime(toDate);
        this.search = [toDate, toDate]
      }
      if (this.timeMethod == 1) {
        var beforeTime = new Date();
        beforeTime = this.transferTime(beforeTime);
        var nowTime = new Date();
        nowTime.setDate(nowTime.getDate() - 7);
        nowTime = this.transferTime(nowTime);
        this.search = [nowTime , beforeTime]
      }
      if (this.timeMethod == 2) {
        var beforeTime = new Date();
        beforeTime = this.transferTime(beforeTime);
        var nowTime = new Date();
        nowTime.setDate(nowTime.getDate() - 30);
        nowTime = this.transferTime(nowTime);
        this.search = [nowTime , beforeTime]
	   }
      if (this.timeMethod == 3) {
        this.search = ["",""]
      }
    },
    transferTime(beforeTime) {
      var year = beforeTime.getFullYear(),
        month = beforeTime.getMonth() + 1,
        date = beforeTime.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      var returnDate = year + "-" + month + "-" + date;
      return returnDate;
	},
	changeDate(){
    this.search[0] = this.transferTime(this.search[0]);
    this.search[1] = this.transferTime(this.search[1]);
	},
    currentRow2() {
  
    },

    handleSizeChange(size) {
      this.pageSize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
  created() {
    this.statisticalMethod = "0";
    this.timeMethod = "0";
    var toDate = new Date();
    toDate = this.transferTime(toDate);
    this.search = [toDate , toDate]
    var _this = this;
    utils.post(
      "mx/operationRecording/query",
      {
        cmdID: "600091",
        operator: _this.modeType.user,
        operationType: _this.modeType.userType,
        operationBeginTime: _this.search.start,
        operationEndTime: _this.search.end,
        sequence: 0,
        type: 0
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
.statist{padding: 22px; padding-top: 10px;}
.title{border-bottom: 1px solid #ebeff4;}
.title span{font-size: 16px; color: #333; line-height: 40px;}
.lined *{vertical-align: middle;}
.lined{margin-top: 15px; font-size: 14px; color: #666;}
.statist .input,.statist .picker{width: 200px;}
.t1{margin-left: 30px;}
.first_select{margin-left: 15px;}
.pagination{text-align: right; padding: 20px 0;}
.t{font-size: 20px; color: #409eff;}
.iconBtn{padding: 6px 10px; font-size: 20px;}
.el-select{width: 200px;}
.el-table{margin-top: 15px;}
.searchBtn{margin-left: 40px;}
.ver{margin: 10px 0;}
.date_picker{margin-left: 30px;height: 30px;width: 350px;}

</style>
