<template>
  <el-form label-position="top">
    <el-form-item label="类型">
      <el-select v-model="localProps.Attributes.type" placeholder="请选择" @change="update">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否朴素按钮">
      <el-switch v-model="localProps.Attributes.plain" @change="update" />
    </el-form-item>
    <el-form-item label="字体颜色">
      <el-color-picker v-model="localProps.style.color" @change="update" />
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input v-model="localProps.style.fontSize" @input="update" />
    </el-form-item>
    <el-form-item label="按钮内容">
      <el-input v-model="localProps.text" @input="update" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["propsData"],
  data() {
    return {
      options: [
        { value: "primary", label: "主要" },
        { value: "success", label: "成功" },
        { value: "warning", label: "警告" },
        { value: "danger", label: "危险" },
      ],
    };
  },
  computed: {
    localProps: {
      get() {
        return this.propsData;
      },
      set(value) {
        this.$emit("update", value);
      }
    }
  },
  methods: {
    update() {
      this.$emit("update", this.localProps);
    },
  },
};
</script>
