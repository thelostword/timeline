declare namespace TL {
  export type ElementType = string | HTMLCanvasElement;

  type CommonType = {
    // 时区
    timezone?: string,
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
    // 字体
    fontFamily?: string,
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
    // 背景文字颜色
    bgTextColor?: string,
  }

  export type ConfigMap<T extends number> = (CommonType & {
    timeSpacingList?: undefined,
    thresholdsConfig?: undefined,
  }) | (CommonType & {
    // 时间间距
    timeSpacingList: T[],
    // 其他配置，暂定，配置结构待调整，key必须为 timeSpacingList 中的值
    thresholdsConfig: Record<T, {
      // 刻度时间格式化
      scaleTimeFormat: string,
      // 背景显示时间格式化
      bgTimeFormat: string,
      // 当前时间格式化
      pointerTimeFormat: string,
      // 刻度时间显示间距，间隔的小刻度数量
      space: number,
    }>,
  });

  export type DrawAreasType = {
    startTime: number;
    endTime: number;
    bgColor?: string;
  }
  export type DrawType = {
    currentTime?: number;
    areas?: DrawAreasType[];
  }

  export type DragendEventType = 'dragged';
  export type DragendHandler<T = number> = (event: T) => void;

  export class TimeLine<T extends number> {
    $canvas: HTMLCanvasElement;
    $canvasParent: HTMLElement;
    cfg: ConfigMap<T>;
    ctx: CanvasRenderingContext2D;

    constructor (el: ElementType, config?: ConfigMap<T>);

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


    /**
     * Get the time range of the current Timeline.
     * ```
     * // Example:
     * const timeline = new TimeLine('#Timeline');
     * const timeRange = timeline.getTimeRange(); // output: undefined, because the draw method has not been called yet.
     * ```
     */
    getTimeRange(): [number, number] | undefined;

    /**
     * Get the number of milliseconds per pixel.
     * ```
     * // Example:
     * const timeline = new TimeLine('#Timeline');
     * const msPerPixel = timeline.getMsPerPixel(); // output: undefined, because the draw method has not been called yet.
     * ```
     */
    getMsPerPixel(): number | undefined;
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
export declare const format: (date: string | number | Date | null | undefined, fmt?: string, timezone?: string) => string;

export default TL.TimeLine;
