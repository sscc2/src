<template>
	<el-dialog :title="pageTxt.lable[0]" width='620px' :visible.sync="isShow">
		<ul class="_dialog">
			<li>
				<div class="leftBox">
					<!-- <p class="txt">{{pageTxt.lable[1]}}</p> -->
					<p class="txt">{{pageTxt.lable[1]}}</p>
				</div><div class="rightBox">
					<el-input  v-model="this.$store.state.transferEditID"  :placeholder="pageTxt.lable[8]" disabled=""></el-input>
					<span class="txt red" v-show="err.id">{{pageTxt.tips.id}}</span>
				</div>
			</li>
			<li>
				<div class="leftBox">
					<p class="txt">{{pageTxt.lable[2]}}</p>
				</div>
				
				
				<div class="rightBox">
						<el-radio v-model="info.isModifyDefaultPasswd" :label="0">重置</el-radio>
  						<el-radio v-model="info.isModifyDefaultPasswd" :label="1">不重置</el-radio>
				</div>
			</li>
			<li>
				<div class="leftBox">
					<p class="txt">{{pageTxt.lable[3]}}</p>
				</div>
				
				<div class="rightBox">
					<el-input  v-model="info.npasswd"  :placeholder="info.isModifyDefaultPasswd?pageTxt.lable[8]:'111111'"  :disabled="info.isModifyDefaultPasswd==0"></el-input>
				</div>
			</li>
			<li>
				<div class="leftBox">
					<p class="txt">{{pageTxt.lable[10]}}</p>
				</div><div class="rightBox">
					<el-input v-model="info.again"  name='again' :placeholder="info.isModifyDefaultPasswd?pageTxt.lable[8]:'111111'"  :disabled="info.isModifyDefaultPasswd==0"></el-input>
					<span class="txt red" v-show="err.again">{{pageTxt.tips.again}}</span>
				</div>
			</li><li>
				<div class="leftBox">
					<p class="txt">{{pageTxt.lable[4]}}</p>
				</div><div class="rightBox">
					<el-input  name='assessor' v-model="info.assessor" :placeholder="pageTxt.lable[8]"></el-input>
					<span class="txt red" v-show="err.assessor">{{pageTxt.tips.assessor}}</span>
				</div>
			</li><li>
				<div class="leftBox">
					<p class="txt">{{pageTxt.lable[5]}}</p>
				</div><div class="rightBox">
					<el-input name='pass' v-model="info.pass" :placeholder="pageTxt.lable[8]"></el-input>
					<span class="txt red" v-show="err.pass">{{pageTxt.tips.pass}}</span>
				</div>
			</li>
		</ul>
		<div slot="footer" class="dialog-footer">
		    <el-button @click="isShow = false">{{pageTxt.lable[7]}}</el-button>
		    <el-button type="primary" @click="submit">{{pageTxt.lable[6]}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
import kit from "@/libs/kit.js";
import utils from "@/libs/utils.js";
import observer from "@/libs/observer.js";
import md5 from "@/libs/md5.js";

var pageTxt_cn = {
    tips: {
      id: "请填写用户ID",
      usernam: "请填写用户名",
      npasswd: "请输入新密码",
      again: "重复新密码",
      assessor: "请填写审核人",
      pass: "请填写复核密码"
    },
    lable: [
      "修改密码",
      "用户ID：",
      "是否重置默认密码：",
      "新密码：",
      "审核人：",
      "审核pass：",
      "提交",
      "返回",
      "必填项...",
      "选择日期",
      "确认："
    ],
    error: [
      "请选择软加密开始时间",
      "束时间不能小于开始时间",
      "请填写复核操作员",
      "请填写复核密码"
    ]
  }

var pageTxt = pageTxt_cn;

var data = {
  pageTxt,
  isShow: true,
  msg: "",
  info: { id: "", npasswd: "", isModifyDefaultPasswd: 0 },
  err: {
    id: false,
    usernam: false,
    npasswd: false,
    again: false,
    assessor: false,
    pass: false
  }
};

export default {
  name: "mess_userPass",
  data() {
    return data;
  },
  methods: {
    submit() {
      if (this.info.isModifyDefaultPasswd == 0) {
        this.info.npasswd = md5.hex_md5("111111").substr(8, 16);
      } else {
        this.info.npasswd = md5.hex_md5(this.info.npasswd).substr(8, 16);
      }
      var _this = this;
      utils.post(
        "mx/userpasswd/modify",
        {
          cmdID: 600009,
          operator: "admin",
          userID: _this.$store.state.transferEditID,
          isModifyDefaultPasswd: _this.info.isModifyDefaultPasswd,
          userPasswd: _this.info.npasswd

        },
        function(response) {
          if (response.errcode == 0) {
            alert(response.errinfo);
          } else {
            alert("失败");
          }
        }
      );
    },
    check(e) {
      var key, el;
      el = e.type == "blur" ? e.target : e.$el.children[0];
      key = el.name;
      console.log();
      if (!this.info[key]) {
        this.err[key] = true;
      } else this.err[key] = false;
    }
  },
  created() {
    this.info.id = this.$store.state.transferEditID;
  }
};
</script>

<style scoped="scoped">
.txt {
  font-size: 16px;
  line-height: 40px;
  height: 40px;
}
.userPass {
  width: 600px;
  margin: 0 auto;
  border: 1px solid #dcdfe6;
}
.input {
  width: 180px;
}
.red {
  color: #f56c6c;
  margin-left: 10px;
}
</style>