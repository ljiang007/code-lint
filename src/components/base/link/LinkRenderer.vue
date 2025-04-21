<template>
  <el-link
    :type="component.props?.attr?.type"
    :underline="component.props?.attr?.underline"
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
