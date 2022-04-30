<template>
  <div id="wrapper">
    <header>
      <router-link to="/list">Listorante</router-link>
    </header>
    <div id="router-wrapper">
      <router-view/>
    </div>
  </div>

  <div @click="createPage" class="add-page-button">
    <div class="child"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {BaseURL} from "@/assets/BaseURL";
import axios from "axios";
import {CreateShopResponse} from "../../Types";

export default defineComponent({
  name: "app",
  methods: {
    createPage: async function () {
      const axiosURL = BaseURL + "/shop/create"
      const axiosResult = await axios.post(axiosURL)
      const axiosResponseData: CreateShopResponse = axiosResult.data
      if (axiosResponseData.ClientError || axiosResponseData.ServerError) {
        return
      }
      if (!axiosResponseData.ShopId) {
        return
      }
      const pushURL: string = "/shop/" + axiosResponseData.ShopId.toString()
      await this.$router.push({path: pushURL})

    }
  }
})
</script>

<style>
#wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#router-wrapper {
  width: 80%;

}

.add-page-button {
  width: 100px;
  height: 100px;
  background-color: gray;
  border-radius: 20px;
  position: fixed;
  bottom: 50px;
  right: 50px;
}

body{
  margin: 0;

}
p{
  margin: 0;
}
</style>
