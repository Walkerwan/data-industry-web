<template>
  <div class="crowdManageOperation">
    <a v-show="computeCrowdShow" :disabled="computeCrowdDisabled" @click="showComputeCrowdModal">计算人群</a>
    <a v-show="genProfileShow" :disabled="genProfileDisabled" @click="showGenProfileModal">生成画像</a>
    <router-link :to="'/crowdManage/seeProfile?crowdId='+row.crowdId+'&crowdName='+row.name" v-show="seeProfileShow">
      查看画像
    </router-link>
    <a :disabled="spreadDisabled" :title="row.type === CROWDTYPE.spreadCrowd?'扩散人群不能再次扩散':''" @click="showSpreadModal">扩散</a>
    <Dropdown placement="bottom-start" @on-click="dropDownItemClicked">
      <a href="javascript:void(0)">
        更多
      </a>
      <DropdownMenu slot="list">
        <DropdownItem name="editRule" :disabled="editRuleDisabled">编辑规则</DropdownItem>
        <DropdownItem name="deleteRecord">删除记录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Modal v-model="computeCrowdModal" title="计算人群" class-name="vertical-center-modal" @on-ok="computeCrowdModalOk">
      <p>请确认是否提交计算？</p>
    </Modal>
    <Modal v-model="genProfileModal" title="生成画像" class-name="vertical-center-modal" @on-ok="genProfileModalOk">
      <p>画像需要若干小时方能生成，请确认是否进行？</p>
    </Modal>
    <Modal v-model="spreadModal" title="人群扩散" class-name="vertical-center-modal" @on-ok="spreadModalOk">
      <Form style="margin-right:20px;" :model="spreadForm" :rules="spreadFormRuleValidate" :label-width="120">
        <FormItem label="当前人群名称:">
          <span>{{row.name}}</span>
        </FormItem>
        <FormItem label="人群相似度:">
          <Slider :isInteger="isInteger" v-model="spreadForm.similarity" :min="min" show-input></Slider>
        </FormItem>
        <FormItem style="margin-bottom: 12px;" label="规则有效期：">
          <RadioGroup v-model="spreadForm.validityPeriod">
            <Radio label="1">仅一次有效</Radio>
            <Radio label="2">1个月</Radio>
            <Radio label="3">2个月</Radio>
            <Radio label="4">3个月</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="扩散后人群名称:" prop="spreadCrowdName">
          <Input :maxlength='20' v-model="spreadForm.spreadCrowdName" />
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="spreadCrowdEditModal" title="扩散规则编辑" class-name="vertical-center-modal" @on-ok="spreadCrowdEditModalOk">
      <Form style="margin-right:20px;" :model="spreadCrowdEditForm" :rules="spreadCrowdEditFormRuleValidate" :label-width="120">
        <FormItem label='来源人群名称:'>
          <span>{{row.sourceCrowdName}}</span>
        </FormItem>
        <FormItem label="人群相似度:">
          <Slider v-model="spreadCrowdEditForm.similarity" :isInteger="isInteger" :min="min" show-input></Slider>
        </FormItem>
        <FormItem style="margin-bottom: 12px;" label="规则有效期：">
          <RadioGroup v-model="spreadCrowdEditForm.validityPeriod">
            <Radio label="1">仅一次有效</Radio>
            <Radio label="2">1个月</Radio>
            <Radio label="3">2个月</Radio>
            <Radio label="4">3个月</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="人群名称:" prop="crowdName">
          <Input :maxlength='20' v-model="spreadCrowdEditForm.crowdName" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import {
  CROWDTYPE,
  COMPUTESTATUS,
  PROFILESTATUS,
  VALIDITYPERIOD,
  PEOPLERULE_API
} from "../../constants.js";
import axios from "../../utils/axios.js";
export default {
  props: {
    row: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      spreadCrowdEditModal: false,
      CROWDTYPE: CROWDTYPE,
      isInteger: true,
      min: 1,
      spreadForm: {
        similarity: 80,
        validityPeriod: "1",
        spreadCrowdName: "扩散后人群名称"
      },
      spreadFormRuleValidate: {
        spreadCrowdName: [
          {
            required: true,
            type: "string",
            message: "请输入人群名称",
            trigger: "blur"
          },
          {
            validator: this.spreadCrowdNameValidator,
            message: "此人群名称已存在，请修改",
            trigger: "blur"
          }
        ]
      },
      spreadCrowdEditForm: {
        similarity: 80,
        validityPeriod: this.row.validityPeriod,
        crowdName: this.row.name
      },
      spreadCrowdEditFormRuleValidate: {
        crowdName: [
          {
            required: true,
            type: "string",
            message: "请输入人群名称",
            trigger: "blur"
          },
          {
            validator: this.spreadCrowdEditCrowdNameValidator,
            message: "此人群名称已存在，请修改",
            trigger: "blur"
          }
        ]
      },
      computeCrowdModal: false,
      genProfileModal: false,
      seeProfileModal: false,
      spreadModal: false,
      spreadRuleEditting: false
    };
  },
  computed: {
    computeCrowdShow() {
      if (
        [
          COMPUTESTATUS.toCompute,
          COMPUTESTATUS.computing,
          COMPUTESTATUS.computeException
        ].indexOf(this.row.computeStatus) !== -1
      ) {
        return true;
      }
      return false;
    },
    genProfileShow() {
      if (
        [COMPUTESTATUS.computeSuccess].indexOf(this.row.computeStatus) !== -1 &&
        [PROFILESTATUS.profileSuccess].indexOf(this.row.profileStatus) === -1
      ) {
        return true;
      }
      return false;
    },
    seeProfileShow() {
      if (
        [COMPUTESTATUS.computeSuccess].indexOf(this.row.computeStatus) !== -1 &&
        [PROFILESTATUS.profileSuccess].indexOf(this.row.profileStatus) !== -1
      ) {
        return true;
      }
      return false;
    },
    computeCrowdDisabled() {
      if (!this.row.valid) {
        return true;
      }
      if (
        [COMPUTESTATUS.computing, COMPUTESTATUS.computeException].indexOf(
          this.row.computeStatus
        ) !== -1
      ) {
        return true;
      }
      return false;
    },
    genProfileDisabled() {
      if (!this.row.valid) {
        return true;
      }
      if (
        [PROFILESTATUS.profiling, PROFILESTATUS.profileException].indexOf(
          this.row.profileStatus
        ) !== -1
      ) {
        return true;
      }
      return false;
    },
    spreadDisabled() {
      if (
        this.row.type === CROWDTYPE.spreadCrowd ||
        [
          COMPUTESTATUS.toCompute,
          COMPUTESTATUS.computing,
          COMPUTESTATUS.computeException
        ].indexOf(this.row.computeStatus) !== -1
      ) {
        return true;
      }
      return false;
    },
    editRuleDisabled() {
      if (
        [COMPUTESTATUS.toCompute, COMPUTESTATUS.computeException].indexOf(
          this.row.computeStatus
        ) === -1
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    spreadCrowdEditCrowdNameValidator(rule, val, callback) {
      if (val === this.row.name) {
        callback();
        return;
      }
      this.spreadCrowdNameValidator(rule, val, callback);
    },
    spreadCrowdEditModalOk() {
      const peoCreateRuleCount = JSON.parse(this.row.peoCreateRuleCount);
      this.$store
        .dispatch("spreadCrowdEdit", {
          peopleId: this.row.crowdId,
          spreadName: this.spreadCrowdEditForm.crowdName,
          ruleValidType: Number(this.spreadCrowdEditForm.validityPeriod),
          similarity: this.spreadCrowdEditForm.similarity / 100,
          beSpreadCode: peoCreateRuleCount.seedPeopleCode
        })
        .then(() => {
          this.$emit("loadCrowd");
        });
    },
    spreadCrowdNameValidator(rule, val, callback) {
      axios.get(PEOPLERULE_API.CHECK_NAME, { peopleName: val }).then(res => {
        if (res.data.duplicate === true) {
          callback(true);
        } else {
          callback();
        }
      });
    },
    editRule() {
      if (this.editRuleDisabled) {
        return;
      }
      switch (this.row.type) {
        case CROWDTYPE.attrCrowd:
          this.$router.push({
            path: "/crowdManage/customization",
            query: {
              id: this.row.crowdId,
              crowdName: this.row.name
            }
          });
          break;
        case CROWDTYPE.combinationCrowd:
          this.$router.push({
            path: "/crowdManage/combination",
            query: {
              id: this.row.crowdId,
              crowdName: this.row.name
            }
          });
          break;
        case CROWDTYPE.spreadCrowd:
          this.spreadRuleEditting = true;
          this.spreadCrowdEditModal = true;
          const peoCreateRuleCount = JSON.parse(this.row.peoCreateRuleCount);
          this.spreadCrowdEditForm.similarity =
            peoCreateRuleCount.similarity * 100;
          break;
        default:
          break;
      }
    },
    spreadModalOk() {
      this.$store
        .dispatch("spreadCrowd", {
          beSpreadCode: this.row.crowdId,
          spreadName: this.spreadForm.spreadCrowdName,
          ruleValidType: this.spreadForm.validityPeriod,
          industryCode: this.row.beLongsIndCode,
          similarity: this.spreadForm.similarity / 100
        })
        .then(() => {
          this.$emit("loadCrowd");
        });
    },
    genProfileModalOk() {
      this.$store.dispatch("genProfile", { id: this.row.crowdId }).then(() => {
        this.$emit("loadCrowd");
      });
    },
    computeCrowdModalOk() {
      this.$store
        .dispatch("computeCrowd", { id: this.row.crowdId })
        .then(() => {
          this.$emit("loadCrowd");
        });
    },
    dropDownItemClicked(name) {
      if (name === "deleteRecord") {
        this.$emit("deleteRecord");
      } else if (name === "editRule") {
        this.editRule();
      }
    },
    showComputeCrowdModal() {
      if (this.computeCrowdDisabled) {
        return;
      }
      this.computeCrowdModal = true;
    },
    showGenProfileModal() {
      if (this.genProfileDisabled) {
        return;
      }
      this.genProfileModal = true;
    },
    showSpreadModal() {
      if (this.spreadDisabled) {
        return;
      }
      this.spreadModal = true;
      this.spreadForm.spreadCrowdName = "";
      this.getSpreadCrowdName();
    },
    getRandomNum() {
      var num = "";
      for (var i = 0; i < 4; i++) {
        num += Math.floor(Math.random() * 10);
      }
      return num;
    },
    getSpreadCrowdName() {
      const spreadCrowdName =
        new Date().format("yyyyMMdd") + "_" + this.getRandomNum();
      return axios
        .get(PEOPLERULE_API.CHECK_NAME, {
          peopleName: spreadCrowdName
        })
        .then(res => {
          if (res.data.duplicate === true) {
            this.getSpreadCrowdName();
          } else {
            this.spreadForm.spreadCrowdName = spreadCrowdName;
          }
        });
    }
  }
};
</script>

<style scoped>
.crowdManageOperation a {
  padding: 0px 5px;
}
a {
  pointer-events: auto;
}
</style>

