<template>
  <div class="about">
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
        <el-table-column prop="userName" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="sex" label="性别"> </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.aaa();
  },
  methods: {
    aaa() {
      this.$axios
        .get("http://localhost:3000/scoreList")
        .then((response)=> {
          // 处理成功情况
          console.log(response);
          console.log(response.data);
          this.tableData = response.data;
          console.log(tableData);
        })
        .catch( (error) =>{
          // 处理错误情况
          console.log(error);
        })
        .then( ()=> {
          // 总是会执行
        });
    },
  },
};
</script>
