<template>
  <div>
    <div>
      <el-link href="https://www.baidu.com" target="_blank" disabled>默认链接</el-link>
      <el-link type="primary" disabled>主要链接</el-link>
      <el-link type="success" disabled>成功链接</el-link>
      <el-link type="warning" disabled>警告链接</el-link>
      <el-link type="danger" disabled>危险链接</el-link>
      <el-link type="info" disabled>信息链接</el-link>
    </div>
    <div>
      <el-link href="https://www.baidu.com" target="_blank" :underline="false">默认链接</el-link>
      <el-link type="primary" :underline="false">主要链接</el-link>
      <el-link type="success" :underline="false">成功链接</el-link>
      <el-link type="warning" :underline="false">警告链接</el-link>
      <el-link type="danger" :underline="false">危险链接</el-link>
      <el-link type="info" :underline="false">信息链接</el-link>
    </div>

    <div>
      <el-link icon="el-icon-edit">编辑</el-link>
      <el-link>查看<i class="el-icon-view el-icon--right"></i> </el-link>
    </div>

  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Main"
}
</script>

<style scoped>
</style>
