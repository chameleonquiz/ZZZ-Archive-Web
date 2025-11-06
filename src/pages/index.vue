<template>
  <Banner
    type="warning"
    message="這是一個警告通知"
    :visible="warningVisible"
    @update:visible="warningVisible = $event"
    url="https://github.com/mrfatworm/ZZZ-Archive"
  />

  <v-container>
    <v-row class="ga">
      <v-col cols="12" md="6" class="d-flex flex-column">
        <News class="flex-grow-1" />
        <Profile />
        <PixivCard />
      </v-col>
      <v-col cols="12" md="6" class="d-flex flex-column">
        <Forums class="flex-grow-1" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import News from "@/components/news.vue";

export default {
  components: {
    News,
  },
  data() {
  },
};
</script>

<style scoped>
.flex-grow-1 {
  flex-grow: 1; /* 使組件填滿剩餘空間 */
}
</style>
