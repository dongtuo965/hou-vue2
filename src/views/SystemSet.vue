<template>
<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button type="primary">新增</el-button>
      <el-input
        style="float: right;width: 30%"
        placeholder="请输入内容"
        v-model="input4">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
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
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">

        </el-tab-pane>

      </el-tabs>
    </div>

  </el-card>

</div>
</template>

<script>
    export default {
        name: "SystemSet",
      data(){
          return{
            input4:'',
            activeName: 'first',
            tableData: []
          }
      },
      mounted() {
          this.tableData =[
        {
          date: '111',
            name: 'pp',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '222',
            name: 'kk',
            address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '3333',
            name: 'hh',
            address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '4444',
            name: 'rr',
            address: '上海市普陀区金沙江路 1516 弄'
        }
          ]
      },
      methods:{
        handleClick(tab) {
          console.log(tab.index);
          if(tab.index=='1'){
            alert(1111)

          }
        }
      }
    }
</script>

<style scoped>

</style>



