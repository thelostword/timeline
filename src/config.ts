import type timeline from './typings';

export const defaultConfig: timeline.InstanceConfigMap = {
  fill: true,
  width: 1000,
  height: 60,
  bgColor: 'rgba(0,0,0,0.5)',
  textColor: '#ffffff',
  scaleColor: '#ffffff',
  scaleSpacing: 7,
  areaBgColor: '#ffffff55',
  pointerColor: '#00aeec',
  pointerWidth: 3,
  pointerDisplayWidth: 100,
  pointerDisplayHeight: 14,
  fps: 60,
  zoom: 3,
  timeSpacingList: [10, 100, 1000, 10000, 60000, 600000, 3600000, 86400000, 604800000],
  // scaleHeight: ,
  // bgTextColor: ,
  // todo formatters
};
