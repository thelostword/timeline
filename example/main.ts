/*
 * @Author: thelostword
 * @Date: 2022-11-14 16:54:04
 * @LastEditors: thelostword
 * @LastEditTime: 2022-11-14 16:56:25
 * @FilePath: \timeline\example\main.ts
 */
import MoeTimeline from '../src/main';

const timeline = new MoeTimeline('timeline', {
  fill: false,
  width: 1000,
  height: 60,
  // bgColor: 'rgba(0,0,0,0.5)',
  // textColor: '#000',
  // pointColor: '#000',
  // centerTimePointColor: '#000',
  // centerTimePointWidth: 5,
  scaleSpacing: 7,
  maxZoom: 7,
  minZoom: 2,
  zoom: 2,
  // timeFormat: 'YYYY/MM/DD HH:mm:ss'
});

timeline.draw({
  currentTime: 1651827817,
  areas: [{
    startTime: 1651827433,
    endTime: 1651829413,
    // bgColor: '#00AEEC'
  },{
    startTime: 1651829533,
    endTime: 1651832533,
    // bgColor: '#00AEEC'
  }],
});

// setInterval(() => {
//   timeline.draw()
// }, 1000);

timeline.on('timeUpdate', (e: number) => {
  console.log(e, 'currentTime change');
  const _date = new Date(e * 1000)
  console.log(_date)
})

console.log(timeline);
