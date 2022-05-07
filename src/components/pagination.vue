<template>
  <div class="pagination-wrapper">
    <div class="pagination-box">
      <img src="../assets/angle-left.svg" alt="<" class="pagination-icon">
    </div>
    <div class="pagination-box" v-for="(page,index) in ShowPageIndex" :key="index"
         :class="{'active':page===parseInt(NowIndex)}">
      {{ page }}
    </div>

    <div class="pagination-box">
      <img src="../assets/angle-right.svg" alt=">" class="pagination-icon">
    </div>


  </div>
</template>

<script>
export default {
  name: "paginationTest",
  data() {
    return {
      isShowFrontSkip: false,
      isShowBackSkip: false,
      ShowPageIndex: []
    }
  },
  props: {
    NowIndex: {
      type: String,
      default: "1"
    },
    MaxIndex: {
      type: String,
      default: "4"
    }
  },
  created() {


    // < 1 2 3 ... M >
    // < 1 2 3 4 ... M >
    // < 1 ... 3 4 5 ... M >

    // 1 2 or 1

    const NowIndex = parseInt(this.NowIndex)
    const MaxIndex = parseInt(this.MaxIndex)
    console.log(typeof NowIndex)
    if (MaxIndex === 3) {
      this.ShowPageIndex = [1, 2, 3]
    } else if (NowIndex === 1) {
      if (MaxIndex === 1) {
        this.ShowPageIndex = [1]
      } else if (MaxIndex === 2) {
        this.ShowPageIndex = [1, 2]
      } else {
        this.ShowPageIndex = [1, 2, "...", MaxIndex]
      }

    } else if (NowIndex === MaxIndex) {

      this.ShowPageIndex = [1, "...", NowIndex - 1, MaxIndex]
    } else {
      this.ShowPageIndex = [1, "...", NowIndex - 1, NowIndex, NowIndex + 1, "..."]
    }

  }
}
</script>

<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  height: 100px;
}

.pagination-box {
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  margin: 0 10px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-icon {
  width: 20px;
}

.active {
  border-bottom: solid 1px #000000;
}

</style>
