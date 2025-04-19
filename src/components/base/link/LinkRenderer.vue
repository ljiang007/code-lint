<template>
  <el-link
    :type="component.props?.Attributes?.type"
    :underline="component.props?.Attributes?.underline"
    :style="component.props?.style || {}"
  >
    {{ component.props?.text }}
  </el-link>
</template>

<script>
export default {
  name: "LinkRenderer",
  props: {
    component: Object
  }
};
</script>
