<template>
    <div id="tag-belong">
        <Select v-if="isSeleted" v-model="targetSelect" size="large" :placeholder="targetSelect">
            <Input placeholder="请输入关键字搜索" @on-keydown="searchOrginTag" style="width: auto">
            <Icon size=12 custom="dubhe-iconfont dubhe-icon-search" slot="append" @click="searchOrginTag" style="cursor: pointer;"></Icon>
            </Input>
            <Tree ref="quick-create-tag-tree" :data="quickCreateData" show-checkbox multiple @on-check-change="selectArray" @on-toggle-expand="toggleChild"></Tree>
        </Select>
        <Tree class='no-select' v-if="!isSeleted" ref="quick-create-tag-tree" :data="quickCreateData" show-checkbox multiple></Tree>
    </div>
</template>

<script>
import fetch from "@/modules/request/request.js";
import _ from "lodash";
export default {
  props: {
    isSeleted: Boolean,
    targetRow: Object
  },
  data() {
    return {
      targetSelect: "请选择",
      allData: [],
      isShowLoading:true,
      quickCreateData: []
    };
  },
  mounted() {
    if (
      this.targetRow &&
      this.targetRow.basicsLabelNames &&
      Array.isArray(this.targetRow.basicsLabelNames) &&
      this.targetRow.basicsLabelNames.length > 0
    ) {
      this.targetSelect = this.targetRow.basicsLabelNames.join(",");
    }
    this.getTreeData();
  },
  methods: {
    getTreeData(params) {
      if(params && params.labelName) {
        this.isShowLoading = false;
      } else {
        this.isShowLoading = true;
      }
      fetch({
        method: "get",
        url: "industryLabel/getBasicsLables",
        params: params?params:{},
      }).then(res => {
        if (res.data && res.data.result) {
          this.allData = res.data.result;
          const copyData = _.cloneDeep(this.allData).map(item => {
            return {
              title: item.labelGroupName,
              expand: false,
              selected: true,
              render: (h, params) => {
                console.log('a')
                return h(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      height: "30px",
                      lineHeight: "30px"
                    }
                  },
                  item.labelGroupName
                );
              },
              children: item.labelGroupDetailList
                ? item.labelGroupDetailList.map(item => {
                    return {
                      title: item.labelGroupName,
                      loading: false,
                      expand: false,
                      render: (h, params) => {
                        console.log('b')
                        return h(
                          "span",
                          {
                            style: {
                              display: "inline-block",
                              height: "30px",
                              lineHeight: "30px"
                            }
                          },
                          item.labelGroupName
                        );
                      },
                      children: item.labelGroupDetailList
                        ? item.labelGroupDetailList.map(item => {
                            const targetObj = {
                              title: item.labelGroupName,
                              expand: false,
                              selected: true,
                              level: item.level,
                              labelGroupId: item.labelGroupId,
                              loading: false,
                              render: (h, params) => {
                                console.log('c')
                                return h(
                                  "span",
                                  {
                                    style: {
                                      display: "inline-block",
                                      height: "30px",
                                      lineHeight: "30px"
                                    }
                                  },
                                  item.labelGroupName
                                );
                              },
                              children: item.labelDetailListSimple
                                ? item.labelDetailListSimple.map(item => {
                                    return {
                                      title: item.labelName,
                                      labelCode: item.labelCode
                                        ? item.labelCode
                                        : "",
                                      render: (h, params) => {
                                        return h(
                                          "span",
                                          {
                                            style: {
                                              display: "inline-block",
                                              height: "30px",
                                              lineHeight: "30px"
                                            }
                                          },
                                          item.labelName
                                        );
                                      }
                                    };
                                  })
                                : [{}]
                            };
                            return targetObj;
                          })
                        : ""
                    };
                  })
                : ""
            };
          });
          this.quickCreateData = copyData;
        }
      });
    },
    selectArray(value) {
      let basicsLabelNames = [];
      let relevanceBasicsLabelcode = [];
      let targetString;
      let targetSelset = "";
      value.forEach((item, index, orgArray) => {
        if (item.title && !item.children && item.labelCode) {
          targetString = item.title;
          basicsLabelNames.push(targetString);
          relevanceBasicsLabelcode.push(item.labelCode);
          if (index < orgArray.length - 1) {
            targetSelset += item.title + ",";
          } else {
            targetSelset += item.title;
          }
        }
      });
      this.targetSelect = targetSelset;
      this.targetRow.basicsLabelNames = basicsLabelNames;
      this.targetRow["relevanceBasicsLabelcode"] = relevanceBasicsLabelcode;
    },
    toggleChild(value) {
      if(!this.isShowLoading) {
        return;
      }
      const that =this;
      if (value.level == 3 && value.expand) {
        value.loading = true;
         value.children = [];
        fetch({
          method: "get",
          url: "industryLabel/getBasicsLables",
          params: {
            parentId: value.labelGroupId
          }
        }).then(res => {
          if (res.data) {
            if (res.data.code == 200) {
              let targetChild = [];
              targetChild = res.data.result.map(item => {
                return {
                  title: item.labelName,
                  // selected: true,
                  labelCode: item.labelCode ? item.labelCode : "",
                  render: (h, params) => {
                    console.log('d')
                    return h(
                      "span",
                      {
                        attrs: {
                          title: item.labelName
                        },
                        style: {
                          display: "inline-block",
                          width: "60px",
                          height: "30px",
                          lineHeight: "30px",
                          overflow: "hidden",
                          textOverflow:"ellipsis",
                          whiteSpace: "nowrap",
                        }
                      },
                      item.labelName
                    );
                  }
                };
              });
              if(targetChild.length > 500) {
                targetChild = targetChild.splice(0,500)
              }
              value.children = targetChild;
              that.$nextTick(()=> {
                // setTimeout(()=> {
                  value.loading = false;
                // },1000)
              })
            }
          }
        });
      }else  if(value.level == 3 && !value.expand){
        value.children = [{}];
      }
    },
    // 搜索对应源标签
    searchOrginTag(e) {
      debugger;
       if (e.keyCode && e.keyCode === 13) {
         this.getTreeData({
           labelName: e.target.value
         })
      }
    },
  }
};
</script>

<style>
#tag-belong .ivu-select-dropdown {
  width: 180px !important;
  height: 320px !important;
  max-height: 320px !important;
  left: auto !important;
}
#tag-belong .no-select.ivu-tree {
  overflow-y: scroll;
  max-height: 400px;
}
#tag-belong .ivu-tree .ivu-checkbox-wrapper {
  float: right;
  margin-top: 6px;
}
#tag-belong .ivu-tree {
  padding-left: 12px;
}
#tag-belong .ivu-icon-ios-loading {
  float: left;
  position: relative;
  top: 3px
}
#tag-belong .ivu-tree .ivu-tree-children li {
  font-size: 14px;
}
</style>


