<template>
    <div>

      <div slot="header" class="clearfix">
        <el-button type="primary" @click="add">新增</el-button>
        <el-input
          style="float: right;width: 30%"
          placeholder="请输入内容"
          v-model="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>


      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>


      <el-dialog
        :before-close="calce"
        title="添加"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="日期" prop="date">

            <el-date-picker

              v-model="ruleForm.date"
              type="date"
              @change="showDate"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="calce">取 消</el-button>
    <el-button type="primary" @click="ok">确 定</el-button>
  </span>
      </el-dialog>

    </div>
</template>
<script>
    export default {
        name: "CrudPage",
      data() {
        return {
          ruleForm:{
            name:'',
            address:'',
            date:'',
          },
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            address: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            date: [
              { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
            ],
          },
          search:'',
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          dialogVisible: false,
        }
      },
      methods:{
        add(){
          this.dialogVisible = true
        },
        showDate(val){
          console.log(val)
        },
        ok(){
          this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              this.tableData.push(this.ruleForm)
              this.ruleForm={}
              this.dialogVisible = false
            } else {
              return false;
            }
          });
        },
        calce(){
          this.dialogVisible = false
          this.ruleForm={}
        },

      }
    }
</script>

<style scoped>

</style>
