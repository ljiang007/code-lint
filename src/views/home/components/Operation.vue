<!-- 操作面板 -->
<template>
  <div class="operation">
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

    <el-button
      icon="el-icon-back"
      circle
      :disabled="!canUndo"
      @click="handleUndo"
    ></el-button>
    <el-button
      icon="el-icon-right"
      circle
      :disabled="!canRedo"
      @click="handleRedo"
    ></el-button>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="80%">
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
  name: "Operation",
  data() {
    return {
      dialogVisible: false,
      history: [],
      currentIndex: -1,
      maxHistory: 30,
    };
  },
  props: {
    components: {
      type: Array,
      required: true,
    },
  },
  computed: {
    canUndo() {
      return this.currentIndex > 0;
    },
    canRedo() {
      return this.currentIndex < this.history.length - 1;
    },
  },
  watch: {
    components: {
      handler(newVal) {
        const cleanComponents = newVal.filter(component => !component._isClone);
        const currentState = JSON.stringify(cleanComponents);
        const historyState = JSON.stringify(this.history[this.currentIndex]);
        
        if (currentState !== historyState) {
          if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.currentIndex + 1);
          }
          
          this.history.push(JSON.parse(currentState));
          this.currentIndex++;
          
          if (this.history.length > this.maxHistory) {
            this.history.shift();
            this.currentIndex--;
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    exportJSON() {
      const json = JSON.stringify(this.components, null, 2);
      console.log("导出 JSON：", json);
    },
    // 更新组件状态并选中最后一个组件
    updateState(index) {
      const state = this.history[index];
      const lastId = state.length ? state[state.length - 1].id : null;
      this.$emit("update:components", JSON.parse(JSON.stringify(state)));
      this.$emit("select", lastId);
    },
    //撤销
    handleUndo() {
      if (this.canUndo) {
        this.currentIndex--;
        this.updateState(this.currentIndex);
      }
    },
    //重做
    handleRedo() {
      if (this.canRedo) {
        this.currentIndex++;
        this.updateState(this.currentIndex);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/Operation.scss";
</style>
