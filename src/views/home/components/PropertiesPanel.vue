<template>
  <div>
    {{ selectedComponent }}
    <div v-if="selectedComponent" class="panel">
      <el-form label-position="top" v-if="selectedComponent.type === 'text'">
        <el-form-item label="文本内容">
          <el-input v-model="localProps.text" @input="update" />
        </el-form-item>

        <el-form-item label="字体大小">
          <el-input v-model="localProps.style.fontSize" @input="update" />
        </el-form-item>

        <el-form-item label="颜色">
          <el-color-picker v-model="localProps.style.color" @change="update" />
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="panel">请选择一个组件进行编辑</div>
  </div>
</template>

<script>
export default {
  props: ["selectedComponent"],
  data() {
    return {
      localProps: {},
    };
  },
  watch: {
    selectedComponent: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          // 确保 newVal.props 存在，如果不存在则赋空对象
          this.localProps = {
            ...newVal.props, // 保证有 props，即使是空的
            style: newVal.props?.style || {}, // 确保 style 存在
          };
        } else {
          // 如果没有选中组件，清空 localProps
          this.localProps = {};
        }
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

<style lang="scss" scoped>
@import "../style/PropertiesPanel.scss";
</style>
