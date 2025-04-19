<script>
export default {
  name: "LinkPreview",
  props: {
    component: Object,
  },
  render(h) {
    return h(
      "el-link",
      {
        props: {
          type: this.component.props?.Attributes?.type,
          underline: this.component.props?.Attributes?.underline,
        },
        style: this.component.props?.style || {},
      },
      [this.component.props?.text]
    );
  },
};
</script>
