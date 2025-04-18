<script>
export default {
  name: "LayoutPreview",
  props: {
    component: Object
  },
  inject: ['renderPreview'], // 正确注入父组件提供的方法
  render(h) {
    return h(
      "el-row",
      { class: "preview-box" },
      this.component.children.map((child) =>
        h(
          "el-col",
          {
            key: child.id,
            props: { span: 24 / this.component.children.length },
          },
          [
            h(
              "div",
              { class: "preview-col" },
              (child.children || []).map((grand) => 
                this.renderPreview(h, grand) // 使用注入的方法
              )
            ),
          ]
        )
      )
    );
  }
};
</script>