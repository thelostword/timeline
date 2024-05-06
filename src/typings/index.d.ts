export = timeline;

declare namespace timeline {
  export type ElementType = string | HTMLCanvasElement;

  export type InstanceConfigMap = {
    fill: boolean;
    width: number;
    height: number;
    bgColor: string;
    textColor: string;
    scaleColor: string;
    scaleSpacing: number;
    areaBgColor: string;
    pointerColor: string;
    pointerWidth: number;

    // 弃用属性
    pointColor?: string;
    pointWidth?: number;

    pointerDisplayWidth: number;
    pointerDisplayHeight: number;
    fps: number;
    zoom: number;
    timeSpacingList: number[];
    scaleHeight?: ScaleHeightMap;
    bgTextColor?: string;
  }

  export type ConfigMap = Partial<InstanceConfigMap>;

  export type DrawAreasType = {
    startTime: number;
    endTime: number;
    bgColor?: string;
  }
  export type DrawType = {
    currentTime?: number;
    areas?: DrawAreasType[];
    _privateFlag?: boolean;
  }

  export type ScaleHeightMap = {
    long: number;
    medium?: number;
    short: number;
  }

  export type DrawScaleMap = {
    xCenterPoint: number,
    screenScaleCount: number,
    startTime: number,
    timePerPixel: number,
    scaleHeight: ScaleHeightMap,
    timeSpacing: number;
    currentTime: number,
    $canvas: HTMLCanvasElement,
    cfg: InstanceConfigMap,
    drawLine: DrawLine;
    drawText: DrawText;
    drawArea: DrawArea,
  }
  export type DrawScale = (option: DrawScaleMap) => void;

  export type DrawTextType = {x: number, y: number, text: string, color?: string, fontSize?: string, align?: CanvasTextAlign, baseLine?: CanvasTextBaseline};
  export type DrawText = (cfg: DrawTextType) => void;

  export type DrawAreaType = {startX: number, startY: number, endX: number, endY: number, bgColor: string};
  export type DrawArea = (cfg: DrawAreaType) => void;

  export type DrawLineType = {x: number, y: number, width?: number, color?: string};
  export type DrawLine = (cfg: DrawLineType) => void;

  export type DragendEventType = 'dragend';
  export type DragendHandler<T = number> = (event: T) => void;
}
