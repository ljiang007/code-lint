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
        class: "preview-box",
      },
      this.component.props?.text || ""
    );
  }
};
</script>