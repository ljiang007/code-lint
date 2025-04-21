<template>
  <div class="box-model-demo">
    <div
      class="margin-container"
      v-if="localProps?.Attributes?.style && Object.keys(localProps.Attributes.style).length !== 0"
    >
      <div class="margin-label">外边距</div>
      <div class="margin-numbers">
        <span
          class="top"
          contenteditable="true"
          @input="handleInput($event, 'margin', 'top')"
          >{{ getStyleValue("margin", "top") }}</span
        >
        <span
          class="right"
          contenteditable="true"
          @input="handleInput($event, 'margin', 'right')"
          >{{ getStyleValue("margin", "right") }}</span
        >
        <span
          class="bottom"
          contenteditable="true"
          @input="handleInput($event, 'margin', 'bottom')"
          >{{ getStyleValue("margin", "bottom") }}</span
        >
        <span
          class="left"
          contenteditable="true"
          @input="handleInput($event, 'margin', 'left')"
          >{{ getStyleValue("margin", "left") }}</span
        >
      </div>
      <div class="padding-container">
        <div class="padding-label">内边距</div>
        <div class="padding-numbers">
          <span
            class="top"
            contenteditable="true"
            @input="handleInput($event, 'padding', 'top')"
            >{{ getStyleValue("padding", "top") }}</span
          >
          <span
            class="right"
            contenteditable="true"
            @input="handleInput($event, 'padding', 'right')"
            >{{ getStyleValue("padding", "right") }}</span
          >
          <span
            class="bottom"
            contenteditable="true"
            @input="handleInput($event, 'padding', 'bottom')"
            >{{ getStyleValue("padding", "bottom") }}</span
          >
          <span
            class="left"
            contenteditable="true"
            @input="handleInput($event, 'padding', 'left')"
            >{{ getStyleValue("padding", "left") }}</span
          >
        </div>
        <div class="content"></div>
      </div>
    </div>
    <div v-else>不提供布局组件的内外边距修改</div>
  </div>
</template>

<script>
export default {
  props: {
    propsData: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    localProps: {
      get() {
        return this.propsData;
      },
      set(value) {
        this.$emit("update", value);
      },
    },
  },
  methods: {
    handleInput(event, property, position) {
      let value = event.target.innerText.trim();
      value = value.replace(/[^\d]/g, "");

      if (value.length > 0) {
        value = Math.min(parseInt(value), 999).toString();
      } else {
        value = "0";
      }

      if (event.target.innerText !== value) {
        event.target.innerText = value;
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(event.target.childNodes[0], value.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }

      this.updateValue(property, position, parseInt(value));
    },
    getStyleValue(property, position) {
      const style = this.localProps?.style || {};
      const value = style[property] || "0px";
      const values = value.split(" ").map((v) => parseInt(v) || 0);

      if (values.length === 1) {
        return parseInt(values[0]) || 0;
      }

      const positionMap = {
        top: 0,
        right: 1,
        bottom: 2,
        left: 3,
      };
      return parseInt(values[positionMap[position]]) || 0;
    },
    updateValue(property, position, value) {
      const currentProps = { ...this.localProps };
      const style = currentProps.style || {};
      let values = ["0", "0", "0", "0"];

      // 如果已有值，先解析现有值
      if (style[property]) {
        const currentValues = style[property]
          .split(" ")
          .map((v) => parseInt(v) || 0);
        if (currentValues.length === 1) {
          values = Array(4).fill(currentValues[0].toString());
        } else {
          values = currentValues.map((v) => v.toString());
        }
      }

      const positionMap = {
        top: 0,
        right: 1,
        bottom: 2,
        left: 3,
      };

      values[positionMap[position]] = value.toString();

      // 检查是否所有值都相同
      const allSame = values.every((v) => v === values[0]);

      // 如果所有值相同，使用单值+px，否则使用四个值且每个值都带px
      const styleValue = allSame
        ? `${values[0]}px`
        : values.map((v) => `${v}px`).join(" ");

      const updatedProps = {
        ...currentProps,
        style: {
          ...style,
          [property]: styleValue,
        },
      };

      this.localProps = updatedProps;
    },
  },
};
</script>

<style scoped lang="scss">
.box-model-demo {
  font-size: 12px;

  .margin-container {
    position: relative;
    background: #e8f4ff;
    padding: 30px;
    border: 1px solid #a4d4ff;
    .margin-label {
      position: absolute;
      z-index: 9;
      bottom: 8px;
      left: 17px;
    }
  }

  .padding-container {
    position: relative;
    background: #f0f7ff;
    padding: 30px;
    border: 1px solid #a4d4ff;
    .padding-label {
      position: absolute;
      bottom: 8px;
      left: 17px;
    }
  }

  .content {
    height: 60px;
    background: #ffffff;
    border: 1px solid #a4d4ff;
  }

  .labels {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    display: flex;
    gap: 40px;
    color: #ff4d4f;
    font-size: 11px;
  }

  .bottom-labels {
    position: absolute;
    left: 0;
    bottom: -25px;
    display: flex;
    gap: 40px;
    color: #666;
    font-size: 11px;
  }

  .margin-numbers,
  .padding-numbers {
    position: absolute;
    inset: 0;
    pointer-events: none;
    span {
      position: absolute;
      color: #666;
      pointer-events: auto;
      min-width: 14px;
      text-align: center;
      cursor: text;

      &:focus {
        outline: none;
      }

      &.top {
        top: 2px;
        left: 50%;
        transform: translateX(-50%);
      }

      &.right {
        right: 2px;
        top: 50%;
        transform: translateY(-50%);
      }

      &.bottom {
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
      }

      &.left {
        left: 2px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  // 添加立体感阴影效果
  .margin-container,
  .padding-container {
    box-shadow: inset 0 0 0 1px rgba(164, 212, 255, 0.2),
      0 0 0 1px rgba(164, 212, 255, 0.2);
  }
}
</style>
