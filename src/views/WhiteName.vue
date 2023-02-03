<template>
  <a-tree
    v-model="checkedKeys"
    checkable
    :expanded-keys="expandedKeys"
    :auto-expand-parent="autoExpandParent"
    :selected-keys="selectedKeys"
    :tree-data="treeData"
    @expand="onExpand"
    @check="onCheck"
    @select="onSelect"
  />
</template>
<script>
  const treeData = [
    {
      title: '0',
      key: '0',
      children: [
        {
          title: '1',
          key: '1',
          children: [
            { title: '11', key: '110' },
            { title: '111', key: '1110' },
            { title: '1111', key: '11110' },
          ],
        },
        {
          title: '2',
          key: '2',
          children: [
            { title: '22', key: '220' },
            { title: '222', key: '2220' },
            { title: '2222', key: '22220' },
          ],
        },
      ],
    },
  ];

  export default {
    data() {
      return {
        // 默认展开的树
        expandedKeys: ['0', '1'],
        autoExpandParent: true,
        // 默认勾选的框
        checkedKeys: ['1'],
        selectedKeys: [],
        treeData,
      };
    },
    watch: {
      checkedKeys(val) {
        console.log('onCheck', val);
      },
    },
    methods: {
      // 展开合上 树 触发的事件
      onExpand(expandedKeys) {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.expandedKeys = expandedKeys;
        this.autoExpandParent = false;
      },
      onCheck(checkedKeys) {
        console.log('onCheck', checkedKeys);
        this.checkedKeys = checkedKeys;
      },
      // 点框后面的文字触发的事件
      onSelect(selectedKeys, info) {
        console.log('onSelect', info);
        this.selectedKeys = selectedKeys;
      },
    },
  };
</script>
