<template>
  <section>
    <p>店名</p>
    <input v-model="StatusViewData.shopName" class="edit-text" @blur="updateShopName()">

  </section>
  <section>
    <div class="tag-list">
      <TagList :StatusTagList="StatusViewData.tagList"/>

    </div>
  </section>
  <section>
    <p>メモ</p>
    <div class="edit-shop-memo-wrapper">
      <div class="shop-memo-dummy" v-text="StatusViewData.shopMemo+'\u200b'">

      </div>
      <textarea class="shop-memo-input-textarea" v-model="StatusViewData.shopMemo" @blur="updateShopMemo"></textarea>
    </div>

  </section>

</template>

<script lang="ts">

import {defineComponent} from "vue";
import axios from "axios";
import {BaseURL} from "@/assets/BaseURL";

import {BaseApiResponse, EditDataRequestBody, StatusViewData} from "../../../Types";
import TagList from "@/components/tagList.vue";

export default defineComponent({
  name: "statusView",
  components: {TagList},
  data() {
    return {
      StatusViewData: {
        shopName: "",
        lastUpdateShopName: "",
        shopMemo: "",
        lastUpdateShopMemo: "",
        textAreaRow: 1,
        tagList: []
      } as StatusViewData
    }
  },

  beforeMount() {
    this.getData()
  },
  created() {

    window.addEventListener("beforeunload", () => {
      this.checkUpdateData()
    })
  },
  methods: {
    getData: async function (): Promise<void> {
      const shopId: string = this.$route.params.id.toString()
      const url: string = BaseURL + "/shop/status?shopId=" + shopId
      const axiosResult = await axios.get(url)
      this.StatusViewData.shopName = axiosResult.data.ShopName
      this.StatusViewData.lastUpdateShopName = axiosResult.data.ShopName
      const shopMemoText: string = axiosResult.data.ShopMemo
      this.StatusViewData.shopMemo = shopMemoText
      this.StatusViewData.lastUpdateShopMemo = shopMemoText
      this.StatusViewData.tagList = axiosResult.data.TagList

      console.log(axiosResult)
      // this.resizeTextArea()
    },

    // resizeTextArea: function () {
    //   if (!this.StatusViewData.shopMemo) {
    //     this.StatusViewData.textAreaRow = 1
    //     return
    //   }
    //
    //   this.StatusViewData.textAreaRow = this.StatusViewData.shopMemo.split("\n").length
    // },

    checkUpdateData: async function () {

      if (this.StatusViewData.lastUpdateShopMemo !== this.StatusViewData.shopMemo) {
        await this.updateShopMemo()
      }
      if (this.StatusViewData.lastUpdateShopName !== this.StatusViewData.shopName) {
        await this.updateShopName()
      }

      return
    },
    updateShopName: async function () {
      console.log("update")
      const shopIdRouteParams: string | string[] = this.$route.params.id
      const postParams: EditDataRequestBody = {
        Data: this.StatusViewData.shopName,
        Key: "shop_name",
        ShopId: shopIdRouteParams,
      }
      const axiosURL = BaseURL + "/shop/edit"
      const axiosResult = await axios.post(axiosURL, postParams)
      const axiosResponseData: BaseApiResponse = axiosResult.data
      console.log(axiosResponseData)
      if (axiosResponseData.ClientError || axiosResponseData.ServerError) {
        return;
      }
      return;
    },
    updateLocalShopMemoText: function (event:Event){
        const target = event.target
      if (!(target instanceof HTMLTextAreaElement)){
        return
      }

    },
    updateShopMemo: async function () {

      const shopMemo: string = this.StatusViewData.shopMemo

      const shopId = this.$route.params.id

      const axiosURL: string = BaseURL + "/shop/edit"
      const axiosParams: EditDataRequestBody = {
        Key: "shop_memo",
        Data: shopMemo,
        ShopId: shopId
      }
      const axiosResult = await axios.post(axiosURL, axiosParams)
      const axiosResponseBody: BaseApiResponse = axiosResult.data
      if (axiosResponseBody.ServerError || axiosResponseBody.ClientError) {
        return
      }
      return
    },


  }
})
</script>

<style scoped>

.edit-text {
  border: solid 1px #333;
  padding: 10px;
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
  font-size: 22px;
  font-family: sans-serif;
}

.text-area {
  height: auto;
  resize: none;
  font-size: 22px;
  font-family: sans-serif;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

section {
  margin: 20px 0;
}

.edit-shop-memo-wrapper{
  position: relative;
  font-size: 22px;
  line-height: 1.8rem;
  max-width: 800px;
}
.shop-memo-dummy{
  overflow: hidden;
  visibility: hidden;
  box-sizing: border-box;
  padding: 5px 15px;
  min-height: 120px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  border: 1px solid;
  letter-spacing: inherit;
}

.shop-memo-input-textarea{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px;
  display: block;
  overflow: hidden;
  box-sizing: border-box;
  resize: none;
  font: inherit;
  letter-spacing: inherit;

}


</style>
