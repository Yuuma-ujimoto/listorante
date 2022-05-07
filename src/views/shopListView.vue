<template>
  <div class="shop-wrapper">
    <div class="shop-cell" v-for="(shop,index) in shopListData.shop_list" :key="index">
      <div class="shop-link-wrapper">
        <router-link class="shop-link" :to="'/shop/'+shop.shop_id">
          <p>{{ shop.shop_name != null ? shop.shop_name : "no title" }}</p>
        </router-link>
      </div>
      <div class="shop-delete-wrapper">
        <img src="../assets/delete.svg" alt="delete" @click="shopListData.isDeleteModalOpen = true">
      </div>
    </div>
  </div>
  <div class="page-select-wrapper">
    <pagination/>
    <pagination NowIndex='1' MaxIndex='2'/>
  </div>

  <div class="delete-shop-modal-wrapper" v-show="shopListData.isDeleteModalOpen" @click.self="closeModal">
    <div class="delete-shop-modal">
      <p>削除してもよろしいですか？</p>
      <div class="delete-shop-confirm-wrapper">
        <button class="delete-shop-confirm-button" >削除</button>
        <button class="delete-shop-confirm-button" @click="closeModal">キャンセル</button>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {BaseURL} from "@/assets/BaseURL";
import axios from "axios"
import {ShopListData} from "../../../Types";
import pagination from "@/components/pagination.vue"

export default defineComponent({
  name: "shopListView",
  components:{
    pagination
  },
  data() {
    return {
      shopListData: {
        shop_list: [],
        isDeleteModalOpen: false
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
    },
    // deleteShop:async function(){
    //
    // },
    closeModal:function (){
      this.shopListData.isDeleteModalOpen=false
    }
  }
})
</script>

<style scoped>

.shop-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.shop-cell {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: solid 1px #333333;
  margin: 10px;
  box-sizing: border-box;
  height: 60px;

}

.shop-link-wrapper {
  width: 85%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.shop-link {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.shop-delete-wrapper {
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


a {
  text-decoration: none;
  color: black;
  font-size: 18px;
}

.delete-shop-modal-wrapper{
  width: 100%;
  height: 100%;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.16);
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-shop-modal {
  width: 60%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: #fff;
  border-radius: 10px;
}


.delete-shop-confirm-wrapper {
  width: 80%;
  display: flex;
  justify-content: space-around;
}

.delete-shop-confirm-button {
  width: 40%;
  outline: none;
  box-sizing: border-box;
  padding: 15px;
  background: #fff;
  border: solid 1px #000;
}

</style>
