<template>
  <div class="nan">
    <a-row >
      <a-col :span="24" >
        <a-table  size="small" :bordered="false" :columns="LeftTablecolumns" :data-source="LeftTableList" :pagination="false"
                  :rowKey='record=>record.key'>
          <!--            <span slot="category" slot-scope="text, record">-->
          <!--          <template>-->
          <!--            {{caoRecord(record.category)}}-->
          <!--          </template>-->
          <!--        </span>-->
        </a-table>
      </a-col>
    </a-row>

  </div>
</template>

<script>
  export default {
    name: 'TableData',
    props:['LeftTablecolumns','LeftTableList'],
    data(){
      return{

      }
    },
    mounted() {
      // this.$nextTick(() => {
      //   console.log(this.$refs.tableDom)
      //   console.log(this.$refs.tableDom.offsetWidth);
      //   this.contentwidth = this.$refs.tableDom.offsetWidth
      //   this.contentHeight = this.$refs.tableDom.offsetHeight
      //   console.log(this.contentwidth,this.contentHeight)
      //   window.onresize = () => {
      //     this.contentwidth = this.$refs.tableDom.offsetwidth
      //     this.contentHeight = this.$refs.tableDom.offsetHeight
      //     console.log(this.contentwidth,this.contentHeight)
      //   }
      // })


    }
  }
</script>


<style >
  .nan .ant-table {
    border-color: transparent;
    border-width: 0;
    line-height: 1;
  }
  .nan .ant-table td, .ant-table th {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0.86px;
    font-weight: 400;
    border-bottom: none!important;
  }
  .nan .ant-table-thead {
    background-image: linear-gradient(-89deg, rgba(69,137,250,0.04) 0%, rgba(69,137,250,0.30) 52%, rgba(69,137,250,0.00) 100%);
    line-height: 0.8;
  }
  .nan .ant-table-thead   .ant-table-column-title {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(255,255,255,0.65);
    letter-spacing: 0.74px;
    font-weight: 400;
  }
  /*划上表格的时候背景色改成主色调*/
  .nan tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
    background: #011529;

  }

  /*隔行换色（背景）*/
  .nan tr.ant-table-row.ant-table-row-level-0:nth-child(even){
    /*background: url("/chartdata/tablebgc1.png");*/
  }
  /*.nan tr.ant-table-row.ant-table-row-level-0:nth-child(even):hover{*/
  /*  background: url("/chartdata/tablebgc1.png");*/
  /*}*/



  .nan  .ant-table-thead > tr > th {
    border-bottom: none!important;
  }
</style>
