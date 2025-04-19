<template>
  <div>
    <el-row :gutter="component.props?.Attributes?.gutter || 0">
      <el-col
        v-for="child in component.children"
        :key="child.id"
        :span="24 / component.children.length"
      >
        <div
          class="col-box"
          @click.stop="selectComponent(child.id)"
          :class="{ solid: child.id === selectedId }"
        >
          <!-- 使用正确的 Vue 2 vuedraggable 语法 -->
          <draggable
            v-model="child.children"
            group="components"
            class="column-draggable"
            @add="(evt) => handleColumnAdd(evt, child)"
            @end="handleColumnDragEnd"
          >
            <!-- 使用默认插槽 -->
            <div v-for="element in child.children" :key="element.id">
              <ComponentRenderer
                :component="element"
                :selected-id="selectedId"
                @select="$emit('select', $event)"
                @delete-component="$emit('delete-component', $event)"
              />
            </div>
          </draggable>

          <div class="controls" v-if="child.id === selectedId">
            <div
              class="dragne"
              @click.stop="$emit('delete-component', child.id)"
            >
              <i class="el-icon-delete-solid"></i>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { getDefaultComponentProps } from "@/utils/componentDefaults.js";

export default {
  name: "LayoutRenderer",
  components: {
    draggable,
  },
  props: {
    component: Object,
    selectedId: [String, Number],
  },
  methods: {
    selectComponent(id) {
      this.$emit("select", id);
    },
    handleColumnAdd(evt, column) {
      // 处理添加到列中的组件
      const newIndex = evt.newIndex;
      const component = column.children[newIndex];

      console.log("添加到列中:", component);

      // 如果是从侧边栏克隆的组件，需要创建真实组件
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
        this.$set(column.children, newIndex, newComponent);

        // 选中新组件
        this.$nextTick(() => {
          this.$emit("select", id);
        });
      }
    },
    handleColumnDragEnd() {
      // 通知父组件更新
      this.$forceUpdate();
      this.$emit("update");
    },
  },
};
</script>

<style scoped>
.col-box {
  min-height: 100px;
  outline: 1px dashed #bbb;
  padding: 2px;
  box-sizing: border-box;
  background-color: #fdfdfd;
  margin-right: 8px;
  position: relative;
}
.el-col:last-child .col-box {
  margin-right: 0;
}
.col-box:hover {
  outline: 1px solid #2e73ff;
}
.controls {
  position: absolute;
  bottom: 4px;
  right: 4px;
  cursor: pointer;
}
.column-draggable {
  min-height: 50px;
  padding: 5px 0;
}
</style>
