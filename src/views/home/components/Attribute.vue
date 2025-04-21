<!-- 属性面板 -->
<template>
  <div>
    <!-- {{ selectedComponent }} -->
    <div v-if="selectedComponent" class="panel">
      <!-- 因为我只需修改props（组件属性），所以这里传入各组件selectedComponent.props -->
      <component
        :is="editorComponent"
        v-if="editorComponent"
        :propsData="selectedComponent.props"
        @update="update"
      />
      <div v-else>暂无该组件的属性面板</div>

      <PublicStylePanel
        v-if="editorComponent"
        :propsData="selectedComponent.props"
        @update="update"
      />
    </div>
    <div v-else class="panel">请选择一个组件进行编辑</div>
  </div>
</template>

<script>
import { componentMaps } from "@/utils/componentFactory";
import PublicStylePanel from "@/components/public/style/Panel.vue";
export default {
  props: ["selectedComponent"],
  components: {
    PublicStylePanel,
  },
  computed: {
    editorComponent() {
      const type = this.selectedComponent?.type;
      if (!type) return null;
      return componentMaps.editors[type] || null;
    },
  },
  methods: {
    update(updatedProps) {
      this.$emit("update", updatedProps);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/Attribute.scss";
</style>
