<template>
    <div id="demesion-belong">
        <Select v-model="targetSelect" @on-change="changeClassNames" :placeholder="targetSelect">
            <Input placeholder="请输入关键字搜索" style="width: auto;padding: 0px 5px 0px 5px;">
                <Icon type="ios-search" slot="append" />
            </Input>
            <Tree :data="selectData"></Tree>
        </Select>
    </div>
</template>

<script>
export default {
  data() {
    return {
      targetSelect: null,
      selectData: [],
      targetSelectId: null
    };
  },
  props: {
    targetRow: Object,
    allClassData: Array,
    secClass: Object | String,
    targetFirstClass: Object | String
  },

  mounted() {
    this.targetSelect = this.targetRow.parentNames;
    this.selectData = this.getSelectDataArray();
  },
  methods: {
    // 重组数列表
    getSelectDataArray() {
      const that = this;
      let usefulArray;
      if (this.targetFirstClass !== "all") {
        this.targetFirstClass.child = this.secClass;
        usefulArray = [this.targetFirstClass];
      } else {
        usefulArray = this.allClassData;
      }
      let newSelectList = new Array();
      if (usefulArray && Array.isArray(usefulArray)) {
        newSelectList = usefulArray.map(item => {
          return {
            title: item.indLabelGroupname,
            expand: false,
            render: (h, params) => {
              return h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    height: "34px",
                    lineHeight: "34px"
                  }
                },
                item.indLabelGroupname
              );
            },
            children: item.child.map(item => {
              return {
                title: item.indLabelGroupname,
                expand: false,
                render: (h, params) => {
                  const vm = this;
                  return h(
                    "Option",
                    {
                      attrs: {
                        parentId: item.indLabelGroupid
                      },
                      style: {
                        display: "inline-block",
                        // width:'100%',
                        height: "34px",
                        lineHeight: "34px",
                      },
                      props: {
                        value: item.indLabelGroupname,
                      },
                      nativeOn: {
                        "click": (e) => {
                          that.targetSelectId = e.target.__vue__.$attrs.parentId?e.target.__vue__.$attrs.parentId:null;
                          that.targetRow['parentId'] = e.target.__vue__.$attrs.parentId?e.target.__vue__.$attrs.parentId:null;
                        }
                      }
                    },
                    item.indLabelGroupname
                  );
                }
              };
            })
          };
        });
        return newSelectList;
      }
    },
    // 类目变化时触发
    changeClassNames(value) {
      const that =this;
      let targetParentRow;
      let targetValue = '';
      this.allClassData.forEach(item => {
        if(item.child && item.child.length > 0) {
          item.child.forEach((secItem,index,orgArray)=> {
            if(secItem.indLabelGroupid === that.targetSelectId) {
              targetParentRow = item;
            }
          })
        }
      });
      if(targetParentRow) {
        targetValue = targetParentRow.indLabelGroupname + '-';
      } else {
        targetValue = ''
      }
      this.targetRow.parentNames = targetValue + value;
      this.targetRow.isChange = true;
    }
  }
};
</script>

<style>
#demesion-belong .ivu-tree ul li {
  cursor: pointer;
  margin-top: 0px;
  margin-bottom: 0px;
}
#demesion-belong .ivu-tree-arrow {
  width: 20px;
  padding-left: 8px;
  padding-right: 5px;
  text-align: left;
}
#demesion-belong .ivu-select-dropdown {
  width: 157px !important;
  height: 320px !important;
  left: auto !important;
}
</style>


