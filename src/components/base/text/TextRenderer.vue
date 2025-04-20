<template>
  <div :style="component.props?.style">{{ component.props?.text }}</div>
</template>

<script>
export default {
  name: "TextRenderer",
  props: {
    component: Object,
  },
};
</script>
