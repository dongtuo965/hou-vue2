<template>
  <div>
    <a-tree
      :tree-data="treeData"
      checkable
      :autoExpandParent="true"
      :defaultExpandAll="true"
      @expand="onExpand"
      @select="onSelect"
      @check="onCheck"
    >
<!--      通过switcherIcon修改只能修改所有父级的图标,子级不受影响-->
<!--      <a-icon slot="switcherIcon" type="form" />-->
<!--      此时子级定义一个插槽来修改子级图标-->
<!--      <a-icon slot="child" type="wifi" />-->
<!--      <a-icon slot="haha" type="solution" />-->
                 <span slot="hc">
                 <img src="@/assets/logo.png" style="width:24px;height:24px">
                </span>
      <span slot="fj">
                   666
                </span>
    </a-tree>

  </div>
</template>

<script>
export default {
  name: 'ImportantPeople',
  data () {
    return {
      treeData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('http://localhost:8889/treeData')
        .then((response) => {
          // 处理成功情况
          this.treeData = response.data
          console.log(response)
        })
        .catch((error) => {
          // 处理错误情况
          console.log(error)
        })
        .then(function () {
          // 总是会执行
        })
    },
    onExpand (checkedKeys, info) {
      console.log('onCheck', checkedKeys, info)
    },
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    onCheck (checkedKeys, info) {
      console.log('onCheck', checkedKeys, info)
    },
    onChange (e) {
      console.log(`checked = ${e.target.checked}`)
    }
  }
}
</script>

<style scoped>

</style>
