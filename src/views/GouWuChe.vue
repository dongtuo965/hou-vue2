<template>
  <div>
    <el-page-header @back="goBack" content="购物车">
    </el-page-header>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column
        prop="name"
        label="商品"
        width="120">
        <template slot-scope="scope">
          <img style="width: 100px;height: 100px" :src="scope.row.img_big_logo"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="240">
      </el-table-column>
      <el-table-column
        prop="current_price"
        label="单价"
        width="120">
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="数量"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="小计"
        width="120">
        <template slot-scope="scope">
          {{ (scope.row.current_price * scope.row.goods_number).toFixed(2) }}
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


    <el-pagination
      background
      page-size="5"
      layout="prev, pager, next"
      :total="100">
    </el-pagination>


  </div>
</template>
<script>
export default {
  name: "GouWuChe",
  data() {
    return {
      tableData: [],
      multipleSelection: []
    }
  },

  mounted() {
    this.getData()
  },


  methods: {
    getData() {
      this.$axios.get('http://localhost:8888/goods/list',
        {params: {current: 1, pagesize: 5}}).then((res) => {
        console.log(res)
        this.tableData = res.data.list
      }).catch((err) => {
        console.log(err)
      })
    },

    goBack() {
      console.log('go back');
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }

}
</script>

<style scoped>

</style>
