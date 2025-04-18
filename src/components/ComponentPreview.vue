<script>
import TextPreview from "@/components/base/text/TextPreview.vue";
import ImagePreview from "@/components/base/image/ImagePreview.vue";
import LayoutPreview from "@/components/base/layout/LayoutPreview.vue";
import ButtonPreview from '@/components/base/button/ButtonPreview.vue' 

export default {
  name: "Preview",
  props: {
    preview: Array,
  },
  components: {
    TextPreview,
    LayoutPreview,
    ImagePreview,
    ButtonPreview
  },
  provide() {
    return {
      // 提供渲染方法给所有子组件
      renderPreview: this.renderPreview
    };
  },
  methods: {
    // 新增递归渲染方法====新增的必须映射
    renderPreview(h, component) {
      const { type } = component;
      const componentMap = {
        text: TextPreview,
        layout: LayoutPreview,
        image: ImagePreview,
        button:ButtonPreview
      };
      
      if (componentMap[type]) {
        return h(componentMap[type], {
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