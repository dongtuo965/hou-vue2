<template>
  <div class="drag-resize-component runroad" style="width: 100%!important;"
       @mouseenter.stop="showicon($event) " @mouseleave.stop="resizeFlag=false"  >
<!--    先设置可缩放的四个拖拽方框-->
    <div v-show="isResize && resizeFlag" ref="resizeDivTag" id="resizeDivTag" >
      <span class="br"></span>
      <span class="bl"></span>
      <span class="tr"></span>
      <span class="tl"></span>
      <span class="bz"></span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {

    name: 'DragResize',
    components: {
    },
    props:{
      isDrag: {  // 是否可拖拽，默认true
        type: Boolean,
        default: true,
      },
      isResize: { // 是否可缩放，默认为false
        type: Boolean,
        default: false,
      },
      dragOffSet:{
        type: Object,
        default: function () {
          return {
            left: 10,
            top: 10,
          }
        }
      }
    },
    data () {
      return {
        resizeFlag: false, // 可拖动的标志位
      }
    },
    created () {
    },
    mounted () {
      if(this.isDrag){
        this.initDrag();
      }
      if(this.isResize){
        this.initResize();
      }
    },
    methods: {
      showicon(e){
        // console.log(e)
        this.resizeFlag=true
      },
      // 点击取反（已替换成划入移出）
      // showResizeTag(){
      //   this.resizeFlag = !this.resizeFlag;
      // },
      // 初始化可缩放
      initResize(){
        let el = this.$el;
        console.log(el)
        let spanNodes = this.$refs.resizeDivTag.childNodes; //5个拖拽的点
        console.log(spanNodes)
        for(let i=0;i<spanNodes.length;i++){
          this.resizeElementFun(spanNodes[i],el);
        }
      },
      resizeElementFun(element,el){
        console.log(element)
        element.onmousedown = function(ev){
          console.log('我是按下的元素')
          console.log(element)
          let oEv = ev || event;
          oEv.stopPropagation();
          let oldWidth = el.offsetWidth;
          let oldHeight  = el.offsetHeight;
          console.log('-----'+ oldWidth+'----'+oldHeight);
          let oldX = oEv.clientX;
          let oldY = oEv.clientY;
          let oldLeft = el.offsetLeft;
          let oldTop = el.offsetTop;
          console.log('--zuo---'+ oldLeft+'--gao--'+oldTop);
          document.onmousemove = function(ev){
            console.log('我是移动的元素')
            // oEv.stopPropagation();
            let oEv = ev || event;
            let disY = (oldTop + (oEv.clientY - oldY));
            // let disX = (oldLeft + (oEv.clientX - oldLeft));
            let disX = (oldLeft + (oEv.clientX - oldX));
            if(disX>oldLeft+oldWidth){
              disX=oldLeft+oldWidth
            }
            if(disY>oldTop+oldHeight){
              disY=oldTop+oldHeight
            }
            if(element.className == 'tl'){
              el.style.width = oldWidth - (oEv.clientX - oldX) + 'px';
              el.style.height = oldHeight - (oEv.clientY - oldY) + 'px';
              el.style.left = disX + 'px';
              el.style.top = disY + 'px';
            } else if (element.className == 'bl'){
              el.style.width = oldWidth - (oEv.clientX - oldX) + 'px';
              el.style.height = oldHeight + (oEv.clientY - oldY) + 'px';
              el.style.left = disX + 'px';
              // el.style.bottom = oldTop + (oEv.clientY + oldY) + 'px';
            } else if (element.className == 'tr'){
              el.style.width = oldWidth + (oEv.clientX - oldX) + 'px';
              el.style.height = oldHeight - (oEv.clientY - oldY) + 'px';
              el.style.right = oldLeft - (oEv.clientX - oldX) + 'px';
              el.style.top = disY + 'px';
            } else if (element.className == 'br'){
              el.style.width = oldWidth + (oEv.clientX - oldX) + 'px';
              el.style.height = oldHeight + (oEv.clientY - oldY) + 'px';
              el.style.right = oldLeft - (oEv.clientX - oldX) + 'px';
              // el.style.bottom = oldTop + (oEv.clientY + oldY) + 'px';
            }else if (element.className == 'bz'){
              el.style.width = oldWidth + (oEv.clientX - oldX) + 'px';
              el.style.height = oldHeight - (oEv.clientY - oldY) + 'px';
              el.style.right = oldLeft - (oEv.clientX - oldX) + 'px';
              el.style.bottom = oldTop + (oEv.clientY + oldY) + 'px';
            }
          }
          document.onmouseup = (e)=>{
            console.log('我是抬起的元素')
            document.getElementsByClassName('cptDiv')[0].style.width= 80 + '%'
            console.log(event.target.parentNode)
            console.log(e.target.offsetParent)
            console.log(e.target.offsetParent.parentNode)
            document.onmousemove = null;
          };
          return false;
        }
      },
      // 初始化可拖拽方法
      initDrag(){
        let el = this.$el;
        el.onmousedown = (e)=>{
          e.preventDefault();
          e.target.style.cursor = 'move';
          //鼠标按下，计算鼠标触点距离元素左侧和顶部的距离
          let disX = e.clientX - el.offsetLeft;
          let disY = e.clientY - el.offsetTop;
          // console.log('22222',document);
          document.onmousemove = function (e) {
            //计算需要移动的距离
            let tX = e.clientX - disX;
            let tY = e.clientY - disY;
            //移动当前元素
            if (tX >= 0 && tX <= window.innerWidth - el.offsetWidth) {
              el.style.left = tX + 'px';
            }
            if (tY >= 0 && tY <= window.innerHeight - el.offsetHeight) {
              el.style.top = tY + 'px';
            }
          };
          //鼠标松开时，注销鼠标事件，停止元素拖拽。
          document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
            e.target.style.cursor = 'default';
          };
        }
      },
    },
  }
