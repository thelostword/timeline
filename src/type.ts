export type ScaleHeightType = {
  long: number;
  medium?: number;
  short: number;
}

export type ConfigMap = {
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
  timeSpacingList?: number[];
  scaleHeight?: ScaleHeightType;
  bgTextColor?: string;
}
export type InstanceConfigMap = {
  fill?: boolean;
  width?: number;
  height?: number;
  bgColor: string;
  textColor: string;
  scaleColor: string;
  scaleSpacing: number;
  areaBgColor: string;
  pointColor: string;
  pointWidth: number;
  fps: number;
  zoom: number;
  timeSpacingList: number[];
  scaleHeight?: ScaleHeightType;
  bgTextColor?: string;
}

export type AreaItemType = {
  startTime: number;
  endTime: number;
  bgColor?: string;
}
export type AreaType = AreaItemType[];
export type DrawType = {
  currentTime?: number;
  areas?: AreaType;
  _privateFlag?: boolean;
}
export type Draw = (args: DrawType) => void;

export type DrawScaleType = {
  xCenterPoint: number,
  screenScaleCount: number,
  startTime: number,
  timePerPixel: number,
  scaleHeight: ScaleHeightType,
  timeSpacing: number;
  currentTime: number,
  $canvas: HTMLCanvasElement,
  cfg: InstanceConfigMap,
  drawLine: DrawLine;
  drawText: DrawText;
  drawArea: DrawArea,
}
export type DrawScale = (option: DrawScaleType) => void;

export type DrawTextType = {x: number, y: number, text: string, color?: string, fontSize?: string, align?: CanvasTextAlign, baseLine?: CanvasTextBaseline};
export type DrawText = (cfg: DrawTextType) => void;

export type DrawAreaType = {startX: number, startY: number, endX: number, endY: number, bgColor: string};
export type DrawArea = (cfg: DrawAreaType) => void;

export type DrawLineType = {x: number, y: number, width?: number, color?: string};
export type DrawLine = (cfg: DrawLineType) => void;
