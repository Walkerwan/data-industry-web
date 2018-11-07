<template>
  <div>
    <Row>
      <Col span="24">
        <Select :value="defaultSelectValue" v-bind:disabled="haveSelectCrowd" @on-change="selectIndustryValue"
                class="dubhe-select">
          <Option v-for="item in industrysData" :value="item.indCode" :key="item.indId">{{ item.indName }}</Option>
        </Select>
      </Col>
    </Row>
    <div class="aside-tree">
      <Row class="title">
        <span>待选标签</span>
      </Row>
      <Row class="inputWrapper">
        <Input class="input" v-model="searchKeyWord" @on-change="inputChanged" placeholder="请输入关键词搜索"/>
        <Icon type="ios-search" slot="suffix"/>
      </Row>
      <TreeItem class="tree-item-root" :searchKeyWord="searchKeyWord" :treeData="treeData"
                :indexArr="indexArr"></TreeItem>
    </div>

  </div>
</template>
<script>
  import TreeItem from "./TreeItem";
  import _ from "lodash";

  export default {
    data() {
      return {
        indexArr: [],
        searchKeyWord: "",
        selectIndustry: ""
      };
    },
    computed: {
      treeData() {
        console.log(
          "aside-treeData",
          this.$store.getters["crowdEdit/getTreeData"]
        );
        return this.$store.getters["crowdEdit/getTreeData"];
      },
      crowds() {
        return this.$store.getters["crowdEdit/getCrowds"];
      },
      haveSelectCrowd() {
        return this.$store.getters["crowdEdit/getCrowds"].some(item => item.selectedTags.length !== 0);
      },
      industrysData() {
        return this.$store.getters["crowdEdit/getIndustryData"];
      },
      defaultSelectValue() {
        return (
          this.$store.getters["crowdEdit/getCurrentIndustry"] &&
          this.$store.getters["crowdEdit/getCurrentIndustry"].indCode
        );
      }
    },
    components: {
      TreeItem
    },
    methods: {

      inputChanged() {
        const treeData = this.treeData;
        const searchKeyWord = this.searchKeyWord;
        this.setAllExpanded(treeData);
        this.$store.dispatch({type: "crowdEdit/matchKeyWordsForTreeData", treeData, searchKeyWord});
      },
      setAllExpanded(treeData) {
        for (let treeItem of treeData) {
          const children = treeItem.children;
          if (children && children.length > 0) {
            treeItem.expanded = true;
            this.setAllExpanded(children);
          }
        }
      },
      selectIndustryValue(value) {
        console.log("value", value, this.selectIndustry);
        this.selectIndustry = value;
        this.searchKeyWord = '';
        this.$store.commit("crowdEdit/clearCustomization");
        this.$store.dispatch({
          type: "crowdEdit/getDataByIndustryId",
          payload: {industryCode: value}
        });
      }
    },
    created() {
      console.log("created-aside", this.$route.query);
    },
    mounted() {
      console.log("mounted-aside", this.$route.query);
      // this.selectIndustry = this.defaultSelectValue;
      let that = this;
      that.$root.Bus.$on(
        "updateTreeItem",
        (changedItem, changedIndexArr, checkChangedItems) => {
          let treeData = _.cloneDeep(that.treeData);
          const indexArr = _.clone(changedIndexArr);
          let arrPath = "";
          if (indexArr.length > 0) {
            arrPath += "[" + indexArr.shift() + "]";
          }
          for (let index in indexArr) {
            arrPath += ".children[" + indexArr[index] + "]";
          }
          eval("treeData" + arrPath + "=changedItem");
          that.$store.commit("crowdEdit/setTreeData", treeData);
          if (checkChangedItems && checkChangedItems.length > 0) {
            that.$store.commit("crowdEdit/checkChanged", checkChangedItems);
          }
        }
      );
    },
    updated() {
    },
    beforeDestroy() {
      this.$root.Bus.$off("updateTreeItem");
    }
  };
</script>
<style>
  .aside-tree {
    border-radius: 6px;
    font-size: 14px;
    padding-left: 12px;
    color: var(--default-font-color);
  }

  .aside-tree .title {
    height: 40px;
    line-height: 40px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .dubhe-select {
    background: var(--table-header-bg-color);
    border: none;
  }

  .dubhe-select .ivu-select-selection {
    border: none;
  }

  .aside-tree .title span {
    font-weight: bold;
  }

  .aside-tree .inputWrapper {
    height: 40px;
    line-height: 40px;
    margin-right: 12px;
  }

  .aside-tree .input {
    width: 250px;
  }

  .aside-tree .tree-item-root {
    overflow-y: auto;
    height: 640px;
  }
</style>


