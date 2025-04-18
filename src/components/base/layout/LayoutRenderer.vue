<template>
  <el-row>
    <el-col
      v-for="child in component.children"
      :key="child.id"
      :span="24 / component.children.length"
    >
    
      <div
        class="col-box"
        @dragover.prevent
        @drop="onDrop($event, child)"
        @click.stop="selectComponent(child.id)"
        :class="{ solid: child.id === selectedId }"
      >
        <ComponentRenderer
          v-for="grandchild in child.children || []"
          :key="grandchild.id"
          :component="grandchild"
          :selected-id="selectedId"
          @select="$emit('select', $event)"
          @delete-component="$emit('delete-component', $event)"
        />
        <div class="controls" v-if="child.id === selectedId">
          <div class="dragne" @click.stop="$emit('delete-component', child.id)">
            <i class="el-icon-delete-solid"></i>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "LayoutRenderer",
  props: {
    component: Object,
    selectedId: [String, Number],
  },
  methods: {
    selectComponent(id) {
      this.$emit("select", id);
    },
    onDrop(event, targetCol) {
      event.stopPropagation();
      const type = event.dataTransfer.getData("componentType");
      const newComponent = {
        id: Date.now(),
        type,
        props: {},
        children: [],
      };

      if (type === "text") {
        newComponent.props = {
          text: "默认文本",
          style: {
            fontSize: "14px",
            color: "#000000",
          },
        };
      } else if (type === "layout") {
        newComponent.children = [
          { id: Date.now() + 1, type: "col", children: [] },
          { id: Date.now() + 2, type: "col", children: [] },
          { id: Date.now() + 3, type: "col", children: [] },
          { id: Date.now() + 4, type: "col", children: [] },
        ];
      } else if (type === "image") {
        newComponent.props = {
          src: "https://static.form-create.com/example.png",
          style: {
            width: "100px",
            maxWidth: "100px",
          },
        };
      }

      if (targetCol && Array.isArray(targetCol.children)) {
        this.$set(targetCol, "children", [...targetCol.children, newComponent]);
        this.$emit("select", newComponent.id);
        this.$forceUpdate();
      }
    }
  }
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
</style>
