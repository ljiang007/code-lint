<template>
  <div :style="component.props?.style">{{ component.props?.text }}</div>
</template>

<script>
export default {
  name: "CardRenderer",
  props: {
    component: Object,
  },
};
</script>
