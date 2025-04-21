<script>
export default {
  name: "ImagePreview",
  props: {
    component: Object
  },
  render(h) {
    return h("el-image", {
      props: {
        src: this.component.props?.attr?.src,
      },
      style: this.component.props?.style || {},
    });
  }
};
</script>