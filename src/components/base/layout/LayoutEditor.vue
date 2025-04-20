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
    <el-form-item
      label="	flex布局下的水平排列方式"
      v-if="localProps.Attributes.type === 'flex'"
    >
      <el-select v-model="localProps.Attributes.justify" placeholder="请选择">
        <el-option label="左对齐" value="start"></el-option>
        <el-option label="右对齐" value="end"></el-option>
        <el-option label="居中对齐" value="center"></el-option>
        <el-option label="两端对齐" value="space-between"></el-option>
        <el-option label="分散对齐" value="space-around"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label="flex布局下的垂直排列方式"
      v-if="localProps.Attributes.type === 'flex'"
    >
      <el-select v-model="localProps.Attributes.align" placeholder="请选择">
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
