<template>
  <v-row>
    <v-col rounded="lg">
      <v-carousel
        v-if="newsList.length > 0"
        :key="carouselKey"
        height="300"
        show-arrows="hover"
        cycle
        hide-delimiter-background
        hide-delimiters
        ref="carousel"
      >
        <v-carousel-item v-for="(newsItem, i) in newsList" :key="i">
          <v-card flat tile rounded="xl">
            <a
              :href="`https://zenless.hoyoverse.com/en-us/news/${newsItem.iInfoId}`"
              target="_blank"
            >
              <v-img :src="newsItem.imageUrl" max-height="300"></v-img>
            </a>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      newsList: [],
      carouselKey: 0,
    };
  },
  async mounted() {
    await this.fetchNewsData();
  },
  methods: {
    async fetchNewsData() {
      try {
        const response = await fetch(
          "https://api.zzz-archive.com/news/zh-tw"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        //console.log("API Response:", data);

        this.newsList = data.map((item) => ({
          iInfoId: item.iInfoId,
          imageUrl: item.imageUrl,
        }));

        // 强制重新渲染 v-carousel
        this.carouselKey += 1;
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    },
  },
};
</script>
