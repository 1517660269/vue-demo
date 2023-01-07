<template>
  <div>
    <div style="display: flex">
      <el-input style="width: 230px" id='search-input' size='small' label-width='100px'
                prefix-icon="el-icon-search" placeholder="请输入名字..."
                v-model='search_name'>
      </el-input>
      <el-button type="primary" size='small' class="search-button" @click="search">搜索</el-button>
      <el-button type="primary" size='small' @click="add">新增</el-button>
    </div>
    <div style="margin-top: 5px;">
      <el-table
          :data="userList"
          style="width: 100%" height="360"
          border header-row-class-name="table_header_class">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="tag" label="标签">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>
              {{ scope.row.tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="mod(scope.row)" type="text" size="small">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm
                confirm-button-text='确定'
                cancel-button-text='取消'
                icon="el-icon-info"
                icon-color="red"
                title="确认删除这条记录吗？"
                @confirm="del(scope.row)"
            >
              <el-button slot="reference" type="text" size="small">删除</el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          background
          layout="prev, pager, next"
          :page-size.sync="pager.pageSize"
          :current-page="pager.index"
          :page-count="pager.totalPage"
          @current-change="handleCurrentChange"
      >
      </el-pagination>

    </div>


    <el-dialog title="用户信息维护" :visible.sync="dialogFormVisible" @close="close">
      <el-form :model="dataForm" :label-width="formLabelWidth" :rules="rules" ref="dataForm">
        <el-form-item label="名字" prop="name">
          <el-col :span="15">
            <el-input v-model="dataForm.name" autocomplete="off" size="small"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="日期" style="display: table" porp="date">
          <el-col :span="20">
            <el-date-picker size="small"
                            v-model="dataForm.date"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="地址标签" prop="tag">
          <el-col :span="10">
            <el-select v-model="dataForm.tag" placeholder="请选择地址标签" size="small">
              <el-option label="家" value="家"></el-option>
              <el-option label="工作" value="工作"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-col :span="20">
            <el-input type="textarea" v-model="dataForm.address"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: "UserList",
  data() {
    return {
      userList: [],
      search_name: '',
      dialogFormVisible: false,
      dataForm: {
        date: '',
        name: '',
        address: '',
        tag: ''
      },
      formLabelWidth: '150px',
      rules: {
        name: [
          {required: true, message: '请输入名字', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
        ],
        tag: [
          {required: true, message: '请选择地址标签', trigger: 'change'}
        ],
        date: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        address: [
          {required: true, message: '请输入地址', trigger: 'blur'}
        ]
      },
      modFlag: false,
      pager: {
        pageSize: 2,
        totalPage: 1,
        index: 1
      }
    }
  },
  created() {
    this.search()
  },
  methods: {
    getUserList() {
      const url = '/userList?name=' + this.search_name + '&pageSize=' + this.pager.pageSize + '&index=' + this.pager.index
      this.$axios.get(url).then(res => {
        this.userList = res.data.userList
      })
    },
    search() {
      const url = '/search?name=' + this.search_name + '&pageSize=' + this.pager.pageSize + '&index=' + this.pager.index
      this.$axios.get(url).then(res => {
        this.userList = res.data.userList
        this.pager.totalPage = res.data.pager.totalPage
      })
    },
    add() {
      this.dialogFormVisible = true
    },
    confirm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let param = this.dataForm
          let date = param.date
          param.date = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (date.getDate())).slice(-2);
          if (this.modFlag) {
            this.$axios.put('/user', param).then(res => {
              this.userList = res.data.userList;
              this.dialogFormVisible = false;
            })
          } else {
            this.$axios.post('/user', param).then(res => {
              this.userList = res.data.userList;
              this.dialogFormVisible = false;
            })
          }

        } else {
          return false
        }
      })
    },
    cancel() {
      this.dialogFormVisible = false
    },
    mod(row) {
      //将选中的行内容赋值给表单对象
      this.dataForm.date = new Date(row.date);
      this.dataForm.address = row.address;
      this.dataForm.tag = row.tag;
      this.dataForm.name = row.name;
      //显示编辑窗口
      this.dialogFormVisible = true;
      this.modFlag = true;
    },
    close() {
      this.modFlag = false;
    },
    del(row) {
      this.$axios.delete('/user/' + row.name).then(res => {
        this.userList = res.data.userList
      })
    },
    handleCurrentChange(val) {
      //把当前页的值设置给index
      this.pager.index = val;
      //执行查询，更新数据
      this.search();
    }
  }
}
</script>

<style scoped>
/deep/ .table_header_class th {
  background-color: #91a8b1 !important;
  color: white;
}

/* 处理表格数据不显示 */
/deep/ .el-table {
  overflow: unset
}

/deep/ .el-table__body-wrapper {
  overflow: unset
}

/deep/ .el-table .cell {
  overflow: unset
}

</style>
