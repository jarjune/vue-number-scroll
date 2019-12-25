[![star](https://img.shields.io/github/stars/jarjune/vue-number-scroll.svg?style=social&label=Star)](https://github.com/jarjune/vue-number-scroll/stargazers)
[![fock](https://img.shields.io/github/forks/jarjune/vue-number-scroll.svg?style=social&label=Fork)](https://github.com/jarjune/vue-number-scroll/network/members)

# 效果

![效果图](../images/demo.gif)

# 安装

```bash
npm install --save vue-number-scroll
```

# 引入

```js
import vns from 'vue-number-scroll'
```

# 使用

```vue
<vns :start="0" :end="99" :times="10" :speed="50"/>
```

## 参数说明

|参数名|默认值|备注|
|-|-|-|
|speed|50|跳转的间隔时间|
|times|10|从开始到结束，变换的次数|
|start|0|起始数值|
|end|0|目标达到的数值|

## Demo

```vue
排名：<vns :start="0" :end="99" :speed="80" :times="20" :format="num => '第' + num + '名'"/>
金额：<vns :start="0" :end="18299.5" :speed="80" :times="10" :format="num => num + '元'"/>
```

# 源码

[https://github.com/jarjune/vue-number-scroll](https://github.com/jarjune/vue-number-scroll "vue-number-scroll")
