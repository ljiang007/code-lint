/**
 * @description 组件工厂
 */

import { getComponentInfo } from "@/components/base";

// 生成唯一ID
let idCounter = 0;
function generateId() {
  return Date.now() + (idCounter++);
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

// 验证组件props
export function validateComponentProps(type, props) {
  const info = getComponentInfo(type);
  if (!info) return false;

  // 简单的类型检查
  for (const [key, config] of Object.entries(info.propTypes || {})) {
    const propValue = props[key];
    const expectedType = config.type;
    
    if (config.required && propValue === undefined) {
      console.error(`Missing required prop: ${key}`);
      return false;
    }

    if (propValue !== undefined && typeof propValue !== expectedType) {
      console.error(`Invalid type for prop ${key}: expected ${expectedType}, got ${typeof propValue}`);
      return false;
    }
  }

  return true;
}