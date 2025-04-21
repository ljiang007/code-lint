<template>
  <el-button
    :style="component.props?.style || {}"
    :type="component.props?.attr?.type"
    :plain="component.props?.attr?.plain"
    >{{ component.props?.text }}</el-button
  >
</template>

<script>
export default {
  name: "ButtonRenderer",
  props: {
    component: Object,
  },
};
</script>
