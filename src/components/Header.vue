<template>
  <header>
    <div>
      <h1 style="margin-top: -10px;color: #425049;font-size: 30px">欢迎来到Vue项目</h1>
    </div>
    <div class="opt-wrapper">
      <el-dropdown :hide-on-click="false">
        <div class="demo-basic--circle">
          <div class="block">
            <el-avatar :size="40" :src="avatar" :class="['avatar-info']"></el-avatar>
            <span>{{ $store.state.username }}</span>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown" style="margin-top: -30px;margin-left: -40px">
          <el-dropdown-item><i class="el-icon-info"></i>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout"><i class="el-icon-switch-button"></i>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  data() {
    return {
      avatar: require('@/assets/logo.jpg')
    }
  },
  methods: {
    logout() {
      this.$axios.post('/logout').then(res => {
        console.log(res)
        this.$store.commit('resetState')
        this.$router.push({path: '/login'})
      })
    }
  }
}
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}

/*设定头像图片样式*/
.avatar-info {
  margin-top: 10px;
  margin-right: 40px;
  cursor: pointer;
}

* {
  height: auto;
}
</style>
