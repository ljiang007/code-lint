/**
 * @description 组件默认属性配置
 *
 * 组件属性结构说明:
 * - props: 组件可配置的属性
 *   - 包含组件的基本属性和样式属性
 *   - style: 统一管理组件样式,如字体、颜色等
 *   - Attributes: 组件的属性
 *
 * - children: 子组件列表
 *   - layout组件: 包含多个col栅格子组件
 *   - 普通组件: 默认为空数组
 *
 * 组件标识属性(初始化后不可修改):
 * - id: 组件唯一标识
 * - type: 组件类型标识
 *
 * 备注：
 *  -Attributes(组件的属性)和style(组件的样式)，最好在属性面板都加上设置
 *
 * 组件默认配置格式：
 * {
 *  id:'',//组件唯一标识
 *  type:'',//组件类型标识
 *  props: {
 *    text: "", //组件文本内容
 *    style: {},//组件样式(JSON字符串)
 *    Attributes: {},//组件属性(JSON字符串)
 *  },
 *  children: [],//子组件列表
 * }
 */
export function getDefaultComponentProps(type) {
  const timestamp = Date.now();
  switch (type) {
    case "text":
      return {
        props: {
          text: "默认文本",
          style: {
            fontSize: "14px",
            color: "#000000",
          },
          Attributes: {},
        },
        children: [],
      };
    case "layout":
      return {
        props: {
          Attributes: {
            gutter: 8,
          },
        },
        children: [
          { id: timestamp + 1, type: "col", children: [] },
          { id: timestamp + 2, type: "col", children: [] },
          { id: timestamp + 3, type: "col", children: [] },
          { id: timestamp + 4, type: "col", children: [] },
        ],
      };
    case "image":
      return {
        props: {
          Attributes: {
            src: "https://static.form-create.com/example.png",
          },
          style: {
            width: "100px",
            height: "100px",
          },
        },
        children: [],
      };
    case "button":
      return {
        props: {
          text: "按钮",
          Attributes: {
            plain: false,
            type: "",
          },
          style: {
            fontSize: "14px",
            color: "#000000",
          },
        },
        children: [],
      };
    case "link":
      return {
        props: {
          text: "默认链接",
          Attributes: {
            type: "",
            underline: false,
          },
          style: {
            fontSize: "14px",
            color: "#000000",
          },
        },
        children: [],
      };
    default:
      return {};
  }
}
