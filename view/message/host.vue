<template>
	<div>
		<div class='header'>
			<span class='header_txt'>{{pageTxt.label[0]}}</span>
		</div>
			<div class='host_btn'>
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
						<el-tab-pane :label="pageTxt.label[1]" name="first">
							<div class="switch_box">
								<span class='title_txt'><span class="red">*&nbsp;</span>{{pageTxt.label[2]}}</span>
								<el-switch v-model="switchValue1" @change="changeTextarea" :active-text="pageTxt.label[7]" active-color='#0DB9EB' :inactive-text="pageTxt.label[6]" inactive-color='#D7D8DA'></el-switch>
                <span class='prompt_txt'>{{pageTxt.label[9]}}</span>
							</div>
							<div class="content">
								<el-input id="textarea1" type="textarea" rows="18" v-model="textareaValue1" :readonly="!switchValue1"></el-input>
							</div>
							<button class="blueBtn" id="button1" @click="showReviewFn">{{pageTxt.label[3]}}</button>
						</el-tab-pane>		
						<el-tab-pane :label="pageTxt.label[4]" name="second">
							<div class="switch_box">
								<span class='title_txt'><span class="red">*&nbsp;</span>{{pageTxt.label[5]}}</span>
								<el-switch v-model="switchValue2"  @change="changeTextarea" :active-text="pageTxt.label[7]"  active-color='#0DB9EB' :inactive-text="pageTxt.label[6]" inactive-color='#D7D8DA'></el-switch>
                <span class='prompt_txt'>{{pageTxt.label[10]}}</span>
							</div>
							<div class="content">
								<el-input id="textarea2" type="textarea" rows="18" v-model="textareaValue2" :readonly="!switchValue2"></el-input>
							</div>
							<button class="blueBtn" id="button2" @click="showReviewFn">{{pageTxt.label[3]}}</button>
						</el-tab-pane>
            <div id="_review" v-show="showReview">
              <div class="_panle">
			          <div>
                  <p id="_title">{{pageTxt.popup[0]}}</p>
                  <img id="_close" src="@/img/close.png" @click="showReview=false" />
			          </div>
                <ul class="_messaga">
                  <li>
                    <label class="lab">{{pageTxt.popup[1]}}：</label>
                    <input id="_name" v-model="userName" class="inp" type="text" />
                  </li>
			            <li>
                    <label class="lab">{{pageTxt.popup[2]}}：</label>
                    <input id="_pass" v-model="passwd" class="inp" type="password" />
                  </li>
                </ul>
			          <div>
                  <button id="_yes" class="blueBtn" @click="subitHints">{{pageTxt.popup[3]}}</button>
                  <button id="_no" class="defBtn" @click="showReview=false">{{pageTxt.popup[4]}}</button>
                </div>
              </div>
            </div>
				</el-tabs>
			</div>				
	</div>
</template>

<script>
import utils from "@/libs/utils.js";
import lang from '@/language/lang.js';

var pageTxt = lang.host,_this;

export default {
  data() {
    return {
      pageTxt,
      userName:"",
      passwd:"",
      showReview:false,
      switchValue1: false,
      switchValue2: false,
      textareaValue1: "",
      textareaValue2: "",
      activeName: "first",
      hostType: 0
    };
  },
  methods: {
    //编辑
    showReviewFn() {
      var configinfo = _this.hostType ? _this.switchValue2 : _this.switchValue1;
      if (!configinfo) {
        return;
      }
      this.userName="",
      this.passwd="",
      this.showReview=true;
    },
    subitHints(){
      this.showReview=false;
      this.edit();
    },
    edit() {
      utils.hints({
        txt: pageTxt.label[8],
        yes: _this.editSubmit,
        btn: 2
      });
    },
    editSubmit() {
      utils.post(
        "mx/suConfig/modify",
        {
          cmdID: "600082",
          type: _this.hostType,
          cfgInfo: _this.hostType ? _this.textareaValue2 : _this.textareaValue1
        },
        function(response) {
          if (response.errcode == 0) {
            utils.weakTips(response.errinfo);
            _this.renderDate();
            _this.switchValue1 = _this.switchValue2 = false;
            _this.changeTextarea();
          }
        }
      );
    },
    //判断静态/动态配置
    handleClick(tab, event) {
      if (event.target.getAttribute("id") == "tab-first") {
        this.hostType = 0;
      }
      if (event.target.getAttribute("id") == "tab-second") {
        this.hostType = 1;
      }
      this.switchValue1 = this.switchValue2 = false;
      this.changeTextarea();
      this.renderDate();
    },
    //改变文本框
    changeTextarea() {
      afn("textarea1", "button1", this.switchValue1);
      afn("textarea2", "button2", this.switchValue2);
    },
    //更新数据
    renderDate() {
      utils.post(
        "mx/suConfig/query",
        {
          cmdID: "600081",
          type: _this.hostType
        },
        function(response) {
          if (response.errcode == 0) {
            if (_this.hostType == 0) {
              _this.textareaValue1 = response.cfgInfo;
            } else {
              _this.textareaValue2 = response.cfgInfo;
            }
          }
        }
      );
    }
  },
  //初始化数据
  created() {
    _this = this;
    this.renderDate();
  },
  mounted() {
    this.changeTextarea();
  }
};
function afn(textareaID, buttonID, i) {
  var textarea = document.getElementById(textareaID);
  var button = document.getElementById(buttonID);
  if (i) {
    textarea.style = "background:#fff";
    button.style = "background-color:#32CCF9";
  } else {
    textarea.style = "background:#F8F8F8";
    button.style = "background-color:rgb(215, 216, 218)";
  }
}
</script>

<style scoped="scoped">
.host_btn{padding:20px;}
.host_btn *{vertical-align:middle;}
.host_btn .blueBtn{margin-top: 40px; margin-left: 120px;}
.title_txt{font-size:14px; color:#666; margin-right: 10px;}
.prompt_txt{font-size:14px; color:#999; margin-right: 10px;}
.switch_box{margin-top: 5px;}
.switch_box .el-switch{margin-right: 20px;}
.content{margin-top: 20px; width: 75%; margin-left: 120px;}
.red{font-size:14px; color:#FF6B6B;}
</style>