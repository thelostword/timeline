declare type AreaItemType = {
    startTime: number;
    endTime: number;
    bgColor?: string;
};
declare type createType = {
    startTime?: number;
    endTime?: number;
    currentTime?: number;
    area?: AreaItemType[];
};
declare class MoeTimeLine {
    startTime: number;
    endTime: number;
    currentTime: number;
    area?: AreaItemType[];
    $canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    event: any;
    constructor(id: string);
    create({ startTime, endTime, currentTime, area }: createType): void;
    drawLine(x: number, y: number): void;
    drawArea(startTime: number, endTime: number, bgColor?: string): void;
    on(name: any, listener: any): void;
    off(name: any, listener: any): void;
    emit(...args: any[]): void;
}
export default MoeTimeLine;
