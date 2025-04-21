<template>
  <el-form label-position="top">
    <el-form-item label="文本内容">
      <el-input v-model="localProps.text" @input="update" />
    </el-form-item>

    <el-form-item label="字体大小">
      <el-input v-model="localProps.style.fontSize" @input="update" />
    </el-form-item>

    <el-form-item label="颜色">
      <el-color-picker v-model="localProps.style.color" @change="update" />
    </el-form-item>
    <el-form-item label="对齐方式">
      <el-select
        placeholder="请选择"
        v-model="localProps.style.textAlign"
        @change="update"
      >
        <el-option value="left" label="左对齐"></el-option>
        <el-option value="center" label="居中对齐"></el-option>
        <el-option value="right" label="右对齐"></el-option>
      </el-select>
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
