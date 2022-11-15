/*
 * @Author: thelostword
 * @Date: 2022-11-14 17:00:52
 * @LastEditors: thelostword
 * @LastEditTime: 2022-11-15 11:25:58
 * @FilePath: \timeline\types\timeline.d.ts
 */
declare type AreaItem = {
    startTime: number;
    endTime: number;
    bgColor?: string;
};

declare type DrawArgs = {
    currentTime?: number;
    zoom?: number;
    areas?: AreaItem[];
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

declare type CallFunction = (params:number) => void;

declare class Timeline {
  constructor(id: string, option?: TimeLineOption);
  draw(option: DrawArgs ): void;
  on(type: 'timeUpdate', call: CallFunction): void;
}

export = Timeline;
