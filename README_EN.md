[简体中文](./README.md) | English
# timeline
Canvas timeline supports zooming, dragging, infinite scrolling, and custom control levels.
![preview](./example/demo.png)
<a href="https://thelostword.github.io/timeline/" target="_blank">Demo address</a>

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

## Document
### Config
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| fill | boolean | No | false | Whether to fit the parent container width and height. If false, you need to manually set the width and height of the canvas |
| width | number | No | 1000 | The width of the canvas |
| height | number | No | 60 | The height of the canvas |
| bgColor | string | No | rgba(0,0,0,0.5) | The background color of the canvas |
| textColor | string | No | #ffffff | The color of the text |
| fontFamily | string | No | Arial | The font family |
| timezone | string | No | - | The timezone to display times in. Accepts both IANA timezone format (e.g., 'America/New_York', 'Europe/London', 'Asia/Tokyo') or UTC offset format (e.g., '+04:00', '-08:00') |
| scaleColor | string | No | #ffffff | The color of the scale |
| scaleSpacing | number | No | 7 | The spacing between scales |
| areaBgColor | string | No | #ffffff55 | The background color of the shaded area |
| pointerColor | string | No | #00aeec | The color of the current time pointer |
| pointerWidth | number | No | 3 | The width of the current time pointer |
| pointerDisplayWidth | number | No | 100 | width of pointer display area |
| pointerDisplayHeight | number | No | 14 | height of pointer display area |
| fps | number | No | 60 | The number of frames per second |
| zoom | integer | No | 2 | The initial zoom value, a integer between `0` and `timeSpacingList.length - 1` (inclusive),The index value corresponding to `timeSpacingList`. |
| timeSpacingList | number[] | No | [10, 100, 1000, 10000, 60000, 600000, 3600000, 86400000, 604800000] | Customize the time (in milliseconds) occupied by each tick. |
| scaleHeight | object | No | `{ long: this.$canvas.height / 3, short: this.$canvas.height / 10 }` | Scale height. If this option is set, "long" and "short" must be filled in. |
| bgTextColor | string | No | rgba(`textColor`, .18) | The color of the text on the background |
| minimumTime | number | No | -Infinity | Minimum selectable time |
| maximumTime | number | No | Infinity | Maximum selectable time |
| thresholdsConfig | Object | 否 | [see: config.js](./src/config.ts) | corresponding scaling threshold configuration, when `timeSpacingList` exists, this option is required. |

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


## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present losting<https://www.github.com/thelostword>
