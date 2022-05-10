/*
 * @Author: losting
 * @Date: 2022-04-01 16:05:12
 * @LastEditTime: 2022-05-10 12:37:40
 * @LastEditors: losting
 * @Description: 
 * @FilePath: \timeline\src\index.ts
 */

type AreaItemType = {
  startTime: number;
  endTime: number;
  bgColor?: string;
}

type DrawType = {
  startTime: number;
  endTime: number;
  currentTime?: number;
  zoom?: number;
  areas?: AreaItemType[];
  _privateFlag?: boolean;
}

type PointHeightType = {
  hour1: number;
  minute30: number;
  minute10: number;
  minute1: number;
  second10: number;
  second5: number;
}

import Event from 'znu-event'
import throttle from 'lodash.throttle'

// import { dateTime } from '@/utils/time';
import { drawHelper } from './draw-helper';

class TimeLine {
  $canvas: HTMLCanvasElement; // canvas 元素
  canvasContext: CanvasRenderingContext2D; // canvas context,

  #event: any;

  private startTime: number; // 时间轴开始时间
  private endTime: number; // 时间轴结束时间
  private currentTime: number; // 当前时间
  private areas?: AreaItemType[]; // 阴影区域

  #timeSpacingMap: number[]; // 5 10 30 60 120 300 取值范围
  #timeSpacing: number; // 5 10 30 60 120 300 取值范围
  spacing: number; // 每timeSpacing所占距离

  // 刻度高度
  #pointHeight: PointHeightType;
  // 当前时间指针宽度
  centerTimePointWidth: number;
  // 当前指针颜色
  centerTimePointColor: string;
  // 文字颜色
  textColor: string;
  // 刻度颜色
  pointColor: string;
  // 阴影区颜色
  areaColor: string;

  // 是否在拖拽中
  #isDraging: boolean;

  constructor(id: string, fill: boolean = false) {
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
      if ($canvasParent) {
        this.$canvas.width = $canvasParent.clientWidth;
        this.$canvas.height = $canvasParent.clientHeight;
        // resize observer
        const parentResizeObserver = new ResizeObserver(throttle(this._onParentResize.bind(this), 200));
        // 监听父元素resize
        parentResizeObserver.observe($canvasParent);
      }
    }
    this.#isDraging = false;
    this.#event = new Event();

    this.startTime = 0;
    this.endTime = 0;
    this.currentTime = 0;

    this.#timeSpacingMap = [5, 10, 30, 60, 120, 300];
    this.#timeSpacing = 30; // 时间间距默认30秒  => 5s  10s  30s  1m  2m  5m
    this.spacing = 5; // 默认刻度间距5px

