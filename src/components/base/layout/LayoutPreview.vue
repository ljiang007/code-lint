<script>
export default {
  name: "LayoutPreview",
  props: {
    component: Object,
  },
  inject: ["renderPreview"], // 正确注入父组件提供的方法
  render(h) {
    return h(
      "el-row",
      {
        class: "preview-box",
        props: {
          gutter: this.component.props?.Attributes?.gutter,
          type: this.component.props?.Attributes?.type,
          justify: this.component.props?.Attributes?.justify,
          align: this.component.props?.Attributes?.align,
        },
      },
      this.component.children.map((child) =>
        h(
          "el-col",
          {
            key: child.id,
            props: {
              span: child.props?.Attributes?.span,
              offset: child.props?.Attributes?.offset,
              push: child.props?.Attributes?.push,
            },
            style: this.getPullStyle(
              child.props?.Attributes?.pull,
              child.props?.style
            ),
            // 自适应就用这个
            // props: { span: 24 / this.component.children.length },
            // style: { flex: `0 0 ${100 / this.component.children.length}%` },
          },
          [
            h(
              "div",
              { class: "preview-col" },
              (child.children || []).map(
                (grand) => this.renderPreview(h, grand) // 使用注入的方法
              )
            ),
          ]
        )
      )
    );
  },
  methods: {
    getPullStyle(pull, style) {
      if (pull) {
        return {
          left: `-${pull * 4.166667}%`,
        };
      } else {
        return {
          margin: style.margin,
          padding: style.padding,
        };
      }
    },
  },
};
</script>

<style scoped>
.preview-box {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
</style>
