<template>
    <el-form label-position="top">
      <el-form-item label="图片链接">
        <el-input v-model="localProps.props.src" @input="update" />
      </el-form-item>
    </el-form>
  </template>
  
  <script>
  export default {
    props: ["propsData"],
    data() {
      return {
        localProps: { ...this.propsData, style: this.propsData.style || {} },
      };
    },
    methods: {
      update() {
        this.$emit("update", this.localProps);
      },
    },
  };
  </script>
  