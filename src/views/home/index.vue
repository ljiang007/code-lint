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
      const newComponent = {
        id,
        type: componentType,
        props: {},
        children: [],
      };

      if (componentType === "layout") {
        // 如果是布局组件，预设4个栅格栏（col）
        newComponent.children = [
          { id: id + 1, children: [] },
          { id: id + 2, children: [] },
          { id: id + 3, children: [] },
          { id: id + 4, children: [] },
        ];
        newComponent.children = Array.from({ length: 4 }, (_, i) => ({
          id: id + i + 1,
          type: "col", // 添加一个类型标识（可选）
          children: [],
        }));
      } else if (componentType === "text") {
        // 如果是文本组件，设置默认文本
        newComponent.props = {
          text: "默认文本",
          style: {
            fontSize: "14px",
            color: "#000000",
          },
        };
      } else if (componentType === "image") {
        newComponent.props = {
          src: "https://static.form-create.com/example.png",
          style: {
            width: "100px",
            maxWidth: "100px",
          },
        };
      }

      this.components.push(newComponent);
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
