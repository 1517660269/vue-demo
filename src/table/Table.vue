<template>
  <div class="app">
    <div class="search-form" style="margin: 10px">
      <el-form :inline="true">
        <el-form-item label="日期">
          <el-date-picker type="daterange" v-model="date" range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="input" placeholder="请输入姓名" prefix-icon="el-icon-search" style="width: 200px"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain>查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="">
      <el-button type="primary" @click="add">添加</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" max-height="450"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="date" label="日期" sortable></el-table-column>
        <el-table-column prop="name" label="姓名" sortable></el-table-column>
        <el-table-column prop="money" label="金额" sortable></el-table-column>
        <el-table-column label="春">
          <el-table-column prop="spring-area" label="面积"/>
          <el-table-column prop="spring-money" label="金额"/>
        </el-table-column>
        <el-table-column label="夏">
          <el-table-column prop="summer-area" label="面积"/>
          <el-table-column prop="summer-money" label="金额"/>
        </el-table-column>
        <el-table-column label="秋">
          <el-table-column prop="autumn-area" label="面积"/>
          <el-table-column prop="autumn-money" label="金额"/>
        </el-table-column>
        <el-table-column label="冬">
          <el-table-column prop="winter-area" label="面积"/>
          <el-table-column prop="winter-money" label="金额"/>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" style="color:red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination background
          layout="prev, pager, next"
          :total="50">
      </el-pagination>
    </div>
    <div>
      <el-dialog title="添加" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="日期">
            <el-date-picker type="date" v-model="form.date" placeholder="开始日期"/>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name" placeholder="请输入姓名" style="width: 200px"/>
          </el-form-item>
          <el-form-item label="金额">
            <el-input v-model="form.money" type="number" placeholder="请输入金额" style="width: 200px"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Table",
  data() {
    return {
      dialogFormVisible: false,
      date: '',
      input: '',
      tableData: [
        {
          date: '2023-03-06',
          name: 'Sally',
          money: 500
        },
        {
          date: '2023-03-06',
          name: 'Sally',
          money: 500
        },
        {
          date: '2023-03-06',
          name: 'Sally',
          money: 500
        },
        {
          date: '2023-03-06',
          name: 'Sally',
          money: 500
        },
        {
          date: '2023-03-06',
          name: 'Sally',
          money: 500
        },
        {
          date: '2023-03-06',
          name: 'Sally',
          money: 500
        },
        {
          date: '2023-03-06',
          name: 'Sally',
          money: 500
        },
        {
          date: '2023-03-06',
          name: 'Sally',
          money: 500
        },
        {
          date: '2023-03-06',
          name: 'Sally',
          money: 500
        },
        {
          date: '2023-03-06',
          name: 'Sally',
          money: 500
        },
        {
          date: '2023-03-06',
          name: 'Sally',
          money: 500
        },
        {
          date: '2023-03-06',
          name: 'Sally',
          money: 500
        },
        {
          date: '2023-03-06',
          name: 'Sally',
          money: 500
        },
        {
          date: '2023-03-06',
          name: 'Sally',
          money: 500
        }
      ],
      form: {
        date: '',
        name: '',
        money: 0
      }
    }
  },
  methods: {
    add() {
      this.dialogFormVisible = true;
    },
    submit() {
      this.dialogFormVisible = false;
      this.form = null;
    }
  }
}
</script>

<style scoped>
</style>