</script>

<style lang='scss'>


  .drag-resize-component {
    position: static;
    // 四角
    .tl,.bl, {
      width: 20px;
      height: 2px;
      background: #878f95;
      border:1px solid #666;
      z-index: 2;
    }
    .br,.tr{
      width: 2px;
      height: 20px;
      background: #878f95;
      border:1px solid #666;
      z-index: 2;
    }
    .bz{
      width: 14px;
      height: 14px;
      position: absolute;
      bottom: 10px;
      z-index: 2;
      right: 10px;
      border-right: 2px solid #666;
      border-bottom: 2px solid #666;
      cursor: se-resize;
    }
    .tl{
      position: absolute;
      /*top:0;*/
      /*left: 0;*/
      top: 10px;
      left: 50%;
      cursor:n-resize
    }
    .tr{
      position: absolute;
      top: 50%;
      right: 10px;
      cursor:e-resize
      /*top: 0;*/
      /*right: 0;*/
    }
    .bl{
      position: absolute;
      /*bottom: 0;*/
      /*left: 0;*/
      bottom: 10px;
      left: 50%;
      cursor:n-resize;
    }
    .br{
      position: absolute;
      bottom: 50%;
      left: 0;
      cursor:e-resize
      /*bottom: 0;*/
      /*right: 0;*/
    }
    /*<!--.tl,.bl{-->*/
    /*<!--  left: -6px;-->*/
    /*<!--  !*position: absolute;*!-->*/
    /*<!--}-->*/
    /*<!--.tr,.br{-->*/
    /*<!--  right:-6px;-->*/
    /*<!--}-->*/
    /*<!--.br,.bl{-->*/
    /*<!--  bottom: -6px;-->*/
    /*<!--}-->*/
    /*<!--.tl,.tr{-->*/
    /*<!--  top: -6px;-->*/
    /*<!--}-->*/
    .tr,.bl{
      /*cursor: nesw-resize;*/
    }
  }
</style>
