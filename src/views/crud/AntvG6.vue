<template>
  <!--设置parentContent的宽高为浏览器大小-->
  <div class="parentContent" ref="parentContent">
    <div id="container" ref="container"></div>
  </div>
</template>
<script>
  import G6 from '@antv/g6'
  export default {
    name: 'g6',
    mounted () {
      this.initComponent()
      this.initSize()
    },
    data () {
      return {
        data: {}, // 拓扑图数据
        graph: undefined, // new G6
        canvasWidth: 0, // 画布宽度
        canvasHeight: 0 // 画布高度
      }
    },
    beforeMount() {
      G6.registerNode(
        'dom-node',
        {
          draw: (cfg, group) => {
            console.log(cfg, group)
            return group?.addShape('dom', {
              attrs: {
                width: cfg.size[0],
                height: cfg.size[1],
                // 传入 DOM 的 html
                html: `
        <div style="background-color: #000; border: 2px solid #5B8FF9; border-radius: 5px; width: ${
                  100
                }px; height: ${100}px; display: flex;">
          <div style="height: 100%; width: 33%; background-color: #CDDDFD">
            <img alt="img" style="line-height: 100%; padding-top: 6px; padding-left: 8px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />
          </div>
          <span style="margin:auto; padding:auto; color: #5B8FF9">${996}</span>
        </div>
          `,
              },
              name: 'dom-node-keyShape',  // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
              draggable: true,
            });
          },
        },
        'single-node',
      );
    },
    methods: {

      /**
       * 设置画布大小自适应
       */
      initSize () {
        const self = this // 因为箭头函数会改变this指向，指向windows。所以先把this保存
        setTimeout(() => {
          // todo 浏览器窗口发生变化时
          window.onresize = function () {
            // todo 获取div parentContent 的宽度和高度
            this.canvasWidth = self.$refs.parentContent.clientWidth
            this.canvasHeight = self.$refs.parentContent.clientHeight
            // todo 修改画布的大小
            self.graph.changeSize(this.canvasWidth, this.canvasHeight)
            // todo 将图移动到画布中心位置
            self.graph.fitCenter()
          }
        }, 20)
      },
      /**
       * 创建G6，并对G6的一些设置
       * */
      initComponent () {
        const data = {
          nodes: [
            { id: 'node1', x: 100, y: 100 },
            { id: 'node2', x: 300, y: 100 },
          ],
          edges: [{source: 'node1'}, {target: 'node2'}],
        };
        const graph = new G6.Graph({
          container: 'container',
          width: 500,
          height: 500,
          defaultNode: {
            type: 'dom-node',
            size: [120, 40],
          },
        });
        graph.data(data);
        graph.render();

      },

    }
  }
</script>

<style>
  .parentContent {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  #nodeDetails {
    list-style: none;
  }
  #nodeDetails>li {
    padding:5px 0;
    text-align: left;
  }
</style>
