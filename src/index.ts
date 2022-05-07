/*
 * @Author: losting
 * @Date: 2022-04-01 16:05:12
 * @LastEditTime: 2022-05-07 18:54:59
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
} from '@/utils/times';

class MoeTimeLine {
  startTime: number;
  endTime: number;
  currentTime: number;
  area?: AreaItemType[];
  $canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
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

    const hourHeight = this.$canvas.height / 2;
    const minuteHeight = this.$canvas.height / 3;
    const secondHeight = this.$canvas.height / 5;

    // 时间差
    const timeDiff = (this.endTime - this.startTime) / (1000 * 60);
    // 绘制线条
    for(let i = 0; i < timeDiff; i++) {
      const x = this.$canvas.width / timeDiff * i;
      if(i % 60 === 0) {
        this.drawLine(x, hourHeight);
        continue;
      }
      if (i % 30 === 0) {
        this.drawLine(x, minuteHeight);
        continue;
      }
      if (i % 10 === 0) {
        this.drawLine(x, secondHeight);
        continue;
      }
    }
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
  }

  // 绘制线条
  drawLine(x: number, y: number) {
    // console.log('drawLine');
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(x, this.$canvas.height);
    this.canvasContext.lineTo(x, this.$canvas.height - y);
    this.canvasContext.stroke();
    this.canvasContext.strokeStyle = '#ffffff';
    this.canvasContext.lineWidth = 1;
    this.canvasContext.stroke();
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
