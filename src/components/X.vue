<template>
  <v-card rounded="xl" class="position-relative forums-panel" style="max-width: 100%">
    <v-card-title
      class="headline"
      style="font-size: 1rem; display: flex; align-items: center"
    >
      X Posts
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
        <!-- 標題放在圖片上方 -->
        <div class="text-ellipsis mb-1">{{ item.title }}</div>
        <!-- 圖片 -->
        <a :href="item.link" target="_blank">
          <v-img
            :src="item.image || generatePlaceholderImage(item.title)"
            height="160"
            width="160"
            class="d-block mx-auto"
          ></v-img>
        </a>
        <!-- 作者名稱和 Icon -->
        <div class="author-section mt-1">
          <v-icon
            class="author-icon"
            small
            @click="openAuthorProfile(item.authorProfile)"
          >
            mdi-account
          </v-icon>
          <span
            class="text-ellipsis author-name"
            @click="openAuthorProfile(item.authorProfile)"
          >
            {{ item.author }}
          </span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "XPosts",
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
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      this.wrapText(ctx, text, canvas.width / 2, canvas.height / 2, 150, 22);
      return canvas.toDataURL();
    },
    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
      const words = text.split(" ");
      let line = "";
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);
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
    openAuthorProfile(url) {
      if (url) {
        window.open(url, "_blank");
      }
    },
  },
};
</script>

<style scoped>
@import "@/styles/forums-panels.scss";

.author-section {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.author-icon {
  color: #5c8a10;
  cursor: pointer;
}

.author-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 120px;
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
}

.mb-1 {
  margin-bottom: 4px;
}

.mt-1 {
  margin-top: 4px;
}

.forums-panel-scroll {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: #5c8a10 #000000;
}
</style>
