<template>
  <el-button
    :style="component.props?.style || {}"
    :type="component.props?.Attributes?.type"
    :plain="component.props?.Attributes?.plain"
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
