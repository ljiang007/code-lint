<template>
  <el-image
    :src="component.props?.attr?.src"
    :style="component.props?.style || {}"
  />
</template>

<script>
export default {
  name: "ImageRenderer",
  props: {
    component: Object
  }
};
</script>
