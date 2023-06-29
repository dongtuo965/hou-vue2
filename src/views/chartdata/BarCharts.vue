<template>
  <div style="width: 100%;height: calc(100% - 48px)">
<!--    <h4 style="background: url(/chartdata/bankCardSteam.png) no-repeat;  background-size: cover;height: 30px"></h4>-->
    <div ref="charts" style="width: 100%;height: 100% " class="box"></div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import { chartLine } from '@/request/api'
  export default {
    name: 'BarCharts',
    props:['dataSource'],
    data(){
      return{
        chart: undefined,
      }
    },

    mounted() {

      this.$nextTick(() => {
        window.addEventListener('resize', this.resize);
        this.draw()
      })

    },
    methods:{
      draw() {

        // chartLine().then(res=>{
        //   let {data,errorCode,errorMessage} = res.data
        //   if (errorCode == "SUCCESS") {
        //     console.log(data)
        this.chart = this.$echarts.init(this.$el.querySelector('.box'))

        let barWidth = 10 /* 进度条及进度条radius宽度 */,
          nameWidth = 60 /* 进度条名称宽度 */,
          unit = '人' /* 单位 */,
          attaData = [] /* 进度条数据 */,
          attaVal = [] /* 进度条数值 */,
          topName = [] /* 进度条名称 */,
          salvProMax = []; /* 背景条数据 */
        this.dataSource.forEach((it, i) => {
          // let itemStyle = {
          //     color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i],
          // };
          topName[i] = `${it.name}`;
          attaVal[i] = it.value;
          attaData[i] = {
            value: parseFloat(it.value).toFixed(2),
            // itemStyle: itemStyle,
          };
        });
        /* 该值无具体作用，取进度最大值 * 1.2 */
        salvProMax = Array(attaVal.length).fill(Math.max(...attaVal) * 1.2);
        // const img3 =
        //   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAkBJREFUOE+dlT1MU2EUhp/TNgVBibVKtEBM+OnCBizGxMRoMMbEgHK7IDEmRhYTB6NUJhMTQ8vioAMNDkYG0wsSVuqEMYoRjEMH5F8oRMVWK0Ot4GdaNBforbSe8bznPPd893vvuYJZaGE7P61NiDQBRwAXkAQWgbegBrGtD6HXpnJbQjJ42kQz4AeqTR9mJKdQ0kG/++nmOgOoKSu2ybsIN3cAbZUVftZqOtFlPSUYwIvvfZAnzED7eeTuMICXJ1sQ9Lwm216s0Oit6Rduh+2sFEwD5WbAK0dL6DrrTEuOIguBF3Han3w2K42w/0elcH26FVRftulC7S70d6sEXsXpOuOk4/hePI8/pnMZoVSb0DmtI7TkctyTVbsIXTqEdziKb+SrWcuAcGdmDji8E7DSYSN4rhRHoZWGhxFiiV9mLfNC92wCKPgXsKfRieYuxlFowTsSw/f6W7bypHB/Ng7s2WnClK5VFxM8dQDvyxi+cVNoUuidmwDcuQBTNdELFcx8X6NhaDnLkfvmU/4zvZTK3TZCJ0rxPF9hLJqkfp+dN6cPEphapX00mgkUBgR9oRXJbpueOgdaWdGGD+0Wnn1K4Bn9QixpdinSJgTDdopKsho711cBRLAkqja+5eFFDVHBPJpNTC0eGst1YzmMLPhBbvwfVHVzrCK9pQxgUFmpWLqHcDVP6AM+uK7h2b6+/lLGl86jVFdOC1bULerK+zcPkLmxU2o4bGfdoSE0o6gHyv40RRDGUAxijenUZv4CfgMYbrM+2nZyFAAAAABJRU5ErkJggg==';
        // const img2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAj9JREFUOE+dlUtoE1EUhr+TSWbswnYh4qu29IHBkF0X4kaXoqC22kSxBBTEjYJCq8Un6sJHglhQK3YjUkGb9GEXrsRNcaPiY1HEoEIfZlFw04Dam2RyJS2mNZ00jXd5zj/fOWfumX8Eh6MDPjO1ym7OIs0CW4H1QAr4ruGDS/SQ+cMYltinXOyfI4UBdXxzi9Y6DDQ6FVsQ+yrQaXV/HlyoywN1AEOt8V4DzpQAFabD1lT8nMSwc4k8cOaU9ya6bNgcXAiv6Ip35oGq3duq0bEyOyt4dxKwbsX7RV/2mepX5htQXQg0thzAvbNjLlxRif26j8zgJee6QsKqcNeLOt/YhpbHTipP+0vskR6yb/swth3D2NFBunsfOjFaZBgdEnWxMYbQupxxzStfsF9EsF/1FJMPiLraMAbUlgLKOj+eo8/IPL9A9v3TYvJxUdcbZgCrFNB98BGutX5SXU1LSVOiIvVJYOVSKpd3F+7dd7BHwthvHpQA3q6LA5uKqaSqBs+hYbJTo2QGQ6UGGRd1ty63f46XIqv9ePb2opOTpKN7SsFy+QFR92vbEOe1MQ9/BKsK1HQeptU06Sfbi8AlJDrqM1PJn46LvZyW5iuRMH97Gma/ZfWwJiBCtCxAgVhrgtaRiVjeHFRvTVjg9P9ANUSs0MSsS83bVxQjbW/sAk6UCb3nMSZPSrDAvv5CVF/1fhG5sRyD1chZKzjRv7CBRY6dS85elCQDLqFFo5tANsw9pBOCvMtqhkxdGZPg4l/AH13qwGT3cAHIAAAAAElFTkSuQmCC';
        // const img1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAh9JREFUOE+dlb1rU1EYxp/Ha9OWNtrCzS2NQsVKhjg41EXB3EwuNthg41L6HwgOUkudMqmNIiK4ZFMcirc1OIhTsbEuDlIcDIgptGCG3nszaERsoLySGGM+LucSz3jOc37n/TjnOYTHkOingKMPz5CcIXBOgDCAKsCvgGwJJBdyfrxk4XS1czs7J1xzJylABpBTXof9m2ORgkX97YkXrbomUFKiufb2bUBuqkFdMWV0Y/IWLR7UVppAxywsA+gR1oRnQvnoYhNoxz/OUsTqLbJ2tZApY+PMKmsNcEM/twEc7wRq4X4M35hA39QRSOUA5cSW4kyWdGfwJJ3YuzkQz7yUWngAA9NjCMR1HAoeRjnxXpkEyXm65rol4KxKOZI9C218EOXEphooWKNjvt4BMKEGnm8A1/3KvEvHzP0C0K8GxqGND6GceOUHrNI2V74DCKqUo9mLdaCbyCmBAlRpx558BhBRAy9BCwfhTq/41XCXtpm1IFA2ZTSbbACf+qW8Rif2aE5Az2tz9MFl9EUMMPinxFLZx/5GEZX7bzzBIpinRNM1Z/G82H7hdKyXvg0FJutv2TbvpCDyvEdAu5y8auSXrBZzSGdEsPA/UBL3Qvl03Vha7CulOXuRhwCu9QaVx6GxL9dpWe329Reyd2HhCsm7AHwMFkUIlozNzGprAF2OXe9mNB1w9UpKIEkAUwCONTaVAHwgmNPdoMVCuusL+A124bE/KrlV9gAAAABJRU5ErkJggg==';
        const img4 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAnFJREFUOE+t1c9rXGUUxvHPuTNJ2gamTbVWRe1C0YVSuhatrdiNf4F/gVYEEVG7Le6SiujGWveCuBcElZYqrovgwqIbFX+lJjaQpJNk5sh9550maSPWHxfezeXe7z3nPM95btjpOpcT/vCY8DgewW3YwDwuS5/b5wvPxfqNr8dNvDfyqIHnhWn8KgpkVQphjyzwO6QVHWe9Ehe3MjaBp7Ox27PC0/i+nmX0a3Xte11MYVo4JN0nfWTVe07HsH1gEzibJzVOGPq6VJWWsCxc2wZMuyqwJx3QeNjQJ07Fu5vAM3lMelm6hF+ERVy9DowyP1LXGMheaQZ3CkeEN70aF0IrwJIP8JN0GVcMLQhXpWUT+tYqcFLXuqky37RXx0ypMjyIu/U8E2bzhPACvizVtcC0oFNbHurbMCgVdnU0dYYDPWE/bi9V8ijeaYGvCwfxlayqthV2K3DSmn4FTulYM1lmuKGn2QY8jN/CXH6I7+pp5zevsWhgyS4rReUpRUF9TVH5mj06eoa15VGF97enBX6G8/ixtNyYt25RO9m0qmfNz7XCu8ogJoXd1vVMmDF0oLZ8D46HM/mxLPNrvfc/AOfyfeEH6dtqmX/W8liU9MCo5a2ijFX+T6Lcim2a6sOh7t/b5kZjtyoPLP57Y7d2mM3jwku4VLzYWNi2yzutXhTb7K8ePiK95VSc3wyHuWwj66lq8IXru/xXadPu8mhTDkufei3Obk+bNr6mvSg9eYvxda90qHh4xds3x9c4JefyCelkMe8oYH8vYTr6/DhgDxbTN861CbNzwG69O/oFHBOO4qEaAO0TV/CNdNE+F3b6BfwJwRsoBqR2D5QAAAAASUVORK5CYII='

        const img3 ='/chartdata/noThree.png'
        const img2 ='/chartdata/noTwo.2.png'
        const img1 ='/chartdata/noOne.png'
        // const img4 ='/chartdata/noThree.png'


        // 绘制图表
        this.chart.setOption(
          {
            backgroundColor:'#021e38',
            grid: [
              {
                left: 10,
                top: 20,
                right: 0,
                bottom: 0,
                // containLabel: true,
              },
            ],
            xAxis: [
              {
                gridIndex: 0,
                type: 'value',
                axisLabel: { show: false },
                axisLine: { show: false },
                splitLine: { show: false },
                axisTick: { show: false },
              },
              {
                gridIndex: 0,
                type: 'value',
                max: 100,
                axisLabel: { show: false },
                axisLine: { show: false },
                splitLine: { show: false },
                axisTick: { show: false },
              },
            ],
            yAxis: [
              {
                gridIndex: 0,
                type: 'category',
                inverse: true,
                position: 'left',
                data: this.dataSource.map((item) => item.name),
                axisTick: { show: false },
                axisLine: { show: false },
                splitLine: { show: false },
                axisLabel: {
                  width: 80,
                  padding: [0, 0, 30, -18],
                  align: 'left',
                  formatter: (name, index) => {
                    const id = index + 1;
                    if (id < 4) {
                      return `{icon${id}|}`;
                    } else {
                      return `{count|N0.${id}}`;
                    }
                  },
                  rich: {
                    icon1: {
                      width: 25,
                      height: 12,
                      align: 'center',
                      borderRadius: 50,
                      backgroundColor: {
                        image: img1,
                      },

                    },
                    icon2: {
                      width: 25,
                      height: 12,
                      align: 'center',
                      borderRadius: 50,
                      backgroundColor: {
                        image: img2,
                      },
                    },
                    icon3: {
                      width: 25,
                      height: 12,
                      // shadowColor: '#3374ba',
                      // borderColor: '#3374ba',
                      // borderWidth: 1,
                      borderRadius: 50,
                      align: 'center',
                      backgroundColor: {
                        image: img3,
                      },
                    },
                    count: {
                      padding: [2, 0, 0, 0],
                      width: 20,
                      height: 18,
                      color: '#fff',
                      align: 'center',
                      fontSize: 12,
                      fontFamily: 'DIN',
                      fontWeight: 500,
                      shadowColor: '#011529',
                      borderColor: '#011529',
                      borderRadius: 50,
                      borderWidth: 1,
                      // backgroundColor: {
                      //   image: img4,
                      // },
                    },
                    name: {
                      // width: 80,
                      fontSize: 12,
                      align: 'left',
                      color: '#fff',
                      fontFamily: 'Source Han Sans CN',
                      fontWeight: 500,
                    },
                  },
                },
              },
              {
                gridIndex: 0,
                type: 'category',
                inverse: true,
                data: this.dataSource.map((item) => item.name),
                axisTick: { show: false },
                axisLine: { show: false },
                splitLine: { show: false },
                position: 'left',
                axisLabel: {
                  width: 80,
                  // 左侧间距调整
                  padding: [0, 0, 30, 40],
                  align: 'left',
                  formatter: (name, index) => {
                    return `{value|${name}}`;
                  },
                  rich: {
                    value: {
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 500,
                    },
                  },
                },
              },
              {
                gridIndex: 0,
                type: 'category',
                position: 'right',
                inverse: true,
                margin: 20,
                data: this.dataSource.map((item) => item.name),
                axisTick: { show: false },
                axisLine: { show: false },
                splitLine: { show: false },
                axisLabel: {
                  align: 'right',
                  // 右侧间距调整
                  padding: [10, 10, 40, 0],
                  formatter: (_, index) => {
                    return `{value|${this.dataSource[index].value}}`;
                  },
                  rich: {
                    value: {
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 500,
                    },
                  },
                },
              },
            ],
            series: [
              {
                z: 1,
                type: 'bar',
                xAxisIndex: 0,
                yAxisIndex: 0,
                barWidth: 10,
                data: this.dataSource.map((item) => item.value),
                silent: true,
                itemStyle: {
                  emphasis: {
                    barBorderRadius: [0, 20, 20, 0],
                  },
                  normal: {
                    // barBorderRadius: [0, 20, 20, 0],
                    barBorderRadius: [30, 30, 30, 30],
                    color: new echarts.graphic.LinearGradient(
                      0,
                      0,
                      1,
                      0,
                      [
                        {
                          offset: 0,
                          color: '#4AADF0', // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#7FDBDE', // 100% 处的颜色
                        },
                      ],
                      false
                    ),
                  },
                },
              },
              {
                z: 4,
                type: 'pictorialBar',
                data: this.dataSource.map((item) => item.value),
                xAxisIndex: 0,
                yAxisIndex: 0,
                symbol: 'none',
                symbolRotate: null,
                symbolSize: [15, 15],
                symbolPosition: 'end',
                symbolOffset: [0, 0],
                itemStyle: {
                  color: '#0072FF',
                  shadowColor: '#0072FF',
                  shadowBlur: 10,

                },
              },
              {
                z: 3,
                name: '背景',
                type: 'bar',
                barWidth: 10,
                barGap: '-100%',
                data: salvProMax,
                itemStyle: {
                  normal: {
                    color: 'rgba(131, 132, 132, 0.1)',
                    barBorderRadius: [30, 30, 30, 30],
                    borderColor:'#142f49'
                  },
                },
              },
            ],
          }


        )

        //   } else {
        //     this.$message.error(errorMessage)
        //   }
        // }).catch(err=>{
        //   console.log(err)
        // })



      },
      resize() {
        // this.$nextTick(() => {
        this.chart.resize();
        // })
      }

    }
  }
</script>

<style scoped>

</style>
