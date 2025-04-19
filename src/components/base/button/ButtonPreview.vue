<script>
export default {
  name: "ButtonPreview",
  props: {
    component: Object,
  },
  render(h) {
    //调试
    console.log(this.component);
    return h(
      "el-button",
      {
        props: {
          type: this.component.props?.Attributes?.type,
          plain: this.component.props?.Attributes?.plain,
        },
        style: this.component.props?.style || {},
      },[this.component.props?.text,]
    );
  },
};
</script>
