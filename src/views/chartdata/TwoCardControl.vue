<template>
  <div style="width: 100%;height: 100%">
    <h4 style="background: url(/chartdata/cardControl.png) no-repeat;  background-size: cover;height: 14%"></h4>
    <div ref="charts" style="width: 100%;height: calc(100% - 48px) " class="box"></div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import { chartLine } from '@/request/api'
  export default {
    name: 'TwoCardControl',
    data(){
      return{
        chart: undefined,
      }
    },

    mounted() {
      this.$nextTick(() => {
        this.draw()
        console.log(this)
        window.addEventListener('resize', this.resize)

      })

    },
    methods: {
      resize() {
        console.log(this.chart)
        this.chart.resize();
      },
      draw() {

        // chartLine().then(res=>{
        //   let {data,errorCode,errorMessage} = res.data
        //   if (errorCode == "SUCCESS") {
        //     console.log(data)
        this.chart = this.$echarts.init(this.$el.querySelector('.box'))
        // 绘制图表
        this.chart.setOption(
          {
            backgroundColor: '#021e38',
            title: {
              // text: 'Stacked Line'
            },

            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['风控鉴权核验', '黑样本管控核验']
            },
            // grid: {
            //   left: '3%',
            //   right: '4%',
            //   bottom: '3%',
            //   containLabel: true
            // },
            grid: {
              left: 0,
              top: 20,
              right: 16,
              bottom: 0,
              containLabel: true,
              show: false,  // 不显示背景网格
              borderWidth: 0  // 边框宽度设为0，可以去掉边框线
            },
            toolbox: {
              show: false
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                color: '#fff'  // 修改 X 轴文字颜色为黑色（#333）
              },
              splitLine: {
                show: false
              },
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value',
              splitLine: {
                show: false
              }
            },
            legend: {
              icon: 'stack',
              textStyle: {  // 设置图例项的文本样式
                color: '#fff',
                fontWeight: 400,
                fontFamily: 'PingFangSC-Regular',
                fontSize: 12
              },


            },

            series: [
              {
                name: '风控鉴权核验',
                type: 'line',
                stack: 'Total',
                symbol: 'none',
                // areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: '黑样本管控核验',
                type: 'line',
                stack: 'Total',
                symbol: 'none',
                // areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310]
              },

            ]
          }
        )

        //   } else {
        //     this.$message.error(errorMessage)
        //   }
        // }).catch(err=>{
        //   console.log(err)
        // })


      }
    }
  }
</script>

<style scoped>

</style>
