/*
 * @Author: thelostword
 * @Date: 2022-09-06 10:43:38
 * @LastEditors: thelostword
 * @LastEditTime: 2022-09-06 11:34:35
 * @FilePath: \timeline\src\types\index.ts
 */
export type AreaItem = {
  startTime: number;
  endTime: number;
  bgColor?: string;
}
export type Area = AreaItem[];


export type DrawArgs = {
  currentTime?: number;
  zoom?: number;
  areas?: Area;
  _privateFlag?: boolean;
}

export type Draw = (args: DrawArgs) => void;

export type ScaleHeight = {
  height6: number;
  height5: number;
  height4: number;
  height3: number;
  height2: number;
  height1: number;
}

export type TimeLineOption = {
  fill?: boolean;
  width?: number;
  height?: number;
  bgColor?: string;
  textColor?: string;
  scaleColor?: string;
  scaleSpacing?: number;
  areaBgColor?: string;
  pointColor?: string;
  pointWidth?: number;
  fps?: number;
  zoom?: number;
  maxZoom?: number,
  minZoom?: number,
}
