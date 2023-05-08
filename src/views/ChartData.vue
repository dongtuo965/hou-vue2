<template>
  <div class="bigcontrain">
    <h4 style="background: url(/chartdata/datatitle.png) no-repeat;  background-size: cover;height: 100px"></h4>
    <span class="showTime">数据更新时间  2023-05-06</span>
    <div class="contentChart">
      <div class="contrainContent">
        <div class="chartList">
          <slot></slot>
          <TwoCardControl></TwoCardControl>
        </div>
        <div class="chartList">

          <h4 style="background: url(/chartdata/openKa.png) no-repeat;  background-size: cover;height: 14%"></h4>
          <BarCharts :dataSource="dataSource"></BarCharts>
        </div>
        <div class="chartList">
          <h4 style="background: url(/chartdata/cunKa.png) no-repeat;  background-size: cover;height: 14%"></h4>
          <BarCharts :dataSource="dataSource2"></BarCharts>
        </div>
      </div>
      <div class="contrainContentmain">
        <div class="toppic">
          <div class="toppicmain">
            <div style="width: 286px;height: 96px;background-image: linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.10) 51%, rgba(255,255,255,0.00) 100%);">
              <img src="/chartdata/money.png" style="width: 16px;height: 12px;margin-right: 8px" /><span class="bankCount">银行卡管控数量</span>
              <span class="numberCount">+ 3,815</span>
              <div style="width: 240px;height: 1px;margin:6px 0;background-image: linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.73) 51%, rgba(255,255,255,0.00) 100%);"></div>
              <h4 class="allCount">1,122,332</h4>
            </div>
            <div style="width: 286px;height: 96px;background-image: linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.10) 51%, rgba(255,255,255,0.00) 100%);">
              <img src="/chartdata/dun.png" style="width: 16px;height: 12px;margin-right: 8px" /><span class="bankCount">警情处置数量</span>
              <span class="numberCount">+ 312</span>
              <div style="width: 240px;height: 1px; margin:6px 0; background-image: linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.73) 51%, rgba(255,255,255,0.00) 100%);"></div>
              <h4 class="allCount">113,234</h4>
            </div>

          </div>
          <div style="width: 100%;height: 80%">
            <img src="/chartdata/banner.png" style="width: 100%;height: 100%" />
          </div>


        </div>
        <div class="bpttomTable">
          <div class="leftTable">
            <h4 style="background: url(/chartdata/bankStopPay.png) no-repeat;  background-size: cover;height: 14%"></h4>
            <TableData  :LeftTablecolumns="LeftTablecolumns" :LeftTableList="LeftTableList"></TableData>

          </div>
          <div class="rightTable">
            <h4 style="background: url(/chartdata/selfBank.png) no-repeat;  background-size: cover;height: 14%"></h4>
            <TableData  :LeftTablecolumns="LeftTablecolumns" :LeftTableList="LeftTableList"></TableData>
          </div>
        </div>

      </div>
      <div class="contrainContent">
        <div class="twoZero">
          <h4 style="background: url(/chartdata/jieSteam.png) no-repeat;  background-size: cover;height: 24%"></h4>
          <div class="toppicmain">
            <div style="width: 50%;height: 96px;margin-top: 6%;">
              <img src="/chartdata/surprise.png" style="width: 40px;height: 60px;float:left;margin-right: 16px" />
              <div style="float:left;">
                <span class="steamCount">监控截流数</span>
                <h4 class="steamNumber">12,122</h4>
              </div>
            </div>
            <div style="width: 50%;height: 96px;margin-top: 6%;">
              <img src="/chartdata/editIcon.png" style="width: 40px;height: 60px;float:left;margin-right: 16px" />
              <div style="float:left;">
                <span class="steamCount">在线申诉数</span>
                <h4 class="steamNumber">1,086</h4>
              </div>
            </div>

          </div>

        </div>
        <div class="threeZero">
          <h4 style="background: url(/chartdata/bankCardSteam.png) no-repeat;  background-size: cover;height: 14%"></h4>
          <BarCharts :dataSource="dataSource"></BarCharts>
        </div>
        <div class="fiveZero">
          <h4 style="background: url(/chartdata/lineHelp.png) no-repeat;  background-size: cover;height: 14%"></h4>
          <TableData   :LeftTablecolumns="TableAsideColumns" :LeftTableList="TableListAside"></TableData>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TwoCardControl from '@/views/chartdata/TwoCardControl'
  import BarCharts from '@/views/chartdata/BarCharts'
  import TableData from '@/views/chartdata/TableData'
  export default {
    name: 'ChartData',
    components: { TableData, BarCharts, TwoCardControl },

    data(){
      return{
        contentwidth:'',
        contentHeight:'',

        LeftTableList: [
          {
            key: '1',
            bank: 32,
            downCount: 32,
            doCount: 36,
          },
          {
            key: '2',
            bank: 32,
            downCount: 32,
            doCount: 36,
          },
          {
            key: '3',
            bank: 32,
            downCount: 32,
            doCount: 36,
          },
          {
            key: '4',
            bank: 32,
            downCount: 32,
            doCount: 36,
          },
          {
            key: '5',
            bank: 32,
            downCount: 32,
            doCount: 36,
          },
          {
            key: '6',
            bank: 32,
            downCount: 32,
            doCount: 36,
          },
        ],
        TableListAside: [
          {
            key: '1',
            bank: 32,
            downCount: 32,
            doCount: 36,
          },
          {
            key: '2',
            bank: 32,
            downCount: 32,
            doCount: 36,
          },
          {
            key: '3',
            bank: 32,
            downCount: 32,
            doCount: 36,
          },
          {
            key: '4',
            bank: 32,
            downCount: 32,
            doCount: 36,
          },
          {
            key: '5',
            bank: 32,
            downCount: 32,
            doCount: 36,
          },
          {
            key: '6',
            bank: 32,
            downCount: 32,
            doCount: 36,
          },
          {
            key: '7',
            bank: 32,
            downCount: 32,
            doCount: 36,
          },
          {
            key: '8',
            bank: 32,
            downCount: 32,
            doCount: 36,
          },
        ],
        TableAsideColumns:[
          {
            title: '#',
            dataIndex: 'key',
            key: 'key',
          },
          {
            title: '银行',
            dataIndex: 'bank',
            key: 'bank',
          },
          {
            title: '申诉量',
            key: 'downCount',
            dataIndex: 'downCount',

          },
          {
            title: '办结率',
            key: 'doCount',
            dataIndex: 'doCount',

          },
        ],

        LeftTablecolumns:[
          {
            title: '#',
            dataIndex: 'key',
            key: 'key',
          },
          {
            title: '银行',
            dataIndex: 'bank',
            key: 'bank',
          },
          {
            title: '下发量',
            key: 'downCount',
            dataIndex: 'downCount',

          },
          {
            title: '处置率',
            key: 'doCount',
            dataIndex: 'doCount',

          },
        ],

        dataSource: [
          {
            value: '1000',
            name: '软件开发工程师',
          },
          {
            value: '900',
            name: '前端开发工程师',
          },
          {
            value: '800',
            name: '硬件运维',
          },
          {
            value: '700',
            name: '会计',
          },
          {
            value: '600',
            name: '电子信息',
          },

        ],
        dataSource2: [
          {
            value: '1000',
            name: '软件开发工程师',
          },
          {
            value: '900',
            name: '前端开发工程师',
          },
          {
            value: '800',
            name: '硬件运维',
          },
          {
            value: '700',
            name: '会计',
          },
          {
            value: '600',
            name: '电子信息',
          },
          {
            value: '200',
            name: '菱湖',
          },

        ],
      }
    },


  }
