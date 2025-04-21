<template>
  <div
    :class="['component-box', component.id === selectedId ? 'solid' : 'dashed']"
    @click.stop="selectComponent(component.id)"
  >
    <component
      :is="resolveComponentType(component.type)"
      :component="component"
      :selected-id="selectedId"
      @select="$emit('select', $event)"
      @delete-component="$emit('delete-component', $event)"
    />

    <div class="controls" v-if="component.id === selectedId">
      <div class="dragne" @click.stop="$emit('delete-component', component.id)">
        <i class="el-icon-delete-solid"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { componentMaps } from "@/utils/componentFactory";

export default {
  name: "ComponentRenderer",
  props: {
    component: Object,
    selectedId: [String, Number],
  },
  methods: {
    selectComponent(id) {
      this.$emit("select", id);
    },
    resolveComponentType(type) {
      return componentMaps.renderers[type] || "div";
    },
  },
};
</script>

<style scoped>
.component-box {
  margin: 2px;
  padding: 2px;
  position: relative;
  /* display: inline-block;
  width: auto;
  max-width: 100%; */
}
.solid {
  outline: 1px solid #409eff;
}
.dashed {
  outline: 1px dashed #ccc;
}
.controls {
  position: absolute;
  bottom: 4px;
  right: 4px;
  cursor: pointer;
}
</style>
