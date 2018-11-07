<template>
  <div class="rank-list">
    <div style="position:relative;height:100%;" v-if="total>0">
      <div v-for="(item,index) in pageData" class="flex-row">
        <div class="rank">
          <div class="circle" :class="getRank(index)<4?'top3':''">{{getRank(index)}}</div>
        </div>
        <div class="name">{{item.name}}</div>
        <div class="value">{{item.value}}</div>
      </div>
      <div class="pagination">
        <input :value="currentPage" @keyup.enter="currentPageChanged"></input>
        <div>{{'/' + pageCount}}</div>
        <Button class="page-operation" @click="toPrevPage" :disabled="currentPage===1">
          <Icon type="md-arrow-dropup" size=27 />
        </Button>
        <Button class="page-operation" @click="toNextPage" :disabled="currentPage===pageCount">
          <Icon type="md-arrow-dropdown" size=27 />
        </Button>
      </div>
    </div>
    <div v-else class="empty">暂无数据</div>
  </div>
</template>
<script>
export default {
  name: "ZcmorefunRankList",
  props: {
    data: Array
  },
  data() {
    return {
      pageNum: 10,
      currentPage: 1
    };
  },
  computed: {
    total() {
      return this.data ? this.data.length : 0;
    },
    pageCount() {
      return this.data ? Math.ceil(this.data.length / 10) : 1;
    },
    pageData() {
      return this.data.slice(
        this.pageNum * (this.currentPage - 1),
        this.pageNum * this.currentPage
      );
    }
  },
  methods: {
    getRank(index) {
      return index + 1 + this.pageNum * (this.currentPage - 1);
    },
    currentPageChanged(e) {
      const num = Number(e.target.value);
      if (isNaN(num)) {
        this.currentPage = 1;
        return;
      }
      this.currentPage = num;
    },
    toPrevPage() {
      this.currentPage -= 1;
    },
    toNextPage() {
      this.currentPage += 1;
    }
  }
};
</script>
<style scoped>
.page-operation {
  height: 9%;
  width: 27px;
  border: none;
  margin: 0px;
  padding: 0px;
}
.empty {
  width: 100%;
  height: 9.1%;
  line-height: 27px;
  text-align: center;
}
.rank-list {
  font-size: 14px;
  position: relative;
  height: 100%;
}
.rank-list .flex-row {
  height: 9%;
}
.rank {
  width: 15%;
  padding-left: 15px;
}
.rank .circle {
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  background-color: #e1e1e1;
  border-radius: 9px;
}
.rank .circle.top3 {
  background-color: #42cb75;
  color: white;
}
.name {
  width: 71%;
}
.pagination {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  right: 20px;
  bottom: 0px;
  position: absolute;
}
.pagination input {
  width: 20px;
  height: 18px;
  text-align: center;
}
</style>

