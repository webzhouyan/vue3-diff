## 🔥 功能列表

vue3-diff，一个简单的vue3文本比对组件


| 功能                                  | 描述                                                              |
| ------------------------------------- | ------------------------------------------------------------------ |
| 对比方式                           | 支持单列对比 和 双列对比                       |
| 隐藏相同行      | 支持隐藏内容相同的行               |
| 对比效果 | 支持精确到单词 和 精确到字符      |
| 小地图 | 左侧的迷你小地图      |
| ...         | 后续功能待优化     |

## 📚 参数列表

| params                                   | 参数值                                                              |
| ------------------------------------- | ------------------------------------------------------------------ |
| longText                            | { A: `老的文本内容`, B: `新的文本内容` }                           |
| topHeight      | 默认值是 100px                     |
| containerHeight | 默认值 50vh       |
| ...         | 后续功能待优化     |

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
      :longText="longText"
      topHeight="100px"
      containerHeight="500px"
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
