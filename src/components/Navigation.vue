<template>
  <v-navigation-drawer
    v-model="drawer"
    v-if="drawer"
    :class="[
      'ml-2',
      'border-lg',
      { 'rounded-xl': rail, 'rounded-pill': !rail },
    ]"
    :rail="!rail"
    :style="{
      width: rail ? '240px' : '65px',
      height: '98vh',
      marginTop: 'calc((100vh - 98vh) / 2)',
    }"
    permanent
  >
    <v-list-item
      :class="[{ 'd-flex justify-center': !rail }]"
      title="ZZZ ARCHIVE"
      nav
    >
      <template v-slot:append>
        <v-btn icon variant="text" @click.stop="rail = !rail">
          <v-icon>{{ !rail ? "mdi-menu" : "mdi-backburger" }}</v-icon>
        </v-btn>
      </template>
    </v-list-item>

    <!-- 動態生成的列表項目，包括子標題 -->
    <v-list dense nav>
      <template v-for="(item, index) in menuItems" :key="item.value">
        <v-divider :thickness="3" v-if="rail && index > 0"></v-divider>
        <v-list-item
          :prepend-icon="item.icon"
          :title="item.title"
          @click="selectItem(item)"
        ></v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>

  <v-bottom-navigation grow v-if="showBottomNav" :active="active">
    <v-btn
      v-for="item in buttomitem"
      :key="item.value"
      @click="selectItem(item)"
    >
      <v-icon>{{ item.icon }}</v-icon>
      {{ item.title }}
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useDisplay } from "vuetify";

export default {
  setup() {
    const { width, height } = useDisplay();
    const drawer = ref(false);
    const rail = ref(true);
    const railIcon = ref("mdi-menu");
    const showBottomNav = ref(false);

    // 切換rail狀態
    const toggleRail = () => {
      rail.value = !rail.value;
    };

    // 大小變
    const handleResize = () => {
      if (width.value > 840) {
        if (height.value <= 600) {
          drawer.value = false; // 大於840
          rail.value = false;
          showBottomNav.value = true;
        } else {
          drawer.value = true;
          rail.value = true;
          showBottomNav.value = false;
        }
      } else if (width.value > 600 && width.value <= 840) {
        drawer.value = true; // 600到840
        rail.value = false;
        showBottomNav.value = false;
      } else {
        drawer.value = false; //  小於600
        rail.value = false;
        showBottomNav.value = true;
      }
    };

    // 在組件掛載後添加事件監聽器
    onMounted(() => {
      handleResize(); // 初始調用一次以設定初始狀態
      window.addEventListener("resize", handleResize);
    });

    // 在組件卸載前移除事件監聽器
    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });

    // 需要返回的數據或方法
    return {
      drawer,
      rail,
      railIcon,
      toggleRail,
      showBottomNav,
    };
  },
  data() {
    return {
      menuItems: [
        { icon: "mdi-home", title: "首頁", value: "", type: "internal" },
        {
          icon: "mdi-cog-outline",
          title: "設定",
          value: "settings",
          type: "internal",
        },
        {
          icon: "mdi-alert-octagon-outline",
          title: "意見回饋",
          value: "suggest",
          type: "external",
        },
      ],
      buttomitem: [
        {
          icon: "mdi-home",
          title: "首頁",
          value: "index",
          type: "internal",
        },
        {
          icon: "mdi-map-outline",
          title: "Wiki",
          value: "wiki",
          type: "internal",
        },
        {
          icon: "mdi-cog-outline",
          title: "工具",
          value: "settings",
          type: "internal",
        },
        {
          icon: "mdi-cog-outline",
          title: "設定",
          value: "settings",
          type: "internal",
        },
      ],
    };
  },
  methods: {
    selectItem(item) {
      if (item.type === "internal") {
        this.$router.push({ path: "/" + item.value });
      } else if (item.type === "external") {
        window.open(item.value, "_blank");
      }
    },
  },
};
</script>