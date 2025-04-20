<template>
  <el-form label-position="top">
    <el-form-item label="栅格间隔">
      <el-input-number
        v-model="localProps.Attributes.gutter"
        :min="0"
        :max="100"
        @change="update"
      />
    </el-form-item>
    <el-form-item label="是否flex布局模式">
      <el-switch
        :value="localProps.Attributes.type === 'flex'"
        @change="
          (val) => {
            localProps.Attributes.type = val ? 'flex' : '';
            update();
          }
        "
      >
      </el-switch>
    </el-form-item>
    <el-form-item label="水平对齐方式" v-if="localProps.Attributes.type === 'flex'">
      <el-select
        v-model="localProps.Attributes.justify"
        placeholder="请选择水平对齐方式"
      >
        <el-option label="左对齐" value="left"></el-option>
        <el-option label="居中对齐" value="center"></el-option>
        <el-option label="右对齐" value="right"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="垂直对齐方式" v-if="localProps.Attributes.type === 'flex'">
      <el-select
        v-model="localProps.Attributes.align"
        placeholder="请选择垂直对齐方式"
      >
        <el-option label="上对齐" value="top"></el-option>
        <el-option label="居中对齐" value="middle"></el-option>
        <el-option label="下对齐" value="bottom"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["propsData"],
  computed: {
    localProps: {
      get() {
        return this.propsData;
      },
      set(value) {
        this.$emit("update", value);
      },
    },
  },
  methods: {
    update() {
      this.$emit("update", this.localProps);
    },
  },
};
</script>
