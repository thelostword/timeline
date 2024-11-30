
export type IScaleHeight = {
  long: number;
  medium?: number;
  short: number;
}

export type ICfg = {
  timezone?: string,
  fill: boolean;
  width: number;
  height: number;
  bgColor: string;
  textColor: string;
  fontFamily: string;
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
  scaleHeight?: IScaleHeight;
  bgTextColor?: string;
  thresholdsConfig: {
    [key: number]: {
      scaleTimeFormat: string;
      bgTimeFormat: string;
      pointerTimeFormat: string;
      space: number;
    }
  };
}

export type IAreas = {
  startTime: number;
  endTime: number;
  bgColor?: string;
}
export type IDrawOption = {
  currentTime?: number;
  areas?: IAreas[];
  _privateFlag?: boolean;
}


export type IEmitter = {
  dragged: number;
  zoom: number;
}

type IDrawTextOption = { x: number, y: number, text: string, color?: string, fontSize?: string, align?: CanvasTextAlign, baseLine?: CanvasTextBaseline };
export type IDrawText = (option: IDrawTextOption) => void;

type IDrawAreaOption = { startX: number, startY: number, endX: number, endY: number, bgColor: string };
export type IDrawArea = (option: IDrawAreaOption) => void;

type IDrawLineOption = { x: number, y: number, width?: number, color?: string };
export type IDrawLine = (option: IDrawLineOption) => void;



export type IDrawScaleOption = {
  xCenterPoint: number,
  screenScaleCount: number,
  startTime: number,
  timePerPixel: number,
  scaleHeight: IScaleHeight,
  timeSpacing: number;
  currentTime: number,
  $canvas: HTMLCanvasElement,
  cfg: ICfg,
  drawLine: IDrawLine;
  drawText: IDrawText;
  drawArea: IDrawArea,
}

export type IDrawScale = (option: IDrawScaleOption) => void;
