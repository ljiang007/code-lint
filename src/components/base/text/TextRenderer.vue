<template>
  <div>{{ component.props?.text }}</div>
</template>

<script>
export default {
  name: "TextRenderer",
  props: {
    component: Object
  }
};
</script>
