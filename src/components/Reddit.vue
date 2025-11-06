<template>
  <v-card rounded="xl" class="position-relative forums-panel" style="max-width: 100%">
    <v-card-title
      class="headline"
      style="font-size: 1rem; display: flex; align-items: center"
    >
      Reddit Posts
      <div style="margin-left: auto; display: flex; align-items: center">
        <v-btn icon @click="scrollLeft">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon @click="scrollRight">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <div
      ref="scrollContainer"
      class="forums-panel-scroll"
      @scroll="handleScroll"
      style="overflow-x: auto; white-space: nowrap; padding: 0 8px;"
    >
      <div
        v-for="(item, i) in items"
        :key="i"
        class="d-inline-block mx-1 text-left"
        style="width: 160px"
      >
        <a :href="item.link" target="_blank">
          <template v-if="isVideo(item.image)">
            <video
              :src="item.image"
              height="160"
              width="160"
              class="d-block mx-auto"
              controls
            ></video>
          </template>
          <template v-else>
            <v-img
              v-if="item.image"
              :src="item.image"
              height="160"
              width="160"
              class="d-block mx-auto"
            ></v-img>
            <v-img
              v-else
              :src="generatePlaceholderImage(item.title)"
              height="160"
              width="160"
              class="d-block mx-auto"
            ></v-img>
          </template>
        </a>
        <div class="text-ellipsis">{{ item.title }}</div>
        <div class="d-flex align-items-center">
          <v-icon>mdi-thumb-up</v-icon>
          <span class="ml-2">{{ item.upvotes }}</span>
          <v-icon class="ml-4">mdi-comment</v-icon>
          <span class="ml-2">{{ item.comments }}</span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "RedditPosts",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    generatePlaceholderImage(text) {
      const canvas = document.createElement("canvas");
      canvas.width = 160;
      canvas.height = 160;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ccc";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#000";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";

      // 將字串分行
      const maxWidth = 140; // 字串顯示的最大寬度
      const lineHeight = 18; // 行高
      const words = text.split(" ");
      let line = "";
      const lines = [];
      words.forEach((word) => {
        const testLine = line + word + " ";
        const testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth) {
          lines.push(line);
          line = word + " ";
        } else {
          line = testLine;
        }
      });
      lines.push(line);

      // 將每行字串繪製到 canvas 中
      const yOffset = (canvas.height - lines.length * lineHeight) / 2;
      lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, yOffset + index * lineHeight);
      });

      return canvas.toDataURL();
    },
    scrollLeft() {
      const container = this.$refs.scrollContainer;
      container.scrollBy({ left: -200, behavior: "smooth" });
    },
    scrollRight() {
      const container = this.$refs.scrollContainer;
      container.scrollBy({ left: 200, behavior: "smooth" });
    },
    handleScroll() {
      const container = this.$refs.scrollContainer;
      this.showLeftShadow = container.scrollLeft > 0;
      this.showRightShadow =
        container.scrollLeft + container.clientWidth < container.scrollWidth;
    },
    isVideo(url) {
      if (!url) return false;
      // 去除查詢參數的部分
      const cleanUrl = url.split("?")[0];
      // 支援的影片副檔名
      const videoExtensions = ["mp4", "webm", "ogg"];
      const extension = cleanUrl.split(".").pop().toLowerCase();
      return videoExtensions.includes(extension);
    },
  },
};
</script>

<style scoped>
@import "@/styles/forums-panels.scss";

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
}

.forums-panel-scroll {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: #5c8a10 #000000;
}
</style>
