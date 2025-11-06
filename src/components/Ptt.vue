<template>
  <v-card rounded="xl" class="forums-panel">
    <v-list v-if="items.length > 0" class="forums-panel-scroll">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        @click="navigateTo(item.link)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "PTTList",
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

.v-list-item {
  cursor: pointer;
  border-bottom: 5px solid #000000;
}

.forums-panel-scroll {
  scrollbar-width: thin;
  scrollbar-color: #5c8a10 #000000;
}
</style>
