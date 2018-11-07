<template>
  <div class="crowdManage">
    <div v-if="currentRoute[currentRoute.length-1]==='crowdManage'">
      <div style="margin-right: 10px;" class="crowdManageForm flex-row">
        <Button style="align-self: flex-start;" v-show="!batchDeleteDisabled" @click="batchDelete">批量删除</Button>
        <div class="flex-empty"></div>
        <Form ref="formInline" :model="formInline" label-position="left" inline>
          <Row type="flex" justify="end">
            <FormItem prop="crowdType" label="人群类型：">
              <Select v-model="formInline.crowdType" @on-change="filter">
                <Option v-for="item in crowdTypeArr" :value="item.value">{{item.text}}</Option>
              </Select>
            </FormItem>
            <FormItem prop="computeStatus" label="计算状态：">
              <Select v-model="formInline.computeStatus" @on-change="filter">
                <Option v-for="item in computeStatusArr" :value="item.value">{{item.text}}</Option>
              </Select>
            </FormItem>
            <FormItem prop="profileStatus" label="画像状态：">
              <Select v-model="formInline.profileStatus" @on-change="filter">
                <Option v-for="item in profileStatusArr" :value="item.value">{{item.text}}</Option>
              </Select>
            </FormItem>
            <FormItem prop="crowdName" label="人群名称：">
              <Input v-model="formInline.crowdName" @on-change="filter" placeholder="请输入关键词搜索" style="width: auto">
              <Icon type="ios-search" slot="suffix" />
              </Input>
            </FormItem>
          </Row>
        </Form>
      </div>
      <Row style="margin-right: 20px;">
        <Table style="height:calc(100vh - 214px);" ref="table" :loading="loading" :data="crowds" :columns="tableColumns1" @on-selection-change="selectionChanged" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;font-size:12px;">
            <Page :total="total" :current="pageNum" :page-size="pageSize" :page-size-opts="pageSizeOpts" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer show-elevator></Page>
          </div>
        </div>
      </Row>
    </div>

    <Modal v-model="ruleModal" :title="crowdRule.crowdType === CROWDTYPE.spreadCrowd?'人群扩散规则':'人群生成规则'" class-name="vertical-center-modal">
      <Row v-if="crowdRule.crowdType===CROWDTYPE.spreadCrowd" style="margin-bottom:20px;">
        <i-col span="5" style="text-align: right;padding-right: 10px;">来源人群名称:</i-col>
        <i-col span="19">
          {{crowdRule.sourceCrowdName}}
        </i-col>
      </Row>
      <Row style="margin-bottom:20px;">
        <i-col span="5" style="text-align: right;padding-right: 10px;">{{crowdRule.crowdType===CROWDTYPE.spreadCrowd?'来源人群规则:':'人群规则:'}}</i-col>
        <i-col span="19">
          <div class="crowd-rule">
            <span v-for="(groupRelation,index) in crowdRule.groupRelations">
              <span>(</span>
              <template v-if="groupRelation.industryLabels" v-for="(tag,tagIndex) in groupRelation.industryLabels">
                <span class="crowdNode">{{' ' + tag.indInvolvedGroupnamepath + "/" + tag.indLabelName}}</span>
                <span v-if="tagIndex!==(groupRelation.industryLabels.length-1)">{{combinationMethodSign[groupRelation.insideRelationType]}}</span>
              </template>
              <template v-if="groupRelation.peopleRules" v-for="(tag,tagIndex) in groupRelation.peopleRules">
                <span class="crowdNode">{{' ' + tag.peopleName}}</span>
                <span v-if="tagIndex!==(groupRelation.peopleRules.length-1)">{{combinationMethodSign[groupRelation.insideRelationType]}}</span>
              </template>
              <span>)</span>
              <template v-if="index!==(crowdRule.groupRelations.length-1)">
                <br />
                <span>{{combinationMethodSign[groupRelation.outsideRelationType]}}</span>
                <!-- <Icon v-if="groupRelation.outsideRelationType === RELATIONTYPE.union" size=24 class="relation-icon" custom="dubhe-iconfont dubhe-icon-union" title="并集"></Icon>
                <Icon v-if="groupRelation.outsideRelationType === RELATIONTYPE.difference" size=24 class="relation-icon" custom="dubhe-iconfont dubhe-icon-difference" title="差集"></Icon>
                <Icon v-if="groupRelation.outsideRelationType === RELATIONTYPE.intersaction" size=24 class="relation-icon" custom="dubhe-iconfont dubhe-icon-intersaction" title="交集"></Icon> -->
                <br />
              </template>
            </span>
          </div>
        </i-col>
      </Row>
      <template v-if="crowdRule.crowdType===CROWDTYPE.spreadCrowd">
        <Row style="margin-bottom:20px;">
          <i-col span="5" style="text-align: right;padding-right: 10px;">来源规则有效期:</i-col>
          <i-col span="19">
            {{crowdRule.sourceRuleValidPeriod}}
            <span v-if="crowdRule.isSourceEndTimeNull" style='font-style:italic'>仅一次有效，画像完成即止</span>
          </i-col>
        </Row>
        <Row style="margin-bottom:20px;">
          <i-col span="5" style="text-align: right;padding-right: 10px;">扩散规则:</i-col>
          <i-col span="19">
            {{crowdRule.similarity}}
          </i-col>
        </Row>
      </template>
      <Row style="margin-bottom:20px;">
        <i-col span="5" style="text-align: right;padding-right: 10px;">{{crowdRule.crowdType===CROWDTYPE.spreadCrowd?'扩散规则有效期:':'规则有效期:'}}</i-col>
        <i-col span="19">
          {{crowdRule.ruleValidPeriod}}
          <span v-if="crowdRule.isEndTimeNull" style='font-style:italic'>仅一次有效，画像完成即止</span>
        </i-col>
      </Row>
      <div slot="footer">
        <Button type="primary" @click="closeRuleModal">关闭</Button>
      </div>
    </Modal>

    <Modal v-model="spreadCrowdEditModal" title="扩散规则编辑" class-name="vertical-center-modal">
      <div slot="footer">
        <Button @click="closeSpreadCrowdEditModal" :disabled="notEditable">取消</Button>
        <Button type="primary" @click="spreadCrowdEditModalOk" :disabled="notEditable">确定</Button>
      </div>
      <Form style="margin-right:20px;" :model="spreadCrowdEditForm" :rules="spreadCrowdEditFormRuleValidate" :label-width="120">
        <FormItem label='来源人群名称:'>
          <span>{{spreadCrowdEditForm.sourceCrowdName}}</span>
        </FormItem>
        <FormItem label="人群相似度:">
          <Slider v-model="spreadCrowdEditForm.similarity" :isInteger="isInteger" :min="min" show-input :disabled="notEditable"></Slider>
        </FormItem>
        <FormItem style="margin-bottom: 12px;" label="规则有效期：">
          <RadioGroup v-model="spreadCrowdEditForm.validityPeriod">
            <Radio label="1" :disabled="notEditable">仅一次有效</Radio>
            <Radio label="2" :disabled="notEditable">1个月</Radio>
            <Radio label="3" :disabled="notEditable">2个月</Radio>
            <Radio label="4" :disabled="notEditable">3个月</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="人群名称:" prop="crowdName">
          <Input :maxlength='20' v-model="spreadCrowdEditForm.crowdName" :disabled="notEditable" />
        </FormItem>
      </Form>
    </Modal>
    <router-view></router-view>
  </div>
