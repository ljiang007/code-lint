<template>
  <span :style="component.props?.style">{{ component.props?.text }}</span>
</template>

<script>
export default {
  name: "TextRenderer",
  props: {
    component: Object,
  },
};
</script>
