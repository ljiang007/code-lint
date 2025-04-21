<script>
export default {
  name: "TextPreview",
  props: {
    component: Object
  },
  render(h) {
    return h(
      "div",
      {
        style: this.component.props?.style || {},
      },
      this.component.props?.text || ""
    );
  }
};
</script>