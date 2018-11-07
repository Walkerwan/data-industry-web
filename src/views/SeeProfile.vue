<template>
  <div class="profile">
    <div class="top-info">
      <span>用户规模：</span>
      <span>{{currentCategory?Number(currentCategory.peoNewestScaleNum).toLocaleString():'0'}}</span>
      <span>个</span>
      <span class="refresh-date">更新时间：</span>
      <span>{{refreshDate}}</span>
    </div>
    <div class="flex-row nav-buttons">
      <Button v-for="cat in categories" class="nav-button" :type="primary===cat.indLabelGroupId?'primary':'default'" @click="navButtonClick(cat.indLabelGroupId)">{{cat.indLabelGroupName}}</Button>
    </div>
    <charts-page></charts-page>
  </div>
</template>

<script>
import ChartsPage from "./profile/ChartsPage";

export default {
  components: {
    ChartsPage
  },
  data() {
    return {
      primary: "baseInfo"
    };
  },
  computed: {
    currentCategory() {
      return this.$store.getters.getCurrentCategory;
    },
    refreshDate() {
      const date = this.currentCategory
        ? new Date(this.currentCategory.newestPortrayalCTime).format(
            "yyyy年M月d日"
          )
        : "——";
      return date;
    },
    categories() {
      return this.$store.getters.getCategories;
    },
    currentRoute() {
      return this.$store.getters.getCurrentRoute;
    }
  },
  methods: {
    navButtonClick(primary) {
      const crowdId = this.$route.query.crowdId; //this.$route.query.crowdId;
      //"0143762720b24602ab8379f672418eee"
      const params = { id: crowdId };
      this.primary = primary;
      params.indLabelGroupId = primary;
      this.$router.push({
        query: { ...this.$route.query, primary: this.primary }
      });
      this.$store.dispatch("loadCategory", params);
      // this.$router.push({ path: "/crowdManage/seeProfile/" + primary });
    }
  },
  created() {},
  mounted() {
    const crowdId = this.$route.query.crowdId; //this.$route.query.crowdId;
    //"0143762720b24602ab8379f672418eee"
    console.log("seeProfile crowdId", crowdId);
    const params = { id: crowdId };
    const primary = this.$route.query.primary;
    if (primary) {
      this.primary = primary;
      params.indLabelGroupId = primary;
    }
    this.$store.dispatch("loadCategory", params).then(() => {
      console.log("this.currentCategory", this.currentCategory);
      if (!primary) {
        this.primary = this.currentCategory.indLabelGroupId;
        this.$router.push({
          query: { ...this.$route.query, primary: this.primary }
        });
      }
    });
  }
};
</script>

<style>
.profile {
  font-size: 16px;
}
.profile .top-info {
  padding: 10px 0px 20px 0px;
}
.profile .top-info .refresh-date {
  margin-left: 32px;
}
.profile .nav-buttons {
  padding: 0px;
}
.profile .nav-buttons .nav-button {
  margin-right: 22px;
}
</style>