</script>

<style scoped>
  .bigcontrain{
    background: #011529;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .contentChart{
    height: calc(100% - 120px);
    display: flex;
    justify-content: space-between;
    padding:0 10px;
  }
  .contrainContent{
    width: 25%;
    height: 100%;
  }
  .contrainContentmain{
    width: 50%;
    height: 100%;
    /*background: pink;*/
  }
  .toppic{
    height: 66%;
    padding:0 100px;
  }
  .twoZero{
    height: 20%;
    /*background: pink;*/
  }
  .threeZero{
    height: 36%;
    /*background: skyblue;*/

  }
  .fiveZero{
    height: 44%;
    /*background: yellow;*/

  }

  .toppicmain{
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-between;


  }
  .bpttomTable{
    height: 33%;
    /*background: pink;*/
    display: flex;
    justify-content: space-between;
  }
  .leftTable{
    width: 50%;
    height: 100%;
    padding: 0 10px;
  }

  .rightTable{
    width: 50%;
    padding: 0 10px;
  }
  .chartList{
    height: 33%;
  }
  .bankCount{
    width: 124px;
    height: 25px;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: -0.3px;
    font-weight: 400;
  }
  .numberCount{
    font-family: AlibabaSans102Dec10-Medium;
    font-size: 16px;
    color: #61DDAA;
    letter-spacing: 1px;
    font-weight: 500;
    margin-left: 24px;
  }
  .allCount{
    font-family: AlibabaSans102Dec10-Bold;
    font-size: 36px;
    color: #FFFFFF;
    letter-spacing: 1px;
    font-weight: 700;
  }
  .showTime{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #83AEC6;
    letter-spacing: 0.31px;
    font-weight: 400;
    position: fixed;
    right: 10px;
    top: 4px;
  }
  .steamCount{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: -0.27px;
    font-weight: 400;
  }
  .steamNumber{
    font-family: AlibabaSans102Dec10-Bold;
    font-size: 24px;
    color: #FFFFFF;
    letter-spacing: 0.67px;
    font-weight: 700;
  }

</style>
