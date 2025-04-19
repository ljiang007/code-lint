<template>
  <div class="sidebar">
    <h4 class="_fc-l-title">通用组件</h4>
    <div class="component-list">
      <!-- 使用正确的 Vue 2 版本 vuedraggable 语法 -->
      <draggable
        :list="componentList"
        :clone="cloneComponent"
        :group="{ name: 'components', pull: 'clone', put: false }"
        :sort="false"
        class="draggable"
      >
        <!-- 在 Vue 2 中，我们使用默认插槽而不是 item 插槽 -->
        <div
          v-for="item in componentList"
          :key="item.type"
          class="draggable-item"
        >
          <span>{{ item.label }}</span>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  data() {
    return {
      componentList: [
        { type: "layout", label: "栅格布局" },
        { type: "text", label: "文本" },
        { type: "image", label: "图片" },
        { type: "button", label: "按钮" }
      ],
    };
  },
  methods: {
    // 克隆组件，用于从侧边栏拖出时创建副本
    cloneComponent(component) {
      console.log('克隆组件:', component);
      return {
        ...component,
        id: Date.now(), // 生成唯一ID
        _isClone: true  // 添加标识，表示这是从侧边栏克隆出来的
      };
    }
  },
};
</script>

<style scoped lang="scss">
@import "../style/Siderbar.scss";

// 添加一些额外的样式来保持拖动时的外观
.draggable-item {
  cursor: move;
}
</style>