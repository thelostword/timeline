export = timeline;

declare namespace timeline {
  export type ElementType = string | HTMLCanvasElement;

  export type ConfigMap = {
    // 根据父容器自动填充
    fill?: boolean,
    // 宽度
    width?: number,
    // 高度
    height?: number,
    // 背景色
    bgColor?: string,
    // 区域背景色
    areaBgColor?: string,
    // 文字颜色
    textColor?: string,
    // 刻度颜色
    scaleColor?: string,
    // 刻度间距
    scaleSpacing?: number,
    // 当前时间显示背景色
    pointColor?: string,
    // 当前时间显示宽度
    pointWidth?: number,
    // 每秒帧数，Frames Per Second
    fps?: number,
    // 默认焦距
    zoom?: number,
    // 时间间距
    timeSpacingList: number[],
  }
  
  export type DrawAreasType = {
    startTime: number;
    endTime: number;
    bgColor?: string;
  }
  export type DrawType = {
    currentTime?: number;
    areas?: DrawAreasType[];
  }

  export type DragendEventType = 'dragend';
  export type DragendHandler<T = number> = (event: T) => void;

  class TimeLine {
    constructor (el: ElementType, config: ConfigMap);

    /**
     * draw methods.
     * ```
     * new TimeLine(document.querySelector('#Timeline'), {
     * ...
     * })
     * .draw({...})
     * ```
     * Docs: https://github.com/thelostword/timeline#draw
     */
    draw(cfg: DrawType): void;

    /**
     * get time of center point.
     * ```
     * new TimeLine(document.querySelector('#Timeline'), {
     * ...
     * })
     * .getCurrentTime() // => timestamp
     * ```
     * Docs: https://github.com/thelostword/timeline#getCurrentTime
     */
    getCurrentTime(): number;

    /**
     * event listener.
     * ```
     * new TimeLine(document.querySelector('#Timeline'), {
     * ...
     * })
     * .on('dragend', (timestamp) => {
     * ....
     * })
     * ```
     * Docs: https://github.com/thelostword/timeline#on
     */
    on(event: DragendEventType, listener: DragendHandler): void;

    /**
     * event listener.
     * ```
     * new TimeLine(document.querySelector('#Timeline'), {
     * ...
     * })
     * .off('dragend', listener)
     * ```
     * Docs: https://github.com/thelostword/timeline#off
     */
    off(event: DragendEventType, listener: DragendHandler): void;
  }
}
