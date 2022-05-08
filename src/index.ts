/*
 * @Author: losting
 * @Date: 2022-04-01 16:05:12
 * @LastEditTime: 2022-05-08 13:41:03
 * @LastEditors: losting
 * @Description: 
 * @FilePath: \timeline\src\index.ts
 */

type AreaItemType = {
  startTime: number;
  endTime: number;
  bgColor?: string;
}

type createType = {
  startTime?: number;
  endTime?: number;
  currentTime?: number;
  area?: AreaItemType[];
}

import Event from 'znu-event'

import {
  getTodayStartTime,
  getTodayEndTime,
  dateTime,
} from '@/utils/times';

class MoeTimeLine {
  startTime: number; // 时间轴开始时间
  endTime: number; // 时间轴结束时间
  currentTime: number; // 当前时间
  area?: AreaItemType[]; // 阴影区域
  $canvas: HTMLCanvasElement; // canvas 元素
  canvasContext: CanvasRenderingContext2D; // canvas context
  spacing: number; // 间距
  timeSpacing: number; // 时间间距
  event: any;


  constructor(id: string) {
    console.log('MoeTimeLine');
    if (!id) {
      throw new Error('canvas id is required!');
    }
    this.$canvas = document.getElementById(id) as HTMLCanvasElement;
    this.canvasContext = this.$canvas.getContext('2d') as CanvasRenderingContext2D;

    this.startTime = getTodayStartTime();
    this.endTime = getTodayEndTime();
    this.currentTime = this.startTime;
    this.area = [];
    this.spacing = 5;
    this.timeSpacing = 1000 * 5;

    this.event = new Event();
  }

  // 创建时间轴
  create({startTime, endTime, currentTime, area}: createType) {
    console.time('createTime');
    // 时间范围
    if (startTime && endTime) {
      this.startTime = startTime;
      this.endTime = endTime;
      if (!currentTime) {
        this.currentTime = this.startTime;
        return
      }
      this.currentTime = currentTime;
    }
    
    
    if (area?.length) {
      this.area = area;
    }

    // 清空画布
    this.canvasContext.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

    if (this.area?.length) {
      this.area.forEach(item => {
        this.drawArea(item.startTime, item.endTime, item.bgColor);
      });
    }

    // 刻度高度
    const hour1Height = this.$canvas.height / 2;
    const minute30Height = this.$canvas.height / 3;
    const minute15Height = this.$canvas.height / 4;
    const minute1Height = this.$canvas.height / 6;
    const secondHeight = this.$canvas.height / 10;

    // #00AEEC

    // 刻度高度
    const timeLineCount = (this.endTime - this.startTime) / this.timeSpacing;
    const beforLineCount = (this.currentTime - this.startTime) / this.timeSpacing;
    const afterLineCount = (this.endTime - this.currentTime) / this.timeSpacing;
    const centerPoint = this.$canvas.width / 2 - 1.5;

    for(let i = 0; i < beforLineCount; i++) {
      const xOffset = (this.currentTime % (1000 * 5)) / 1000
      const x = (centerPoint - xOffset) - i * this.spacing;

      const timeOffset = this.startTime % (1000 * 5)
      const time = (this.currentTime - timeOffset) - i * this.timeSpacing;

      if(time % (3600 * 1000) === 0) {
        this.drawLine(x, hour1Height);
        this.drawText(x - 35, hour1Height - 20, `${dateTime(time)}`);
        continue;
      }
      if (time % ((3600 * 1000) / 2) === 0) {
        this.drawLine(x, minute30Height);
        this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      if (time % ((3600 * 1000) / 4) === 0) {
        this.drawLine(x, minute15Height);
        this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      if (time % (1000 * 60) === 0) {
        this.drawLine(x, minute1Height);
        this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      if (time % (1000 * 30) === 0) {
        this.drawLine(x, secondHeight);
        continue;
      }
      if (time % (1000 * 5) === 0) {
        this.drawLine(x, secondHeight);
        continue;
      }
    }

    for(let i = 0; i < afterLineCount; i++) {
      const xOffset = (this.currentTime % (1000 * 5)) / 1000
      const x = (centerPoint - xOffset) + i * this.spacing;

      const timeOffset = this.startTime % (1000 * 5)
      const time = (this.currentTime - timeOffset) + i * this.timeSpacing;

      if(time % (3600 * 1000) === 0) {
        this.drawLine(x, hour1Height);
        this.drawText(x - 35, hour1Height - 20, `${dateTime(time)}`);
        continue;
      }
      if (time % ((3600 * 1000) / 2) === 0) {
        this.drawLine(x, minute30Height);
        this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      if (time % ((3600 * 1000) / 4) === 0) {
        this.drawLine(x, minute15Height);
        this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      if (time % (1000 * 60) === 0) {
        this.drawLine(x, minute1Height);
        this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      if (time % (1000 * 30) === 0) {
        this.drawLine(x, secondHeight);
        continue;
      }
      if (time % (1000 * 5) === 0) {
        this.drawLine(x, secondHeight);
        continue;
      }
    }

    // 绘制当前时间指针
    // this.drawLine(centerPoint, this.$canvas.height, 3, '#00AEEC');
    
    console.timeEnd('createTime');

    // 点击事件
    this.$canvas.addEventListener('click', (e) => {
      const computedStyle = getComputedStyle(this.$canvas);
      
      const paddingTop = parseInt(computedStyle.paddingTop);
      const paddingBottom = parseInt(computedStyle.paddingBottom);
      const paddingLeft = parseInt(computedStyle.paddingLeft);
      const paddingRight = parseInt(computedStyle.paddingRight);

      const x = e.pageX - this.$canvas.getBoundingClientRect().left - paddingLeft;
      const y = e.pageY - this.$canvas.getBoundingClientRect().top - paddingTop;

      this.emit('click', {x, y})
    }, false)

    // 鼠标滚轮事件
    this.$canvas.addEventListener('wheel', (e) => {
      if (e.deltaY > 0) {
        console.log('向上, 缩小')
      } else {
        console.log('向下， 放大')
      }
    }, false)
  }

  // 绘制线条
  drawLine(x: number, y: number, width: number = 1, color: string = '#ffffff'): void {
    // console.log('drawLine');
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
  drawText(x: number, y: number, text: string, color: string = '#ffffff'): void {
    // console.log('drawText');
    this.canvasContext.beginPath();
    this.canvasContext.fillStyle = color;
    this.canvasContext.fillText(text, x, y);
    this.canvasContext.closePath();
  }

  // 绘制区域
  drawArea(startTime: number, endTime: number, bgColor?: string) {
    const startX = (startTime - this.startTime) / (this.endTime - this.startTime) * this.$canvas.width;
    const endX = (endTime - this.startTime) / (this.endTime - this.startTime) * this.$canvas.width;

    this.canvasContext.beginPath();
    this.canvasContext.rect(startX, 0, endX - startX, this.$canvas.height);
    this.canvasContext.fillStyle = bgColor || '#ffffff';
    this.canvasContext.fill();
    this.canvasContext.closePath();
  }

  on(name, listener) {
		this.event.on(name, listener)
	}

  off(name, listener) {
		this.event.off(name, listener)
	}

	emit(...args) {
		this.event.emit(...args)
	}
}


export default MoeTimeLine
