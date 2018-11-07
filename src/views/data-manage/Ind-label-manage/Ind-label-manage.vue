<template>
    <div id="data-container" class="data-container">
       <div class="content">
           <div class="catalog">
                <div class="catalog-title">
                    <span class="industry">行业</span>
                    <span class="manage" @click = "catalogEdit">管理</span>
                </div>
                <ul ref='catalogs' class="catalog-content" @click="toggleCatalog" id="manage-catalogs">
                    <li v-for="(item,index) in catalogData" :class="{'active': index === 0?true:false}" class="item" v-bind="{'index': index }" @click="toggleManageTag(item)" :title="item.indName" :key="index">{{item.indName}}</li>
                </ul>
           </div>
           <div class="data-content">
               <div class="data-content-title">特别说明：本部分内容调整将直接影响到“用户画像”，请谨慎操作！</div>
               <div class="data-content-class">
                   <div class="data-content-class-title">
                       <div class="class-name">类目</div>
                       <div  v-if="!isAddClass" class="class-manage clearfix" @click="classManage">
                           <span class="icon"></span>
                           类目管理</div>
                       <div v-if="isAddClass" class="content">
                           <span class="cancel" @click="manageClassCancel">
                               <i class="icon-cancel"></i>取消</span>
                           <span class="save" @click="manageClassSave">
                               <i class="icon-save"></i>保存</span>
                       </div>
                   </div>
                   <div class="data-content-class-content">
                       <ul ref="firstclass" class="fst-grade-class clearfix" @click = "toggleFistClass" id="fist-class">
                           <li class="title float-left" @click="preventBubble">一级类目：
                               <span class="interrogation" title="进入类目管理,拖动类目可进行排序"></span>
                           </li>
                           <li class="item float-left active" @click="clearSecClass">全部</li>
                           <li class="item float-left" v-for="(item, index) in allClassData" @click="clickFistClass(item)" :title="item.indLabelGroupname" :key="index" :draggable="isAddClass" @drop="dragEnterData(item)">
                               <span v-if="!(isShowEditorFstClassName(item))" class="item-text">{{item.indLabelGroupname}}</span>
                               <input v-if="isShowEditorFstClassName(item)" class="input-content" type="text" :value="item.indLabelGroupname"  @blur="inputClassNameBlur" maxlength=20 autofocus>
                               <div v-if="isAddClass&&!(isShowEditorFstClassName(item))" @click="preventBubble" style="display:inline-block;verticalAlign: top;"><span class="operate" @click="showOperateMenu(item)"></span></div>
                               <span class="menu" v-if="isOperateFirstMenuShow" @click="preventBubble" @mouseleave="mouseLeaveEvent">
                                    <i class="editor active" @click="editorClassName(item)">编辑</i>
                                    <i class="delete" @click="deleteClassName(item)">删除</i>
                                </span>
                           </li>
                           <li v-if="isAddClass" class="item float-left new-create" @click="addFirstClass">
                               <span class="icon-add"></span>
                               添加一级类目
                           </li>
                       </ul>
                       <ul ref="secclass" class="sec-grade-class" @click = "toggleSecClass" id="sec-class">
                           <li class="title float-left" @click="preventBubble" >二级类目：</li>
                           <li class="item float-left active" @click="clickSecAllClass">全部</li>
                           <li class="item float-left" v-for="(item, index) in secClass" @click="clickSecClass(item)" :title="item.indLabelGroupname" :key="index" :draggable="isAddClass">
                               <span v-if="!(isShowEditorSecClassName(item))" class="item-text">{{item.indLabelGroupname}}</span>
                               <input v-if="isShowEditorSecClassName(item)" class="input-content" type="text" :value="item.indLabelGroupname"  maxlength=20 @blur="inputClassNameBlur" autofocus>
                               <div v-if="isAddClass&&!(isShowEditorSecClassName(item))" @click="preventBubble" style="display:inline-block;verticalAlign: top;"><span class="operate" @click="showOperateMenu(item)"></span></div>
                               <span class="menu" v-if="isOperateSecondMenuShow" @click="preventBubble" @mouseleave="mouseLeaveEvent">
                                    <i class="editor active" @click="editorClassName(item)">编辑</i>
                                    <i class="delete" @click="deleteClassName(item)">删除</i>
                                </span>
                           </li>
                           <li v-if="isAddSecClass" class="item float-left new-create" @click="addSecondClass">
                               <span class="icon-add"></span>
                               添加二级类目
                           </li>
                       </ul>
                   </div>
               </div>
               <div class="data-content-bottom">
                   <div class="left-part">
                       <div class="left-part-title">维度</div>
                       <div class="left-part-func">
                           <Button type="primary" class="add-dimension" @click="addDimesion" :disabled="(targetFirstClass!=='all'&& secClass.length === 0)||!targetIndustryTag">添加维度</Button>
                           <span>是否参与画像生成：</span>
                           <Select v-model="modelPhoto" style="width:80px">
                                <Option v-for="item in isPhotoList" :value="item.value" :key="item.value" @click.native="searchDimesionAll"></Option>
                            </Select>
                            <span class="icon-type">图标类型：</span>
                            <Select v-model="iconType" style="width:120px">
                                <Option v-for="item in iconTypeList" :value="item.value" :key="item.value" @click.native="searchDimesionAll"></Option>
                            </Select>
                            <span class="state">状态：</span>
                            <Select v-model="state" style="width:80px">
                                <Option v-for="item in stateList" :value="item.value" :key="item.value" @click.native="searchDimesionAll"></Option>
                            </Select>
                            <span>维度名称：</span>
                            <div class="dimesion-name">
                              <Input  @on-keydown="searchDimesion" placeholder="请输入关键字搜索" style="width: 160px" v-model="searchDimesionName">
                                  <Icon type="ios-search" slot="append"/>
                              </Input>
                            </div>
                       </div>
                       <div class="left-part-list" id="left-part-list">
                           <Table size="large" height="600" :columns="dimensionColumns" :data="dimensionDaTa" :highlight-row= true @on-current-change="updateDimesion"></Table>
                       </div>
                   </div>
                   <div class="right-part">
                     <div class="right-part-title">标签</div>
                     <div class="right-part-func">
                       <div class="create-tag">
                         <span class="add-icon"></span>
                         <span class="create-tag-text" @click="addTag">+创建标签</span>
                       </div>
                       <div class="more-operate">
                         <span class="add-icon"></span>
                         <div class="more-operate-title">
                           <div><span class="more-operate-icon"></span><span class="more-operate-text">更多操作</span></div>
                           <div class="operate-menu">
                             <span class="quick-addtag" @click="quickAddTag">快速创建标签</span>
                             <span class="more-change" @click="moreReviseTag">批量修改标签</span>
                             <span class="more-delete" @click="moreDeleteTag">批量删除标签</span>
                           </div>
                         </div>
                       </div>
                       <div class="tag-input">
                         <Input v-model="searchTagName" placeholder="标签名称搜索" style="width: 150px" @on-keydown="tagSearch">
                          <Icon type="ios-search" slot="append"/>
                        </Input>
                       </div>
                       <div class="belong-class">
                         <span>所属维度：</span>
                          <Select v-model="belongDimesion" style="width:80px" id="tag-belong-demesion" label-in-value @on-change="searchTagData" placeholder="全部维度">
                            <Option value="all" title="全部维度" label="全部维度"></Option>
                            <Option v-for="(item) in tagBelongDimesion" :value="item.indLabelGroupid" :key= "item.indLabelGroupid" :title="item.indLabelGroupname">{{item.indLabelGroupname}}</Option>
                          </Select>
                       </div>
                     </div>
                     <div class="right-part-list">
                           <Table id="tag-list" :loading="isTagLoading" @on-selection-change="tagSelectRow"  height="560" size="small" :columns="tagColumns" :data="tagDaTa"></Table>
                           <Page id="tag-page" prev-text="上一页" next-text="下一页" :total="tagTotal" :page-size="tagPageSize" @on-change="togglePage" show-elevator/>
                       </div>
                   </div>
               </div>
           </div>
       </div>
       <Modal
            v-model="modalManage"
            id="model-manage"
            title="行业管理"
            :styles="{top: '-60px'}"
            width= "437"
            class-name="vertical-center-modal">
            <div class="title" v-if="warnTitle">
                <span class="not-delete"></span>
                <span class="text textWarn">暂时不能删除!当前行业下存在类目,请先清空类目后再删除行业.</span>
                <!-- <Icon type="md-close" size='15' class="icon"/> -->
            </div>
            <ul class="content clearfix" ref='content' id="#content" @click="toggleManageCatalog">
                <li v-for="(item,index) in catalogData" :class="{'active': targetIndustryTag.indId === item.indId?true:false}" class="item" :title="item.indName" :key="index">
                    <div class="content-title" style="display: inherit;">{{item.indName}}</div>
                    <div class="content-operate" style="display: inherit;vertical-align: top" @click="preventBubble">
                        <span class="editor" @click="manageEditor(item, index)"></span>
                        <span class="delete" @click="manageDelete(item, index)"></span>
                    </div>
                </li>
                <li class="item add"  @click="addManage"><span class="icon-add"></span><span>自定义</span></li>
            </ul>
            <div class="input" v-if="isAddManageTag">
                <input id="manage-name" type="text" style="width: 250px; height: 26px;" v-model="modalManageValue" placeholder = '新建行业' maxlength="20" @keydown="validateTwtyLength"/>
                <span class="save" @click="saveMangeTag">保存</span>
                <span class="cancel" @click="cancelManageTag">取消</span>
            </div>
            <div slot="footer">
              <Button type="text" size="large" @click="modalManage=false">关闭</Button>
            </div>
        </Modal>
        <Modal
        v-model="quickCreateTag"
        id="quick-createtag"
        title="快速创建标签"
        @on-ok="quickCreateTagFunc"
        :styles="{top: '100px'}"
            width= "662">
            <quick-create-tag :tagBelongDimesion= tagBelongDimesion></quick-create-tag>
            <div slot="footer">
              <Button type="text" size="large" @click="quickCancel">取消</Button>
              <Button type="text" size="large" @click="quickCreateTagFunc">确定</Button>
            </div>
        </Modal>
        <Modal
        v-model="moreResetTag"
        id="more-resettag"
        title="批量修改标签"
         @on-ok="quickEditorTagFunc"
        :styles="{top: '250px'}"
            width= "435">
            <div class="container">
                <div class="reset-tag-title" v-if="tagSelectedArray.length>0?true:false">
                已选择{{tagSelectedArray.length}}个标签,批量修改状态会把原有状态统一修改,请慎重操作！
                </div>
                <div class="reset-tag-title" style="fontSize:16px" v-if="tagSelectedArray.length>0?false:true">
                  请选择所要修改的数据！
                </div>
                <div class="change-state" v-if="tagSelectedArray.length>0?true:false">
                  <span class="change-state-tilte">修改状态：</span>
                  <div ref='quickState' class="state clearfix" id="state" @click="toggleEditorState">
                    <span class="use" @click="tagEditorUse">批量使用</span>
                    <span class="not-use active" @click="tagEditorNotUse">批量不使用</span>
                  </div>
              </div>
            </div>
        </Modal>
         <Modal
        v-model="moreCancelTag"
        id="more-deletetag"
        @on-ok="quickDeleteTagFunc"
        title="批量删除标签"
        :styles="{top: '250px'}"
            width= "435">
            <div class="container">
                <div class="more-delete-title">
                  已选择{{tagSelectedArray.length}}个标签,请确认是否删除？
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import IndLabelManage from "./ind-label-manage.js";
import { isPhotoList, iconTypeList, stateList } from "@/constants.js";
import DimesionListRender from "./list-render.vue";
import TagListRender from "./tag-list-render.vue";
import QuickCreateTag from "./quick-create-tag.vue";
import fetch from "@/modules/request/request.js";
import _ from "lodash";

