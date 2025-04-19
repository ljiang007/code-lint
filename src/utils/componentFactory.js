/**
 * @description 组件工厂
 */

// 组件映射配置
export const componentMaps = {
  // 编辑器组件映射
  editors: {
    text: () => import("@/components/base/text/TextEditor.vue"),
    image: () => import("@/components/base/image/ImageEditor.vue"),
    button: () => import("@/components/base/button/ButtonEditor.vue"),
    layout: () => import("@/components/base/layout/LayoutEditor.vue"),
  },
  // 渲染器组件映射
  renderers: {
    text: () => import("@/components/base/text/TextRenderer.vue"),
    image: () => import("@/components/base/image/ImageRenderer.vue"),
    button: () => import("@/components/base/button/ButtonRenderer.vue"),
    layout: () => import("@/components/base/layout/LayoutRenderer.vue"),
  },
  // 预览组件映射
  previews: {
    text: () => import("@/components/base/text/TextPreview.vue"),
    image: () => import("@/components/base/image/ImagePreview.vue"),
    button: () => import("@/components/base/button/ButtonPreview.vue"),
    layout: () => import("@/components/base/layout/LayoutPreview.vue"),
  }
};

// 获取组件信息
export function getComponentInfo(type) {
  return componentMaps[type];
}

// 创建组件实例
export function createComponent(type, customProps = {}) {
  const info = getComponentInfo(type);
  if (!info) {
    console.error(`Cannot create component: unknown type "${type}"`);
    return null;
  }

  const id = generateId();
  const component = {
    id,
    type,
    props: {
      ...JSON.parse(JSON.stringify(info.defaultProps || {})),
      ...customProps
    }
  };

  // 特殊处理布局组件
  if (type === 'layout') {
    component.children = Array.from(
      { length: component.props.cols || 4 }, 
      (_, i) => ({
        id: generateId(),
        type: 'col',
        children: []
      })
    );
  } else {
    component.children = [];
  }

  return component;
}

