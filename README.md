简体中文 | [English](./README_EN.md)
# Timeline
Canvas 时间轴，支持缩放、拖拽、无限滚动、自定义控制级别
![预览图](./example/demo.png)
[演示地址](https://thelostword.github.io/timeline/)

## 如何使用
### ES Module
``` shell
npm install @losting/timeline
```
``` html
<canvas id="Timeline"></canvas>
```

``` JavaScript
import Timeline from '@losting/timeline';

const timeline = new Timeline('#Timeline', {
  fill: false,
  width: 1000,
  height: 60,
});

// 自定义绘制
timeline.draw({
  currentTime: 1651827817000,
  areas: [{
    startTime: 1651827433000,
    endTime: 1651829413000,
    bgColor: '#f897aa'
  },{
    startTime: 1651829533000,
    endTime: 1651832533000,
  }],
});

timeline.on('dragged', (timestamp) => {
  console.log(new Date(timestamp));
  // ...
})
```

### CDN
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://unpkg.com/@losting/timeline@3.0.0/dist/timeline.iife.js"></script>
</head>
<body>
  <canvas id="Timeline"></canvas>
  <script>
    const timeline = new window['$timeline']('#Timeline');
    // ....
  </script>
</body>
</html>
```

## 配置文档
### Config
| 属性 | 类型 | 是否必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| fill | boolean | 否 | true | 是否适应父容器宽高，若为false则需要手动设定canvas宽高 |
| width | number | 否 | 1000 | canvas宽度 |
| height | number | 否 | 60 | canvas高度 |
| bgColor | string | 否 | rgba(0,0,0,0.5) | canvas背景色 |
| textColor | string | 否 | #ffffff | 文字颜色 |
| scaleColor | string | 否 | #ffffff | 刻度颜色 |
| scaleSpacing | number | 否 | 7 | 刻度间距 |
| areaBgColor | string | 否 | #ffffff55 | 阴影区域背景颜色 |
| pointColor | string | 否 | #00aeec | 当前时间指针颜色 |
| pointWidth | number | 否 | 3 | 当前时间指针宽度 |
| fps | number | 否 | 60 | 帧数 |
| zoom | integer | 否 | 3 | 初始缩放值，`0` ~ `timeSpacingList.length - 1` 之间(包含)的正整数。 对应 `timeSpacingList` 的索引值 |
| timeSpacingList | number[] | 否 | `[10, 100, 1000, 10000, 60000, 600000, 3600000, 86400000, 604800000]` | 自定义每刻度所占时间（毫秒） |
| scaleHeight | object | 否 | `{ long: this.$canvas.height / 3, short: this.$canvas.height / 10 }` | 刻度高度，如果设置此项，则long、short必填 |
| ~~maxZoom~~ | - | - | - | 已移除，设置 `timeSpacingList` 替代 |
| ~~minZoom~~ | - | - | - | 已移除，设置 `timeSpacingList` 替代 |
| ~~timeFormat~~ | - | - | - | 已移除 

### Events

| 事件名 | 说明 | 参数示例 |
| --- | --- | --- |
| draw | timeline 的自定义绘制方法 | draw([DrawConfig](#DrawConfig)) |
| on | 监听 timeline 内部事件，目前只支持事件名 `dragged`， 拖动结束的回调事件。 | on(name, (listener) => void) |
| off | 取消监听 timeline 内部事件 | off(name, listener)、 取消全部 off('*') |
| getCurrentTime | 获取当前时间 | - |


#### DrawConfig
| 参数 | 类型 | 是否必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| currentTime | number | 否 | `Date.now()` | 中心点指向时间戳（毫秒） |
| areas | Object[] | 否 | [] | 阴影区配置，见 [AreaConfig](#AreaConfig) |

##### AreaConfig
| 参数 | 类型 | 是否必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| startTime | number | 是 | - | 阴影区域开始时间戳（毫秒） |
| endTime | number | 是 | - | 阴影区域结束时间戳（毫秒） |
| bgColor | string | 否 | `Config.bgColor` | 当前阴影区背景颜色 |


## 版本升级 v2.X -> v3.X
``` html
<canvas id="Timeline"></canvas>
<script>
  // -------- v2 -----------
  const timeline = new Timeline('Timeline', {
    fill: false,
    width: 1000,
    height: 60,
  });
  timeline.on('timeUpdate', (timestamp) => {
    // ...
  })

  // ---------> v3 --------------
  const timeline = new Timeline('#Timeline', {
    // ...
    // 注意这里时间戳由秒全部变为毫秒
  });
  // OR
  const timeline = new Timeline(document.querySelector('#Timeline'), {
    // ...
  });

  timeline.on('dragged', (timestamp) => {
    // ...
  })

</script>

```
> 其他变更请参考上述文档

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present losting<https://www.github.com/thelostword>
