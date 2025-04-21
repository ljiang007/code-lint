<!-- 组件面板 -->
<template>
  <div class="sidebar">
    <h4 class="_fc-l-title">通用组件</h4>
    <ComponentGroup 
      :items="basics"
      :clone-component="cloneComponent"
    />

    <h4 class="_fc-l-title">布局组件</h4>
    <ComponentGroup 
      :items="layout"
      :clone-component="cloneComponent"
    />
  </div>
</template>

<script>
import { componentMaps } from "@/utils/componentFactory";
import ComponentGroup from '@/components/public/list/Group.vue'

export default {
  components: {
    ComponentGroup
  },
  data() {
    return {
      basics: componentMaps.basics,
      layout:componentMaps.layout
    };
  },
  methods: {
    // 克隆组件，用于从侧边栏拖出时创建副本
    cloneComponent(component) {
      console.log("克隆组件:", component);
      return {
        ...component,
        id: Date.now(), // 生成唯一ID
        _isClone: true, // 添加标识，表示这是从侧边栏克隆出来的
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../style/Siderbar.scss";


</style>
