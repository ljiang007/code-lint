<template>
  <div class="preview" :style="{ backgroundColor: backgroundColor }">
    <ComponentPreview :preview="components" />
  </div>
</template>

<script>
export default {
  name: "Preview",
  data() {
    return {
      components: [],
      backgroundColor: "#ffffff",
    };
  },
  created() {
    // 获取初始数据
    const savedComponents = localStorage.getItem('components');
    const savedBackgroundColor = localStorage.getItem('backgroundColor');
    if (savedComponents) {
        this.components = JSON.parse(savedComponents);
    }
    if (savedBackgroundColor) {
        this.backgroundColor = savedBackgroundColor;
    }
    // 监听 localStorage 变化
    window.addEventListener('storage', this.handleStorageChange);
  },
  beforeDestroy() {
    // 移除监听器
    window.removeEventListener('storage', this.handleStorageChange);
  },
  methods: {
    handleStorageChange(e) {
      if (e.key === 'components') {
        const newComponents = JSON.parse(e.newValue);
        this.components = newComponents;
      }
      if (e.key === 'backgroundColor') {
        this.backgroundColor = e.newValue;
      }
    }
  }
};
</script>

<style scoped>
.preview {
  padding: 10px;
  text-align: center;
}
</style>
