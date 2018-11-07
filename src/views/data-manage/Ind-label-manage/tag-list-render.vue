<script>
import fetch from "@/modules/request/request.js";
const checkStatusList = [
  {
    value: "使用中",
    label: 0
  },
  {
    value: "未使用",
    label: 1
  }
];
export default {
  data: function() {
    return {
      tagColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "标签名称",
          key: "indLabelName",
          ellipsis: true,
          render: (h, params) => {
            const that = this;
            if (params.row && params.row.editable) {
              return h("Input", {
                props: {
                  maxlength: 10
                },
                attrs: {
                  placeholder: "标签名称",
                  value: params.row.indLabelName
                },
                on: {
                  "on-change": e => {
                    params.row.indLabelName = e.target.value;
                  }
                  // "on-keydown": e => {
                  //   if(e.target.value.length >=10) {
                  //     that.$Message.error("维度名称不能超过10个字符！");
                  //   }
                  // }
                }
              });
            }
            return h("span", {
              attrs: {
                title: params.row.indLabelName
              },
              domProps: {
                innerHTML: params.row.indLabelName
              }
            });
          }
        },
        {
          title: "源标签",
          key: "basicsLabelNames",
          renderHeader: (h, params) => {
            return h("div", [
              h("span", "源标签"),
              h("span", {
                attrs: {
                  title: "灰色代表已下架！"
                },
                style: {
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  position: "relative",
                  top: "3px",
                  left: "6px",
                  background:
                    "url(" + require("./assets/interrogation.svg") + ")"
                }
              })
            ]);
          },
          render: (h, params) => {
            const that = this;
            if (params.row && params.row.editable) {
              return h("orgin-tag-select", {
                props: {
                  isSeleted: true,
                  targetRow: params.row
                }
              });
            }
            const childArray = [];
            let targetArray = "";
            if (!Array.isArray(params.row.basicsLabelNames)) {
              return;
            }
            params.row.basicsLabelNames.forEach((item,index,orgArray) => {
              if(index< orgArray.length-1) {
                childArray.push(h("span", item + ","));
                targetArray += item + ",";
              } else {
                childArray.push(h("span", item ));
                targetArray += item;
              }
            });
            return h(
              "div",
              {
                style: {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                },
                attrs: {
                  title: targetArray
                }
              },
              childArray
            );
          }
        },
        {
          title: "所属维度",
          key: "dimensionsName",
          width: 120,
          ellipsis: true,
          render: (h, params) => {
            const that = this;
            if (params.row && params.row.editable && !that.targetDimesion) {
              return h("tag-belong-dimesion", {
                props: {
                  targetRow: params.row,
                  targetIndustry: that.targetIndustryTag
                }
              });
            }
            let titleName = params.row.dimensionsName;
            if (that.targetDimesion) {
              titleName = that.targetDimesion.indLabelGroupname;
            }
            return h(
              "span",
              {
                attrs: {
                  title: titleName
                }
              },
              titleName
            );
          }
        },
        {
          title: "标签状态",
          key: "checkStatus",
          sortables: false,
          width: 160,
          renderHeader: (h, params) => {
            const that = this;
            if (params.column && params.column.sortables) {
              return h("div", [
                h("span", "标签状态"),
                h("span", {
                  style: {
                    display: "inline-block",
                    width: "15px",
                    height: "15px",
                    position: "relative",
                    top: "3px",
                    left: "6px",
                    background:
                      "url(" + require("./assets/tag-select.svg") + ")"
                  }
                }),
                h("span", {
                  style: {
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    position: "relative",
                    top: "3px",
                    left: "10px",
                    backgroundImage:
                      "url(" + require("./assets/demesion-save.svg") + ")"
                  },
                  on: {
                    click: () => {
                      that.tagSortSave(params.column);
                    }
                  }
                }),
                h("span", {
                  style: {
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    position: "relative",
                    top: "3px",
                    left: "15px",
                    backgroundImage:
                      "url(" + require("./assets/demesion-back.svg") + ")"
                  },
                  on: {
                    click: () => {
                      that.tagSortCancel(params.column);
                    }
                  }
                })
              ]);
            }
            return h("div", [
              h("span", "标签状态"),
              h("span", {
                attrs: {
                  title: "筛选",
                },
                style: {
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  position: "relative",
                  top: "3px",
                  left: "6px",
                  background: "url(" + require("./assets/tag-select.svg") + ")"
                }
              }),
              h("span", {
                attrs: {
                  title: "同一个维度下才可以排序！",
                },
                style: {
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  position: "relative",
                  top: "3px",
                  left: "16px",
                  background:
                    "url(" + require("./assets/demesion-order.svg") + ")"
                },
                on: {
                  click: () => {
                    if (!that.targetDimesion || that.tagDaTa.length == 0) {
                      return;
                    }
                    that.isSortable = true;
                    that.$set(params.column, "sortables", true);
                  }
                }
              })
            ]);
          },
          render: (h, params) => {
            const that = this;
            const tagCheckStatus = checkStatusList[params.row.checkStatus].value;
            const domArray = [
              h("span", tagCheckStatus
                ? tagCheckStatus
                : "")
            ];
            if (params.column && params.column.sortables) {
              domArray.push(
                h("span", {
                  style: {
                    display: "inline-block",
                    width: "15px",
                    height: "15px",
                    position: "relative",
                    top: "3px",
                    left: "20px",
                    cursor: "pointer",
                    background:
                      "url(" + require("./assets/demetion-up.svg") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                  },
                  on: {
                    click: () => {
                      that.tagMoveOneStepToUp(params.index);
                    }
                  }
                })
              );
              domArray.push(
                h("span", {
                  style: {
                    display: "inline-block",
                    width: "15px",
                    height: "15px",
                    position: "relative",
                    top: "3px",
                    left: "26px",
                    cursor: "pointer",
                    background:
                      "url(" + require("./assets/demesion-down.svg") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                  },
                  on: {
                    click: () => {
                      that.tagMoveOneStepToDown(params.index);
                    }
                  }
                })
              );
              return h("div", domArray);
            }
            if (params.row && params.row.editable) {
              return h("div", [
                h(
                  "Select",
                  {
                    style: {
                      width: "70px"
                    },
                    attrs: {
                      placeholder: checkStatusList[params.row.checkStatus].value
                    },
                    props: {
                      value: checkStatusList[params.row.checkStatus].value
                    },
                    on: {
                      "on-change": event => {
                        checkStatusList.forEach(item => {
                          if (item.value === event) {
                            params.row.checkStatus = item.label;
                          }
                        });
                      }
                    }
                  },
                  checkStatusList.map(item => {
                    return h("Option", {
                      props: {
                        value: item.value
                      }
                    });
                  })
                ),
                h("span", {
                  style: {
                    display: "inline-block",
                    width: "15px",
                    height: "15px",
                    position: "relative",
                    top: "3px",
                    left: "26px",
                    background:
                      "url(" + require("./assets/demesion-save.svg") + ")"
                  },
                  on: {
                    click: () => {
                      that.editorSave(params);
                    }
                  }
                }),
                h("span", {
                  style: {
                    display: "inline-block",
                    width: "15px",
                    height: "15px",
                    position: "relative",
                    top: "3px",
                    left: "36px",
                    background:
                      "url(" + require("./assets/demesion-cancel.svg") + ")"
                  },
                  on: {
                    click: () => {
                      that.editorCancel(params);
                    }
                  }
                })
              ]);
            }
            let stylesColor = "#0d9512";
            if(tagCheckStatus === "未使用") {
              stylesColor = '#d43f39';
            }
            return h("div", [
               h("span", {
                style: {
                  display:"inline-block"
                }
              }, [h("span",{
                style: {
                  display:"inline-block",
                  width:"10px",
                  height: "10px",
                  backgroundColor: stylesColor,
                  borderRadius: "10px",
                }
              }),h("span",{
                style: {
                  color: stylesColor,
                  marginLeft: "8px",
                }
              },tagCheckStatus? tagCheckStatus: ""),]),
              h(
                "div",
                {
                  class: {
                    "tag-operate": true
                  },
                  style: {
                    display: "none"
                  }
                },
                [
                  h("span", {
                    style: {
                      display: "inline-block",
                      width: "15px",
                      height: "15px",
                      position: "relative",
                      top: "3px",
                      left: "26px",
                      background:
                        "url(" + require("./assets/demesion-editor.svg") + ")"
                    },
                    on: {
                      click: () => {
                        that.editorRow(params);
                      }
                    }
                  }),
                  h("span", {
                    style: {
                      display: "inline-block",
                      width: "15px",
                      height: "15px",
                      position: "relative",
                      top: "3px",
                      left: "36px",
                      background:
                        "url(" + require("./assets/demetion-delete.svg") + ")"
                    },
                    on: {
                      click: () => {
                        that.deleteRow(params);
                      }
                    }
                  })
                ]
              )
            ]);
          }
        }
      ],
      tagDaTa: [],
      tagTotal: 0,
      tagPageSize: 0,
      tagTargetSelectedId: "",
      isTagLoading: false,
      isLoadNextPageIndex: false,
      isLoadBeforePageIndex: false,
      isSortable: false,
    };
  },
  methods: {
    // 开始编辑
    editorRow(params) {
      params.row.editable = true;
    },
    // 获取所属维度的数据
    getBelongDemesionData() {
      const that = this;
      const industryCode = this.targetIndustryTag.indCode;
      if (!industryCode) {
        return;
      }
      fetch({
        method: "get",
        url: "industryLabel/getDimensions",
        params: {
          industryCode: industryCode
        }
      }).then(res => {
        if (res.status === 200) {
          that.tagBelongDimesion = res.data;
          return;
        }
      });
    },
    // 删除行
    deleteRow(params) {
      const that = this;
      this.$Modal.confirm({
        onOk: () => {
          const labelId = params.row.indLabelId;
          const indLabelGroupid = params.row.indInvolvedGroupid;
          if (!indLabelGroupid) {
            this.$Message.error("维度ID不能为空！");
            return;
          }
          fetch({
            method: "get",
            url: "industryLabel/removeLabel",
            params: {
              labelId: labelId,
              indLabelGroupid: indLabelGroupid
            }
          }).then(res => {
            if (res.data) {
              if (res.data.code === 200) {
                that.$Message.success("标签删除成功！");
                that.togglePage(that.targetPageIndex);
                that.getDemesionData({},true);
                return;
              }
            }
          });
        },
        render: h => {
          return h(
            "span",
            {
              style: {
                position: "absolute",
                left: "150px",
                top: "10px",
                fontSize: "16px"
              }
            },
            "是否删除！"
          );
        }
      });
    },
    // 编辑保存
    editorSave(params) {
      const that = this;
      const labelName = params.row.indLabelName;
      const checkStatus = params.row.checkStatus;
      const basicsLabelNames = params.row.basicsLabelNames;
      const relevanceBasicsLabelcode = params.row.relevanceBasicsLabelcode&&params.row.relevanceBasicsLabelcode.length>0?params.row.relevanceBasicsLabelcode:params.row.basicsLabelCodes;
      const indInvolvedGroupid = params.row.indInvolvedGroupid
        ? params.row.indInvolvedGroupid
        : this.targetDimesion
          ? this.targetDimesion.indLabelGroupid
          : null;
      if (!basicsLabelNames|| basicsLabelNames.length===0) {
        this.$Message.error("源标签不能为空！");
        return;
      }
      if (!indInvolvedGroupid) {
        this.$Message.error("维度ID不能为空！");
        return;
      }
      if (params.row && params.row.indLabelId) {
        const labelId = params.row.indLabelId;
        // params.row.indLabelName
        fetch({
          method: "post",
          url: "industryLabel/editLabel",
          params: {
            labelId: labelId,
            labelName: labelName,
            checkStatus: checkStatus,
            basicsLabelNames: basicsLabelNames,
            relevanceBasicsLabelcode: relevanceBasicsLabelcode,
            indInvolvedGroupid: indInvolvedGroupid
          }
        }).then(res => {
          if (res.data) {
            if(res.data.code === 0||res.data.code === 604) {
              that.$Message.error(res.data.resMsg);
              return;
            }
            if (res.data.code === 200) {
              that.$Message.success("编辑成功！");
              params.row.editable = false;
              that.getDemesionData({},true);
              return;
            }
          }
        });
        return;
      }
      fetch({
        method: "post",
        url: "industryLabel/createLabel",
        params: {
          labelName: labelName,
          checkStatus: checkStatus,
          relevanceBasicsLabelname: basicsLabelNames,
          relevanceBasicsLabelcode: relevanceBasicsLabelcode,
          indInvolvedGroupid: indInvolvedGroupid
        }
      }).then(res => {
        if (res.data) {
          if (res.data.code === 0||res.data.code === 604) {
            that.$Message.error(res.data.resMsg);
            return;
          }
          if (res.data.code === 200) {
            that.$Message.success("创建标签成功！");
            //刷新标签页
            that.togglePage(that.targetPageIndex);
            that.getDemesionData({},true);
            params.row.editable = false;
            return;
          }
        }
      });
    },
    // 编辑取消
    editorCancel(params) {
      if (!params.row.indLabelId) {
        this.tagDaTa.splice(params.index, 1);
      }
      params.row.editable = false;
    },
    // 添加标签
    addTag() {
      if (this.dimensionDaTa === 0) {
        this.$Message.warn("创建标签时维度不能为空！");
        return;
      }
      this.tagDaTa.unshift({
        timeId: new Date().getTime(),
        indLabelName: "",
        basicsLabelNames: [],
        dimensionsName: "",
        checkStatus: 0,
        editable: true,
        sortables: false
      });
    },
    // 标签的分页
    togglePage(pageIndex) {
      if(this.isSortable) {
        this.$Message.error("排序过程中不要点击分页,请先保存！")
        return;
      }
      const params = {};
      if (pageIndex) {
        params["page"] = pageIndex;
        this.targetPageIndex = pageIndex;
      }
      const industryGroupid = this.targetDimesion
        ? this.targetDimesion.indLabelGroupid
        : null;
      if (!!industryGroupid) {
        params["industryGroupid"] = industryGroupid;
      }
      this.getTagData(params);
    },
    // 排序保存
    tagSortSave(column) {
      const that = this;
      const tagSortArray = [];
      let sort = 1;
      this.tagDaTa.forEach(item => {
        const sortObj = {
          sort: sort,
          indLabelId: item.indLabelId
        }
        tagSortArray.push(sortObj);
        sort++;
      })
      fetch({
        method: "post",
        url: "industryLabel/sortLabels",
        params: tagSortArray
      }).then(res => {
        if(res.status === 200) {
          that.$Message.success("排序成功！");
            that.isSortable = false;
            that.isLoadNextPageIndex =false;
            that.isLoadBeforePageIndex = false;
            that.$set(column, "sortables", false);
            that.togglePage(this.targetPageIndex);
            return;
        }
        // if(res.data) {
        //   if(res.data.code === 200){
        //     that.$Message.success("排序成功！");
        //     that.isLoadNextPageIndex =false;
        //     that.isLoadBeforePageIndex = false;
        //     that.$set(column, "sortables", false);
        //     that.togglePage(this.targetPageIndex);
        //     that.isSortable = false;
        //     return;
        //   }
        // }
      })
    },
    // 排序取消
    tagSortCancel(column) {
      this.isSortable = false;
       this.togglePage(this.targetPageIndex);
      this.$set(column, "sortables", false);
    },
    // 向上移动
    tagMoveOneStepToUp(index) {
      if(this.tagDaTa.length>=45){
        this.$Message.error("排序只能排序45条数据！");
        return;
      }
      if(index<1 && this.isLoadBeforePageIndex) {
        return;
      }
      if (index < 1 &&this.targetPageIndex>1&&!this.isLoadBeforePageIndex) {
         const that = this;
         this.isTagLoading = true;
          const industryCode = this.targetIndustryTag
        ? this.targetIndustryTag.indCode
        : null;
        const page = this.targetPageIndex?this.targetPageIndex-1:'1';
        const rows = 15;
        const industryGroupid = this.targetDimesion
        ? this.targetDimesion.indLabelGroupid
        : null;
        fetch({
           method: "get",
            url: "industryLabel/loadLabels",
            params: {
              industryGroupid:industryGroupid,
              industryCode: industryCode,
              page:page,
              rows:15,
            }
        }).then(res => {
          if(res.data) {
            that.isTagLoading = false;
            let toggleData = res.data.rows
              ? res.data.rows.map(item => {
                  return {
                    ...item,
                    editable: false,
                    sortables: false
                  };
                })
              : [];
              toggleData= toggleData.concat(that.tagDaTa);
              that.tagDaTa = toggleData;
              that.isLoadBeforePageIndex = true;
              return;
          }
        })
        return;
      }
      const target = this.tagDaTa.splice(index, 1);
      this.tagDaTa.splice(index - 1, 0, target[0]);
    },
    // 向下移动
    tagMoveOneStepToDown(index) {
      if(this.tagDaTa.length>=45){
        this.$Message.error("排序只能排序45条数据！");
        return;
      }
      if (index === this.tagDaTa.length-1&&this.isLoadNextPageIndex< Math.ceil(this.tagTotal/this.tagPageSize)&& !this.isLoadNextPageIndex) {
         const that = this;
         this.isTagLoading = true;
          const industryCode = this.targetIndustryTag
        ? this.targetIndustryTag.indCode
        : null;
        const page = this.targetPageIndex?this.targetPageIndex+1:'1';
        const rows = 15;
        const industryGroupid = this.targetDimesion
        ? this.targetDimesion.indLabelGroupid
        : null;
        fetch({
           method: "get",
            url: "industryLabel/loadLabels",
            params: {
              industryGroupid:industryGroupid,
              industryCode: industryCode,
              page:page,
              rows:15,
            }
        }).then(res => {
          if(res.data) {
            that.isTagLoading = false;
            let toggleData = res.data.rows
              ? res.data.rows.map(item => {
                  return {
                    ...item,
                    editable: false,
                    sortables: false
                  };
                })
              : [];
              toggleData= that.tagDaTa.concat(toggleData);
              that.tagDaTa = toggleData;
              that.isLoadNextPageIndex = true;
              return;
          }
        })
        return;
      }
      const target = this.tagDaTa.splice(index, 1);
      this.tagDaTa.splice(index + 1, 0, target[0]);
    },
    // 标签搜索
    tagSearch(e) {
      if (e.keyCode && e.keyCode === 13) {
        this.tagSearchAll();
      }
    },
    // 根据维度搜索标签
    searchTagData(value) {
      this.tagTargetSelectedId = value.value;
      this.tagSearchAll();
    },
    // 搜索函数封装
    tagSearchAll() {
      const indLabelName = this.searchTagName ? this.searchTagName : null;
      const industryGroupid = this.tagTargetSelectedId && this.tagTargetSelectedId!=='all'
        ? this.tagTargetSelectedId
        : null;
      this.getTagData({
        indLabelName: indLabelName,
        industryGroupid: industryGroupid
      });
    },
    // 选中的标签行
    tagSelectRow(selection, row) {
      this.tagSelectedArray = selection;
    },

    // 批量编辑状态为不使用
    tagEditorNotUse() {
      this.tagEditorState = 1;
    },
    // 批量编辑状态为使用
    tagEditorUse() {
      this.tagEditorState = 0;
    },
    //快速修改标签
    quickEditorTagFunc() {
      const that = this;
      if (this.tagSelectedArray.length > 0) {
        const industryLabelList = [];
        this.tagSelectedArray.forEach(item => {
          industryLabelList.push({
            labelId: item.indLabelId
          });
        });
        const checkStatus = this.tagEditorState;
        fetch({
          method: "post",
          url: "industryLabel/changeLabels",
          params: {
            industryLabelList: industryLabelList,
            checkStatus: checkStatus
          }
        }).then(res => {
          if (res.data) {
            if (res.data.code === 0) {
              that.$Message.error(res.data.resMsg);
              return;
            }
            if (res.data.code === 200) {
              that.$Message.success("批量修改成功！");
              that.togglePage(that.targetPageIndex);
              that.getDemesionData({},true);
            }
          }
        });
      }
    },
    // 快速删除标签
    quickDeleteTagFunc() {
      const that = this;
      if (this.tagSelectedArray.length > 0) {
        const industryLabelList = [];
        this.tagSelectedArray.forEach(item => {
          if(item.indLabelId) {
            industryLabelList.push({
              labelId: item.indLabelId
            });
          } else {
             that.tagDaTa.forEach((child,index) => {
               if(child.timeId === item.timeId) {
                 that.tagDaTa.splice(index,1);
                 return;
               }
             })
          }
        });
        if(industryLabelList.length == 0) {
          return;
        }
        fetch({
          method: "post",
          url: "industryLabel/removeLabels",
          params: {
            industryLabelList: industryLabelList
          }
        }).then(res => {
          if (res.data) {
            if (res.data.code === 0) {
              that.$Message.error(res.data.resMsg);
              return;
            }
            if (res.data.code === 200) {
              that.$Message.success("批量删除成功！");
              that.tagSelectedArray = [];
              that.togglePage(that.targetPageIndex);
              that.getDemesionData({},true);
            }
          }
        });
      }
    }
  }
};
</script>
