<template>
  <div>
    <BradePath></BradePath>
    <router-view></router-view>
    <div >
      <p @click="goxinfo">去详情</p>
    <el-page-header @back="goBack" content="商品列表">
    </el-page-header>
    <el-table
      ref="multipleTable"
      :data="tableData"
      height="700"
      tooltip-effect="dark"
      style="width: 100%;margin: 20px 0"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品"
        >
        <template slot-scope="scope">
          <img style="width: 100px;height: 100px" :src="scope.row.img_big_logo"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
       >
      </el-table-column>
      <el-table-column
        prop="current_price"
        label="单价"
        >
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="数量"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="小计"
        >
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


<!--    <el-pagination-->
<!--      background-->
<!--      :page-size="tiaoshu"-->
<!--      layout="prev, pager, next"-->
<!--      :total="100">-->
<!--    </el-pagination>-->

    <el-pagination
      style="text-align: right"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    </div>
  </div>
</template>
<script>
import BradePath from "@/views/BradePath";
export default {
  name: "GouWuChe",
  components: {BradePath},
  data() {
    return {
      tableData: [],
      tiaoshu:5,
      haha:'',
      currentPage:1,
      pageSize:5,
      total:0,
      multipleSelection: []
    }
  },
  watch:{
    haha(newVal,oldVal)  {
      this.haha = newVal
      console.log( this.haha)
    }
  },

  mounted() {
    this.getData()
// this.$route.matched.map((item)=>{
//       this.haha = item.path
//     })
//     console.log( this.haha)
//
  },

  methods: {
    handleSizeChange(tiaoShuVal) {
      console.log(`每页 ${tiaoShuVal} 条`);
      this.pageSize = tiaoShuVal
      this.currentPage=1
      this.getData()
    },
    goxinfo(){
      alert(996)
      this.$router.push('/usermanager/GouWuChe/shopinfo')

    },
    handleCurrentChange(pageVal) {
      console.log(`当前页: ${pageVal}`);
      this.currentPage = pageVal
      this.getData()
    },
    getData() {
      this.$axios.get('http://localhost:8888/goods/list',
        {params: {current: this.currentPage, pagesize: this.pageSize}}).then((res) => {
        console.log(res)
        this.total = res.data.total
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
