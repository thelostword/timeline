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
    pointerColor?: string,
    // 当前时间显示宽度
    pointerWidth?: number,
    // 当前时间显示区域宽度
    pointerDisplayWidth?: number,
    // 当前时间显示区域高度
    pointerDisplayHeight?: number,
    // 每秒帧数，Frames Per Second
    fps?: number,
    // 默认焦距
    zoom?: number,
    // 时间间距
    timeSpacingList?: number[],
    // 背景文字颜色
    bgTextColor?: string,
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

  export class TimeLine {
    constructor (el: ElementType, config?: ConfigMap);

    /**
     * Custom draw methods.
     * ```
     * const timeline = new TimeLine('#Timeline');
     * timeline.draw({
     *  currentTime: 1651827817000,
     *  areas: [{
     *    startTime: 1651827433000,
     *    endTime: 1651829413000,
     *    bgColor: '#f897aa',
     *  }, ...]
     * });
     * ```
     * Docs: https://github.com/thelostword/timeline#Events
     */
    draw(cfg: DrawType): void;

    /**
     * Get the current time.
     * ```
     * const timeline = new TimeLine('#Timeline');
     * timeline.getCurrentTime(); // => timestamp
     * ```
     * Docs: https://github.com/thelostword/timeline#Events
     */
    getCurrentTime(): number;

    /**
     * event listener.
     * ```
     * const timeline = new TimeLine('#Timeline');
     * const listener = (timestamp) => {
     *  // ...
     * }
     * timeline.on('dragend', listener);
     * ```
     * Docs: https://github.com/thelostword/timeline#Events
     */
    on(event: DragendEventType, listener: DragendHandler): void;

    /**
     * event listener.
     * ```
     * const timeline = new TimeLine('#Timeline');
     * const listener = (timestamp) => {
     *  // ...
     * }
     * timeline.on('dragend', listener);
     * timeline.off('dragend', listener);
     * // Cancel all event listeners
     * timeline.off('*');
     * ```
     * Docs: https://github.com/thelostword/timeline#Events
     */
    off(event: DragendEventType, listener: DragendHandler): void;
  }
}

/**
 * date formatter.
 * ```
 * const str = format(Date.now(), 'yyyy-MM-dd HH:mm:ss');
 * console.log(str);
 * ```
 * Docs: https://day.js.org/docs/en/display/format
 */
export declare const format: (date: string | number | Date | null | undefined, fmt?: string) => string;

export default timeline.TimeLine;
