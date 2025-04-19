<template>
  <el-image
    :src="component.props?.Attributes?.src"
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
