/**
 * @description 组件默认属性配置
 *
 * 组件属性结构说明:
 * - props: 组件可配置的属性
 *   - 包含组件的基本属性和样式属性
 *   - style: 统一管理组件样式,如字体、颜色等
 *   - attr: 组件的属性
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
 *  -attr(组件的属性)和style(组件的样式)，最好在属性面板都加上设置
 *
 * 组件默认配置格式：
 * {
 *  id:'',//组件唯一标识
 *  type:'',//组件类型标识
 *  props: {
 *    text: "", //组件文本内容
 *    style: {},//组件样式(JSON字符串)
 *    attr: {},//组件属性(JSON字符串)
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
            margin: "0px",
            padding: "0px",
            textAlign: "left",
          },
          attr: {},
        },
        children: [],
      };
    case "layout":
      return {
        props: {
          attr: {
            gutter: 0,
            type: "",
            justify: "start",
            align: "",
          },
          style: {},
        },
        children: [
          {
            id: timestamp + 1,
            type: "layout",
            props: {
              attr: { span: 4, offset: 0, push: 0, pull: 0 },
              style: { backgroundColor: "rgba(255,255,255,1)" },
            },
            children: [],
          },
          {
            id: timestamp + 2,
            type: "layout",
            props: {
              attr: { span: 4, offset: 0, push: 0, pull: 0 },
              style: { backgroundColor: "rgba(255,255,255,1)" },
            },
            children: [],
          },
          {
            id: timestamp + 3,
            type: "layout",
            props: {
              attr: { span: 4, offset: 0, push: 0, pull: 0 },
              style: { backgroundColor: "rgba(255,255,255,1)" },
            },
            children: [],
          },
          {
            id: timestamp + 4,
            type: "layout",
            props: {
              attr: { span: 4, offset: 0, push: 0, pull: 0 },
              style: { backgroundColor: "rgba(255,255,255,1)" },
            },
            children: [],
          },
          {
            id: timestamp + 5,
            type: "layout",
            props: {
              attr: { span: 4, offset: 0, push: 0, pull: 0 },
              style: { backgroundColor: "rgba(255,255,255,1)" },
            },
            children: [],
          },
          {
            id: timestamp + 6,
            type: "layout",
            props: {
              attr: { span: 4, offset: 0, push: 0, pull: 0 },
              style: { backgroundColor: "rgba(255,255,255,1)" },
            },
            children: [],
          },
        ],
      };
    case "image":
      return {
        props: {
          attr: {
            src: "https://static.form-create.com/example.png",
          },
          style: {
            width: "100%",
            height: "",
            margin: "0px",
            padding: "0px",
          },
        },
        children: [],
      };
    case "button":
      return {
        props: {
          text: "按钮",
          attr: {
            plain: false,
            type: "",
          },
          style: {
            fontSize: "14px",
            color: "#000000",
            margin: "0px",
            padding: "12px 20px 12px 20px",
            textAlign: "left",
          },
        },
        children: [],
      };
    case "link":
      return {
        props: {
          text: "默认链接",
          attr: {
            type: "",
            underline: false,
          },
          style: {
            fontSize: "14px",
            color: "#000000",
            margin: "0px",
            padding: "0px",
            textAlign: "left",
          },
        },
        children: [],
      };
    case "card":
      return {
        props: {
          text: "",
          attr: {},
          style: {
            width: "300px",
            height: "300px",
            borderRadius: "10px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            backgroundColor: "rgba(255,255,255,1);",
            boxSizing: "border-box",
          },
        },
        children: [],
      };
    default:
      return {};
  }
}
