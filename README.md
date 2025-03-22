简体中文 | [English](./README_EN.md)
# Timeline
Canvas 时间轴，支持缩放、拖拽、无限滚动、自定义控制级别
![预览图](./example/demo.png)
<a href="https://thelostword.github.io/timeline/" target="_blank">演示地址</a>

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
  <script src="https://unpkg.com/@losting/timeline@4.0.0/dist/timeline.iife.js"></script>
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
| fontFamily | string | 否 | Arial | 字体 |
| timezone | string | 否 | - | 时间显示的时区。支持 IANA 时区格式（如：'Asia/Shanghai'、'America/New_York'、'Europe/London'）或 UTC 偏移格式（如：'+04:00'、'-08:00'） |
| scaleColor | string | 否 | #ffffff | 刻度颜色 |
| scaleSpacing | number | 否 | 7 | 刻度间距 |
| areaBgColor | string | 否 | #ffffff55 | 阴影区域背景颜色 |
| pointerColor | string | 否 | #00aeec | 当前时间指针颜色 |
| pointerWidth | number | 否 | 3 | 当前时间指针宽度 |
| pointerDisplayWidth | number | 否 | 100 | 当前时间显示区域宽度 |
| pointerDisplayHeight | number | 否 | 14 | 当前时间显示区域高度 |
| fps | number | 否 | 60 | 帧数 |
| zoom | integer | 否 | 3 | 初始缩放值，`0` ~ `timeSpacingList.length - 1` 之间(包含)的正整数。 对应 `timeSpacingList` 的索引值 |
| timeSpacingList | number[] | 否 | `[10, 100, 1000, 10000, 60000, 600000, 3600000, 86400000, 604800000]` | 自定义每刻度所占时间（毫秒） |
| scaleHeight | object | 否 | `{ long: this.$canvas.height / 3, short: this.$canvas.height / 10 }` | 刻度高度，如果设置此项，则long、short必填 |
| bgTextColor | string | 否 | rgba(`textColor`, .18) | 背景文字的颜色 |
| minimumTime | number | 否 | -Infinity | 限制可选范围，允许最小时间 |
| maximumTime | number | 否 | Infinity | 限制可选范围，允许最大时间 |
| thresholdsConfig | Object | 否 | [见默认配置文件](./src/config.ts) | 对应缩放阈值的配置, 当 `timeSpacingList` 配置时，该选项必填 |


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


## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present losting<https://www.github.com/thelostword>
