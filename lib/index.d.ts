declare type AreaItemType = {
    startTime: number;
    endTime: number;
    bgColor?: string;
};
declare type DrawType = {
    startTime: number;
    endTime: number;
    currentTime?: number;
    zoom?: number;
    areas?: AreaItemType[];
    _privateFlag?: boolean;
};
declare type OptionsType = {
    fill?: boolean;
    textColor?: string;
    pointColor?: string;
    areaColor?: string;
    centerTimePointColor?: string;
    centerTimePointWidth?: number;
    spacing?: number;
};
declare class TimeLine {
    #private;
    $canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    private startTime;
    private endTime;
    private currentTime;
    private areas?;
    spacing: number;
    centerTimePointWidth: number;
    centerTimePointColor: string;
    textColor: string;
    pointColor: string;
    areaColor: string;
    constructor(id: string, { fill, textColor, pointColor, areaColor, centerTimePointColor, centerTimePointWidth, spacing, }: OptionsType);
    draw({ startTime, endTime, currentTime, areas, _privateFlag }: DrawType): void;
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
