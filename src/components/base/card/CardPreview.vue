<script>
export default {
  name: "CardPreview",
  props: {
    component: Object,
  },
  inject: ["renderPreview"],
  render(h) {
    return h(
      "div",
      {
        style: this.component.props?.style || {},
        class: "card-preview"
      },
      this.component.children.map(child => this.renderPreview(h, child))
    );
  }
};
</script>

<style scoped>
.card-preview {
  padding: 10px;
  box-sizing: border-box;
  min-height: 100px;
}
</style>