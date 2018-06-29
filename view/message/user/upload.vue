<template>
	<el-dialog class='upload' :title="pageTxt.lable[0]" width='600px' :visible.sync="imports">
		<el-upload class="uploadFile" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="1" :on-exceed="handleLimit"
			:on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
			<el-button slot="trigger" size="small" type="primary">{{pageTxt.lable[1]}}</el-button>
			<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">{{pageTxt.lable[2]}}</el-button>
		</el-upload>
		<p class="t2">{{pageTxt.lable[6]}}</p>
		<p class="t2">{{pageTxt.lable[5]}}</p>
		<div slot="footer" class="dialog-footer">
		    <el-button @click="imports = false">{{pageTxt.lable[3]}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
import kit from "@/libs/kit.js";
import utils from "@/libs/utils.js";
import observer from "@/libs/observer.js";

var pageTxt_cn = {
    tips: { sub: "确认批量导入用户扩展信息吗？" },
    lable: [
      "批量导入扩展信息",
      "选取文件",
      "上传到服务器",
      "返回",
      "批量导入路径：",
      "在输入框中填入扩展信息文件名",
      "请将扩展信息文件放到服务器路径：/home/ump/ump-server/confing/fdep/notice内;"
    ]
  },
  pageTxt_en = {};

var pageTxt = pageTxt_cn;
var data = {
  pageTxt,
  imports: false,
  fileList: []
};

observer.addBinding("messUpload", function(master, param) {
  if (master != "messUpload") return;
  data.imports = param;
});

export default {
  name: "mess_upload",
  data() {
    return data;
  },
  methods: {
    submitUpload() {
      var _this = this;
      _this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log("Remove", file, fileList);
    },
    handlePreview(file) {
      console.log("Preview", file);
    },
    handleLimit(files, fileList) {
    }
  }
};
</script>

<style scoped="scoped">
.txt{font-size: 16px;line-height: 40px;height: 40px;}
.uploadFile{margin-bottom: 20px;text-align: center;}
.t2{font-size: 14px;line-height: 1.2;}
</style>