<template>
  <div class="tree-item-wrapper">
    <div v-for="(item, index) in treeData">
      <div v-if="!item.disabeled"
           :class="item.checked?'flex-row tree-item active':'flex-row tree-item'">
        <Icon class="arrow" v-if="isNotLeaf(item)" size=14 @click="arrowClicked(index)"
              :type="item.expanded?'ios-arrow-down':'ios-arrow-forward'"/>
        <span class="title" style="padding-left: 5px"
              :title="isNotLeaf(item)?item.indLabelGroupName:item.indLabelName">{{isNotLeaf(item)?item.indLabelGroupName:item.indLabelName}}</span>
        <div class="flex-empty"></div>
        <div class="crowdAmount" v-if="!isNotLeaf(item)" :title="percentile(item.peoScaleNum&&item.peoScaleNum)">
          {{percentile(item.peoScaleNum&&item.peoScaleNum)}}
        </div>
        <Icon :class="item.checked?'checkbox checked':'checkbox'" v-if="isshow(item)" size=14
              @click="checkboxClicked(index)"
              :custom="checkStatus(index)"/>
      </div>
      <TreeItem :searchKeyWord="searchKeyWord" v-show="item.expanded" :parentChecked="item.checked"
                :treeData="item.children" :indexArr="childIndexArr(indexArr, index)"></TreeItem>
    </div>
  </div>
</template>
<script>
  import TreeItem from "./TreeItem";

  export default {
    name: "TreeItem",
    props: {
      treeData: Array,
      indexArr: Array,
      searchKeyWord: {
        type: String,
        default: ""
      },
      parentChecked: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    },
    computed: {
      currentCrowd() {
        return this.$store.getters["crowdEdit/getCurrentCrowd"];
      },
      currentCrowdTabName() {
        return this.currentCrowd.groupName;
      }
    },
    methods: {
      percentile(str) {
        if (!str) return '';
        const sdt = String(str);
        let re = /(?=(?!\b)(\d{3})+$)/g;
        return sdt.replace(re, ',');
      },
      isshow(item) {
        return parseInt(item.hierarchy) >= 3 || !item.children;
      },
      checkStatus(index) {
        const query = this.$route.query;
        if(query.notEditable==='true'){
              return;
        }
        const item = this.treeData[index];
        const children = item.children;
        if (!children || children.length < 1) {
          return item.checked
            ? "dubhe-iconfont dubhe-icon-checkbox-checked"
            : "dubhe-iconfont dubhe-icon-checkbox-unchecked";
        }
        const childrenLength = children.length;
        let checkedNum = 0;
        for (let child of children) {
          if (child.checked) {
            checkedNum += 1;
          }
        }
        if (checkedNum === 0) {
          if (!this.parentChecked && item.checked) {
            item.checked = false;
            return "dubhe-iconfont dubhe-icon-checkbox-unchecked";
          } else if (this.parentChecked && item.checked) {
            return "dubhe-iconfont dubhe-icon-checkbox-checked";
          } else {
            return "dubhe-iconfont dubhe-icon-checkbox-unchecked";
          }
        }
        if (checkedNum > 0 && checkedNum < childrenLength) {
          if (item.checked) {
            item.checked = false;
          }
          return "dubhe-iconfont dubhe-icon-checkbox-halfchecked";
        }
        if (checkedNum === childrenLength) {
          if (!item.checked) {
            item.checked = true;
          }
          return "dubhe-iconfont dubhe-icon-checkbox-checked";
        }
      },
      isNotLeaf(item) {
        return item.hierarchy || item.children;
      },
      arrowClicked(index) {
        const treeItem = _.cloneDeep(this.treeData[index]);
        treeItem.expanded = !this.treeData[index].expanded;
        this.$root.Bus.$emit(
          "updateTreeItem",
          treeItem,
          this.childIndexArr(this.indexArr, index)
        );
      },
      checkboxClicked(index) {
        const query = this.$route.query;
        if(query.notEditable){
          return;
        }
        const item = this.treeData[index];
        const treeItem = _.cloneDeep(item);
        treeItem.checked = !this.treeData[index].checked;
        const checkChangedItems = [];
        const childIndexArr = this.childIndexArr(this.indexArr, index);
        if (!treeItem.children) {
          treeItem.indexArr = childIndexArr;
          checkChangedItems.push(treeItem);
        }
        this.setChildrenChecked(
          treeItem,
          treeItem.checked,
          childIndexArr,
          checkChangedItems
        );
        this.$root.Bus.$emit(
          "updateTreeItem",
          treeItem,
          childIndexArr,
          checkChangedItems
        );
      },
      setChildrenChecked(treeItem, checked, indexArr, checkChangedItems) {
        const children = treeItem.children;
        if (!children) {
          return;
        }
        for (let index in children) {
          const child = children[index];
          child.checked = checked;
          const childIndexArr = this.childIndexArr(indexArr, index);
          if (!child.children) {
            child.indexArr = childIndexArr;
            checkChangedItems.push(child);
          }
          this.setChildrenChecked(
            child,
            checked,
            childIndexArr,
            checkChangedItems
          );
        }
      },
      custom(index) {
        if (this.treeData[index].checked) {
          return "dubhe-iconfont dubhe-icon-checkbox-checked";
        }
        return "dubhe-iconfont dubhe-icon-checkbox-unchecked";
      },
      childIndexArr(indexArr, index) {
        const childIndexArr = indexArr.slice(0);
        childIndexArr.push(index);
        return childIndexArr;
      }
    },
    mounted() {
      this.$root.Bus.$on("selectedTagsChanged", tag => {
      });
    }
  };
</script>
<style lang='less'>
  .tree-item-wrapper .tree-item:hover {
    color: var(--highlight-color);
    background-color: var(--tree-menu-highlight-font-color);
  }

  .tree-item-wrapper {
    padding-left: 1.3em;
  }

  .tree-item {
    margin-bottom: 1px;
  }

  .active {
    background-color: var(--left-menu-item-checked-bg-color);
  }

  .checkbox.checked {
    color: var(--highlight-color);
  }

  .tree-item-wrapper .arrow {
    padding-right: 4px;
    padding-left: 4px;
    cursor: pointer;
  }

  .checkbox {
    margin-left: 10px;
    margin-right: 20px;
    cursor: pointer;
    color: var(--status-processing-color);
  }

  .tree-item-wrapper .disabled {
    cursor: not-allowed;
    color: lightgray;
  }

  .tree-item-wrapper .crowdAmount {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: transparent;
    margin-left: 10px;
    width: 77px;
  }

  .tree-item-wrapper .title {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: transparent;
  }
</style>

