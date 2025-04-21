<template>
  <el-form label-position="top">
    <el-form-item label="图片链接">
      <el-input v-model="localProps.attr.src" @input="update" />
    </el-form-item>
    <el-form-item label="图片宽度">
      <el-input v-model="localProps.style.width" @input="update" />
    </el-form-item>
    <el-form-item label="图片高度">
      <el-input v-model="localProps.style.height" @input="update" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["propsData"],
  computed: {
    localProps: {
      get() {
        return this.propsData;
      },
      set(value) {
        this.$emit("update", value);
      },
    },
  },
  methods: {
    update() {
      this.$emit("update", this.localProps);
    },
  },
};
</script>
