<template>
  <div class="home">

    <div id="id" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
  },
  mounted() {
    console.log(this)
    this.init()
  },
  methods:{
    init(){
      var myChart = this.$echarts.init(document.getElementById('id'))
      var option = {
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [15, 23, 24, 28, 35, 47, 60],
            type: 'line'
          }
        ]
      };
      option && myChart.setOption(option);
    }
  },
}
</script>
