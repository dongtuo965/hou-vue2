<!--icon及颜色图标组件，直接引这个文件就行-->
<template>
<div>
  <a-form :model="form" ref="ruleForm" class="ys"  labelAlign="left" :label-col="labelCol" :wrapper-col="wrapperCol">
  <a-form-model-item label="应用图标">
    <a-popover>
      <a-avatar
        v-if="form.iconSrc !== null && form.iconSrc !== ''"
        shape="square"
        :size="50"
        :src="form.iconSrc"
        :style="{ backgroundColor: form.iconColor }"
      />
      <a-avatar
        v-else
        shape="square"
        :size="50"
        :icon="form.iconName"
        :style="{ backgroundColor: form.iconColor }"
      />
      <MyIconSelect
        slot="content"
        ref="iconSelect"
        :i-color="form.iconColor"
        :i-name="form.iconName"
        :i-src="form.iconSrc"
        @selected="selected"
      />
    </a-popover>
  </a-form-model-item>
  </a-form>

</div>
</template>

<script>
   import MyIconSelect from '@/components/MyIconSelect/MyIconSelect'
    import { colorList, iconList } from '@/components/MyIconSelect/icons'
    export default {
        name: "IconColor",
      components: { MyIconSelect },
      data(){
          return{
            labelCol: { span: 14 },
            wrapperCol: { span: 12 },
            form: {
              iconSrc: '',
              iconName: iconList[0],
              iconColor: colorList[0],
            },
          }
      },
      methods:{
        // 选中图标
        selected (val) {
          console.log(val)
          this.form.iconSrc = val.iconSrc
          this.form.iconName = val.iconName
          this.form.iconColor = val.iconColor
        },
      }
    }
</script>

<style scoped>
.ys{
  border: 1px solid skyblue;
  margin: 20px 0;
}
</style>
