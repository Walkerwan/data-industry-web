<template>
    <div id="belong-dimesion">
        <Select v-model="targetSelect"
        :placeholder="targetSelect"
            label-in-value
            @on-change="changeBelongDemesion">
            <Input v-if="!notShowSearch" @on-keydown="searchBelongDemesion" v-model="targetSearch" placeholder="请输入关键字搜索" style="width: auto;padding: 0px 5px 0px 5px;">
                <Icon size=12 custom="dubhe-iconfont dubhe-icon-search" slot="append"></Icon>
            </Input>
            <Option v-for="(item, index) in selectArray" :value="item.indLabelGroupid" :key= "index">{{item.indLabelGroupname}}</Option>
        </Select>
    </div>
</template>

<script>
import fetch from "@/modules/request/request.js";
import IndLabelManage from "./ind-label-manage.js";
export default {
  data() {
    return {
      targetSelect: null,
      selectArray: [],
      targetSearch: ''
    };
  },
  props: {
    targetRow: Object,
    targetIndustry: Object,
    notShowSearch: Boolean
  },
  created() {
    this.getDemesionData();
  },
  mounted() {
    this.targetSelect = this.targetRow.dimensionsName? this.targetRow.dimensionsName: '请选择';
  },
  methods: {
    // 获取所属维度的数据
    getDemesionData() {
      const that = this;
      const industryCode = this.targetIndustry.indCode;
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
          that.selectArray = res.data;
          return;
        }
      });
    },
    changeBelongDemesion(value) {
      this.targetRow.dimensionsName = value.label;
      this.targetRow["indInvolvedGroupid"] = value.value;
    },
    searchBelongDemesion(e) {
      if(e.keyCode === 13) {
        if(this.selectArray.length <= 0) {
          return;
        }
        const targetName = this.targetSearch;
        if(!targetName) {
          this.getDemesionData()
          return;
        }
        this.selectArray= IndLabelManage.searchBelongDemesion(targetName, this.selectArray);
      }
    }
  }
};
</script>

<style>
#belong-dimesion .ivu-select-dropdown {
  width: 157px !important;
  height: 320px !important;
  left: auto !important;
}
</style>


