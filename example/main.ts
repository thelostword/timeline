import Timeline from '../src/main';

const timeline = new Timeline('#timeline', {
  fill: false,
  width: 1000,
  height: 60,
  scaleSpacing: 7,
  zoom: 2,
  timeSpacingList: [10, 50, 100, 500, 1000],
  scaleHeight: {
    long: 15,
    short: 5
  }
});

timeline.draw({
  currentTime: 1651827817000,
  areas: [{
    startTime: 1651827433000,
    endTime: 1651829413000,
    // bgColor: '#00AEEC'
  },{
    startTime: 1651829533000,
    endTime: 1651832533000,
    // bgColor: '#00AEEC'
  }],
});

// setInterval(() => {
//   timeline.draw()
// }, 50);

timeline.on('dragend', (e) => {
  const timestamp = new Date(e as number);
  console.log(timestamp);
})

console.log(timeline);
