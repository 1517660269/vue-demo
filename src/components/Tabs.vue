<template>
  <div>
    <el-tabs v-model="editTableTabsValue" type="card" closable
             @tab-remove="removeTab"
              @tab-click="clickTab">
      <el-tab-pane
          :key="item.name"
          v-for="item in editTableTabs"
          :name="item.name"
          :label="item.title">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  data() {
    return {}
  },
  computed: {
    editTableTabsValue: {
      get() {
        return this.$store.state.editTableTabsValue
      },
      set(val) {
        this.$store.state.editTableTabsValue = val
      }
    },
    editTableTabs: {
      get() {
        return this.$store.state.editTableTabs
      },
      set(val) {
        this.$store.state.editTableTabs = val
      }
    }
  },
  methods: {
    removeTab(targetName) {
      if (targetName === '首页') {
        return;
      }
      let tabs = this.editTableTabs;
      let activeName = this.editTableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((item, index) => {
          if (item.name === targetName) {
            let nexTab = tabs[index + 1] || tabs[index -1]
            if (nexTab) {
              activeName = nexTab.name
            }
          }
        })
      }

      this.editTableTabsValue = activeName;
      this.editTableTabs = tabs.filter(tab => tab.name !== targetName)
      this.$router.push({name: activeName})
    },
    clickTab(target) {
      this.$router.push({name: target.name})
    }
  }
}
</script>

<style scoped>
</style>
