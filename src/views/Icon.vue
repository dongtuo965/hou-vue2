<!--icon图标组件，直接引这个文件就行-->
<template>
  <div>
    <a-form-model-item
      v-show="show"
      label="应用图标"
      prop="icon">
      <a-input placeholder="点击选择图标" v-model="form.icon" @click="selectIcons">
        <a-icon slot="addonAfter" type="setting" @click="selectIcons"/>
      </a-input>
    </a-form-model-item>
    <!-- 选择图标 -->
        <Icons @choose="handleIconChoose" @close="handleIconCancel" :iconChooseVisible="iconChooseVisible"></Icons>

  </div>

</template>

<script>

  import Icons from '@/components/icon/Icons'
    export default {
        name: "Icon",
      components: { Icons },
      data() {
        return {

          labelCol: { span: 10 },
          wrapperCol: { span: 24 },
          form: {
            icon: '',
          },
          show: true,//根据菜单类型，动态显示隐藏表单元素
          iconChooseVisible: false,
        }
      },
      methods:{
        handleIconChoose(value) {
          console.log(value)
          this.form.icon = value
          this.iconChooseVisible = false
        },
        selectIcons() {
          this.iconChooseVisible = true
        },
        handleIconCancel() {
          this.iconChooseVisible = false
        },
      }

    }
</script>

<style scoped>

</style>
