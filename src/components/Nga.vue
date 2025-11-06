<template>
  <v-card rounded="xl" class="forums-panel">
    <v-list v-if="items.length > 0" class="forums-panel-scroll">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        @click="navigateTo(item.link)"
        :class="{ 'odd-item': i % 2 === 0, 'even-item': i % 2 !== 0 }"
      >
        <v-list-item-content>
          <v-list-item-title class="nga-text">{{
            item.title
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "NGAList",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    navigateTo(link) {
      window.open(link, "_blank");
    },
  },
};
</script>

<style scoped>
@import "@/styles/forums-panels.scss";

.odd-item {
  background-color: #fff0cd;
}
.even-item {
  background-color: #fff8e7;
}
.nga-text {
  color: #1a3959;
}

.forums-panel-scroll {
  scrollbar-width: thin;
  scrollbar-color: #5c8a10 #000000;
}
</style>
