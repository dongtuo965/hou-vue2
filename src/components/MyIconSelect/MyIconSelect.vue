<!--icon及颜色图标-->
<template>
  <div>
    <div class="icon-list">
      <a-tabs slot="content" default-active-key="1">
        <a-tab-pane key="1" tab="系统">
          <!-- 系统图标选择 -->
          <a-row>
            <div
              class="icon-content"
              v-for="(item, index) in iconList"
              :key="index"
              @click="selectedIcon(item, '')"
            >
              <a-avatar
                v-if="item === iconName"
                shape="square"
                :size="55"
                :icon="item"
                :style="{ backgroundColor: iconColor }"
              />
              <a-avatar
                v-else
                shape="square"
                :size="55"
                :icon="item"
              />
            </div>
          </a-row>
        </a-tab-pane>

        <a-tab-pane key="2" tab="自定义">
          <!-- 自定义图标选择 -->
          <a-row>
            <div
              class="icon-content"
              v-for="(item, index) in customIconList"
              :key="index"
              @click="selectedIcon('', item)"
            >
              <a-avatar
                v-if="item === iconSrc"
                shape="square"
                :size="55"
                :src="item"
                :style="{ backgroundColor: iconColor }"
              />
              <a-avatar
                v-else
                shape="square"
                :size="55"
                :src="item"
              />
            </div>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>

    <div class="row-button">
      <a-row>
        <!-- 颜色选择 -->
        <div
          class="button-content"
          v-for="color in colorList"
          :key="color"
          @click="changeIconColor(color)"
        >
          <a-avatar
            v-if="color === iconColor"
            :size="30"
            icon="check"
            :style="{ backgroundColor: color }"
          />
          <a-avatar
            v-else-if="color === ''"
            :size="30"
            icon="stop"
            :style="{ backgroundColor: color }"
          />
          <a-avatar
            v-else
            :size="30"
            :style="{ backgroundColor: color }"
          />
        </div>
      </a-row>
    </div>
  </div>
</template>

<script>
import { iconList, customIconList, colorList } from './icons'

export default {
  name: 'MyIconSelect',
  props: {
    iColor: {
      type: String,
      required: colorList[0]
    },
    iName: {
      type: String,
      required: iconList[0]
    },
    iSrc: {
      type: String,
      required: ''
    }
  },
  watch: {
    iColor: {
      immediate: true,
      handler: function(newValue) {
        this.iconColor = newValue
      }
    },
    iName: {
      immediate: true,
      handler: function(newValue) {
        this.iconName = newValue
      }
    },
    iSrc: {
      immediate: true,
      handler: function(newValue) {
        this.iconSrc = newValue
      }
    }
  },
  data () {
    return {
      // 系统图标数组
      iconList,
      // 自定义图标数组
      customIconList,
      // 图标颜色
      colorList,
      // 系统图标
      iconName: iconList[0],
      // 自定义图标
      iconSrc: '',
      // 图标颜色
      iconColor: colorList[0]
    }
  },
  methods: {
    selectedIcon (iconName, iconSrc) {
      // 选择的系统图标
      this.iconName = iconName
      // 选择的自定义图标
      this.iconSrc = iconSrc
      this.$emit('selected', { iconSrc: this.iconSrc, iconName: this.iconName, iconColor: this.iconColor })
    },
    changeIconColor (color) {
      this.iconColor = color
      // 选择的图标颜色
      this.$emit('selected', { iconSrc: this.iconSrc, iconName: this.iconName, iconColor: this.iconColor })
    }
  }
}
</script>

<style lang="less" scoped>

  .icon-list {
    width: 410px;
    height: 300px;
    overflow-y: scroll; // 滚动条
  }

  .icon-content {
    margin: 5px;
    float: left;
    width: 55px;
    height: 55px;
    line-height: 55px;
    cursor: pointer;
  }

  .button-content {
    margin: 10px;
    float: left;
    width: 30px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }

  .row-button {
    /deep/ .ant-row {
      margin-top: 10px;
      border-radius: 5px; // 圆角
      box-shadow:0 0   2px rgb(220 220 220); // 阴影
    }
  }
</style>
