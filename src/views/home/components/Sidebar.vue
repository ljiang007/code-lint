<template>
  <div class="sidebar">
    <h4 class="_fc-l-title">模板</h4>
    <div class="draggable">
      <div
        v-for="item in componentList"
        :key="item.type"
        class="draggable-item"
        draggable="true"
        @dragstart="(e) => onDragStart(e, item.type)"
      >
        <span> {{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      componentList: [
        { type: "layout", label: "栅格布局" },
        { type: "text", label: "文本" },
        { type: "image", label: "图片" },
        // 后续可添加更多组件类型
        // { type: "card", label: "卡片" },
      ],
    };
  },
  methods: {
    onDragStart(event, type) {
      event.dataTransfer.setData("componentType", type);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../style/Siderbar.scss";
</style>
