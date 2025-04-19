<template>
  <el-row style="height: 100%">
    <el-col :span="6" style="height: 100%">
      <Sidebar />
    </el-col>
    <el-col :span="12" style="height: 100%">
      <Canvas
        :components.sync="components"
        @select="handleSelect"
        :selectedId="selectedId"
        @delete-component="handleDeleteComponent"
      />
    </el-col>
    <el-col :span="6" style="height: 100%">
      <Attribute
        :selectedComponent="selectedComponent"
        @update="handleUpdateComponent"
      />
    </el-col>
  </el-row>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Canvas from "./components/Canvas.vue";
import Attribute from "./components/Attribute.vue";

export default {
  components: { Sidebar, Canvas, Attribute },
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
    // 删除组件
    /**
     * 删除组件的方法
     * @param {string|number} id - 要删除的组件id
     * 
     * 该方法会递归遍历整个组件树:
     * 1. 如果找到匹配id的组件,返回null以删除该组件
     * 2. 如果组件有children,递归处理子组件
     * 3. 对于layout类型组件,需要特殊处理其下的col组件
     * 4. 最后用filter过滤掉所有null值
     * 5. 如果删除的是当前选中的组件,清空选中状态
     */
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

    handleSelect(id) {
      this.selectedId = id;
    },
    
    //属性面板修改数据用于响应画布
    handleUpdateComponent(updatedProps) {
      const comp = this.findComponentById(this.selectedId, this.components);
      if (comp) {
        comp.props = updatedProps;
      }
    },
    
    /**
     * 递归查找组件树中指定id的组件
     * @param {string|number} id - 要查找的组件id
     * @param {Array} components - 组件树数组
     * @returns {Object|null} 返回找到的组件对象,如果未找到则返回null
     * 
     * 该方法会递归遍历整个组件树:
     * 1. 首先检查当前层级的组件id是否匹配
     * 2. 如果当前组件有children,则递归搜索子组件
     * 3. 直到找到目标组件或遍历完整个组件树
     */
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