<template>
  <div 
    :style="component.props?.style" 
    class="card-container"
  >
    <!-- 使用 draggable 组件允许拖入其他组件 -->
    <draggable
      v-model="component.children"
      group="components"
      class="card-draggable"
      @add="handleComponentAdded"
      @end="handleDragEnd"
    >
      <!-- 渲染子组件 -->
      <div v-for="element in component.children" :key="element.id">
        <ComponentRenderer
          :component="element"
          :selected-id="selectedId"
          @select="$emit('select', $event)"
          @delete-component="$emit('delete-component', $event)"
        />
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { getDefaultComponentProps } from "@/utils/componentDefaults.js";

export default {
  name: "CardRenderer",
  components: {
    draggable
  },
  props: {
    component: Object,
    selectedId: [String, Number]
  },
  methods: {
    handleComponentAdded(evt) {
      // 处理新添加的组件
      const newIndex = evt.newIndex;
      const component = this.component.children[newIndex];
      
      // 如果是从侧边栏克隆过来的，需要处理
      if (component._isClone) {
        const id = component.id || Date.now();
        const type = component.type;

        // 创建组件基本结构
        const base = {
          id,
          type,
          props: {},
          children: [],
        };

        // 添加默认属性
        const newComponent = Object.assign(
          {},
          base,
          getDefaultComponentProps(type)
        );

        // 替换克隆的组件
        this.$set(this.component.children, newIndex, newComponent);

        // 选中新组件
        this.$nextTick(() => {
          this.$emit('select', id);
        });
      }
    },
    handleDragEnd() {
      // 触发更新事件
      this.$emit('update');
    }
  }
};
</script>

<style scoped>
.card-container {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
}

.card-draggable {
  min-height: 100px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
}
</style>
