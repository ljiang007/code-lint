<template>
  <div class="x">
    <el-button type="primary" @click="exportJSON" style="margin-top: 20px">
      导出 JSON
    </el-button>
    <el-button type="primary" @click="dialogVisible=true" style="margin-top: 20px">
      预览
    </el-button>
    <div class="canvas" @dragover.prevent @drop="onDrop">
      <ComponentRenderer
        v-for="comp in components"
        :key="comp.id"
        :component="comp"
        :selected-id="selectedId"
        @select="selectComponent"
        @delete-component="deleteComponent"
      />
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%"
    >
    <ComponentPreview :preview="components" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data(){return{dialogVisible:false,}},
  props: ["components", "selectedId"],
  methods: {
    deleteComponent(id) {
      this.$emit("delete-component", id);
    },
    onDrop(event) {
      const type = event.dataTransfer.getData("componentType");
      this.$emit("add-component", type);
    },
    selectComponent(id) {
      this.$emit("select", id);
    },
    exportJSON() {
      const json = JSON.stringify(this.components, null, 2);
      console.log("导出 JSON：", json);
      console.log(this.components);
    },
  },
};
</script>

<style scoped>
@import "../style/Canvas.scss";
</style>
