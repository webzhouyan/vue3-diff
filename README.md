## 🔥 功能列表

vue3-diff，一个简单的vue3文本比对组件


| 功能                                  | 描述                                                              |
| ------------------------------------- | ------------------------------------------------------------------ |
| 对比方式                           | 支持单列对比 和 双列对比                       |
| 隐藏相同行      | 支持隐藏内容相同的行               |
| 对比效果 | 支持精确到单词 和 精确到字符      |

## 📚 参数列表

| params                                   | 参数值                                                              |
| ------------------------------------- |------------------------------------------------------------------|
| newString                            | 新的文本内容                                                           |
| oldString                            | 旧的文本内容                                                           |
| context      | 描述应包含多少行上下文 默认值是 5,设为0时隐藏相同行                                     |
| outputFormat | 输出数据格式:'line-by-line' 单列对比或'side-by-side'双列对比, 默认为'line-by-line' |
| drawFileList | 在 diff 之前显示文件列表:true或者false，默认是true                              |
| renderNothingWhenEmpty | 如果 diff 在其比较中没有显示任何变化，则不渲染任何内容：true或者false，默认为 false             |
| diffStyle | 在每行中显示差异级别:'word'或'char', 默认为'word'                              |

---

## ✨ 使用介绍

### ⚔️ 安装指南

依赖安装：

```bash
    npm install vue3-diff
```

### 📈 使用方法

安装完毕依赖之后，通过引入的方式来使用它：

```vue
<template>
  <div id="app">
    <vue3-diff
      :old-string="longText.A"
      :new-string="longText.B"
      :context="context"
      :output-format="outputFormat"
      :draw-file-list="drawFileList"
      :render-nothing-when-empty="renderNothingWhenEmpty"
      :diff-style="diffStyle"
    ></vue3-diff>
  </div>
</template>

<script>

import Vue3Diff from "vue3-diff";

export default {
  name: "App",
  components: {
    Vue3Diff,
  },
  data() {
    return {
      longText: {
        A: `内容1`,
        B: `内容2`,
      },
      outputFormat: "line-by-line",
      context: 10,
      diffStyle: "char",
      isShowNoChange: false,
      drawFileList: true,
      renderNothingWhenEmpty: false,
      hideEqual: false,
    };
  },
};
</script>

<style>
#app {
}
</style>
```
---
