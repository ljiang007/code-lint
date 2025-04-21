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
          type: this.component.props?.attr?.type,
          underline: this.component.props?.attr?.underline,
        },
        style: this.component.props?.style || {},
      },
      [this.component.props?.text]
    );
  },
};
</script>