</template>
<script>
import _ from "lodash";
import crowdManageOperation from "../components/crowdManage/crowdManageOperation.vue";
import {
  ALL,
  CROWDTYPE,
  COMPUTESTATUS,
  PROFILESTATUS,
  crowdTypeArr,
  computeStatusArr,
  profileStatusArr,
  RELATIONTYPE,
  PEOPLERULE_API
} from "../constants.js";
import axios from "../utils/axios";
export default {
  data() {
    return {
      notEditable: false,
      min: 1,
      edittingSpreadCrowd: null,
      isInteger: true,
      spreadCrowdEditModal: false,
      spreadCrowdEditForm: {
        sourceCrowdName: null,
        similarity: 1,
        validityPeriod: null,
        crowdName: null
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
      loading: true,
      CROWDTYPE: CROWDTYPE,
      RELATIONTYPE: RELATIONTYPE,
      combinationMethodSign: {
        1: "∪",
        2: "∩",
        3: "-"
      },
      pageSizeOpts: [15, 30, 45, 60],
      selection: [],
      ruleModal: false,
      currentRowCrowdId: null,
      currentTitle: null,
      editableCrowdId: null,
      data: null,
      total: 100,
      pageSize: 15,
      pageNum: 1,
      crowdTypeArr: crowdTypeArr,
      computeStatusArr: computeStatusArr,
      profileStatusArr: profileStatusArr,
      formInline: {
        crowdType: ALL,
        computeStatus: ALL,
        profileStatus: ALL,
        crowdName: ""
      },
      tablePageData: [],
      tableData: [],
      tableColumns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          title: "序号",
          width: 60,
          align: "center"
        },
        {
          title: "人群名称",
          key: "name",
          width: 213,
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  position: "relative",
                  height: "32px",
                  lineHeight: "32px"
                },
                on: {
                  mouseover: () => {
                    this.currentRowCrowdId = params.row.crowdId;
                  },
                  mouseleave: () => {
                    this.currentRowCrowdId = null;
                  }
                }
              },
              [
                h(
                  "a",
                  {
                    style: {
                      display:
                        this.editableCrowdId &&
                        this.editableCrowdId ===
                          this.crowds[params.index].crowdId
                          ? "none"
                          : "inline-block",
                      height: "32px",
                      overflow: "hidden",
                      maxWidth: "110px",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      verticalAlign: "middle"
                    },
                    domProps: {
                      title: this.crowds[params.index].name
                    },
                    on: {
                      click: () => {
                        const row = params.row;
                        this.notEditable = this.editRuleDisabled(
                          row.computeStatus
                        );
                        switch (row.type) {
                          case CROWDTYPE.attrCrowd:
                            this.$router.push({
                              path: "/crowdManage/customization",
                              query: {
                                id: row.crowdId,
                                crowdName: row.name,
                                notEditable: this.notEditable
                              }
                            });
                            break;
                          case CROWDTYPE.combinationCrowd:
                            this.$router.push({
                              path: "/crowdManage/combination",
                              query: {
                                id: row.crowdId,
                                crowdName: row.name,
                                notEditable: this.notEditable
                              }
                            });
                            break;
                          case CROWDTYPE.spreadCrowd:
                            // this.spreadRuleEditting = true;
                            this.edittingSpreadCrowd = row;
                            this.spreadCrowdEditModal = true;
                            this.spreadCrowdEditForm.sourceCrowdName =
                              row.sourceCrowdName;
                            this.spreadCrowdEditForm.validityPeriod =
                              row.validityPeriod;
                            this.spreadCrowdEditForm.crowdName = row.name;
                            const peoCreateRuleCount = JSON.parse(
                              row.peoCreateRuleCount
                            );
                            this.spreadCrowdEditForm.similarity =
                              peoCreateRuleCount.similarity * 100;
                            break;
                          default:
                            break;
                        }
                      }
                    }
                  },
                  this.crowds[params.index].name
                ),
                h("Icon", {
                  style: {
                    display:
                      this.editableCrowdId &&
                      this.editableCrowdId === this.crowds[params.index].crowdId
                        ? "none"
                        : "inline-block",
                    color: params.row.valid ? "#a5ffd2" : "#ddd",
                    "padding-left": "14px",
                    cursor: "pointer"
                  },
                  props: {
                    custom: "dubhe-iconfont dubhe-icon-rule",
                    size: 14
                  },
                  domProps: {
                    title: params.row.valid
                      ? "查看规则"
                      : "规则已失效！点击可查看规则"
                  },
                  on: {
                    click: () => {
                      this.ruleModal = true;
                      this.$store.dispatch("lookRule", params.row);
                    }
                  }
                }),
                h("Icon", {
                  style: {
                    display:
                      this.currentRowCrowdId &&
                      this.currentRowCrowdId ===
                        this.crowds[params.index].crowdId
                        ? this.editableCrowdId &&
                          this.editableCrowdId ===
                            this.crowds[params.index].crowdId
                          ? "none"
                          : "inline-block"
                        : "none",
                    color: "#ddd",
                    "padding-left": "14px",
                    cursor: "pointer"
                  },
                  props: {
                    type: "md-create",
                    size: 14
                  },
                  on: {
                    click: () => {
                      if (this.editableCrowdId) return;
                      this.editableCrowdId = this.crowds[params.index].crowdId;
                    }
                  }
                }),
                h("Input", {
                  style: {
                    display:
                      this.editableCrowdId === this.crowds[params.index].crowdId
                        ? "block"
                        : "none",
                    width: "120px",
                    position: "absolute",
                    left: "0px",
                    top: "0px"
                  },
                  props: {
                    type: "text",
                    value: this.crowds[params.index].name,
                    maxlength: 20
                  },
                  on: {
                    "on-blur": event => {
                      const newName = event.target.value.trim();
                      if (event.target.value === params.row.name) {
                        this.editableCrowdId = null;
                        return;
                      }
                      axios
                        .get(PEOPLERULE_API.CHECK_NAME, {
                          peopleName: newName
                        })
                        .then(res => {
                          if (res.data.duplicate) {
                            this.$Message.error(res.data.msg);
                            return;
                          } else {
                            this.$store
                              .dispatch("updateCrowdName", {
                                id: [this.editableCrowdId],
                                crowdName: newName
                              })
                              .then(() => {
                                this.loadCrowd();
                                setTimeout(() => {
                                  this.editableCrowdId = null;
                                }, 400);
                              });
                          }
                        });
                    }
                  }
                })
              ]
            );
          }
        },
        {
          title: "人群类型",
          key: "type",
          render: (h, params) => {
            return h(
              "span",
              this.getTextByValue(this.crowdTypeArr, params.row.type)
            );
          }
        },
        {
          title: "行业",
          key: "industry"
        },
        {
          title: "人群规模",
          key: "scale"
        },
        {
          title: "创建人",
          key: "createdBy"
        },
        {
          title: "创建时间",
          key: "createdTime"
        },
        {
          title: "计算状态",
          key: "computeStatus",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                style: {
                  color: this.getComputeStatusColor(params.row.computeStatus),
                  marginRight: "10px"
                },
                props: {
                  custom: "dubhe-iconfont dubhe-icon-compute-status",
                  size: 10
                }
              }),
              h(
                "span",
                this.getTextByValue(
                  this.computeStatusArr,
                  params.row.computeStatus
                )
              )
            ]);
          }
        },
        {
          title: "画像状态",
          key: "profileStatus",
          render: (h, params) => {
            const isNull = params.row.profileStatus === PROFILESTATUS.isNull;
            if (isNull) {
              return h("span", "- -");
            }
            return h("div", [
              h("Icon", {
                style: {
                  color: this.getProfileStatusColor(params.row.profileStatus),
                  marginRight: "10px"
                },
                props: {
                  custom: "dubhe-iconfont dubhe-icon-compute-status",
                  size: 10
                }
              }),
              h(
                "span",
                this.getTextByValue(
                  this.profileStatusArr,
                  params.row.profileStatus
                )
              )
            ]);
          }
        },
        {
          title: "操作",
          render: (h, params) => {
            return h(crowdManageOperation, {
              props: {
                valid: params.row.valid,
                row: params.row
              },
              on: {
                deleteRecord: () => {
                  this.delete([params.row.crowdId]);
                },
                loadCrowd: this.loadCrowd
              }
            });
          }
        }
      ]
    };
  },
  computed: {
    tableHeight() {
      return 760;
    },
    currentRoute() {
      return this.$store.getters.getCurrentRoute;
    },
    batchDeleteDisabled() {
      return this.selection.length === 0;
    },
    crowds() {
      return this.$store.getters.getCrowds;
    },
    crowdRule() {
      return this.$store.getters.getCrowdRule;
    }
  },
  methods: {
    closeSpreadCrowdEditModal() {
      this.spreadCrowdEditModal = false;
    },
    spreadCrowdEditModalOk() {
      const peoCreateRuleCount = JSON.parse(
        this.edittingSpreadCrowd.peoCreateRuleCount
      );
      this.loading = true;
      this.$store
        .dispatch("spreadCrowdEdit", {
          peopleId: this.edittingSpreadCrowd.crowdId,
          spreadName: this.spreadCrowdEditForm.crowdName,
          ruleValidType: Number(this.spreadCrowdEditForm.validityPeriod),
          similarity: this.spreadCrowdEditForm.similarity / 100,
          beSpreadCode: peoCreateRuleCount.seedPeopleCode
        })
        .then(() => {
          this.loadCrowd();
        });
    },
    editRuleDisabled(computeStatus) {
      if (
        [COMPUTESTATUS.toCompute, COMPUTESTATUS.computeException].indexOf(
          computeStatus
        ) === -1
      ) {
        return true;
      }
      return false;
    },
    getMatchedIndex(objArr, obj) {
      for (let index in objArr) {
        if (objArr[index][obj.key] === obj.value) {
          return index;
        }
      }
    },
    delete(crowdIdArr) {
      this.$Modal.confirm({
        title: "请确认",
        content: "<p>确定删除？</p>",
        onOk: () => {
          this.$store
            .dispatch("batchDeleteCrowd", { id: crowdIdArr })
            .then(() => {
              this.loadCrowd();
              this.selection = [];
            });
        }
      });
    },
    batchDelete() {
      const crowdIdArr = [];
      this.selection.forEach(element => {
        crowdIdArr.push(element.crowdId);
      });
      this.delete(crowdIdArr);
    },
    selectionChanged(selection) {
      this.selection = selection;
    },
    closeRuleModal() {
      this.ruleModal = false;
    },
    getComputeStatusColor(value) {
      switch (value) {
        case COMPUTESTATUS.toCompute:
          return "#ffab67";
        case COMPUTESTATUS.computing:
          return "#76ddff";
        case COMPUTESTATUS.computeException:
          return "#f08181";
        case COMPUTESTATUS.computeSuccess:
          return "#7cc623";
      }
    },
    getProfileStatusColor(value) {
      switch (value) {
        case PROFILESTATUS.toProfile:
          return "#ffab67";
        case PROFILESTATUS.profiling:
          return "#76ddff";
        case PROFILESTATUS.profileException:
          return "#f08181";
        case PROFILESTATUS.profileSuccess:
          return "#7cc623";
      }
    },
    getTextByValue(objArr, value) {
      const index = _.findIndex(objArr, obj => {
        return obj.value === value;
      });
      const text = index === -1 ? "--" : objArr[index].text;
      return text;
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.loadCrowd();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.loadCrowd();
    },
    filter() {
      this.pageNum = 1;
      this.loadCrowd();
    },
    loadCrowd() {
      this.loading = true;
      this.$store
        .dispatch("loadCrowd", {
          rows: this.pageSize,
          page: this.pageNum,
          crowdType: this.formInline.crowdType,
          countState: this.formInline.computeStatus,
          portrayalState: this.formInline.profileStatus,
          crowdName: this.formInline.crowdName.trim()
        })
        .then(total => {
          this.total = total;
          this.currentRowCrowdId = null;
          this.editableCrowdId = null;
          this.loading = false;
        });
    }
  },
  created() {
    this.loadCrowd();
  },
  mounted() {},
  components: {
    crowdManageOperation
  },
  watch: {
    currentRoute() {
      if (
        this.currentRoute.length === 1 &&
        this.currentRoute[0] === "crowdManage"
      ) {
        this.loadCrowd();
      }
    }
  }
};
</script>
<style>
.crowdManage {
  padding: 0px 0px 0px 20px;
}
.crowd-rule {
  padding: 6px;
  border-radius: 6px;
  border: 1px solid var(--default-border-color);
  height: 300px;
  width: 380px;
  overflow-y: auto;
  overflow-x: hidden;
}
.crowdManageForm .ivu-form-item-label {
  display: inline-block;
}
.crowdManageForm .ivu-form-item-content {
  display: inline-block;
}
.crowdManageForm .ivu-select {
  width: 132px;
}
.crowdManageForm .ivu-input {
  width: 173px;
}
.crowdManage .profile-status-div-empty {
  padding-left: 17px;
}
.crowdManage .profile-status-div {
  border-radius: 6px;
  border-width: 1px;
  border-style: solid;
  width: 80px;
  height: 32px;
  line-height: 30px;
  text-align: center;
  background-color: rgba(255, 166, 94, 0.8);
  border-color: rgba(255, 202, 159, 0.8);
  color: white;
}
.crowdManage .profile-status-div1 {
  background-color: rgba(255, 166, 94, 0.8);
  border-color: rgba(255, 202, 159, 0.8);
}
.crowdManage .profile-status-div2 {
  background-color: rgba(101, 206, 242, 0.8);
  border-color: rgba(208, 243, 255, 0.8);
}
.crowdManage .profile-status-div3 {
  background-color: rgba(236, 97, 97, 0.8);
  border-color: rgba(255, 183, 167, 0.8);
}
.crowdManage .profile-status-div4 {
  background-color: rgba(124, 198, 35, 0.8);
  border-color: rgba(200, 225, 157, 0.8);
}
</style>


