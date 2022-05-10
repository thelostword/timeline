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
    #private;
    $canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    $canvasParent?: HTMLElement;
    private startTime;
    private endTime;
    private currentTime;
    private areas?;
    spacing: number;
    centerTimePointWidth: number;
    constructor(id: string, fill?: boolean);
    draw({ startTime, endTime, currentTime, areas }: CreateType): void;
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
