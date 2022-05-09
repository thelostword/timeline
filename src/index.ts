/*
 * @Author: losting
 * @Date: 2022-04-01 16:05:12
 * @LastEditTime: 2022-05-09 12:20:54
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
  startTime: number;
  endTime: number;
  currentTime: number;
  area?: AreaItemType[];
}

import Event from 'znu-event'
import throttle from 'lodash.throttle'

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
    this.clear();
    if (!startTime || !endTime || !currentTime) {
      return
    }
    // 时间范围
    this.startTime = startTime;
    this.endTime = endTime;
    this.currentTime = currentTime;
    
    
    if (area?.length) {
      this.area = area;
    }

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
    const beforLineCount = Math.floor((this.currentTime - this.startTime) / this.timeSpacing);
    const afterLineCount = Math.floor((this.endTime - this.currentTime) / this.timeSpacing);
    const centerPoint = this.$canvas.width / 2 - 1.5;
    const xOffset = (this.currentTime % (1000 * 5)) / 1000
    const timeOffset = this.currentTime % (1000 * 5)

    for(let i = 0; i < beforLineCount; i++) {
      const x = (centerPoint - xOffset) - i * this.spacing;
      const time = (this.currentTime - timeOffset) - i * this.timeSpacing;

      if(time % (3600 * 1000) === 0) {
        this.drawLine(x, hour1Height);
        this.drawText(x - 35, hour1Height - 20, `${dateTime(time)}`);
        continue;
      }
      if (time % ((3600 * 1000) / 2) === 0) {
        this.drawLine(x, minute30Height);
        if (this.spacing > 0.3) {
          this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
        }
        continue;
      }
      if (time % ((3600 * 1000) / 6) === 0) {
        this.drawLine(x, minute15Height);
        if (this.spacing >= 0.7) {
          this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
        }
        continue;
      }
      if (time % (1000 * 60) === 0) {
        if (this.spacing >= 0.3) {
          this.drawLine(x, time % (1000 * 60 *5) === 0 ? minute15Height : minute1Height);
        }
        if (this.spacing >= 0.6) {
          if (this.spacing >= 2.5) {
            this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
          } else if (time % (1000 * 60 *5) === 0) {
            this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
          }
        }
        continue;
      }
      if (time % (1000 * 30) === 0 && this.spacing >= 0.5) {
        this.drawLine(x, secondHeight);
        continue;
      }
      if (time % (1000 * 5) === 0 && this.spacing >= 2.5) {
        this.drawLine(x, secondHeight);
        continue;
      }
    }

    for(let i = 0; i < afterLineCount; i++) {
      const x = (centerPoint - xOffset) + i * this.spacing;
      const time = (this.currentTime - timeOffset) + i * this.timeSpacing;

      if(time % (3600 * 1000) === 0) {
        this.drawLine(x, hour1Height);
        this.drawText(x - 35, hour1Height - 20, `${dateTime(time)}`);
        continue;
      }
      if (time % ((3600 * 1000) / 2) === 0) {
        this.drawLine(x, minute30Height);
        if (this.spacing > 0.3) {
          this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
        }
        continue;
      }
      if (time % ((3600 * 1000) / 6) === 0) {
        this.drawLine(x, minute15Height);
        if (this.spacing >= 0.7) {
          this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
        }
        continue;
      }
      if (time % (1000 * 60) === 0) {
        if (this.spacing >= 0.3) {
          this.drawLine(x, time % (1000 * 60 *5) === 0 ? minute15Height : minute1Height);
        }
        if (this.spacing >= 0.6) {
          if (this.spacing >= 2.5) {
            this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
          } else if (time % (1000 * 60 *5) === 0) {
            this.drawText(x - 15, hour1Height - 20, `${dateTime(time, 'HH:mm')}`);
          }
        }
        
        continue;
      }
      if (time % (1000 * 30) === 0 && this.spacing >= 0.5) {
        this.drawLine(x, secondHeight);
        continue;
      }
      if (time % (1000 * 5) === 0 && this.spacing >= 2.5) {
        this.drawLine(x, secondHeight);
        continue;
      }
    }

    // 绘制当前时间指针
    this.drawLine(centerPoint, this.$canvas.height, 3, '#00AEEC');
    
    console.timeEnd('createTime');

    // 鼠标滚轮事件
    this.$canvas.onwheel = this._onZoom.bind(this);
    // 拖拽事件
    this.$canvas.onmousedown = this._onDrag.bind(this);
  }

  // 拖拽
  _onDrag(event) {
    event = event || window.event;
    const x = event.clientX
    
    let prexOffset = 0;
    document.onmousemove = throttle((event) => {
      event = event || window.event;
      const curxOffset = event.clientX - x;
      if (curxOffset < 0 && this.currentTime >= this.endTime) {
        return;
      }
      if (curxOffset > 0 && this.currentTime <= this.startTime) {
        return
      }
      const currentTime = this.currentTime - this.timeSpacing / this.spacing * (curxOffset - prexOffset);
      prexOffset = curxOffset;

      this.create({
        startTime: this.startTime,
        endTime: this.endTime,
        currentTime: Math.floor(currentTime),
        area: this.area,
      });
    }, 150)
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      this.emit('change', this.currentTime)
    };
  }
  // 缩放
  _onZoom(e) {
    if (e.deltaY > 0 && this.spacing > 0.2) {
      this.spacing -= 0.05
      this.create({
        startTime: this.startTime,
        endTime: this.endTime,
        currentTime: this.currentTime,
        area: this.area,
      });
    } else if (e.deltaY < 0 && this.spacing < 5) {
      this.spacing += 0.05
      this.create({
        startTime: this.startTime,
        endTime: this.endTime,
        currentTime: this.currentTime,
        area: this.area,
      });
    }
  }

  // 注销/清空画布
  clear() {
    // 清空画布
    if(this.canvasContext) {
      this.canvasContext.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    }
    this.$canvas.onwheel = null;
    this.$canvas.onmousedown = null;
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
    const xOffset = (this.currentTime % (1000 * 5)) / 1000
    const centerPoint = this.$canvas.width / 2 - 1.5;
    const startX = (centerPoint - xOffset) + (Math.floor((startTime - this.currentTime) / this.timeSpacing)) * this.spacing;
    const endX = (centerPoint + xOffset) + (Math.floor((endTime - this.currentTime) / this.timeSpacing)) * this.spacing;

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
