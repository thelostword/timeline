import type {
  ICfg,
  IScaleHeight,
  IAreas,
  IDrawOption,
  IDrawText,
  IDrawArea,
  IDrawLine,
  IEmitter
} from './typings';
import type { Handler } from 'mitt';
import mitt from 'mitt';
import { throttle, drawScale, setAlpha, format } from './utils';
import { defaultConfig } from './config';

class TimeLine {
  $canvas: HTMLCanvasElement;
  $canvasParent: HTMLElement | undefined;
  ctx: CanvasRenderingContext2D;
  cfg: ICfg;
  #emitter = mitt<IEmitter>();
  #currentTime = 0;
  #areas?: IAreas[];
  #timeSpacing: number;
  #scaleHeight: IScaleHeight;
  #isDragging = false;
  #lastTouchX: number | null = null;

  constructor(el: string | HTMLCanvasElement, cfg?: ICfg) {
    if (!el) throw new Error('canvas Element Or Element ID is required!');
    if (typeof el === 'string') this.$canvas = document.querySelector(el) as HTMLCanvasElement;
    else this.$canvas = el;
    this.ctx = this.$canvas.getContext('2d')!;

    // 获取配置项
    this.cfg = { ...defaultConfig, ...cfg };

    // 兼容
    if (cfg?.pointColor) this.cfg.pointerColor = cfg.pointColor;
    if (cfg?.pointWidth) this.cfg.pointerWidth = cfg.pointWidth;

    const { fill, width, height, zoom, timeSpacingList, scaleHeight, textColor, bgTextColor } = this.cfg;
    if (!bgTextColor) this.cfg.bgTextColor = setAlpha(textColor, .18);

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
      this.$canvas.width = width;
      this.$canvas.height = height;
    }

    this.#timeSpacing = timeSpacingList[zoom];

    // 刻度高度
    if (scaleHeight?.long && scaleHeight?.short) {
      this.#scaleHeight = scaleHeight;
    } else {
      this.#scaleHeight = {
        long: this.$canvas.height / 3,
        medium: this.$canvas.height / 6,
        short: this.$canvas.height / 10,
      };
    }

    this.draw();

    // 鼠标滚轮滚动-缩放
    this.$canvas.addEventListener('wheel', this.#onZoom.bind(this), { passive: false });
    // 拖拽按下-拖拽
    this.$canvas.addEventListener('mousedown', this.#onDrag.bind(this));
    // 触摸事件监听器
    this.$canvas.addEventListener('touchstart', this.#onTouchStart.bind(this), { passive: false });
    this.$canvas.addEventListener('touchmove', this.#onTouchMove.bind(this), { passive: false });
    this.$canvas.addEventListener('touchend', this.#onTouchEnd.bind(this));
  }

  // 绘制时间轴
  draw({ currentTime, areas, _privateFlag }: IDrawOption = {}) {
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
    this.#drawArea({
      startX: 0,
      startY: 0,
      endX: this.$canvas.width,
      endY: this.$canvas.height,
      bgColor: this.cfg.bgColor,
    });

    // 绘制阴影区域
    this.#areas.forEach(item => {
      const startX = item.startTime <= startTime ? 0 : Math.round((item.startTime - startTime) / timePerPixel);
      const endX = item.endTime >= endTime ? this.$canvas.width : Math.round((item.endTime - startTime) / timePerPixel);
      if (startX < this.$canvas.width && endX > 0) {
        this.#drawArea({
          startX,
          startY: 0,
          endX,
          endY: this.$canvas.height,
          bgColor: item.bgColor || this.cfg.areaBgColor,
        });
      }
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
    let prevClientX = downEvent.clientX;
    let currentTime = this.#currentTime;

    // 监听鼠标移动
    const moveListener = throttle(({ clientX }: MouseEvent) => {
      if (!this.#isDragging) return;
      currentTime = Math.round(this.#currentTime - this.#timeSpacing / this.cfg.scaleSpacing * (clientX - prevClientX));
      prevClientX = clientX;
      this.draw({
        currentTime,
        areas: this.#areas,
        _privateFlag: true,
      });
    }, 1000 / this.cfg.fps);

    // 监听是否移动到区域之外
    const outsideListener = (e: MouseEvent) => {
      const rect = this.$canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const AFFECT = 3;
      if (x < AFFECT || x > this.$canvas.width - AFFECT || y < AFFECT || y > this.$canvas.height - AFFECT) {
        this.$canvas.removeEventListener('mousemove', moveListener);
        this.$canvas.removeEventListener('mousemove', outsideListener);
      }
    };

    // 监听鼠标放开
    const mouseupListener = () => {
      this.$canvas.removeEventListener('mousemove', moveListener);
      this.$canvas.removeEventListener('mousemove', outsideListener);
      document.removeEventListener('mouseup', mouseupListener);
      this.#isDragging = false;
      this.#emit('dragged', currentTime);
    };

    this.$canvas.addEventListener('mousemove', moveListener);
    this.$canvas.addEventListener('mousemove', outsideListener);
    document.addEventListener('mouseup', mouseupListener);
  }

  // 触摸事件监听器
  #onTouchStart(e: TouchEvent) {
    e.preventDefault();
    this.#isDragging = true;
    this.#lastTouchX = e.touches[0].clientX;
  }

  #onTouchMove(e: TouchEvent) {
    e.preventDefault();
    if (!this.#isDragging || this.#lastTouchX === null) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - this.#lastTouchX;
    const currentTime = Math.round(this.#currentTime - this.#timeSpacing / this.cfg.scaleSpacing * deltaX);

    this.#lastTouchX = touch.clientX;

    this.draw({
      currentTime,
      areas: this.#areas,
      _privateFlag: true,
    });
  }

  #onTouchEnd() {
    if (!this.#isDragging) return;
    this.#isDragging = false;
    this.#lastTouchX = null;
    this.#emit('dragged', this.#currentTime);
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
        long: this.$canvas.height / 3,
        medium: this.$canvas.height / 6,
        short: this.$canvas.height / 10,
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
  #drawLine: IDrawLine = ({ x, y, width = 1, color = this.cfg.scaleColor }) => {
    this.ctx.beginPath();
    this.ctx.moveTo(x, this.$canvas.height);
    this.ctx.lineTo(x, this.$canvas.height - y);
    this.ctx.closePath();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.stroke();
  }

  // 绘制文字
  #drawText: IDrawText = ({ x, y, text, color = this.cfg.textColor, fontSize = '11px', align = 'center', baseLine = 'alphabetic' }) => {
    this.ctx.beginPath();
    this.ctx.font = `${fontSize} ${this.cfg.fontFamily}`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseLine;
    this.ctx.fillText(text, x, y);
  };

  // 绘制区域
  #drawArea: IDrawArea = ({ startX, startY, endX, endY, bgColor }) => {
    this.ctx.beginPath();
    this.ctx.rect(startX, startY, endX - startX, endY - startY);
    this.ctx.fillStyle = bgColor;
    this.ctx.fill();
  }

  on<Key extends keyof IEmitter>(type: Key, handler: Handler<IEmitter[Key]>) {
    this.#emitter.on(type, handler);
  }

  off<Key extends keyof IEmitter>(type: Key, handler?: Handler<IEmitter[Key]>) {
    this.#emitter.off(type, handler);
  }

  #emit<Key extends keyof IEmitter>(...args: [Key, IEmitter[Key]]) {
    this.#emitter.emit(...args);
  }
}

export {
  format,
  TimeLine as default
}
