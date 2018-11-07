<template>
    <div id="create-tag">
        <div class="title">
              <span class="not-delete"></span>
              <span class="text">快速创建行业标签,所选源标签将直接作用行业标签,且默认使用源标签名称！</span>
              <Icon type="md-close" size='15' class="icon"/>
        </div>
        <div class="content clearfix">
        <div class="content-title">
            <span class="title-text">快速创建标签:</span>
        </div>
        <div class="left-wait-select">
            <div class="left-wait-select-title">
                <span>待选标签</span>
            </div>
            <div class="left-wait-select-search">
                <Input placeholder="请输入关键字搜索" style="width: auto">
                    <Icon type="ios-search" slot="append" />
                </Input>
            </div>
            <div class="tree-container">
              <orgin-tag-select ref="quick-create-tag-tree" :isSeleted = false></orgin-tag-select>
                <!-- <Tree ref="quick-create-tag-tree" :data="quickCreateData" show-checkbox multiple></Tree> -->
            </div>
        </div>
        <div class="right-direct" @click="rightMove" style="textAlign:center">>></div>
        <div class="right-already-select">
            <div class="right-already-select-title">
                <span>已选标签</span>
            </div>
            <div class="form-data">
                    <Table height="433" size="small" :columns="quickCreateTagColumns" :data="quickCreateTagDaTa"></Table>
            </div>
        </div>
        </div>
        <div class="dimesion-set">
            <span class="dimesion-set-title">所属维度设置：</span>
            <Select label-in-value v-model="setDimesion" style="width:190px" @on-change="setStoreDimesion">
                <Option v-for="(item) in tagBelongDimesion" :value="item.indLabelGroupid" :key= "item.indLabelGroupid">{{item.indLabelGroupname}}</Option>
            </Select>
        </div>
        <div class="set-state">
            <span class="set-state-title">设置状态：</span>
            <div ref='quickState' class="state clearfix" id="state" @click="toggleEditorState">
              <span class="not-use active" @click="clickNotUse">不使用</span>
              <span class="use" @click="clickUse">使用</span>
            </div>
        </div>
    </div>
</template>

<script>
import IndLabelManage from "./ind-label-manage.js";
import _ from 'lodash';
export default {
  props: {
    tagBelongDimesion: Array,
    isChangeQuick: Boolean
  },
  data: function() {
    return {
      quickCreateTagColumns: [
        {
          title: "源标签",
          width: 80,
          key: "relevanceBasicsLabelname"
        },
        {
          title: "行业标签",
          key: "labelName",
          render: (h, params) => {
            const vm = this;
            return h(
              "div",
              {
                style: {
                  position: "relative"
                }
              },
              [
                h("Input",{
                  style: {
                    width: "75px"
                  },
                  props: {
                    value:  params.row.labelName,
                    maxlength: 10
                  },
                  on: {
                    "on-change": (e) => {
                      const copyData = _.cloneDeep(vm.quickCreateTagDaTa);
                      copyData[params.index].labelName = e.target.value;
                      vm.$store.commit("setQuickCreateTagDaTa",copyData)
                    }
                  }
                }),
                h("span", {
                  style: {
                    float: "right",
                    width: "20px",
                    height: "20px",
                    marginTop: "5px",
                    background:
                      "url(" + require("./assets/demesion-cancel.svg") + ")"
                  },
                  on: {
                    click: () => {
                      vm.cancel(params);
                    }
                  }
                })
              ]
            );
          }
        }
      ],
      quickCreateTagDaTa: [],
      selectedDoms: [],
      setDimesion: null,
      state: '不使用'
    };
  },
  methods: {
    toggleEditorState(e){
      const catalogsDom = this.$refs.quickState;
      IndLabelManage.toggle(e.target, catalogsDom);
    },
    clickNotUse() {
      this.state = '不使用';
      this.$store.commit("setQuickCreateState",1 )
    },
    clickUse() {
      this.state = '使用';
      this.$store.commit("setQuickCreateState",0 )
    },
    // store存储起来维度
    setStoreDimesion(value) {
      this.$store.commit("setQuickCreateDimesionId",value.value)
    },
    // 右移
    rightMove() {
      this.selectedDoms = this.$refs["quick-create-tag-tree"].$children[0].getCheckedNodes();
      if (
        this.selectedDoms &&
        Array.isArray(this.selectedDoms) &&
        this.selectedDoms.length > 0
      ) {
        this.selectedDoms.forEach(item => {
          item.checked = false;
          if(item.children) {
            return;
          }
          if(item.labelCode) {
            this.quickCreateTagDaTa.unshift({
              relevanceBasicsLabelname: item.title,
              labelName: item.title,
              relevanceBasicsLabelcode:item.labelCode?[item.labelCode]:'',
              nodeKey: item.nodeKey
            });
          }
        });
        this.$store.commit("setQuickCreateTagDaTa",this.quickCreateTagDaTa)
      }
    },
    // 还原
    cancel(params) {
      this.quickCreateTagDaTa.splice(params.index, 1);
      this.targetTreeDomToSelected(params.row.nodeKey);
    },
    // 找到对应的tree
    targetTreeDomToSelected(nodeKey) {
      if (
        this.selectedDoms &&
        Array.isArray(this.selectedDoms) &&
        this.selectedDoms.length > 0
      ) {
        const that =this;
        this.selectedDoms.forEach((item,index) => {
          if (item.nodeKey === nodeKey) {
            item.checked = true;
            // that.$set(this.selectedDoms[index],'checked', false);
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./ind-label-manage.less";
</style>

<style>
#create-tag .ivu-tree .ivu-checkbox-wrapper {
  float: right;
  margin-right: 50px;
  margin-top: 6px;
}
#create-tag .ivu-tree {
  padding-left: 12px;
}
#create-tag .ivu-tree .ivu-tree-children li {
  font-size: 14px;
}
</style>



