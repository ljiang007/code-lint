<template>
  <el-button
    :style="component.props?.style || {}"
    :type="component.props?.text"
    :plain="component.props?.plain"
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
