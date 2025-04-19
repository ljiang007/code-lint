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
  </el-form>
</template>

<script>
export default {
  props: ["propsData"],
  data() {
    return {
      localProps: this.propsData,
    };
  },
  methods: {
    update() {
      this.$emit("update", this.localProps);
    },
  },
};
</script>
