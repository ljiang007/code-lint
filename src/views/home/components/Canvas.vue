<template>
  <div class="x">
    <el-button type="primary" @click="exportJSON" style="margin-top: 20px">
      导出 JSON
    </el-button>
    <el-button
      type="primary"
      @click="dialogVisible = true"
      style="margin-top: 20px"
    >
      预览
    </el-button>

    <div class="canvas">
      <!-- 使用正确的 Vue 2 vuedraggable 语法 -->
      <draggable
        v-model="localComponents"
        group="components"
        class="draggable-canvas"
        @add="handleComponentAdded"
        @end="handleDragEnd"
      >
        <!-- 使用默认插槽 -->
        <div v-for="element in localComponents" :key="element.id">
          <ComponentRenderer
            :component="element"
            :selected-id="selectedId"
            @select="selectComponent"
            @delete-component="deleteComponent"
          />
        </div>
      </draggable>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="80%">
      <ComponentPreview :preview="localComponents" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { getDefaultComponentProps } from '@/utils/componentDefaults.js';

export default {
  components: {
    draggable
  },
  data() {
    return { 
      dialogVisible: false,
      localComponents: [] 
    };
  },
  props: ["components", "selectedId"],
  watch: {
    components: {
      handler(val) {
        // 确保不会覆盖本地状态
        if (JSON.stringify(val) !== JSON.stringify(this.localComponents)) {
          this.localComponents = JSON.parse(JSON.stringify(val));
        }
      },
      immediate: true
    },
    localComponents: {
      handler(val) {
        this.$emit('update:components', val);
      },
      deep: true
    }
  },
  methods: {
    deleteComponent(id) {
      this.$emit("delete-component", id);
    },
    handleComponentAdded(evt) {
      // 处理新添加的组件
      const newIndex = evt.newIndex;
      const component = this.localComponents[newIndex];
      
      console.log('添加新组件:', component);
      
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
        const newComponent = Object.assign({}, base, getDefaultComponentProps(type));
        
        // 替换克隆的组件
        this.$set(this.localComponents, newIndex, newComponent);
        
        // 选中新组件
        this.$nextTick(() => {
          this.selectComponent(id);
        });
      }
    },
    handleDragEnd() {
      // 发出更新事件，通知父组件
      this.$emit('update:components', this.localComponents);
    },
    selectComponent(id) {
      this.$emit("select", id);
    },
    exportJSON() {
      const json = JSON.stringify(this.localComponents, null, 2);
      console.log("导出 JSON：", json);
      console.log(this.localComponents);
    },
  },
};
</script>

<style scoped>
@import "../style/Canvas.scss";

.draggable-canvas {
  min-height: 200px;
  padding: 10px;
}
</style>