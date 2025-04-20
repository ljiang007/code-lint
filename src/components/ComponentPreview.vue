<!-- 可写render函数写法，也可可写template写法 -->
<script>

import { componentMaps } from "@/utils/componentFactory";

export default {
  name: "Preview",
  props: {
    preview: Array,
  },
  provide() {
    return {
      // 提供渲染方法给所有子组件
      renderPreview: this.renderPreview
    };
  },
  methods: {
    renderPreview(h, component) {
      const { type } = component;
      const preview = componentMaps.previews[type]
      if (preview) {
        return h(preview, {
          props: {
            component
          }
        });
      }
      return h("div", "未知组件");
    }
  },
  render(h) {
    return h('div', { class: 'preview-wrapper' }, 
      this.preview.map(comp => 
        h('div', { key: comp.id }, [
          this.renderPreview(h, comp)
        ])
      )
    );
  }
};
</script>