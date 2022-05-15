/*
 * @Author: losting
 * @Date: 2022-04-01 16:05:12
 * @LastEditTime: 2022-05-15 16:31:23
 * @LastEditors: losting
 * @Description: 
 * @FilePath: \timeline\src\index.ts
 */

type AreaItemState = {
  startTime: number;
  endTime: number;
  bgColor?: string;
}

type DrawState = {
  currentTime?: number;
  zoom?: number;
  areas?: AreaItemState[];
  _privateFlag?: boolean;
}

type ScaleHeightState = {
  height6: number;
  height5: number;
  height4: number;
  height3: number;
  height2: number;
  height1: number;
}

type TimeLineOptionState = {
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
}

import Event from 'znu-event'
import throttle from 'lodash.throttle'
import { dateTime } from '@/utils/time';


import { drawHelper } from './draw-helper';

class TimeLine {
  $canvas: HTMLCanvasElement; // canvas 元素
  canvasContext: CanvasRenderingContext2D; // canvas context,

  #event: any;

  private currentTime: number; // 当前时间
  private areas?: AreaItemState[]; // 阴影区域

  #timeSpacingMap: number[]; // 5 10 30 60 120 300 取值范围
  #timeSpacing: number; // 5 10 30 60 120 300 取值范围
  scaleSpacing: number; // 刻度间距

  bgColor: string;

  // 刻度高度
  #scaleHeight: ScaleHeightState;
  // 当前时间指针宽度
  pointWidth: number;
  // 当前指针颜色
  pointColor: string;
  // 文字颜色
  textColor: string;
  // 刻度颜色
  scaleColor: string;
  // 阴影区颜色
  areaBgColor: string;

  // 是否在拖拽中
  #isDraging: boolean;

  constructor(id: string, {
    fill = false,
    width,
    height,
    bgColor = 'rgba(0,0,0,0.5)',
    textColor = '#ffffff',
    scaleColor = '#ffffff',
    areaBgColor = '#ffffff55',
    pointColor = '#00aeec',
    pointWidth = 3,
    scaleSpacing = 5,
  }: TimeLineOptionState) {
    if (!id) {
      throw new Error('canvas id is required!');
    }
    this.$canvas = document.getElementById(id) as HTMLCanvasElement;
    this.canvasContext = this.$canvas.getContext('2d') as CanvasRenderingContext2D;
    // 使用父元素宽高
    if (fill) {
      // 获取父元素
      const $canvasParent = this.$canvas.parentElement as HTMLElement;
      // 将canvas 宽高设为父元素宽高
      this.$canvas.width = $canvasParent.clientWidth;
      this.$canvas.height = $canvasParent.clientHeight;
      // resize observer
      const parentResizeObserver = new ResizeObserver(throttle(this._onParentResize.bind(this), 200));
      // 监听父元素resize
      parentResizeObserver.observe($canvasParent);
    } else {
      if (width) this.$canvas.width = width;
      if (height) this.$canvas.height = height;
    }

    this.#isDraging = false;
    this.#event = new Event();

    this.currentTime = 0;

    this.#timeSpacingMap = [1, 10, 30, 60, 120, 300, 7200, 86400, 604800];
    this.#timeSpacing = 1; // 时间间距默认30秒  => 5s  10s  30s  1m  2m  5m
    this.scaleSpacing = scaleSpacing; // 默认刻度间距5px

    // 刻度高度
    this.#scaleHeight = {
      height6: this.$canvas.height / 2, // 1/2高度
      height5: this.$canvas.height / 3, // 1/3高度
      height4: this.$canvas.height / 4, // 1/4高度
      height3: this.$canvas.height / 5, // 1/5高度
      height2: this.$canvas.height / 8, // 1/8高度
      height1: this.$canvas.height / 10, // 1/10高度
    }

    // canvas 背景颜色
    this.bgColor = bgColor;

