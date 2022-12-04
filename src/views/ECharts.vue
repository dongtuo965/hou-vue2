<template>
  <div>
    <!--    弹出框-->
    <el-button type="text" @click="dialogVisible = true">点击打开</el-button>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
<!--      弹出框内容-->
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>

          <el-form-item label="日期" required>
            <el-col :span="11">
              <el-form-item prop="date">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>

          </el-form-item>

<!--          <el-form-item>-->
<!--            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
<!--            <el-button @click="resetForm('ruleForm')">重置</el-button>-->
<!--          </el-form-item>-->
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

<!--    表格-->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="current_price"
        label="当前价格">
      </el-table-column>
      <el-table-column
        label="图片">
        <template slot-scope="scope">
          <img style="width: 50px;height: 50px" :src="scope.row.img_big_logo"/>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ECharts',
  data () {
    return {
      ruleForm: {
        name: '',
        address: '',
        date: '',

        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      },

      dialogVisible: false,
      tableData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('http://localhost:8888/goods/list',
        { params: { current: 1, pagesize: 5 } }).then((res) => {
        console.log(res)
        this.tableData = res.data.list
      }).catch((err) => {
        console.log(err)
      })
    },

    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }

  }
}
</script>

<style scoped>

</style>
