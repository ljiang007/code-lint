<template>
  <el-image
    :src="component.props?.Attributes?.src"
    :style="component.props?.style || {}"
    fit="contain"
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
