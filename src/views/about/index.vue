<template>
  <fc-designer ref="designer" :height="height" :config="config"></fc-designer>
</template>
<script>
export default {
  data() {
    return {
      height: "100vh",
      config: {
        showSaveBtn: true,
      },
    };
  },
};
</script>
