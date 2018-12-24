# 效果

![效果图](./vue-number-scroll-demo.gif)

# 源码

[https://github.com/jarjune/vue-number-scroll](https://github.com/jarjune/vue-number-scroll "vue-number-scroll")

# 安装

```node
	npm install --save vue-number-scroll
```

# 引入

```js
	import vns from 'vue-number-scroll'
```

# 使用

```vue
	<vns startNum="0" endNum="99" times="10" speed="50"/>
```

## 参数

|参数名|默认值|备注|
|-|-|-|
|speed|50|跳转的间隔时间(毫秒)|
|times|10|从开始到结束，变换的次数|
|startNum|0|起始数值|
|endNum|0|目标达到的数值|

## 例子

```vue
	排名：<vns startNum="0" endNum="99" speed="80" times="20"/>
    金额：<vns startNum="0" endNum="18299.5" speed="80" times="10"/>
```