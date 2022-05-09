declare type AreaItemType = {
    startTime: number;
    endTime: number;
    bgColor?: string;
};
declare type CreateType = {
    startTime: number;
    endTime: number;
    currentTime?: number;
    zoom?: number;
    areas?: AreaItemType[];
};
declare class TimeLine {
    $canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    private event;
    private startTime;
    private endTime;
    private currentTime;
    private areas?;
    private timeSpacingMap;
    private timeSpacing;
    spacing: number;
    private pointHeight;
    centerTimePointWidth: number;
    constructor(id: string, fill?: boolean);
    draw({ startTime, endTime, currentTime, areas }: CreateType): void;
    private _onDrag;
    private _onZoom;
    private clear;
    private drawLine;
    private drawText;
    private drawArea;
    on(name: any, listener: any): void;
    off(name: any, listener: any): void;
    private emit;
}
export default TimeLine;
