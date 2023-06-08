[简体中文](./README.md) | English
# timeline
Canvas timeline supports zooming, dragging, infinite scrolling, and custom control levels.
![preview](./example/demo.png)
[Demo address](https://thelostword.github.io/timeline/)

## Usage
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

// Custom drawing
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

## Document
### Config
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| fill | boolean | No | false | Whether to fit the parent container width and height. If false, you need to manually set the width and height of the canvas |
| width | number | No | 1000 | The width of the canvas |
| height | number | No | 60 | The height of the canvas |
| bgColor | string | No | rgba(0,0,0,0.5) | The background color of the canvas |
| textColor | string | No | #ffffff | The color of the text |
| scaleColor | string | No | #ffffff | The color of the scale |
| scaleSpacing | number | No | 7 | The spacing between scales |
| areaBgColor | string | No | #ffffff55 | The background color of the shaded area |
| pointColor | string | No | #00aeec | The color of the current time pointer |
| pointWidth | number | No | 3 | The width of the current time pointer |
| fps | number | No | 60 | The number of frames per second |
| zoom | integer | No | 2 | The initial zoom value, a integer between `0` and `timeSpacingList.length - 1` (inclusive),The index value corresponding to `timeSpacingList`. |
| timeSpacingList | number[] | No | [10, 100, 1000, 10000, 60000, 600000, 3600000, 86400000, 604800000] | Customize the time (in milliseconds) occupied by each tick. |
| scaleHeight | object | No | `{ long: this.$canvas.height / 3, short: this.$canvas.height / 10 }` | Scale height. If this option is set, "long" and "short" must be filled in. |
| ~~maxZoom~~ | - | - | No | Removed, use `timeSpacingList` instead. |
| ~~minZoom~~ | - | - | No | Removed, use `timeSpacingList` instead. |
| ~~timeFormat~~ | - | - | No | Removed. |

### Events

| Method | Description | Example |
| --- | --- | --- |
| draw | Generate the timeline. | draw([DrawConfig](#DrawConfig)) |
| on | Listen to internal events of the timeline. Currently, only the event name `dragged` is supported, which is the callback event for the end of dragging. | on(name, (listener) => void) |
| off | Cancel listening to internal events of the timeline. | off(name, listener)、 Cancel all event listeners for the timeline. off('*') |
| getCurrentTime | Get the current time. | - |

#### DrawConfig
| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| currentTime | number | No | | TDate.now() | The center point points to the timestamp in milliseconds. |
| areas | Object[] | No | [] | Shaded areas |

##### AreaConfig
| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| startTime | number | Yes | - | Start timestamp of the shadow area (in milliseconds). |
| endTime | number | Yes | - | End timestamp of the shadow area (in milliseconds). |
| bgColor | string | No | `Config.bgColor` | Background color of the current shadow area. |


## Upgrade v2.X -> v3.X.
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
    // Note that the timestamps here have been changed from seconds to milliseconds.
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
> For other changes, please refer to the above-mentioned documentation.

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present losting<https://www.github.com/thelostword>
