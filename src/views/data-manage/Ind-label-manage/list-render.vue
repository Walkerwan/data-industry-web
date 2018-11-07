<script>
import fetch from "@/modules/request/request.js";
const isSelected = [
  {
    value: "是",
    label: 0
  },
  {
    value: "否",
    label: 1
  }
];
const stateLists = [
  {
    value: "启用",
    label: 0
  },
  {
    value: "禁用",
    label: 1
  }
];
const iconTypeLists = [
  {
    value: "环状饼图",
    label: "1"
  },
  {
    value: "柱状图",
    label: "2"
  },
  {
    value: "色块地图",
    label: "3"
  },
  {
    value: "散点地图",
    label: "4"
  },
  {
    value: "列表+柱状图",
    label: "5"
  },
  {
    value: "词云图",
    label: "6"
  },
  {
    value: "气泡图",
    label: "7"
  }
];
export default {
  data: function() {
    return {
      dimensionColumns: [
        {
          title: "维度名称",
          key: "indLabelGroupname",
          render: (h, params) => {
            if (params.row && params.row.editable) {
              const that = this;
              return h("Input", {
                attrs: {
                  placeholder: "维度名称",
                  value: params.row.indLabelGroupname
                },
                props: {
                  maxlength: 10
                },
                on: {
                  "on-change": e => {
                    params.row.indLabelGroupname = e.target.value;
                    params.row.isChange = true;
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
              domProps: {
                innerHTML: params.row.indLabelGroupname
              }
            });
          }
        },
        {
          title: "所属类目",
          key: "parentNames",
          width: 160,
          render: (h, params) => {
            const vm = this;
            if (
              params.row &&
              params.row.editable &&
              vm.targetSecondClass === "all"
            ) {
              return h("list-render-belongclass", {
                props: {
                  targetRow: params.row,
                  allClassData: vm.allClassData,
                  targetFirstClass: vm.targetFirstClass,
                  secClass: vm.secClass
                }
              });
            }
            return h("span", {
              domProps: {
                innerHTML: params.row.parentNames
              }
            });
          }
        },
        {
          title: "是否参与画像生成",
          key: "isPortrayalProduct",
          width: 160,
          render: (h, params) => {
            if (params.row && params.row.editable) {
              return h(
                "Select",
                {
                  attrs: {
                    placeholder: isSelected[params.row.isPortrayalProduct].value
                  },
                  props: {
                    value: isSelected[params.row.isPortrayalProduct].value
                  },
                  on: {
                    "on-change": event => {
                      isSelected.forEach(item => {
                        if (event === item.value) {
                          params.row.isPortrayalProduct = item.label;
                          params.row.isChange = true;
                        }
                      });
                    }
                  }
                },
                isSelected.map(item => {
                  return h("Option", {
                    props: {
                      value: item.value
                    }
                  });
                })
              );
            }
            return h(
              "span",
              isSelected[params.row.isPortrayalProduct]
                ? isSelected[params.row.isPortrayalProduct].value
                : ""
            );
          }
        },
        {
          title: "选用图表类型",
          key: "charType",
          width: 160,
          render: (h, params) => {
            if (params.row && params.row.editable) {
              return h(
                "Select",
                {
                  attrs: {
                    placeholder: iconTypeLists[params.row.charType - 1].value
                  },
                  props: {
                    value: iconTypeLists[params.row.charType - 1].value
                  },
                  on: {
                    "on-change": event => {
                      iconTypeLists.forEach(item => {
                        if (item.value === event) {
                          params.row.charType = item.label;
                          params.row.isChange = true;
                        }
                      });
                    }
                  }
                },
                iconTypeLists.map(item => {
                  return h("Option", {
                    props: {
                      value: item.value
                    }
                  });
                })
              );
            }
            return h("span", {
              domProps: {
                innerHTML: iconTypeLists[params.row.charType - 1].value
              }
            });
          }
        },
        {
          title: "标签数量",
          key: "activeTagPercentage",
          renderHeader: (h, params) => {
            return h("div", [
              h("span", "标签数量"),
              h("span", {
                attrs: {
                  title: "该数量为使用中的标签数量/总标签数量！"
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
          render: (h,params) => {
            const targetSplit = params.row.activeTagPercentage.split("/");
            return h("div",[
              h("span",{
                style: {
                  // color: 'RGB(51,255,0)'
                }
              },targetSplit[0]),
              h("span",{
                style: {
                  // color:'RGB(24,144,255)',
                }
              },'/'),
              h("span",{
                style: {
                  // color:'RGB(24,144,255)',
                }
              },targetSplit[1]),
            ])
          }
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            if (params.row && params.row.editable) {
              return h(
                "Select",
                {
                  attrs: {
                    placeholder: stateLists[params.row.status].value
                  },
                  props: {
                    value: stateLists[params.row.status].value
                  },
                  on: {
                    "on-change": event => {
                      stateLists.forEach(item => {
                        if (item.value === event) {
                          params.row.status = item.label;
                          params.row.isChange = true;
                        }
                      });
                    }
                  }
                },
                stateLists.map(item => {
                  return h("Option", {
                    props: {
                      value: item.value
                    }
                  });
                })
              );
            }
            const dimesionStatus = stateLists[params.row.status];
            let styles = {
                display: 'inline-block',
                width: "42px",
                height: "20px",
                textAlign: "center",
                backgroundColor: "#0d9512",
                borderRadius: "10px"
              };
            if ((dimesionStatus.value === "禁用")) {
              styles.backgroundColor = '#d43f39';
            }
            return h(
              "span",
              {
                style:styles
              },
              dimesionStatus ? dimesionStatus.value : ""
            );
          }
        },
        {
          title: "操作",
          key: "operate",
          sortables: false,
          renderHeader: (h, params) => {
            const that = this;
            if (params.column && params.column.sortables) {
              return h("div", [
                h("span", "操作"),
                h("span", {
                  attrs: {
                    title: "排序保存"
                  },
                  style: {
                    display: "inline-block",
                    width: "15px",
                    height: "15px",
                    position: "relative",
                    top: "3px",
                    left: "6px",
                    backgroundImage:
                      "url(" + require("./assets/demesion-save.svg") + ")"
                  },
                  on: {
                    click: () => {
                      that.sortSave(params.column);
                    }
                  }
                }),
                h("span", {
                   attrs: {
                    title: "排序取消"
                  },
                  style: {
                    display: "inline-block",
                    width: "15px",
                    height: "15px",
                    position: "relative",
                    top: "3px",
                    left: "16px",
                    backgroundImage:
                      "url(" + require("./assets/demesion-back.svg") + ")"
                  },
                  on: {
                    click: () => {
                      that.sortCancel(params.column);
                    }
                  }
                })
              ]);
            }
            return h("div", [
              h("span", "操作"),
              h("span", {
                 attrs: {
                    title: "筛选相同二级类目后,点击可进行手动排序！"
                  },
                style: {
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  position: "relative",
                  top: "3px",
                  left: "6px",
                  background:
                    "url(" + require("./assets/demesion-order.svg") + ")"
                },
                on: {
                  click: () => {
                    if (that.targetSecondClass === "all") {
                      return;
                    }
                    // const dimesionDomArray = document.querySelectorAll('#left-part-list .ivu-table-tbody .ivu-table-row');
                    that.$set(params.column, "sortables", true);
                  }
                }
              })
            ]);
          },
          render: (h, params) => {
            const that = this;
            if (params.row && params.row.editable) {
              return h("div", [
                h("span", {
                   attrs: {
                    title: "编辑保存"
                  },
                  style: {
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    position: "relative",
                    top: "3px",
                    left: "6px",
                    background:
                      "url(" + require("./assets/demesion-sure.svg") + ")"
                  },
                  on: {
                    click: () => {
                      this.demesionSave(params);
                    }
                  }
                }),
                h("span", {
                   attrs: {
                    title: "编辑取消"
                  },
                  style: {
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    position: "relative",
                    top: "3px",
                    left: "16px",
                    background:
                      "url(" + require("./assets/demesion-cancel.svg") + ")"
                  },
                  on: {
                    click: () => {
                      this.demesionCancel(params);
                    }
                  }
                })
              ]);
            }
            const domArray = [
              h("span", {
                 attrs: {
                    title: "编辑"
                  },
                style: {
                  display: "inline-block",
                  width: "20px",
                  height: "20px",
                  position: "relative",
                  top: "3px",
                  left: "6px",
                  background:
                    "url(" + require("./assets/demesion-editor.svg") + ")"
                },
                on: {
                  click: () => {
                    this.demesionEditor(params);
                  }
                }
              }),
              h("span", {
                 attrs: {
                    title: "删除"
                  },
                style: {
                  display: "inline-block",
                  width: "20px",
                  height: "20px",
                  position: "relative",
                  top: "3px",
                  left: "16px",
                  background:
                    "url(" + require("./assets/demetion-delete.svg") + ")"
                },
                on: {
                  click: () => {
                    this.demesionRemove(params);
                  }
                }
              })
            ];
            if (params.column && params.column.sortables) {
              domArray.push(
                h("span", {
                   attrs: {
                    title: "向上移动"
                  },
                  style: {
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
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
                      that.moveOneStepToUp(params.index);
                    }
                  }
                })
              );
              domArray.push(
                h("span", {
                   attrs: {
                    title: "向下移动"
                  },
                  style: {
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    position: "relative",
                    top: "3px",
                    left: "16px",
                    cursor: "pointer",
                    background:
                      "url(" + require("./assets/demesion-down.svg") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                  },
                  on: {
                    click: () => {
                      that.moveOneStepToDown(params.index);
                    }
                  }
                })
              );
            }
            return h("div", domArray);
          }
        }
      ],
      dimensionDaTa: []
    };
  },
  methods: {
    demesionEditor(params) {
      params.row.editable = true;
    },
    demesionRemove(params) {
      const that = this;
      this.$Modal.confirm({
        onOk: () => {
          const indLabelGroupid = params.row.indLabelGroupid;
          if (indLabelGroupid) {
            fetch({
              method: "get",
              url: "industryGroup/removeDimensions",
              params: {
                indLabelGroupid: indLabelGroupid
              }
            }).then(res => {
              if (res.data) {
                if(res.data.code === 101) {
                  that.$Message.error(res.data.resMsg);
                  return;
                }
                if (res.data.code === 0) {
                  that.$Message.error("删除失败！");
                  return;
                }
                if (res.data.code === 200) {
                  that.$Message.success("删除成功！");
                  that.dimensionDaTa.splice(params.index, 1);
                }
              }
            });
            return;
          }
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
            "是否删除？"
          );
        }
      });
    },
    // 维度编辑保存
    demesionSave(params) {
      const that = this;
      const index = params.index;
      if (!params.row.isChange) {
        params.row.editable = false;
        return;
      }
      const indLabelGroupid = params.row.indLabelGroupid;
      let parentId = null;
      if (this.targetSecondClass !== "all") {
        parentId = this.targetSecondClass.indLabelGroupid;
      } else {
        parentId = params.row.parentId;
      }
      const indLabelGroupname = params.row.indLabelGroupname
        ? params.row.indLabelGroupname
        : null;
      const parentNames = params.row.parentNames
        ? params.row.parentNames
        : null;
      const isPortrayalProduct = params.row.isPortrayalProduct
        ? params.row.isPortrayalProduct
        : 0;
      const charType = params.row.charType ? params.row.charType : 0;
      const activeTagPercentage = params.row.activeTagPercentage
        ? params.row.activeTagPercentage
        : null;
      const status = params.row.status ? params.row.status : 0;
      if (!indLabelGroupname) {
        this.$Message.error("维度名称不能为空！");
        return;
      }
      if (!parentNames) {
        this.$Message.error("请选择所属类目！");
        return;
      }
      this.searchDimesionName = params.row.targetSelectedClass;
      if (!indLabelGroupid) {
        const indInvolvedcode = that.targetIndustryTag.indCode
          ? that.targetIndustryTag.indCode
          : null;
        if (!indInvolvedcode) {
          return;
        }
        fetch({
          method: "post",
          url: "industryGroup/createDimensions",
          params: {
            indInvolvedcode: indInvolvedcode,
            parentId: parentId,
            indLabelGroupname: indLabelGroupname,
            parentNames: parentNames,
            isPortrayalProduct: isPortrayalProduct,
            charType: charType,
            status: status
          }
        }).then(res => {
          if (res.data) {
            if (res.data.code === 0) {
              that.$Message.error("添加维度失败！");
              return;
            }
            if (res.data.code === 604) {
              that.$Message.error(res.data.resMsg);
              return;
            }
            if (res.data.code === 200) {
              that.$Message.success("添加维度成功！");
              setTimeout(() => {
                that.getDemesionData();
                that.getBelongDemesionData();
              }, 100);
              params.row.editable = false;
            }
          }
        });
        return;
      }
      fetch({
        method: "post",
        url: "industryGroup/editDimensions",
        params: {
          indLabelGroupid: indLabelGroupid,
          parentId: parentId,
          indLabelGroupname: indLabelGroupname,
          parentNames: parentNames,
          isPortrayalProduct: isPortrayalProduct,
          charType: charType,
          activeTagPercentage: activeTagPercentage,
          status: status
        }
      }).then(res => {
        if (res.data) {
          if (res.data.code === 200) {
            this.$Message.success("修改维度成功！");
            this.setDemesionValue({
              index: index,
              indLabelGroupname: indLabelGroupname,
              parentNames: parentNames,
              isPortrayalProduct: isPortrayalProduct,
              charType: charType,
              activeTagPercentage: activeTagPercentage,
              status: status
            });
            return;
          }
        }
      });
      this.dimensionDaTa[index].editable = false;
    },
    // 重新设置新值
    setDemesionValue(params) {
      const targetRow = this.dimensionDaTa[params.index];
      this.$set(targetRow, "indLabelGroupname", params.indLabelGroupname);
      this.$set(targetRow, "parentNames", params.parentNames);
      this.$set(targetRow, "isPortrayalProduct", params.isPortrayalProduct);
      this.$set(targetRow, "charType", params.charType);
      this.$set(targetRow, "activeTagPercentage", params.activeTagPercentage);
      this.$set(targetRow, "status", params.status);
    },
    demesionCancel(params) {
      if (!params.row.indLabelGroupid) {
        this.dimensionDaTa.splice(params.index, 1);
      }
      params.row.editable = false;
    },
    // 添加维度
    addDimesion() {
      let parentNamesStr = "";
      const targetFstClassStr =
        this.targetFirstClass !== "all"
          ? this.targetFirstClass.indLabelGroupname
          : "";
      const targetSecClassStr =
        this.targetSecondClass !== "all"
          ? this.targetSecondClass.indLabelGroupname
          : "";
      if (targetSecClassStr && targetFstClassStr) {
        parentNamesStr = targetFstClassStr + "-" + targetSecClassStr;
      }
      this.dimensionDaTa.unshift({
        indLabelGroupname: "",
        parentNames: parentNamesStr,
        isPortrayalProduct: 0,
        charType: "1",
        activeTagPercentage: "0/0",
        status: 0,
        editable: true,
        isChange: true
      });
    },
    // 排序保存
    sortSave(column) {
      const that = this;
      if (this.dimensionDaTa.length > 0) {
        const paramsArray = [];
        let sort = 1;
        this.dimensionDaTa.forEach(item => {
          const param = new Object();
          param["sort"] = sort;
          param["indLabelGroupid"] = item.indLabelGroupid;
          paramsArray.push(param);
          sort++;
        });
        fetch({
          method: "post",
          url: "industryGroup/sortDimensions",
          params: paramsArray
        }).then(res => {
          if (res.data && res.data.code === 101) {
            that.$Message.error(res.data.resMsg);
            return;
          }
          if (res.status === 200) {
            that.$Message.success("排序成功！");
            return;
          }
        });
      }
      this.$set(column, "sortables", false);
    },
    // 排序返回
    sortCancel(column) {
      this.$set(column, "sortables", false);
    },
    // 向上移动一步
    moveOneStepToUp(index) {
      if (index < 1) {
        return;
      }
      const target = this.dimensionDaTa.splice(index, 1);
      this.dimensionDaTa.splice(index - 1, 0, target[0]);
    },
    // 向下移动一步
    moveOneStepToDown(index) {
      if (index === this.dimensionDaTa.length) {
        return;
      }
      const target = this.dimensionDaTa.splice(index, 1);
      this.dimensionDaTa.splice(index + 1, 0, target[0]);
    },
    // 维度的当前行发生变化时
    updateDimesion(currentRow, oldCurrentRow) {
      this.targetDimesion = currentRow;
      this.getTagData({
        industryGroupid: currentRow.indLabelGroupid
      });
    }
  }
};
</script>
