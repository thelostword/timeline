/*
 * @Author: thelostword
 * @Date: 2022-11-14 17:00:52
 * @LastEditors: thelostword
 * @LastEditTime: 2022-11-14 17:00:56
 * @FilePath: \timeline\types\timeline.d.ts
 */
declare type AreaItem = {
    startTime: number;
    endTime: number;
    bgColor?: string;
};
declare type Area = AreaItem[];
declare type DrawArgs = {
    currentTime?: number;
    zoom?: number;
    areas?: Area;
    _privateFlag?: boolean;
};
declare type Draw = (args: DrawArgs) => void;
declare type ScaleHeight = {
    height6: number;
    height5: number;
    height4: number;
    height3: number;
    height2: number;
    height1: number;
};
declare type TimeLineOption = {
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
    maxZoom?: number;
    minZoom?: number;
};

export { Area, AreaItem, Draw, DrawArgs, ScaleHeight, TimeLineOption };
