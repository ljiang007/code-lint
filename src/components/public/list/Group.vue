<template>
  <div class="component-list">
    <draggable
      :list="items"
      :clone="cloneComponent"
      :group="{ name: 'components', pull: 'clone', put: false }"
      :sort="false"
      class="draggable"
    >
      <div v-for="item in items" :key="item.type" class="draggable-item">
        <span>{{ item.label }}</span>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "Group",
  components: {
    draggable,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    cloneComponent: {
      type: Function,
      required: true,
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/views/home/style/Siderbar.scss";
// 添加一些额外的样式来保持拖动时的外观
.draggable-item {
  cursor: move;
}
</style>
