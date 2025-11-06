<template>
  <v-row>
    <v-col>
      <div class="component-container">
        <component 
          :is="selectedComponent" 
          :items="items[selectedComponent]" 
        />
      </div>
      <v-chip-group v-model="selectedComponent" column mandatory>
        <v-chip
          v-for="component in components"
          :key="component.value"
          :value="component.value"
          variant="outlined"
        >
          {{ component.text }}
        </v-chip>
      </v-chip-group>
    </v-col>
  </v-row>
</template>

<script>
import Bahamut from "./Bahamut.vue";
import NGAList from "./Nga.vue";
import PTTList from "./Ptt.vue";
import XPosts from "./X.vue";
import RedditPosts from "./Reddit.vue";

export default {
  name: "ParentComponent",
  components: {
    Bahamut,
    NGAList,
    PTTList,
    XPosts,
    RedditPosts,
  },
  data() {
    return {
      selectedComponent: "Bahamut", // 預設顯示的組件
      components: [
        { text: "巴哈", value: "Bahamut" },
        { text: "NGA", value: "NGAList" },
        { text: "PTT", value: "PTTList" },
        { text: "X", value: "XPosts" },
        { text: "Reddit", value: "RedditPosts" },
      ],
      items: {
        Bahamut: [],
        NGAList: [],
        PTTList: [],
        XPosts: [],
        RedditPosts: [],
      },
    };
  },
  mounted() {
    this.loadItemsFromLocalStorage();
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbx2fQc_sDvU_eh9tsM8ZJEIfRWUTHim_v3VYklE_wn76yfhYtk8-z1E7JppOPSnA-Qx/exec"
        );
        const data = await response.json();
        this.items.Bahamut = data.baha;
        this.items.NGAList = data.nga;
        this.items.PTTList = data.ptt;
        this.items.XPosts = data.x;
        this.items.RedditPosts = data.reddit;

        // 保存資料到 localStorage
        this.saveItemsToLocalStorage();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    saveItemsToLocalStorage() {
      const data = {
        items: this.items,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem("forumItemsData", JSON.stringify(data));
    },
    loadItemsFromLocalStorage() {
      const data = JSON.parse(localStorage.getItem("forumItemsData"));
      if (data) {
        const currentTime = new Date().getTime();
        const expiryTime = 4 * 60 * 60 * 1000; // 4小時
        if (currentTime - data.timestamp < expiryTime) {
          this.items = data.items;
        } else {
          localStorage.removeItem("forumItemsData");
        }
      }
    },
  },
};
</script>

<style scoped>
@import "@/styles/forums-panels.scss";

.component-container {
  display: flex;
  flex-direction: column;
}
</style>
