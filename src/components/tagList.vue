<template>
  <div class="tag-list">
    <div class="tag add-tag-toggle-button" @click="addTagToggle">
      <img src="../assets/plus-a.svg" class="toggle-button" alt="+"/>
    </div>
    <div v-for="(tag,index) in StatusTagList" class="tag" :key="index">
      <p class="tag-name">{{ tag.tag_name }}</p>
      <img class="delete-tag-button" src="../assets/close-a.svg" alt="x" @click="deleteTagModalOpen(tag.tag_id)">
    </div>
  </div>

  <div class="modal-wrapper" v-show="isModalOpen" @click.self="closeModal" v-on:keydown.enter="console.log('a')">
    <div class="modal add-tag-modal" v-show="TagListData.isAddTagModalOpen">
      <input v-model="TagListData.tagName" class="add-tag-modal-input" type="text" list="tag-list">
      <button @click="addTag" class="add-tag-modal-button">Add</button>
    </div>
    <div class="modal delete-tag-modal" v-show="TagListData.isDeleteTagModalOpen">
      <p>削除してもよろしいですか？</p>
      <div class="delete-tag-confirm-wrapper">
        <button class="delete-tag-confirm-button">削除</button>
        <button class="delete-tag-confirm-button">キャンセル</button>
      </div>
    </div>
  </div>

  <datalist id="tag-list">
    <option>レストラン</option>
  </datalist>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {BaseURL} from "@/assets/BaseURL";
import {addTagRequestBody, tagData, TagListData} from "../../../Types";
import axios from "axios";

export default defineComponent({
  name: "tagList",
  data() {
    return {
      TagListData: {
        tag_text: "",
        isAddTagModalOpen: false,
        isDeleteTagModalOpen: false,
        tagName: "",
        deleteTagId: null,
        InComponentTagList:[]
      } as TagListData
    }
  },
  props: {
    StatusTagList: {
      type: Array as any
    },
    // SuggestTagList: {
    //   type: Array,
    //   default:[]
    // }    // SuggestTagList: {
    //   type: Array,
    //   default:[]
    // }
  },
  watch:{
    StatusTagList(){
      console.log("c")
      console.log(this.StatusTagList)
      this.TagListData.InComponentTagList  = this.StatusTagList
    }
  },
  computed: {
    isModalOpen: function (): boolean {
      return (this.TagListData.isAddTagModalOpen || this.TagListData.isDeleteTagModalOpen)
    }
  },
  created() {
    console.log(this.StatusTagList)
    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape" && this.isModalOpen) {
        this.closeModal()
      }
    })
  },

  methods: {
    addTagToggle() {
      this.TagListData.isAddTagModalOpen = !this.TagListData.isAddTagModalOpen
    },
    addTag: async function () {
      const axiosUrl = BaseURL + "/tag/add"
      const shopId:string|string[] = this.$route.params.id
      try {
        if (typeof shopId!=="string"){
          return
        }
        const shopNumId: number = parseInt(shopId)

        const axiosParams: addTagRequestBody = {
          tag_name: this.TagListData.tagName,
          shop_id: shopNumId
        }

        const axiosResult = await axios.post(axiosUrl, axiosParams)
        console.log(axiosResult)
        this.TagListData.isAddTagModalOpen = false
        const tagId:number|null = axiosResult.data.TagId
        this.TagListData.InComponentTagList.push({tag_name:this.TagListData.tagName,tag_id:tagId}as tagData)
        this.TagListData.tagName = ""
      } catch (e) {
        console.log(e)
        return
      }
    },
    deleteTagModalOpen(tagId: number|null):void{

      this.TagListData.isDeleteTagModalOpen = true
      this.TagListData.deleteTagId = tagId

    },
    // deleteTag:async function(){
    //   const axiosURL = BaseURL + "/tag/delete"
    //   const axiosParams = {
    //
    //   }
    // },
    closeModal: function ():void {
      this.TagListData.isDeleteTagModalOpen = false
      this.TagListData.isAddTagModalOpen = false
      this.TagListData.deleteTagId = null
    }
  }
})
</script>

<style scoped>
.tag-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.tag {
  margin: 5px;
  padding: 5px;
  min-width: 80px;
  height: 30px;
  box-sizing: border-box;
  border-radius: 10px;

  background: goldenrod;
  color: white;

  display: flex;
  align-items: center;
  justify-content: space-around;

}

.add-tag-toggle-button {
  padding-top: 2px;
  padding-bottom: 2px;
}

.toggle-button {
  height: 25px;
}

.modal-wrapper {
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

.modal {
  width: 60%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: #fff;
  border-radius: 10px;
}

.add-tag-modal-input, .add-tag-modal-button {
  max-width: 400px;
  box-sizing: border-box;
  margin: 25px;
  padding: 10px;
  width: 80%;
}

.delete-tag-button {
  padding: 5px;
  height: 20px;
}

.delete-tag-confirm-wrapper {
  width: 80%;
  display: flex;
  justify-content: space-around;
}

.delete-tag-confirm-button {
  width: 40%;
  outline: none;
  box-sizing: border-box;
  padding: 15px;
  background: #fff;
  border: solid 1px #000;
}


.tag-name {
  margin: 0 5px;
}


</style>
