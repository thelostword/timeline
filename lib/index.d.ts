declare type AreaItemState = {
    startTime: number;
    endTime: number;
    bgColor?: string;
};
declare type DrawState = {
    currentTime?: number;
    zoom?: number;
    areas?: AreaItemState[];
    _privateFlag?: boolean;
};
declare type TimeLineOptionState = {
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
};
declare class TimeLine {
    #private;
    $canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    private currentTime;
    private areas?;
    scaleSpacing: number;
    bgColor: string;
    pointWidth: number;
    pointColor: string;
    textColor: string;
    scaleColor: string;
    areaBgColor: string;
    constructor(id: string, { fill, width, height, bgColor, textColor, scaleColor, areaBgColor, pointColor, pointWidth, scaleSpacing, }: TimeLineOptionState);
    draw({ currentTime, areas, _privateFlag }: DrawState): void;
    private _onDrag;
    private _onZoom;
    private _onParentResize;
    private clear;
    private drawLine;
    private drawText;
    private drawArea;
    on(name: any, listener: any): void;
    off(name: any, listener: any): void;
    private emit;
}
export default TimeLine;
