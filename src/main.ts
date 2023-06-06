import type {
  AreaType,
  DrawType,
  ScaleHeightType,
  ConfigMap,
  InstanceConfigMap,
  DrawTextType,
  DrawAreaType,
  DrawLineType,
} from './type';
import type { EventType, Handler } from 'mitt';
import mitt from 'mitt';
import { throttle, drawScale } from './utils';
import { defaultConfig } from './config';


class TimeLine {
  $canvas: HTMLCanvasElement; // canvas 元素
  ctx: CanvasRenderingContext2D; // canvas context,
  $canvasParent: HTMLElement | undefined;

  cfg: InstanceConfigMap;
  #emitter = mitt();

  #currentTime = 0; // 当前时间
  #areas?: AreaType; // 阴影区域

  #timeSpacing: number;

  // 刻度高度
  #scaleHeight: ScaleHeightType;
  // 是否在拖拽中
  #isDragging = false;

  constructor(el: string, cfg?: ConfigMap) {
    // ----------- 检查el参数 -----------
    if (!el) throw new Error('canvas Element Or Element ID is required!');
    if (typeof el === 'string') this.$canvas = document.querySelector(el) as HTMLCanvasElement;
    else this.$canvas = el;
    if (!(this.$canvas instanceof HTMLCanvasElement)) throw new Error('element must be canvas!');
    this.ctx = this.$canvas.getContext('2d')!;

    // 获取配置项
    this.cfg = { ...defaultConfig, ...cfg };
    const { fill, width, height, zoom, timeSpacingList, scaleHeight } = this.cfg;

    // 检查zoom参数是否合法
    if (zoom < 0 || zoom >= timeSpacingList.length || zoom % 1 !== 0) {
      throw new Error(`zoom must be 0 ~ ${timeSpacingList.length - 1}, and must be an integer`);
    }
    
    // 是否填充到父元素
    if (fill) {
      // 获取父元素
      const $canvasParent = this.$canvas.parentElement as HTMLElement;
      this.$canvasParent = $canvasParent;
      // 将canvas 宽高设为父元素宽高
      this.$canvas.width = $canvasParent.clientWidth;
      this.$canvas.height = $canvasParent.clientHeight;
      // resize observer
      const resizeObserver = new ResizeObserver(throttle(this.#onParentResize.bind(this), 200));
      resizeObserver.observe($canvasParent);
    } else {
      if (width) this.$canvas.width = width;
      if (height) this.$canvas.height = height;
    }
    
    this.#timeSpacing = timeSpacingList[zoom];
    
    // 刻度高度
    if (scaleHeight?.long && scaleHeight?.short) {
      this.#scaleHeight = scaleHeight;
    } else {
      this.#scaleHeight = {
        long: this.$canvas.height / 3, // 1/3高度
        medium: this.$canvas.height / 6, // 1/6高度
        short: this.$canvas.height / 10, // 1/10高度
      };
    }
    
    // 鼠标滚轮滚动-缩放
    this.$canvas.addEventListener('wheel', this.#onZoom.bind(this), { passive: false });
    // 拖拽按下-拖拽
    this.$canvas.addEventListener('mousedown', this.#onDrag.bind(this));
  }

  // 绘制时间轴
  draw ({currentTime, areas, _privateFlag}: DrawType = {}) {
    // console.time('draw');
    // 拖拽中禁止外部调用,防止冲突
    if (this.#isDragging && !_privateFlag) return;
    
    // 获取参数
    this.#currentTime = currentTime || Date.now();
    this.#areas = areas || [];

    // 当前屏可绘制刻度数量
    const screenScaleCount = Math.ceil(this.$canvas.width / this.cfg.scaleSpacing);
    // 当前屏显示毫秒数
    const screenMillisecondCount = screenScaleCount * this.#timeSpacing;

    // 开始时间
    const startTime = this.#currentTime - screenMillisecondCount / 2;
    // 结束时间
    const endTime = this.#currentTime + screenMillisecondCount / 2;

    // canvas X轴中心点（当前时间指示刻度）
    const xCenterPoint = this.$canvas.width / 2;

    // 每1px所占时间单位（毫秒）
    const timePerPixel = screenMillisecondCount / this.$canvas.width;

    // 清空画布
    this.#clear();

    // 填充背景
    // this.#drawArea(0, 0, this.$canvas.width, this.$canvas.height, this.cfg.bgColor);
    this.#drawArea({
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor,
    });

    // 绘制阴影区域
    this.#areas.forEach(item => {
      const startX = item.startTime < startTime ? 0 : Math.floor((item.startTime - startTime) / timePerPixel);
      const endX = item.endTime > endTime ? this.$canvas.width : Math.floor((item.endTime - startTime) / timePerPixel);
      this.#drawArea({
        startX,
        startY: 0,
        endX,
        endY: this.$canvas.height,
        bgColor: item.bgColor || this.cfg.areaBgColor,
      });
    });

    // 绘制时间/刻度
    drawScale.bind(this)({
      xCenterPoint,
      screenScaleCount,
      startTime,
      timePerPixel,
      scaleHeight: this.#scaleHeight,
      timeSpacing: this.#timeSpacing,
      currentTime: this.#currentTime,
      $canvas: this.$canvas,
      cfg: this.cfg,
      drawLine: this.#drawLine.bind(this),
      drawText: this.#drawText.bind(this),
      drawArea: this.#drawArea.bind(this),
    });
    
    // 绘制比例尺
    this.#drawTimelineScale();
    // console.timeEnd('draw');
  }

  // 获取当前时间
  getCurrentTime() {
    return this.#currentTime;
  }
  
  // 拖拽
  #onDrag(downEvent: MouseEvent) {
    this.#isDragging = true;
    let preXOffset = 0;

    // 监听鼠标移动
    const moveListener = throttle(({ offsetX }: MouseEvent) => {
      const curXOffset = offsetX - downEvent.offsetX;
      const currentTime = this.#currentTime - this.#timeSpacing / this.cfg.scaleSpacing * (curXOffset - preXOffset);
      preXOffset = curXOffset;
      this.draw({
        currentTime: Math.round(currentTime),
        areas: this.#areas,
        _privateFlag: true,
      });
    }, 1000 / this.cfg.fps);

    // 监听是否移动到区域之外
    const outsideListener = ({offsetX, offsetY}: MouseEvent) => {
      const AFFECT = 3;
      if (offsetX < AFFECT || offsetX > this.$canvas.width - AFFECT || offsetY < AFFECT || offsetY > this.$canvas.height - AFFECT) {
        this.$canvas.removeEventListener('mousemove', moveListener);
        this.$canvas.removeEventListener('mousemove', outsideListener);
        this.#isDragging = false;
        this.#emit('dragend', this.#currentTime);
      }
    };

    // 监听鼠标放开
    const mouseupListener = () => {
      this.$canvas.removeEventListener('mousemove', moveListener);
      this.$canvas.removeEventListener('mousemove', outsideListener);
      this.#isDragging = false;
      this.#emit('dragend', this.#currentTime);
      document.removeEventListener('mouseup', mouseupListener);
    };
    
    this.$canvas.addEventListener('mousemove', moveListener);
    this.$canvas.addEventListener('mousemove', outsideListener);
    document.addEventListener('mouseup', mouseupListener);
  }

  // 缩放
  #onZoom(e: WheelEvent) {
    e.preventDefault();
    const currentIndex = this.cfg.timeSpacingList.findIndex(item => item === this.#timeSpacing);
    if (e.deltaY < 0 && currentIndex > 0) {
      this.#timeSpacing = this.cfg.timeSpacingList[currentIndex - 1];
      this.draw({
        currentTime: this.#currentTime,
        areas: this.#areas,
        _privateFlag: true,
      });
    } else if (e.deltaY > 0 && currentIndex < this.cfg.timeSpacingList.length - 1) {
      this.#timeSpacing = this.cfg.timeSpacingList[currentIndex + 1];
      this.draw({
        currentTime: this.#currentTime,
        areas: this.#areas,
        _privateFlag: true,
      });
    }
  }

  // 父元素size变化
  #onParentResize() {
    if (!this.$canvasParent) return;
    this.$canvas.width = this.$canvasParent.clientWidth;
    this.$canvas.height = this.$canvasParent.clientHeight;
    // 刻度高度
    if (!this.cfg.scaleHeight) {
      this.#scaleHeight = {
        long: this.$canvas.height / 3, // 1/3高度
        medium: this.$canvas.height / 6, // 1/6高度
        short: this.$canvas.height / 10, // 1/10高度
      }
    }
    this.draw({
      currentTime: this.#currentTime,
      areas: this.#areas,
    });
  }

  // 清空画布
  #clear() {
    this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
  }
  
  // 绘制比例尺
  #drawTimelineScale() {
    const genPixelText = () => {
      if (this.#timeSpacing < 1000) return `${this.#timeSpacing}ms`;
      if (this.#timeSpacing < 60000) return `${Math.round(this.#timeSpacing / 100) / 10}sec`;
      if (this.#timeSpacing < 3600000) return `${Math.round(this.#timeSpacing / 100 / 60) / 10}min`;
      if (this.#timeSpacing < 86400000) return `${Math.round(this.#timeSpacing / 100 / 60 / 60) / 10}hours`;
      if (this.#timeSpacing < 604800000) return `${Math.round(this.#timeSpacing / 100 / 60 / 60 / 24) / 10}days`;
      return `${Math.round(this.#timeSpacing / 100 / 60 / 60 / 24 / 7) / 10}weeks`;
    };
    this.#drawText({
      x: this.cfg.scaleSpacing + 12,
      y: 9,
      text: genPixelText(),
      align: 'left',
      baseLine: 'middle',
    });

    this.ctx.beginPath();
    this.ctx.moveTo(5, 6);
    this.ctx.lineTo(5, 10);
    this.ctx.lineTo(this.cfg.scaleSpacing + 6, 10);
    this.ctx.lineTo(this.cfg.scaleSpacing + 6, 6);
    this.ctx.strokeStyle = this.cfg.scaleColor;
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();
  }

  // 绘制线条
  #drawLine({ x, y, width = 1, color= this.cfg.scaleColor }: DrawLineType) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, this.$canvas.height);
    this.ctx.lineTo(x, this.$canvas.height - y);
    this.ctx.closePath();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.stroke();
  }

  // 绘制文字
  #drawText ({ x, y, text, color = this.cfg.textColor, fontSize = '11px', align = 'center', baseLine ='alphabetic' }: DrawTextType) {
    this.ctx.beginPath();
    this.ctx.font = `${fontSize} Arial`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseLine;
    this.ctx.fillText(text, x, y);
  };

  // 绘制区域
  #drawArea({ startX, startY, endX, endY, bgColor }: DrawAreaType) {
    this.ctx.beginPath();
    this.ctx.rect(startX, startY, endX - startX, endY - startY);
    this.ctx.fillStyle = bgColor;
    this.ctx.fill();
  }
  
  on(name: 'dragend', listener: Handler) {
		this.#emitter.on(name, listener);
	}

  off(name: 'dragend', listener: Handler) {
		this.#emitter.off(name, listener);
	}

	#emit(...args: [EventType, unknown]) {
		this.#emitter.emit(...args);
	}
}


export default TimeLine
