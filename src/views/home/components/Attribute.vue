<!-- 属性面板 -->
<template>
  <div>
    {{ selectedComponent }}
    <div v-if="selectedComponent" class="panel">
      <!-- 因为我只需修改props（组件属性），所以这里传入各组件selectedComponent.props -->
      <component
        :is="editorComponent"
        v-if="editorComponent"
        :propsData="selectedComponent.props"
        @update="update"
      />
      <div v-else>暂无该组件的属性面板</div>
    </div>
    <div v-else class="panel">请选择一个组件进行编辑</div>
  </div>
</template>

<script>
export default {
  props: ["selectedComponent"],
  computed: {
    editorComponent() {
      const type = this.selectedComponent?.type;
      if (!type) return null;
      //这里也要映射
      const map = {
        text: () => import("@/components/base/text/TextEditor.vue"),
        image: () => import("@/components/base/image/ImageEditor.vue"),
        button: () => import("@/components/base/button/ButtonEditor.vue"),
        layout: () => import("@/components/base/layout/LayoutEditor.vue"), 
      };

      return map[type] ? () => map[type]() : null;
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
