import type timeline from './typings';

export const defaultConfig: timeline.InstanceConfigMap = {
  fill: true,
  width: 1000,
  height: 60,
  bgColor: 'rgba(0,0,0,0.5)',
  areaBgColor: '#ffffff55',
  textColor: '#ffffff',
  scaleColor: '#ffffff',
  pointColor: '#00aeec',
  pointWidth: 3,
  scaleSpacing: 7,
  fps: 60,
  zoom: 3,
  timeSpacingList: [10, 100, 1000, 10000, 60000, 600000, 3600000, 86400000, 604800000],
};
