<template>
    <div class="shop-wrapper">
      <div  class="shop-cell"  v-for="(shop,index) in shopListData.shop_list" :key="index">
      <div class="shop-link-wrapper">
        <router-link class="shop-link" :to="'/shop/'+shop.shop_id">
         {{
            shop.shop_name != null ? shop.shop_name : "no title"
          }}
      </router-link>
      </div>
        <div class="shop-delete-wrapper">
          <img src="" alt="">
        </div>
      </div>
    </div>
    <div class="page-select-wrapper">
      <p>1</p>
    </div>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {BaseURL} from "@/assets/BaseURL";
import axios from "axios"
import {ShopListData} from "../../../Types";

export default defineComponent({
  name: "shopListView",
  data() {
    return {
      shopListData: {
        shop_list: []
      } as ShopListData

    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData: async function () {
      const axiosURL: string = BaseURL + "/shop/list"
      const axiosResult = await axios.get(axiosURL)


      console.log(axiosResult)
      console.log(axiosResult.data.ShopListResult)
      this.shopListData.shop_list = axiosResult.data.ShopListResult
    }
  }
})
</script>

<style scoped>

.shop-wrapper{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.shop-cell {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  border: solid 1px #333333;
  margin: 10px;
  box-sizing: border-box;

}
.shop-link-wrapper{
  width: 80%;
}
.shop-delete-wrapper{
  width: 20%;

}

a {
  text-decoration: none;
  color: black;
  font-size: 18px;
}
</style>
