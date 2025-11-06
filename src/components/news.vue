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
// API response type definitions
/**
 * @typedef {Object} NewsBanner
 * @property {string} name
 * @property {string} url
 */

/**
 * @typedef {Object} NewsItem
 * @property {string[]} sChanId
 * @property {string} sTitle
 * @property {string} sIntro
 * @property {string} sUrl
 * @property {string} sAuthor
 * @property {string} sContent
 * @property {string} sExt - JSON string containing news-banner array
 * @property {string} dtStartTime
 * @property {string} dtEndTime
 * @property {string} dtCreateTime
 * @property {number} iInfoId
 * @property {string[]} sTagName
 * @property {string} sCategoryName
 * @property {string} sSign
 */

/**
 * @typedef {Object} NewsApiResponse
 * @property {number} retcode
 * @property {string} message
 * @property {Object} data
 * @property {number} data.iTotal
 * @property {NewsItem[]} data.list
 */

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
    /**
     * Safely parse sExt JSON and extract image URL
     * @param {string} sExt - JSON string containing news-banner array
     * @returns {string|null} - Image URL or null if not found
     */
    extractImageUrl(sExt) {
      try {
        if (!sExt) return null;
        
        const extData = JSON.parse(sExt);
        if (!extData || !extData["news-banner"] || !Array.isArray(extData["news-banner"])) {
          return null;
        }
        
        const banner = extData["news-banner"][0];
        return banner && banner.url ? banner.url : null;
      } catch (error) {
        console.warn("Failed to parse sExt JSON:", error);
        return null;
      }
    },

    async fetchNewsData() {
      try {
        const response = await fetch(
          "https://api.zzz-archive.com/news/zh-tw"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        /** @type {NewsApiResponse} */
        const data = await response.json();
        //console.log("API Response:", data);

        // Map the API response to our component format
        this.newsList = data.data.list
          .map((item) => {
            const imageUrl = this.extractImageUrl(item.sExt);
            return {
              iInfoId: item.iInfoId,
              imageUrl: imageUrl,
            };
          })
          .filter((item) => item.imageUrl !== null); // Filter out items without images

        // 强制重新渲染 v-carousel
        this.carouselKey += 1;
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    },
  },
};
</script>
