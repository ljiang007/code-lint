<template>
  <el-form label-position="top">
    <el-form-item label="文本内容">
      <el-input v-model="localProps.text" @input="update" />
    </el-form-item>

    <el-form-item label="字体大小">
      <el-input v-model="localProps.style.fontSize" @input="update" />
    </el-form-item>

    <el-form-item label="颜色">
      <el-color-picker
        v-model="localProps.style.color"
        @change="update"
      />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["propsData"],
  data() {
    return {
      localProps: this.propsData,
    };
  },
  methods: {
    update() {
      this.$emit("update", this.localProps);
    },
  },
};
</script>
