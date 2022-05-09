<!--
 * @Author: losting
 * @Date: 2022-05-07 15:31:25
 * @LastEditTime: 2022-05-09 14:04:08
 * @LastEditors: losting
 * @Description: 
 * @FilePath: \timeline\README.md
-->
# timeline
canvas 时间轴

### 使用
``` shell
npm install @moe/timeline
```
``` html
<canvas id="timeline" width="1000px" height="70px" style="background-color: rgba(0, 0, 0, .5);"></canvas>
```

``` JavaScript
import MoeTimeline from '@moe/timeline';

const timeline = new MoeTimeline('timeline');
timeline.create({
  startTime: 1651823833000,
  endTime: 1651910233000,
  currentTime: 1651829532000,
  area: [{
    startTime: 1651827433000,
    endTime: 1651829413000,
    bgColor: '#00AEEC55'
  },{
    startTime: 1651829533000,
    endTime: 1651832533000,
    bgColor: '#00AEEC55'
  }],
});

timeline.on('change', (time) => {
  console.log('selected time:', time);
})
```

### 方法

| 属性 | 说明 |
| --- | --- |
| create | 创建timeline |
| on | 事件监听，change: 当前选择时间改变触发，返回值当前选择时间 |

##### create方法参数 Object

| 参数 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| startTime | number | 是 | 时间轴起始时间 |
| endTime | number | 是 | 时间轴终止时间 |
| currentTime | number | 是 | 当前所在时间 |
| areas | array | 否 | 阴影区域。参数：startTime(阴影区域开始时间点)， endTime(阴影区域结束时间点)，bgColor(背景颜色，需要透明背景色) |


