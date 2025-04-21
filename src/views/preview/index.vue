<template>
  <div class="preview">
    <ComponentPreview :preview="components" />
  </div>
</template>

<script>
export default {
  name: "Preview",
  data() {
    return {
        components: []
    }
  },
  created() {
    // 获取初始数据
    const savedComponents = localStorage.getItem('components');
    if (savedComponents) {
        this.components = JSON.parse(savedComponents);
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
    }
  }
};
</script>

<style scoped>
.preview {
  padding: 10px;
}
</style>
