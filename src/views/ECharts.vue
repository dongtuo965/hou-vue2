<template>
  <div>
<h3>员工信息</h3>

    <el-row >
      <el-col :span="12">
        <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
          <el-form-item label="人员姓名:">
            <el-input v-model="formInline.user" placeholder="请输入内容">
              <el-button slot="append" icon="el-icon-search" @click="searchContent"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="部门:">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="请选择" value="0"></el-option>
              <el-option label="教练部" value="1"></el-option>
              <el-option label="运营部" value="2"></el-option>
              <el-option label="财务部" value="3"></el-option>
              <el-option label="审讯部" value="4"></el-option>

            </el-select>
          </el-form-item>

        </el-form>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button type="" size="mini" icon="el-icon-loading" @click="reloadPage">刷新</el-button>
        <el-button type="primary" size="mini" icon="el-icon-plus">添加新成员</el-button>
      </el-col>

    </el-row>


    <el-table
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="人员姓名"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="会员与否"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="性别"
       >
      </el-table-column>
      <el-table-column
        prop="name"
        label="部门"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="联系方式"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="职位"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="薪资"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="上月工作时长"
        width="180"
        >
      </el-table-column>
      <el-table-column
        label="请假（天）"
        >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
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

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>


    <el-card  @click.native.stop="abc">

      <el-dropdown trigger="click" style="cursor: pointer">
        <span @click.stop="abc">...</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </el-card>

  </div>
</template>

<script>
  import { MessageBox } from 'element-ui';
export default {
  name: 'ECharts',
  data () {
    return {
      formInline: {
        user: '',
        region: "0"
      },
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
      currentPage4: 1
    }
  },
  mounted () {

  },
  methods: {
    reloadPage(){
      // window.location.reload()
      this.$router.go(0)
    },
    onSubmit() {
      console.log('submit!');
    },
    abc(e) {
      this.$router.push('/home')
    },
    searchContent(){
      alert(996)
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });



    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }


}
</script>

<style scoped>
  /deep/ .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
  }
  .el-pagination {
    text-align: end;
    margin-top: 20px;
  }
</style>
