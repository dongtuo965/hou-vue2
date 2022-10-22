<template>
<div>
  <div id="main" style="width: 600px;height:400px;"></div>
</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'WhiteName',
  data () {
    return {

    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(
        document.getElementById("main")
      );
// 配置option选项
      var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      };
      // 把配置option选项用js放进dom节点
      myChart.setOption(option);
    }
  }
}
</script>

<style scoped>

</style>
