<!--
 * @Author: losting
 * @Date: 2022-05-07 15:31:25
 * @LastEditTime: 2022-11-14 17:51:32
 * @LastEditors: thelostword
 * @Description: 
 * @FilePath: \timeline\README.md
-->
# timeline
canvas 时间轴，支持缩放、拖拽、无限滚动
![preview](./example/demo.png)

### 使用 es module
``` shell
npm install @losting/timeline
```
``` html
<div id="root" style="width: 100%;height: 70px;">
  <canvas id="timeline"></canvas>
</div>
```

``` JavaScript
import Timeline from '@losting/timeline';

// new Timeline(canvasId, options)
const timeline = new Timeline('timeline', {
  fill: true,
});

timeline.draw({
  currentTime: 1651829532,
  areas: [{
    startTime: 1651827433,
    endTime: 1651829413,
    // bgColor: '#00AEEC55'
  },{
    startTime: 1651829533,
    endTime: 1651832533,
    // bgColor: '#00AEEC55'
  }],
});

timeline.on('timeUpdate', (time) => {
  console.log('selected time:', time);
})
```

### 直接使用
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="./dist/timeline.iife.js"></script>
</head>
<body>
  <div id="root" style="width: 100%;height: 70px;">
    <canvas id="timeline"></canvas>
  </div>
  <script>
    const timeline = new window['$timeline']('timeline', {
      fill: true,
    });
    // ....
  </script>
</body>
</html>
```

### TimeLine options
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| width | number | 无 | canvas宽度 |
| height | number | 无 | canvas高度 |
| fill | boolean | false | 是否适应父容器宽高,若为false则需要手动设定canvas宽高 |
| bgColor | string | rgba(0,0,0,0.5) | canvas背景色 |
| textColor | string | #ffffff | 文字颜色 |
| scaleColor | string | #ffffff | 刻度颜色 |
| scaleSpacing | number | 7 | 刻度间距 |
| areaBgColor | string | #ffffff55 | 阴影区域背景颜色 |
| pointColor | string | #00aeec | 当前时间指针颜色 |
| pointWidth | number | 3 | 当前时间指针宽度 |
| fps | number | 60 | 帧数 |
| zoom | number | 2 | 初始缩放值，`minZoom` ~ `maxZoom` 之间(包含)的正整数 |
| maxZoom | number | 9 | 最大缩放限制，1~9之间的正整数 |
| minZoom | number | 1 | 最小缩放限制，1~9之间的正整数 |


### 事件

| 方法名 | 说明 |
| --- | --- |
| draw | 生成时间轴，返回值：无 |
| on | 事件监听。 |

#### draw方法
| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| currentTime | number | 否 | 当前所在时间，默认为当前时间 |
| areas | array | 否 | 阴影区域 |

#### on 方法
``` js
timeline.on(eventName, (value) => {
  // ...
});
```
| eventName | value |
| --- | --- |
| timeUpdate | currentTime |


#### areas
| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| startTime | number | 是 | 阴影区域开始时间 |
| endTime | number | 是 | 阴影区域结束时间点 |
| bgColor | string | 否 | 背景颜色, 默认值：#ffffff55 |

