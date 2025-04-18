/**
 * @description 组件注册中心，用于注册组件，方便使用。
 * @example import { registerComponent } from '@/utils/index.js'
 */

const componentRegistry = {
  text: {
    label: "文本",
    preview: () => import("./text/TextPreview.vue"),
    renderer: () => import("./text/TextRenderer.vue"),
    defaultProps: {
      text: "默认文本",
      style: {
        fontSize: "14px",
        color: "#000000",
        padding: "4px",
      },
    },
    propTypes: {
      text: { type: String, required: true },
      style: {
        type: Object,
        default: () => ({
          fontSize: String,
          color: String,
          padding: String,
        }),
      },
    },
  },
  image: {
    label: "图片",
    preview: () => import("./image/ImagePreview.vue"),
    renderer: () => import("./image/ImageRenderer.vue"),
    defaultProps: {
      src: "https://static.form-create.com/example.png",
      style: {
        width: "100px",
        maxWidth: "100%",
      },
    },
    propTypes: {
      src: { type: String, required: true },
      style: {
        type: Object,
        default: () => ({
          width: String,
          maxWidth: String,
        }),
      },
    },
  },
  layout: {
    label: "栅格布局",
    preview: () => import("./layout/LayoutPreview.vue"),
    renderer: () => import("./layout/LayoutRenderer.vue"),
    defaultProps: {
      cols: 4, // 默认4列
      gutter: 8, // 默认间隔8px
      style: {
        minHeight: "100px",
      },
    },
    propTypes: {
      cols: { type: Number, default: 4 },
      gutter: { type: Number, default: 8 },
      style: {
        type: Object,
        default: () => ({
          minHeight: String,
        }),
      },
    },
  },
};

// 获取组件信息
export const getComponentInfo = (type) => {
  const info = componentRegistry[type];
  if (!info) {
    console.warn(`Unknown component type: ${type}`);
    return null;
  }
  return info;
};

// 注册新组件
export const registerComponent = (type, info) => {
  if (componentRegistry[type]) {
    console.warn(`Component type "${type}" already registered. Overriding.`);
  }
  componentRegistry[type] = info;
};

// 获取所有组件类型（用于侧边栏）
export const getComponentTypes = () => {
  return Object.keys(componentRegistry).map((type) => ({
    type,
    label: componentRegistry[type].label,
  }));
};
