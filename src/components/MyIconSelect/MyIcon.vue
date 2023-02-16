<template>
  <a-popover>
    <a-avatar
      v-if="iconSrc !== null && iconSrc !== ''"
      shape="square"
      :size="50"
      :src="iconSrc"
      :style="{ backgroundColor: iconColor }"
    />
    <a-avatar
      v-else
      shape="square"
      :size="50"
      :icon="iconName"
      :style="{ backgroundColor: iconColor }"
    />
    <my-icon-select
      slot="content"
      ref="iconSelect"
      @selected="selected"
    />
  </a-popover>
</template>

<script>
import MyIconSelect from './MyIconSelect'
import { colorList, iconList } from './icons'

export default {
  name: 'MyIcon',
  components: {
    MyIconSelect
  },
  data () {
    return {
      // 图标数组
      iconList,
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
    // 选择图标
    selected (val) {
      this.iconName = val.iconName
      this.iconColor = val.iconColor
      this.iconSrc = val.iconSrc
      // 触发change事件
      this.$emit('change', { iconSrc: this.iconSrc, iconName: this.iconName, iconColor: this.iconColor })
    }
  }
}
</script>

<style scoped lang='less'>

</style>
