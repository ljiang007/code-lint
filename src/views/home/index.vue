<template>
  <el-row style="height: 100%">
    <el-col :span="6" style="height: 100%">
      <Sidebar />
    </el-col>
    <el-col :span="12" style="height: 100%">
      <Canvas
        :components="components"
        @select="handleSelect"
        :selectedId="selectedId"
        @add-component="handleAddComponent"
        @delete-component="handleDeleteComponent"
      />
    </el-col>
    <el-col :span="6" style="height: 100%">
      <PropertiesPanel
        :selectedComponent="selectedComponent"
        @update="handleUpdateComponent"
      />
    </el-col>
  </el-row>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Canvas from "./components/Canvas.vue";
import PropertiesPanel from "./components/PropertiesPanel.vue";

import { getDefaultComponentProps } from '@/utils/componentDefaults.js';

export default {
  components: { Sidebar, Canvas, PropertiesPanel },
  data() {
    return {
      components: [],
      selectedId: null,
    };
  },
  computed: {
    selectedComponent() {
      // 调用递归函数来查找 selectedId 对应的组件
      return this.findComponentById(this.selectedId, this.components);
    },
  },
  methods: {
    // ✅ 删除组件
    handleDeleteComponent(id) {
      const removeById = (list) =>
        list
          .map((item) => {
            if (item.id === id) return null;
            if (item.children) item.children = removeById(item.children);
            if (item.type === "layout") {
              item.children = item.children.map((col) => {
                col.children = removeById(col.children || []);
                return col;
              });
            }
            return item;
          })
          .filter(Boolean);

      this.components = removeById(this.components);
      if (this.selectedId === id) this.selectedId = null;
    },

    handleAddComponent(componentType) {
      const id = Date.now();
      const base = {
        id,
        type: componentType,
        props: {},
        children: [],
      };
      const defaultProps=Object.assign(base,getDefaultComponentProps(componentType))
      console.log('defaultProps',defaultProps)
      this.components.push(defaultProps);
      // 拖入后自动选中这个组件
      this.selectedId = id;
    },

    handleSelect(id) {
      this.selectedId = id;
    },
    handleUpdateComponent(updatedProps) {
      const comp = this.findComponentById(this.selectedId, this.components);
      if (comp) {
        comp.props = updatedProps;
      }
    },
    findComponentById(id, components) {
      for (let component of components) {
        if (component.id === id) {
          return component;
        }
        if (component.children && component.children.length > 0) {
          const found = this.findComponentById(id, component.children);
          if (found) {
            return found;
          }
        }
      }
      return null; // 如果找不到，返回 null
    },
  },
};
</script>

<style scoped></style>