export default {
  mixins: [DimesionListRender, TagListRender],
  components: {
    QuickCreateTag
  },
  data() {
    return {
      targetIndustryTag: null, // 目标行业管理
      targetIndustryTagOpeIndex: 0, // 目标行业管理的下表
      targetFirstClass: "all", // 目标一级类目
      targetSecondClass: "all", // 目标二级类目
      targetClassIndex: 1, // 目标类目的层级
      targetDimesion: null,
      targetPageIndex: 1,
      modalManage: false, // 行业管理的模态框
      modalManageValue: "", // 行业管理编辑，创建时input的值
      isAddManageTag: false, // 行业管理创建或编辑是否显示输入框
      catalogData: [], //行业管理请求回来的数据
      quickCreateTag: false, // 快速创建标签模态框
      isAddClass: false, // 是否添加一级类目
      isAddSecClass: false, // 是否添加二级类目
      targetDragData:null, // 目标拖动元素
      isPhotoList: isPhotoList, //维度是否参与画像的选择list
      modelPhoto: "全部", // 维度是否参与画像的选择的绑定值
      iconTypeList: iconTypeList, // 维度图表类型的list
      iconType: "全部图标类型", // 维度图表类型的绑定值
      stateList: stateList, // 维度状态选择list
      state: "全部", // 维度状态的绑定值
      belongDimesion: "全部", // 标签所属维度的绑定值
      targetSelectedClass: "", // 维度选择的类目
      searchDimesionName: "", //维度搜索名称
      isOperateFirstMenuShow: false, // 是否显示一级类目的操作菜单框
      isOperateSecondMenuShow: false, // 是否显示二级类目的操作菜单框
      isEditorFirstClassName: false, // 是否编辑一级类目的操作菜单框
      isEditorSecondClassName: false, // 是否编辑二级类目的操作菜单框
      allClassData: [],
      secClass: [], // 二级类目的data
      isAddFstClassName: false, // 是否显示一级类目的编辑输入框
      blurInputClassName: "", // 一二级类目的编辑输入框在失去焦点时的值
      isAddSecClassName: false, // 是否显示二级类目的编辑输入框
      quickCreateTag: false, // 标签里点击快速创建标签弹出的模态框
      moreResetTag: false, // 标签里点击批量修改弹出的模态框
      moreCancelTag: false, // 标签里点击批量删除弹出的模态框
      tagBelongDimesion: [], // 标签所属维度
      tagSelectedArray: [], // 标签选中
      tagEditorState: 1, // 批量修改标签状态选择
      searchTagName: "", // 标签搜索名称
      warnTitle: false
    };
  },
  created() {
    this.getCatalogAllData();
  },
  computed: {},
  methods: {
    // 请求目录数据
    getCatalogAllData() {
      const that = this;
      fetch({
        method: "get",
        url: "industry/industriesList"
      }).then(res => {
        //获取左边目录数的数据
        if (res.status === 200) {
          that.catalogData = res.data;
          that.targetIndustryTag = that.catalogData[0];
          that.getClassData();
          that.getBelongDemesionData();
        }
      });
    },

    // 请求类目数据
    getClassData(notReset) {
      const that = this;
      // indInvolvedCode: "362f859496194ed7bf7542666acb1535"
      const indInvolvedCode = this.targetIndustryTag
        ? this.targetIndustryTag.indCode
        : null;
      if (!indInvolvedCode) {
        return;
      }
      fetch({
        method: "get",
        url: "industryGroup/getCategories",
        params: {
          indInvolvedCode: indInvolvedCode
        }
      }).then(res => {
        if (res.data) {
          if (res.data.code === 0) {
            that.$Message.error(res.data.resMsg);
            return;
          }
          that.allClassData = res.data;
          if (that.targetFirstClass !== "all") {
            that.secClass = that.getTargetSecClass(
              that.targetFirstClass.indLabelGroupid
            );
          }
          if(notReset) {
            return;
          }
          that.getDemesionData();
        }
      });
    },
    // 请求维度数据
    getDemesionData(params, NotReset) {
      const that = this;
      this.targetDimesion = null;
      let parentId = null;
      if (this.targetSecondClass !== "all") {
        parentId = this.targetSecondClass.indLabelGroupid;
      } else if (this.targetFirstClass !== "all") {
        parentId = this.targetFirstClass.indLabelGroupid;
      }
      const industryCode = this.targetIndustryTag
        ? this.targetIndustryTag.indCode
        : null;
      if (!industryCode) {
        return;
      }
      params = params ? params : {};
      params = {
        ...params,
        parentId: parentId,
        industryCode: industryCode
      };
      fetch({
        method: "post",
        url: "industryGroup/getDimensions",
        params: params
      }).then(res => {
        if (res.data) {
          if (res.data.code === 0) {
            that.$Message.error(res.data.msg);
            return;
          }
          that.dimensionDaTa = res.data.map(item => {
            return {
              ...item,
              editable: false,
              sortable: false,
              isChange: false
            };
          });
          if(!NotReset) {
            that.getTagData();
            return;
          }
        }
      });
    },
    // 请求标签的数据
    getTagData(param) {
      const that = this;
      const industryCode = this.targetIndustryTag
        ? this.targetIndustryTag.indCode
        : null;
      const page = this.targetPageIndex?this.targetPageIndex:param && param.page ? param.page : 1;
      const rows = 15;
      const params = {
        ...param,
        industryCode: industryCode,
        page: page,
        rows: rows
      };
      fetch({
        method: "get",
        url: "industryLabel/loadLabels",
        params: params
      }).then(res => {
        if (res.data) {
          if (res.status === 200) {
            that.tagDaTa = res.data.rows
              ? res.data.rows.map(item => {
                  return {
                    ...item,
                    editable: false,
                    sortables: false
                  };
                })
              : [];
            that.tagTotal = res.data.total;
            that.tagPageSize = res.data.pageSize;
          }
        }
      });
    },
    // 切换左边的目录
    toggleCatalog(e) {
      this.isAddClass = false;
      const catalogsDom = this.$refs.catalogs;
      IndLabelManage.toggle(e.target, catalogsDom);
    },
    toggleManageTag(item) {
      this.targetIndustryTag = item;
      this.targetFirstClass = "all";
      this.targetSecondClass = "all";
      this.secClass = [];
      this.addClassActive();
      // this.addFstActiveClass();
      // this.addSecActiveClass();
      this.getClassData();
      this.getBelongDemesionData();
    },
    // 切换左边目录的管理界面
    toggleManageCatalog(e) {
      const catalogsDom = this.$refs.content;
      IndLabelManage.toggle(e.target, catalogsDom);
      this.isAddManageTag = false;
    },
    // 切换快速修改状态
    toggleEditorState(e) {
      const catalogsDom = this.$refs.quickState;
      IndLabelManage.toggle(e.target, catalogsDom);
    },
    // 添加行业管理标签
    addManage(e) {
      this.preventBubble(e);
      this.isAddManageTag = true;
      this.modalManageValue = "";
      this.targetIndustryTagOpeIndex = -1;
    },
    // 监听编辑区域的鼠标离开事件
    mouseLeaveEvent() {
      this.isOperateFirstMenuShow =false;
      this.isOperateSecondMenuShow = false;
    },
    // 保存编辑
    saveMangeTag() {
      const that = this;
      const targetInputValue = this.modalManageValue;
      if (!targetInputValue) {
        this.$Message.error("新建行业时名称不能为空！");
        return;
      }
      if (targetInputValue) {
        const index = this.targetIndustryTagOpeIndex;
        const industryName = targetInputValue;
        if (index !== -1) {
          const industryId = this.catalogData[index].indId;
          fetch({
            method: "get",
            url: "industry/editIndustry",
            params: {
              industryId: industryId,
              industryName: industryName
            }
          }).then(res => {
            if (res.data.code === 604) {
              that.$Message.error(res.data.resMsg);
              return;
            }
            if (res.data.code === 200) {
              that.$set(that.catalogData[index], "indName", industryName);
              that.$Message.success("修改成功！");
              that.isAddManageTag = false;
            }
          });
        } else {
          fetch({
            method: "get",
            url: "industry/createIndustry",
            params: {
              industryName: industryName
            }
          }).then(res => {
            if (res.data.code === 604) {
              that.$Message.error(res.data.resMsg);
              return;
            }
            if (res.data.code === 200) {
              that.$Message.success("新建成功！");
              this.$refs.content.children[0]?this.$refs.content.children[0].click():'';
              this.$refs.catalogs.children[0]?this.$refs.catalogs.children[0].click():'';
              that.getCatalogAllData();
              that.isAddManageTag = false;
            }
          });
        }
      }
    },
    cancelManageTag() {
      this.isAddManageTag = false;
    },
    // 拖动类目鼠标放下触发的事件
    dragEnterData(e) {
       debugger
    },
    // 编辑类目名字
    editorClassName(item) {
      if (item.hierarchy === 1) {
        this.isEditorFirstClassName = true;
        this.isOperateFirstMenuShow = false;
      } else {
        this.isEditorSecondClassName = true;
        this.isOperateSecondMenuShow = false;
      }
      this.$nextTick(()=> {
        const targetDom = document.querySelectorAll(".input-content");
        if(targetDom&& targetDom.length>0) {
          targetDom[0].focus();
        }
      })
    },
    //删除类目名字
    deleteClassName(item) {
      const that = this;
      let targetClass;
      if (item.hierarchy === 1) {
        targetClass = this.targetFirstClass;
      }
      if (item.hierarchy === 2) {
        targetClass = this.targetSecondClass;
      }
      const indLabelGroupid = targetClass ? targetClass.indLabelGroupid : null;
      fetch({
        method: "get",
        url: "industryGroup/removeCategories",
        params: {
          indLabelGroupid: indLabelGroupid
        }
      }).then(res => {
        if (res.data.code === 101) {
          that.$Message.error(res.data.resMsg);
          return;
        }
        if (res.data.code === 200) {
          that.$Message.success("删除成功！");
          if (item.hierarchy === 1) {
            this.targetFirstClass = this.nextTargetFstClass();
          }
          if (item.hierarchy === 2) {
            this.targetSecondClass = this.nextTargetSecClass();
          }
          that.getClassData();
          this.isOperateFirstMenuShow = false;
          this.isOperateSecondMenuShow = false;
        } else {
          that.$Message.error(res.data.resMsg);
        }
      });
    },
    // 找到下一个目标一级类目
    nextTargetFstClass() {
      if (this.allClassData.length <= 1) {
        return "all";
      }
      let target = "all";
      this.allClassData.forEach((item, index) => {
        if (item.indLabelGroupid === this.targetFirstClass.indLabelGroupid) {
          target = this.allClassData[index + 1];
        }
      });
      return target;
    },
    // 找到下一个目标二级类目
    nextTargetSecClass() {
      if (this.secClass.length <= 1) {
        return "all";
      }
      let target = "all";
      this.allClassData.forEach((item, index) => {
        if (item.indLabelGroupid === this.targetSecondClass.indLabelGroupid) {
          target = this.allClassData[index + 1];
        }
      });
      return target;
    },
    // 切换类目1
    toggleFistClass(e) {
      const catalogsDom = this.$refs.firstclass;
      IndLabelManage.toggle(e.target, catalogsDom);
    },
    // 切换类目一的时候获取二级类目的信息
    clickFistClass(item) {
      // this.isAddClass = false;
      // this.isAddSecClass = false;
      if(this.isEditorFirstClassName|| this.isEditorSecondClassName) {
        return;
      }
      if(this.isAddClass) {
        this.isAddSecClass = true;
      }
      this.targetClassIndex = 1;
      this.isOperateFirstMenuShow = false;
      this.isOperateSecondMenuShow = false;
      this.targetFirstClass = item;
      this.targetSecondClass = "all";
      this.removeSecActiveClass();
      this.addSecActiveClass();
      this.secClass = item.child;
      this.getDemesionData();
    },
    //切换类目二的时候
    clickSecClass(item) {
      if(this.isEditorFirstClassName|| this.isEditorSecondClassName) {
        return;
      }
      // this.isAddClass = false;
      // this.isAddSecClass = false;
      this.targetClassIndex = 2;
      this.isOperateFirstMenuShow = false;
      this.isOperateSecondMenuShow = false;
      this.targetSecondClass = item;
      this.getDemesionData();
    },
    // 切换类目一的全部时清空类目二的信息
    clearSecClass() {
      if(this.isEditorFirstClassName|| this.isEditorSecondClassName) {
        return;
      }
      this.targetFirstClass = "all";
      this.targetSecondClass = "all";
      this.isAddClass = false;
      this.isAddSecClass = false;
      this.isOperateFirstMenuShow = false;
      this.isOperateSecondMenuShow = false;
      this.secClass = [];
      this.addSecActiveClass();
      this.getDemesionData();
    },
    clickSecAllClass() {
      if(this.isEditorFirstClassName|| this.isEditorSecondClassName) {
        return;
      }
      this.targetSecondClass = "all";
      this.getDemesionData();
    },
    // addFstActiveClass() {
    //   const targetParentDom = document.getElementById("fist-class");
    //   if (targetParentDom) {
    //     targetParentDom.children[1].classList.add("active");
    //   }
    // },
    addSecActiveClass() {
      const targetParentDom = document.getElementById("sec-class");
      if (targetParentDom) {
        targetParentDom.children[1].classList.add("active");
      }
    },
    addClassActive() {
      this.$nextTick(()=> {
          const targetFstParentDom = document.getElementById("fist-class");
          if (targetFstParentDom) {
            for(let i=0;i<targetFstParentDom.children.length;i++) {
              targetFstParentDom.children[i].classList.remove('active');
            }
            targetFstParentDom.children[1].classList.add("active");
          }
          const targetSecParentDom = document.getElementById("sec-class");
          if (targetSecParentDom) {
            for(let i=0;i<targetSecParentDom.children.length;i++) {
              targetSecParentDom.children[i].classList.remove('active');
            }
            targetSecParentDom.children[1].classList.add("active");
          }
      })
    },
    removeSecActiveClass() {
      const targetParentDom = document.getElementById("sec-class");
      if (targetParentDom && targetParentDom.children.length > 0) {
        for (let i = 0; i < targetParentDom.children.length; i++) {
          targetParentDom.children[i].classList.remove("active");
        }
      }
    },
    // 是否一级类目显示输入框
    isShowEditorFstClassName(item) {
      if (
        this.isEditorFirstClassName &&
        item.indLabelGroupcode === this.targetFirstClass.indLabelGroupcode
      ) {
        return true;
      }
      return false;
    },
    isShowEditorSecClassName(item) {
      if (
        this.isEditorSecondClassName &&
        item.indLabelGroupcode === this.targetSecondClass.indLabelGroupcode
      ) {
        return true;
      }
      return false;
    },
    // 展示一级类目的操作框
    showOperateMenu(item) {
      if (item.hierarchy === 1) {
        this.isOperateFirstMenuShow = !this.isOperateFirstMenuShow;
        return;
      }
      this.isOperateSecondMenuShow = !this.isOperateSecondMenuShow;
    },
    //类目失去焦点触发的事件
    inputClassNameBlur(e) {
      const value = e.target.value;
      if(this.targetClassIndex === 1){
        this.targetFirstClass.indLabelGroupname = value;
      }else if(this.targetClassIndex === 2){
        this.targetSecondClass.indLabelGroupname = value;
      }
      if(!value) {
        this.$Message.warning("类名不能为空！");
        const targetDom = document.querySelectorAll(".input-content");
        if(targetDom&& targetDom.length>0) {
          targetDom[0].focus();
        }
        return;
      }
      this.isEditorFirstClassName = false;
       this.isEditorSecondClassName = false;

      // this.saveClassName(value);
    },
    //失去焦点时创建一级类目
    createFistClassNameBlur(e) {
      this.isAddFstClassName = false;
      this.isAddSecClassName = false;
      this.blurInputClassName = e.target.value;
      this.targetClassIndex = 1;
    },
    // 失去焦点时创建二级类目
    createSecClassNameBlur(e) {
      this.isAddFstClassName = false;
      this.isAddSecClassName = false;
      this.blurInputClassName = e.target.value;
      this.targetClassIndex = 2;
    },
    // 保存类名
    saveClassName(value) {
      const that = this;
      let indLabelGroupid;
      if (this.isEditorFirstClassName) {
        indLabelGroupid = this.targetFirstClass.indLabelGroupid;
      }
      if (this.isEditorSecondClassName) {
        indLabelGroupid = this.targetSecondClass.indLabelGroupid;
      }
      const indLabelGroupname = value ? value : null;
      if (!indLabelGroupname && !indLabelGroupid) {
        return;
      }
      fetch({
        method: "post",
        url: "industryGroup/editCategories",
        params: {
          indLabelGroupid: indLabelGroupid,
          indLabelGroupname: indLabelGroupname
        }
      }).then(res => {
        if (res.data.code === 604) {
          that.$Message.error(res.data.resMsg);
          return;
        }
        if (res.data.code === 200) {
          that.$Message.success("保存成功！");
          let targetClass;
          if (that.isEditorFirstClassName) {
            targetClass = that.targetFirstClass;
          } else if (that.isEditorSecondClassName) {
            targetClass = that.targetSecondClass;
          }
          if (targetClass) {
            that.$set(targetClass, "indLabelGroupname", value);
          }
          that.isEditorFirstClassName = false;
          that.isEditorSecondClassName = false;
        }
      });
    },
    // 添加一级类目
    addFirstClass(e) {
      this.preventBubble(e);
      this.isAddFstClassName = true;
      if(this.allClassData.length>=9) {
        this.$Message.warning("一级类目不得超过9个！");
        return;
      }
      this.allClassData.push({
        indLabelGroupname: "新建一级类目",
        hierarchy: 1,
        indInvolvedCode: this.targetIndustryTag.indInvolvedCode,
        indLabelGroupcode: new Date().getTime(),
        child: []
      })
    },
    // 添加二级类目
    addSecondClass(e) {
      this.preventBubble(e);
      this.isAddSecClassName = true;
      if(this.targetFirstClass.child.length>=9) {
        this.$Message.warning("二级类目不得超过9个！");
        return;
      }
      this.targetFirstClass.child.push({
        indLabelGroupname: "新建一级类目",
        hierarchy: 2,
        indInvolvedCode: this.targetIndustryTag.indInvolvedCode,
        indLabelGroupcode: new Date().getTime(),
        child: []
      })
    },
    // 获取二级类目
    getTargetSecClass(index) {
      let targetSecClass;
      if (Array.isArray(this.allClassData) && this.allClassData.length > 0) {
        this.allClassData.forEach(item => {
          if (item.indLabelGroupid === index) {
            targetSecClass = item;
          }
        });
      }
      if (targetSecClass && targetSecClass.child) {
        targetSecClass = targetSecClass.child;
      }
      return targetSecClass;
    },
    // 维度搜索
    searchDimesion(e) {
      if (e.keyCode && e.keyCode === 13) {
        this.searchDimesionAll();
      }
    },
    // 维度搜索
    searchDimesionAll() {
      this.$nextTick(() => {
        const params = {};
        if (this.state !== "全部") {
          stateList.forEach(item => {
            if (item.value === this.state) {
              params["status"] = item.label;
            }
          });
        }
        if (this.modelPhoto !== "全部") {
          isPhotoList.forEach(item => {
            if (item.value === this.modelPhoto) {
              params["isPortrayalProduct"] = item.label;
            }
          });
        }
        if (this.iconType !== "全部图标类型") {
          iconTypeList.forEach(item => {
            if (item.value === this.iconType) {
              params["charType"] = item.label;
            }
          });
        }
        if (this.searchDimesionName) {
          params["labelGroupName"] = this.searchDimesionName;
        }
        this.getDemesionData(params);
      });
    },
    // 切换类目2
    toggleSecClass(e) {
      const catalogsDom = this.$refs.secclass;
      IndLabelManage.toggle(e.target, catalogsDom);
    },
    // 点击管理时弹出模态框
    catalogEdit() {
      this.modalManage = true;
    },
    // 行业管理模态框里面的编辑
    manageEditor(item, index) {
      this.isAddManageTag = true;
      this.modalManageValue = item.indName;
      this.targetIndustryTagOpeIndex = index;
    },
    // 行业管理模态框里面的删除
    manageDelete(item, index) {
      const that = this;
      that.$Modal.confirm({
        onOk: () => {
          const industryId = this.catalogData[index].indId;
          const industryCode = this.catalogData[index].indCode;
          fetch({
            method: "get",
            url: "industry/removeIndustry",
            params: {
              industryId: industryId,
              industryCode: industryCode
            }
          }).then(res => {
            if (res.data.code === 200) {
              this.$refs.content.children[0].click();
              this.$refs.catalogs.children[0].click();
              that.$Message.success("删除成功！");
              that.getCatalogAllData();
              that.isAddManageTag = false;
            } else if (res.data.code === 101) {
              that.warnTitle = true;
              setTimeout(() => {
                that.warnTitle = false;
              }, 2000);
            }
          });
        },
        onCancel: () => {},
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
      // this.isAddManageTag = false;
    },
    preventBubble(e) {
      //js阻止事件冒泡
      e.cancelBubble = true;
      e.stopPropagation();
    },
    classManage() {
      if (!this.targetIndustryTag) {
        this.$Message.warning("请选择对应的行业标签！");
        return;
      }
      this.isAddClass = true;
      if (this.targetFirstClass === "all") {
        this.isAddSecClass = false;
        return;
      }
      this.isAddSecClass = true;
    },
    manageClassSave() {
      this.isOperateFirstMenuShow = false;
      this.isOperateSecondMenuShow = false;
      this.isAddClass = false;
      this.isAddSecClass = false;
      if (!this.targetIndustryTag || this.catalogData.length === 0) {
        return;
      }
      const that = this;
      const indInvolvedcode = this.targetIndustryTag
        ? this.targetIndustryTag.indCode
        : null;
      if (!indInvolvedcode) {
        return;
      }
      let copyAllClassData = _.cloneDeep(this.allClassData);
      copyAllClassData = copyAllClassData.map(item => {
        return {
          indLabelGroupname: item.indLabelGroupname,
          indLabelGroupid: item.indLabelGroupid,
          industryGroupList: item.child.length>0?item.child.map(item => {
            return {
              indLabelGroupname: item.indLabelGroupname,
              indLabelGroupid: item.indLabelGroupid,
            }
          }):[],
        }
      })
      // 支持批量添加
      fetch({
        method: "post",
        url: "industryGroup/saveCategories",
        params: {
          industryGroupList: copyAllClassData,
          indInvolvedcode: indInvolvedcode
        }
      }).then(res => {
        if(res.data) {
          if(res.data.code === 200) {
            that.$Message.success("保存成功！");
            that.getClassData();
            return;
          }
        }
      })
    },
    manageClassCancel() {
      this.isAddClass = false;
      this.isAddSecClass = false;
      this.isAddFstClassName = false;
      this.isOperateFirstMenuShow = false;
      this.isOperateSecondMenuShow = false;
      this.getClassData();
    },
    // 快速创建标签
    quickAddTag() {
      this.quickCreateTag = true;
    },
    // 批量修改
    moreReviseTag() {
      this.moreResetTag = true;
    },
    // 批量删除
    moreDeleteTag() {
      this.moreCancelTag = true;
    },
    // 快速创建标签
    quickCreateTagFunc() {
      const that = this;
      const industryLabelList = this.$store.state.labelManage
        .quickCreateTagDaTa;
      const indInvolvedGroupid = this.$store.state.labelManage
        .quickCreateDimesionId;
      const checkStatus = this.$store.state.labelManage.quickCreateState;
      if (!indInvolvedGroupid) {
        this.$Message.error("维度ID不能为空");
        return;
      }
      fetch({
        method: "post",
        url: "industryLabel/createLabels",
        params: {
          industryLabelList: industryLabelList,
          indInvolvedGroupid: indInvolvedGroupid,
          checkStatus: checkStatus
        }
      }).then(res => {
        if (res.data) {
          if(res.data.code === 0 || res.data.code === 604) {
            that.$Message.error(res.data.resMsg);
            return;
          }
          if (res.data.code === 200) {
            that.$Message.success("批量创建成功！");
            that.quickCreateTag = false;
            that.togglePage(that.targetPageIndex);
            that.getDemesionData({},true);
            // that.$store.commit("setQuickCreateDimesionId", "");
            // that.$store.commit("setQuickCreateTagDaTa", []);
            // that.$store.commit("setQuickCreateState", 1);
            return;
          }
        }
      });
    },
    // 快速创建取消按钮
    quickCancel() {
      // this.$store.commit("setQuickCreateDimesionId", "");
      // this.$store.commit("setQuickCreateTagDaTa", []);
      // this.$store.commit("setQuickCreateState", 1);
      this.quickCreateTag = false;
    },
    // 校验长度
    validateTwtyLength(e) {
      // if(e.target.value.length >=20) {
      //   this.$Message.error("输入字符长度不能超过20个字符！");
      // }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./ind-label-manage.less";
</style>
<style>
#tag-list .ivu-table-small td {
  height: 35px;
}
#tag-list .ivu-table-row:hover .tag-operate {
  display: inline-block !important;
}
#tag-page.ivu-page {
  margin-top: 4px;
}
#left-part-list .ivu-table-row-highlight {
  background: #2a3b4b;
}
#tag-belong-demesion .ivu-select-dropdown .ivu-select-item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>








