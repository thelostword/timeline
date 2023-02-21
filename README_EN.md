<!--
 * @Author: losting
 * @Date: 2022-05-07 15:31:25
 * @LastEditTime: 2023-02-21 10:27:16
 * @LastEditors: thelostword
 * @Description: 
 * @FilePath: \timeline\README_EN.md
-->
[中文](./README.md) | English
# timeline
Canvas timeline, supports zooming, dragging, and infinite scrolling.
![preview](./example/demo.png)

### Using ES Module
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

### Direct Use
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
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| width | number | N/A | The width of the canvas |
| height | number | N/A | The height of the canvas |
| fill | boolean | false | Whether to fit the parent container width and height. If false, you need to manually set the width and height of the canvas |
| bgColor | string | rgba(0,0,0,0.5) | The background color of the canvas |
| textColor | string | #ffffff | The color of the text |
| scaleColor | string | #ffffff | The color of the scale |
| scaleSpacing | number | 7 | The spacing between scales |
| areaBgColor | string | #ffffff55 | The background color of the shaded area |
| pointColor | string | #00aeec | The color of the current time pointer |
| pointWidth | number | 3 | The width of the current time pointer |
| fps | number | 60 | The number of frames per second |
| zoom | integer | 2 | The initial zoom value, a integer between minZoom and maxZoom (inclusive) |
| maxZoom | integer | 9 | The maximum zoom limit, a integer between 1 and 9 |
| minZoom | integer | 1 | The minimum zoom limit, a integer between 1 and 9 |


### Events

| Method | Description |
| --- | --- |
| draw | Generate the timeline. Return value: N/A |
| on | Event listener. |

#### The draw method
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| currentTime | number | No | The current time. Default value: the current time |
| areas | array | No | Shaded areas |

#### The on method
``` js
timeline.on(eventName, (value) => {
  // ...
});
```
| eventName | value |
| --- | --- |
| timeUpdate | currentTime |


#### areas
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| startTime | number | Yes | The start time of the shaded area |
| endTime | number | Yes | The end time of the shaded area |
| bgColor | string | No | The background color. Default value: #ffffff55 |

