<template>
  <el-form label-position="top">
    <el-form-item label="宽度">
      <el-input v-model="localProps.style.width" @input="update" />
    </el-form-item>

    <el-form-item label="高度">
      <el-input v-model="localProps.style.height" @input="update" />
    </el-form-item>

    <el-form-item label="圆角">
      <el-input v-model="localProps.style.borderRadius" @input="update" />
    </el-form-item>

    <el-form-item label="阴影">
      <el-input v-model="localProps.style.boxShadow" @input="update" />
    </el-form-item> 

    <el-form-item label="背景颜色">
      <el-color-picker v-model="localProps.style.backgroundColor" @change="update" />
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
