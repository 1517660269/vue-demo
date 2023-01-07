<template>
  <div>
    <el-menu background-color="#545c64" text-color="#ffffff" active-text-color="#ffd04b"
        class="el-menu-vertical-demo" router
        :default-active="this.$store.state.editTableTabsValue">
      <el-menu-item :index="item.name" v-for="item in menu_data" :key="item.name" @click="selectMenu(item)">
        <i :class="item.icon"></i>{{item.name}}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import '../mock/mock'
// import {getMenu} from "@/mock/mock";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Aside",
  data () {
    return {}
  },
  computed: {
    menu_data: {
      get() {
        return this.$store.state.menu_data
      }
    }
  },
  methods: {
    selectMenu(item) {
      this.$router.push({name: item.name})
      this.$store.commit('addEditTableTabs', item)
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 505px;
}
</style>