    // 刻度高度
    this.#pointHeight = {
      hour1: this.$canvas.height / 2, // 1小时刻度高度
      minute30: this.$canvas.height / 3, // 30分钟刻度高度
      minute10: this.$canvas.height / 4, // 10分钟刻度高度
      minute1: this.$canvas.height / 5, // 1分钟刻度高度
      second10: this.$canvas.height / 8, // 10秒刻度高度
      second5: this.$canvas.height / 10, // 5秒刻度高度
    }

    // 当前时间指针宽度
    this.centerTimePointWidth = 3;
    // 当前指针颜色
    this.centerTimePointColor = '#00aeec';
    // 文字颜色
    this.textColor = '#ffffff';
    // 刻度颜色
    this.pointColor = '#ffffff';
    // 阴影区颜色
    this.areaColor = '#ffffff55'
  }

  // 绘制时间轴
  draw({startTime, endTime, currentTime, areas, _privateFlag}: DrawType): void {
    // console.time('draw');
    if (!startTime || !endTime) {
      throw new Error('startTime and endTime is required!');
    }
    // 拖拽中禁止外部调用,防止冲突
    if (this.#isDraging && !_privateFlag) {
      return;
    }
    // 清空画布及事件
    this.clear();
    // 获取参数
    this.startTime = startTime;
    this.endTime = endTime;
    this.currentTime = currentTime || this.startTime;
    this.areas = areas || [];

    // 绘制阴影区域
    this.areas.forEach(item => {
      this.drawArea(item.startTime, item.endTime, item.bgColor);
    });

    // 半屏可绘制的刻度数
    const halfScreenPointCount = Math.ceil(this.$canvas.width / this.spacing / 2);

    // 当前时间之前刻度数量
    const _beforePointCount = Math.ceil((this.currentTime - this.startTime) / this.#timeSpacing);
    // 当时间之后刻度数量
    const _afterPointCount = Math.ceil((this.endTime - this.currentTime) / this.#timeSpacing);

    // 实际需要绘制的数量
    const beforePointCount = _beforePointCount < halfScreenPointCount ? _beforePointCount : halfScreenPointCount;
    const afterPointCount = _afterPointCount < halfScreenPointCount ? _afterPointCount : halfScreenPointCount;
    // 当前时间指针位置
    const centerTimePoint = this.$canvas.width / 2 - this.centerTimePointWidth / 2;

    // x轴位置偏移量
    const xOffset = this.currentTime % this.spacing;
    // 时间偏移量
    const timeOffset = this.currentTime % this.#timeSpacing;

    // 绘制刻度
    drawHelper.bind(this)({
      beforePointCount,
      afterPointCount,
      centerTimePoint,
      xOffset,
      timeOffset,
      timeSpacing: this.#timeSpacing,
      pointHeight: this.#pointHeight,
      spacing: this.spacing,
      currentTime: this.currentTime,
      drawLine: this.drawLine.bind(this),
      drawText: this.drawText.bind(this),
    });

    // 绘制当前时间指针
    this.drawLine(centerTimePoint, this.$canvas.height, this.centerTimePointWidth, this.centerTimePointColor);

    // 鼠标滚轮事件
    this.$canvas.onwheel = this._onZoom.bind(this);
    // 拖拽事件
    this.$canvas.onmousedown = this._onDrag.bind(this);
    // console.timeEnd('draw');
  }

  // 拖拽
  private _onDrag({clientX}) {
    this.#isDraging = true;
    let prexOffset = 0;
    document.onmousemove = throttle((emoveEvent) => {
      const curxOffset = emoveEvent.clientX - clientX;
      if (curxOffset < 0 && this.currentTime >= this.endTime) {
        return;
      }
      if (curxOffset > 0 && this.currentTime <= this.startTime) {
        return;
      }
      const currentTime = this.currentTime - this.#timeSpacing / this.spacing * (curxOffset - prexOffset);
      prexOffset = curxOffset;

      this.draw({
        startTime: this.startTime,
        endTime: this.endTime,
        currentTime: Math.floor(currentTime),
        areas: this.areas,
        _privateFlag: true,
      });
    }, 40); // 24fps
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
        startTime: this.startTime,
        endTime: this.endTime,
        currentTime: this.currentTime,
        areas: this.areas,
        _privateFlag: true,
      });
    } else if (e.deltaY > 0 && currentIndex < this.#timeSpacingMap.length - 1) {
      this.#timeSpacing = this.#timeSpacingMap[currentIndex + 1];
      this.draw({
        startTime: this.startTime,
        endTime: this.endTime,
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
    this.#pointHeight = {
      hour1: this.$canvas.height / 2, // 1小时刻度高度
      minute30: this.$canvas.height / 3, // 30分钟刻度高度
      minute10: this.$canvas.height / 4, // 10分钟刻度高度
      minute1: this.$canvas.height / 5, // 1分钟刻度高度
      second10: this.$canvas.height / 8, // 10秒刻度高度
      second5: this.$canvas.height / 10, // 5秒刻度高度
    }
    this.draw({
      startTime: this.startTime,
      endTime: this.endTime,
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
  private drawLine(x: number, y: number, width: number = 1, color: string = this.pointColor): void {
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
    const centerTimePoint = this.$canvas.width / 2 - this.centerTimePointWidth / 2;
    // x轴位置偏移量
    const xOffset = this.currentTime % this.spacing;

    const startX = (centerTimePoint - xOffset) + Math.floor((startTime - this.currentTime) / this.#timeSpacing) * this.spacing;
    const endX = (centerTimePoint - xOffset) + Math.floor((endTime - this.currentTime) / this.#timeSpacing) * this.spacing;

    this.canvasContext.beginPath();
    this.canvasContext.rect(startX, 0, endX - startX, this.$canvas.height);
    this.canvasContext.fillStyle = bgColor || this.areaColor;
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
