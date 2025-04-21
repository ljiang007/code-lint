/**
 * @description 组件工厂
 * 组件映射配置
 * 编辑器组件映射
 * 渲染器组件映射
 * 预览组件映射
 */

// 组件映射配置
const componentMaps = {
  // 编辑器组件映射
  editors: {
    text: () => import("@/components/base/text/TextEditor.vue"),
    image: () => import("@/components/base/image/ImageEditor.vue"),
    button: () => import("@/components/base/button/ButtonEditor.vue"),
    layout: () => import("@/components/base/layout/LayoutEditor.vue"),
    link: () => import("@/components/base/link/LinkEditor.vue"),
  },
  // 渲染器组件映射
  renderers: {
    text: () => import("@/components/base/text/TextRenderer.vue"),
    image: () => import("@/components/base/image/ImageRenderer.vue"),
    button: () => import("@/components/base/button/ButtonRenderer.vue"),
    layout: () => import("@/components/base/layout/LayoutRenderer.vue"),
    link: () => import("@/components/base/link/LinkRenderer.vue"),
  },
  // 预览组件映射
  previews: {
    text: () => import("@/components/base/text/TextPreview.vue"),
    image: () => import("@/components/base/image/ImagePreview.vue"),
    button: () => import("@/components/base/button/ButtonPreview.vue"),
    layout: () => import("@/components/base/layout/LayoutPreview.vue"),
    link: () => import("@/components/base/link/LinkPreview.vue"),
  },
  list: [
    { type: "layout", label: "栅格布局" },
    { type: "text", label: "文本" },
    { type: "image", label: "图片" },
    { type: "button", label: "按钮" },
    { type: "link", label: "链接" },
   
  ],
};

export { componentMaps };

