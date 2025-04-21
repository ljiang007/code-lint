
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
  - `LayoutEditor.vue`：布局编辑组件，支持栅格系统配置
  - `LayoutRenderer.vue`：布局渲染组件，支持响应式布局
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

- **`componentDefaults.js`**
  组件默认配置，定义各组件的默认属性和样式。

## 🎯 核心功能

1. **组件管理**
   - 支持组件的拖拽添加
   - 支持组件的选中、高亮显示
   - 支持组件的删除操作
   - 支持组件的嵌套拖拽

2. **属性编辑**
   - 实时编辑组件属性
   - 属性修改即时预览
   - 支持多种属性类型配置
   - 支持栅格系统配置（span、offset、push、pull）

3. **页面预览**
   - 实时预览页面效果
   - 支持完整布局展示
   - 响应式设计支持
   - 支持栅格布局预览

4. **布局系统**
   - 基于 Element UI 的栅格系统
   - 支持 24 列布局
   - 支持响应式布局
   - 支持 push/pull 偏移
   - 支持 gutter 间距设置

## 🛠️ 技术栈

- Vue.js：前端框架
- Vuex：状态管理
- Vue Router：路由管理
- SCSS：样式预处理器
- Element UI：UI 组件库
- vuedraggable：拖拽功能实现

## 📝 使用说明

1. 从侧边栏拖拽组件到画布
2. 选中组件后在属性面板编辑属性
3. 实时预览页面效果
4. 支持组件的嵌套拖拽
5. 支持栅格系统的配置
6. 导出 JSON 数据保存配置

## 🔄 新创建组件流程

1. 在 `components/base` 下创建新的基础组件
2. 在 `utils/componentFactory.js` 中注册新组件
3. 在 `utils/componentDefaults.js` 中配置默认组件（属性、样式，文本）
4. 更新相关渲染器和预览组件
5. 测试组件功能
6. 提交代码并更新文档

## 🎨 布局系统说明

### 栅格系统
- 基于 24 列布局
- 支持响应式设计
- 支持以下属性配置：
  - `span`：栅格占据的列数
  - `offset`：栅格左侧的间隔格数
  - `push`：栅格向右移动格数
  - `pull`：栅格向左移动格数
  - `gutter`：栅格间隔

### 布局组件特性
- 支持嵌套布局
- 支持拖拽调整
- 支持属性实时编辑
- 支持响应式预览