    // 当前时间指针宽度
    this.pointWidth = pointWidth;
    // 当前指针颜色
    this.pointColor = pointColor;
    // 文字颜色
    this.textColor = textColor;
    // 刻度颜色
    this.scaleColor = scaleColor;
    // 阴影区颜色
    this.areaBgColor = areaBgColor;
  }

  // 绘制时间轴
  draw({currentTime = Math.floor(Date.now() / 1000), areas, _privateFlag}: DrawState): void {
    console.time('draw');
    // 拖拽中禁止外部调用,防止冲突
    if (this.#isDraging && !_privateFlag) {
      return;
    }
    // 获取参数
    this.currentTime = currentTime;
    this.areas = areas || [];

    // 清空画布及事件
    this.clear();
    
    // 填充canvas背景
    this.canvasContext.beginPath();
    this.canvasContext.rect(0, 0, this.$canvas.width, this.$canvas.height);
    this.canvasContext.fillStyle = this.bgColor;
    this.canvasContext.fill();
    this.canvasContext.closePath();

    // 绘制阴影区域
    // this.areas.forEach(item => {
    //   this.drawArea(item.startTime, item.endTime, item.bgColor);
    // });

    // 当前屏可绘制刻度数量
    const screenScaleCount = Math.ceil(this.$canvas.width / this.scaleSpacing);
    // 当前屏显示秒数
    const screenSecondCount = screenScaleCount * this.#timeSpacing;

    // 开始时间
    const startTime = this.currentTime - screenSecondCount / 2;
    // 结束时间
    const endTime = this.currentTime + screenSecondCount / 2;

    // canvas X轴中心点（当前时间指示刻度）
    const xCenterPoint = this.$canvas.width / 2;

    // x轴位置偏移量
    const xOffset = xCenterPoint % this.scaleSpacing;
    // 时间偏移量
    const timeOffset = this.currentTime % this.#timeSpacing;

    // 绘制刻度
    drawHelper.bind(this)({
      scaleHeight: this.#scaleHeight,
      scaleSpacing: this.scaleSpacing,
      timeSpacing: this.#timeSpacing,
      screenScaleCount,
      xOffset,
      startTime,
      timeOffset,
      drawLine: this.drawLine.bind(this),
      drawText: this.drawText.bind(this),
    });

    // 绘制当前时间指针
    
    this.drawLine(xCenterPoint - this.pointWidth / 2, this.$canvas.height, this.pointWidth, this.pointColor);
    this.canvasContext.beginPath();
    this.canvasContext.rect(xCenterPoint - 55, this.$canvas.height / 2 - 10, 110, 20);
    this.canvasContext.fillStyle = this.pointColor;
    this.canvasContext.fill();
    this.canvasContext.closePath();
    this.drawText(xCenterPoint - 50, this.$canvas.height / 2 + 4, `${dateTime(this.currentTime, 'YYYY/MM/DD HH:mm:ss')}`);


    // 鼠标滚轮事件
    this.$canvas.onwheel = this._onZoom.bind(this);
    // 拖拽事件
    this.$canvas.onmousedown = this._onDrag.bind(this);
    console.timeEnd('draw');
  }
  
  // 拖拽
  private _onDrag({clientX}) {
    this.#isDraging = true;
    let prexOffset = 0;
    document.onmousemove = throttle((moveEvent) => {
      const curxOffset = moveEvent.clientX - clientX;
      const currentTime = this.currentTime - this.#timeSpacing / this.scaleSpacing * (curxOffset - prexOffset);

      prexOffset = curxOffset;

      this.draw({
        currentTime: Math.round(currentTime),
        areas: this.areas,
        _privateFlag: true,
      });
    }, 35); // 28fps
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      this.#isDraging = false;
      this.emit('timeUpdate', this.currentTime);
    };
  }
  // 缩放
  private _onZoom(e) {
    e.preventDefault();
    const currentIndex = this.#timeSpacingMap.findIndex(item => item === this.#timeSpacing);
    if (e.deltaY < 0 && currentIndex > 0) {
      this.#timeSpacing = this.#timeSpacingMap[currentIndex - 1];
      this.draw({
        currentTime: this.currentTime,
        areas: this.areas,
        _privateFlag: true,
      });
    } else if (e.deltaY > 0 && currentIndex < this.#timeSpacingMap.length - 1) {
      this.#timeSpacing = this.#timeSpacingMap[currentIndex + 1];
      this.draw({
        currentTime: this.currentTime,
        areas: this.areas,
        _privateFlag: true,
      });
    }
  }

  // 父元素size变化
  private _onParentResize() {
    const $canvasParent = this.$canvas.parentNode as HTMLElement;
    if (!$canvasParent) {
      return;
    }
    this.$canvas.width = $canvasParent.clientWidth;
    this.$canvas.height = $canvasParent.clientHeight;
    // 刻度高度
    this.#scaleHeight = {
      height6: this.$canvas.height / 2, // 1/2高度
      height5: this.$canvas.height / 3, // 1/3高度
      height4: this.$canvas.height / 4, // 1/4高度
      height3: this.$canvas.height / 5, // 1/5高度
      height2: this.$canvas.height / 8, // 1/8高度
      height1: this.$canvas.height / 10, // 1/10高度
    }
    this.draw({
      currentTime: this.currentTime,
      areas: this.areas,
    });
  }

  // 清空画布
  private clear() {
    if(this.canvasContext) {
      this.canvasContext.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    }
    if (this.$canvas) {
      this.$canvas.onwheel = null;
      this.$canvas.onmousedown = null;
    }
  }

  // 绘制线条
  private drawLine(x: number, y: number, width: number = 1, color: string = this.scaleColor): void {
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(x, this.$canvas.height);
    this.canvasContext.lineTo(x, this.$canvas.height - y);
    this.canvasContext.stroke();
    this.canvasContext.strokeStyle = color;
    this.canvasContext.lineWidth = width;
    this.canvasContext.stroke();
    this.canvasContext.closePath();
  }

  // 绘制文字
  private drawText(x: number, y: number, text: string, color: string = this.textColor): void {
    this.canvasContext.beginPath();
    this.canvasContext.fillStyle = color;
    this.canvasContext.fillText(text, x, y);
    this.canvasContext.closePath();
  }

  // 绘制区域
  private drawArea(startTime: number, endTime: number, bgColor?: string) {
    // 当前时间指针位置
    const centerTimePoint = this.$canvas.width / 2 - this.pointWidth / 2;
    // x轴位置偏移量
    const xOffset = this.currentTime % this.scaleSpacing;

    const startX = (centerTimePoint - xOffset) + Math.floor((startTime - this.currentTime) / this.#timeSpacing) * this.scaleSpacing;
    const endX = (centerTimePoint - xOffset) + Math.floor((endTime - this.currentTime) / this.#timeSpacing) * this.scaleSpacing;

    this.canvasContext.beginPath();
    this.canvasContext.rect(startX, 0, endX - startX, this.$canvas.height);
    this.canvasContext.fillStyle = bgColor || this.areaBgColor;
    this.canvasContext.fill();
    this.canvasContext.closePath();
  }
  
  on(name, listener) {
		this.#event.on(name, listener);
	}

  off(name, listener) {
		this.#event.off(name, listener);
	}

	private emit(...args) {
		this.#event.emit(...args);
	}
}


export default TimeLine
