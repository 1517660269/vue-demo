<template>
  <div class="app">
    <div class="search-form" style="margin: 10px">
      <el-form :inline="true">
        <el-form-item label="日期">
          <el-date-picker type="daterange" v-model="date" range-separator="——"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="name" placeholder="请输入姓名" prefix-icon="el-icon-search" style="width: 200px"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="">
      <el-button type="primary" @click="add">添加</el-button>
      <el-button type="danger" @click="delAll">删除全部</el-button>
    </div>
    <div class="table">
      <el-table :data="page.list" style="width: 100%" max-height="450"
                ref="multipleTable"
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}"
                @selection-change="handleSelectionChange"
                @cell-dblclick="editCell"
                @cell-click="cellClick">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" v-if="false"></el-table-column>
        <el-table-column prop="date" label="日期" sortable :formatter="formatterTime"></el-table-column>
        <el-table-column prop="name" label="姓名" sortable></el-table-column>
        <el-table-column prop="money" label="金额" sortable>
          <template v-slot="scope">
            <div v-if="row===scope.row.id && column === scope.column.id">
              <el-input v-model="scope.row.money" @blur="updateData"/>
            </div>
            <div v-else>
              {{ scope.row.money }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="春">
          <el-table-column prop="springArea" label="面积">
            <template v-slot="scope">
              <div v-if="row===scope.row.id && column === scope.column.id">
                <el-input v-model="scope.row.springArea" @blur="updateData"/>
              </div>
              <div v-else>
                {{ scope.row.springArea }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="springMoney" label="金额">
            <template v-slot="scope">
              <div v-if="row===scope.row.id && column === scope.column.id">
                <el-input v-model="scope.row.springMoney" @blur="updateData"/>
              </div>
              <div v-else>
                {{ scope.row.springMoney }}
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="夏">
          <el-table-column prop="summerArea" label="面积">
            <template v-slot="scope">
              <div v-if="row===scope.row.id && column === scope.column.id">
                <el-input v-model="scope.row.summerArea" @blur="updateData"/>
              </div>
              <div v-else>
                {{ scope.row.summerArea }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="summerMoney" label="金额">
            <template v-slot="scope">
              <div v-if="row===scope.row.id && column === scope.column.id">
                <el-input v-model="scope.row.summerMoney" @blur="updateData"/>
              </div>
              <div v-else>
                {{ scope.row.summerMoney }}
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="秋">
          <el-table-column prop="autumnArea" label="面积">
            <template v-slot="scope">
              <div v-if="row===scope.row.id && column === scope.column.id">
                <el-input v-model="scope.row.summerMoney" @blur="updateData"/>
              </div>
              <div v-else>
                {{ scope.row.summerMoney }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="autumnMoney" label="金额">
            <template v-slot="scope">
              <div v-if="row===scope.row.id && column === scope.column.id">
                <el-input v-model="scope.row.autumnMoney" @blur="updateData"/>
              </div>
              <div v-else>
                {{ scope.row.autumnMoney }}
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="冬">
          <el-table-column prop="winnerArea" label="面积">
            <template v-slot="scope">
              <div v-if="row===scope.row.id && column === scope.column.id">
                <el-input v-model="scope.row.winnerArea" @blur="updateData"/>
              </div>
              <div v-else>
                {{ scope.row.winnerArea }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="winnerMoney" label="金额">
            <template v-slot="scope">
              <div v-if="row===scope.row.id && column === scope.column.id">
                <el-input v-model="scope.row.winnerMoney" @blur="updateData"/>
              </div>
              <div v-else>
                {{ scope.row.winnerMoney }}
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="update(scope.row)">编辑</el-button>
            <el-button type="text" size="small" style="color:red" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     layout="total, prev, pager, next, sizes"
                     :page-sizes="[10, 20, 30, 40]"
                     :current-page.sync="page.currentPage"
                     :page-size="page.pageSize"
                     :total="page.totalCount">
      </el-pagination>
    </div>
    <div>
      <el-dialog title="添加" :visible.sync="dialogFormVisible" @close="closedForm">
        <div class="el-dialog-dive">
          <el-form :inline="true" :model="form" ref="addForm" label-width="120px">
            <el-tabs type="border-card" value="basic">
              <el-tab-pane label="基础信息" name="basic">
                <el-form-item label="日期">
                  <el-date-picker type="date" v-model="form.date" placeholder="开始日期"/>
                </el-form-item>
                <el-form-item label="姓名">
                  <el-input v-model="form.name" placeholder="请输入姓名" style="width: 200px"/>
                </el-form-item>
                <el-form-item label="金额">
                  <el-input v-model="form.money" type="number" placeholder="请输入金额" style="width: 200px"/>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="春" name="spring">
                <el-form-item label="面积">
                  <el-input v-model="form.springArea" type="number" style="width: 200px"/>
                </el-form-item>
                <el-form-item label="金额">
                  <el-input v-model="form.springMoney" type="number" style="width: 200px"/>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="夏" name="summer">
                <el-form-item label="面积">
                  <el-input v-model="form.summerArea" type="number" style="width: 200px"/>
                </el-form-item>
                <el-form-item label="金额">
                  <el-input v-model="form.summerMoney" type="number" style="width: 200px"/>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="秋" name="autumn">
                <el-form-item label="面积">
                  <el-input v-model="form.autumnArea" type="number" style="width: 200px"/>
                </el-form-item>
                <el-form-item label="金额">
                  <el-input v-model="form.autumnMoney" type="number" style="width: 200px"/>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="冬" name="winner">
                <el-form-item label="面积">
                  <el-input v-model="form.winnerArea" type="number" style="width: 200px"/>
                </el-form-item>
                <el-form-item label="金额">
                  <el-input v-model="form.winnerMoney" type="number" style="width: 200px"/>
                </el-form-item>
              </el-tab-pane>
            </el-tabs>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import {FarmVo} from "@/object/FarmVo";
import {edit, getTableList} from "@/api/axios";

export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Table",
  data() {
    return {
      activeName: 'basic',
      delIds: [],
      dialogFormVisible: false,
      date: '',
      name: '',
      form: new FarmVo(),
      row: '',
      column: '',
      tmpRow: '',
      page: {
        currentPage: 1,
        pageSize: 10,
        totalPage: 0,
        totalCount: 0,
        list: []
      }
    }
  },
  methods: {
    getTableList() {
      let startTime = null;
      let endTime = null;
      if (this.date != null && this.date.length > 1) {
        startTime = date2String(this.date[0]);
        endTime = date2String(this.date[1]);
      }
      const params = {
        page: this.page.currentPage - 1,
        pageSize: this.page.pageSize,
        name: this.name,
        startTime: startTime,
        endTime: endTime
      }
      getTableList(params).then(res => {
        this.page.list = res.data.content;
        this.page.totalCount = res.data.numberOfElements;
        this.page.totalPage = res.data.totalPages;
      })
    },
    search() {
      this.getTableList();
    },
    add() {
      this.dialogFormVisible = true;
    },
    closedForm() {
      // 未生效，因为 dialog 懒加载，通过表格中的编辑按钮打开dialog时，传过来了父组件行数据。
      // 即初始化时数据并不是空的，而resetFields() 函数重置时，初始化的值是啥就是啥。
      // 只能手动重置
      //this.$refs.addForm.resetFields();
      this.form = new FarmVo();
    },
    delAll() {
      this.$message({
        message: this.delIds
      })
      this.delIds = [];
      this.$refs.multipleTable.clearSelection();
    },
    submit() {
      this.dialogFormVisible = false;
      this.form.date = date2String(this.form.date)
      const id = this.form.id;
      edit(this.form).then(res => {
        if (res.status === 200) {
          if (id === null || id === '') {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }
        }
        this.getTableList();
      })
    },
    handleSelectionChange(val) {
      val.forEach(item => {
        const id = item.id;
        if (this.delIds.indexOf(id) === -1) {
          this.delIds.push(id);
        }
      })
    },
    update(row) {
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
    },
    del(row) {
      this.$confirm('此操作将删除当前数据，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        // 调用接口
        const id = row.id;
        this.$message({
          type: 'success',
          message: '删除' + id + '成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editCell(row, column) {
      this.row = row.id;
      this.column = column.id;
      this.tmpRow = row
    },
    updateData() {
      //this.tableData = data;
    },
    cellClick() {

    },
    handleSizeChange(val) {
      this.page = val;
    },
    handleCurrentChange(val) {
      this.pageSize = val;
    },
    formatterTime(row, column) {
      let date = row[column.property];
      if (!isNaN(Date.parse(date))) {
        return /\d{4}-\d{1,2}-\d{1,2}/g.exec(date);
      } else {
        return date
      }
    }
  },
  created() {
    this.getTableList()
  }
}

function date2String(date) {
  if (date instanceof String) {
    return date;
  } else if (date instanceof Object) {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    if (day.length === 1) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  } else {
    return date2String(new Date())
  }
}
</script>

<style scoped>
.el-dialog-dive {
  height: 45vh;
  overflow-x: hidden;
}
</style>