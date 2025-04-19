# 低代码平台项目结构概述

本项目为一个 **低代码平台**，主要用于页面快速搭建。用户可通过拖拽组件到画布、编辑属性，实现所需页面结构与样式。

## 🏗️ 项目架构

项目采用 Vue.js 框架开发，主要分为以下核心目录：

- `components`：存放基础组件和通用渲染组件
- `views`：存放用户界面视图组件
- `utils`：存放工具函数和配置

## 📁 目录结构详解

### 🔹 components 目录

#### base 子目录
基础组件，作为页面构建的最小单元：

- **文本组件**
  - `TextEditor.vue`：文本编辑组件
  - `TextRenderer.vue`：文本渲染组件
  - `TextPreview.vue`：文本预览组件

- **图片组件**
  - `ImageEditor.vue`：图片编辑组件
  - `ImageRenderer.vue`：图片渲染组件
  - `ImagePreview.vue`：图片预览组件

- **按钮组件**
  - `ButtonEditor.vue`：按钮编辑组件
  - `ButtonRenderer.vue`：按钮渲染组件
  - `ButtonPreview.vue`：按钮预览组件

- **布局组件**
  - `LayoutEditor.vue`：布局编辑组件
  - `LayoutRenderer.vue`：布局渲染组件
  - `LayoutPreview.vue`：布局预览组件

- **链接组件**
  - `LinkEditor.vue`：链接编辑组件
  - `LinkRenderer.vue`：链接渲染组件
  - `LinkPreview.vue`：链接预览组件

#### 通用组件
- **`ComponentRenderer.vue`**  
  页面渲染组件，处理组件的实际展示、选中状态、删除操作等交互逻辑。

- **`ComponentPreview.vue`**  
  页面预览组件，递归渲染所有页面组件，生成完整布局效果。

### 🔹 views 目录

#### home 子目录
主页相关视图组件与样式：

- **`Canvas.vue`**  
  画布区域，支持组件拖拽放置。实现组件管理（添加、删除）、页面预览、导出 JSON 数据等功能。

- **`Attribute.vue`**  
  属性面板，用于展示与编辑当前选中组件的属性，如样式、内容等。

- **`Sidebar.vue`**  
  侧边栏，展示可拖拽组件列表，用户可从中选择组件拖入画布。

#### style 子目录
包含各模块的样式文件（SCSS）：
- `Canvas.scss`：画布区域样式
- `Attribute.scss`：属性面板样式
- `Sidebar.scss`：侧边栏样式

### 🔹 utils 目录

- **`componentFactory.js`**  
  组件工厂，集中管理所有组件的映射关系，包括：
  - 编辑器组件映射（editors）
  - 渲染器组件映射（renderers）
  - 预览组件映射（previews）

## 🎯 核心功能

1. **组件管理**
   - 支持组件的拖拽添加
   - 支持组件的选中、高亮显示
   - 支持组件的删除操作

2. **属性编辑**
   - 实时编辑组件属性
   - 属性修改即时预览
   - 支持多种属性类型配置

3. **页面预览**
   - 实时预览页面效果
   - 支持完整布局展示
   - 响应式设计支持

## 🛠️ 技术栈

- Vue.js：前端框架
- SCSS：样式预处理器
- Element UI：UI 组件库

## 📝 使用说明

1. 从侧边栏拖拽组件到画布
2. 选中组件后在属性面板编辑属性
3. 实时预览页面效果
4. 导出 JSON 数据保存配置

## 🔄 新创建组件流程

1. 在 `components/base` 下创建新的基础组件
2. 在 `utils/componentFactory.js` 中注册新组件
3. 在 `utils/componentDefaults.js` 中配置默认组件（属性、样式，文本）
4. 更新相关渲染器和预览组件
5. 测试组件功能
6. 提交代码并更新文档