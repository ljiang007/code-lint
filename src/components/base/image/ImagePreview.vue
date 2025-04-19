<script>
export default {
  name: "ImagePreview",
  props: {
    component: Object
  },
  render(h) {
    return h("el-image", {
      props: {
        src: this.component.props?.Attributes?.src,
        fit: "contain",
      },
      style: this.component.props?.style || {},
    });
  }
};
</script>