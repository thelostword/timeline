import type { IDrawScale } from './typings';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// 时区
// https://day.js.org/docs/en/plugin/timezone
dayjs.extend(utc);
dayjs.extend(timezone);

// 格式化
// https://day.js.org/docs/en/display/format
export const format = (timestamp: number, fmt = 'MM/DD HH:mm Z', timezone?: string) => dayjs(timestamp).tz(timezone).format(fmt);

// 节流函数
export const throttle = (func: Function, delay: number) => {
  let timerId: any;
  let lastExecTime = 0;
  return (...args: unknown[]) => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastExecTime;
    if (!lastExecTime || elapsedTime >= delay) {
      lastExecTime = currentTime;
      func.apply(this, args);
    } else if (!timerId) {
      timerId = setTimeout(() => {
        lastExecTime = currentTime;
        func.apply(this, args);
        timerId = null;
      }, delay - elapsedTime);
    }
  };
}

// 获取双指距离
export const getPinchDistance = (touches: TouchList) => {
  const [touch1, touch2] = [touches[0], touches[1]];
  const dx = touch2.clientX - touch1.clientX;
  const dy = touch2.clientY - touch1.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

// 修改颜色透明度并输出 rgba 格式
export const setAlpha = (color: string, alpha: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const data = ctx.getImageData(0, 0, 1, 1).data;
  return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${alpha})`;
}

// 刻度绘制
export const drawScale: IDrawScale = ({ xCenterPoint, cfg, timePerPixel, timeSpacing, currentTime, $canvas, screenScaleCount, scaleHeight, startTime, drawLine, drawText, drawArea }) => {
  const drawMethods = ({ space, scaleTimeFormat, bgTimeFormat, pointerTimeFormat, timezone }: { space: number, scaleTimeFormat: string, bgTimeFormat: string, pointerTimeFormat: string, timezone?: string }) => {
    // 当前年月日
    drawText({
      x: $canvas.width - xCenterPoint / 10,
      y: 6,
      text: format(currentTime, bgTimeFormat, timezone),
      fontSize: `${$canvas.height - 5}px`,
      align: 'right',
      baseLine: 'top',
      color: cfg.bgTextColor,
    });

    // 刻度
    const timeOffset = startTime % timeSpacing;
    const xOffset = timeOffset / timePerPixel;

    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * cfg.scaleSpacing - xOffset - cfg.pointerWidth / 2;
      const time = startTime + i * timeSpacing - timeOffset;
      if (time % (timeSpacing * space) === 0) {
        drawLine({ x, y: scaleHeight.long });
        drawText({
          x,
          y: $canvas.height - scaleHeight.long - 5,
          text: format(time, scaleTimeFormat, timezone),
          baseLine: 'bottom',
        });
        continue;
      }
      drawLine({ x, y: scaleHeight.short });
    }

    // 当前时间指针
    drawLine({
      x: xCenterPoint - cfg.pointerWidth / 2,
      y: $canvas.height,
      width: cfg.pointerWidth,
      color: cfg.pointerColor,
    });
    drawArea({
      startX: xCenterPoint - cfg.pointerDisplayWidth / 2,
      startY: 4,
      endX: xCenterPoint + cfg.pointerDisplayWidth / 2,
      endY: 4 + cfg.pointerDisplayHeight,
      bgColor: cfg.pointerColor,
    });
    drawText({
      x: xCenterPoint,
      y: cfg.pointerDisplayHeight / 2 + 5,
      text: format(currentTime, pointerTimeFormat, timezone),
      align: 'center',
      baseLine: 'middle',
    });
  }

  // const formatThresholds: number[] = Object.keys(cfg.formats).map(Number).sort((a, b) => a - b);

  const thresholdConfig = cfg.thresholdsConfig[timeSpacing];
  if (thresholdConfig) {
    drawMethods({
      space: thresholdConfig.space,
      scaleTimeFormat: thresholdConfig.scaleTimeFormat,
      bgTimeFormat: thresholdConfig.bgTimeFormat,
      pointerTimeFormat: thresholdConfig.pointerTimeFormat,
      timezone: cfg.timezone
    });
  }

  // formatThresholds.forEach((threshold) => {
  //   if (timeSpacing !== threshold) return;
  //   // const intervals = timeSpacing < 60000 || timeSpacing >= 604800000 || (timeSpacing >= 60000 && timeSpacing < 3600000) ? 10 : 12;
  //   drawMethods({
  //     space: cfg.formats[threshold].space || 10,
  //     scaleTimeFormat: cfg.formats[threshold].scaleTimeFormat,
  //     bgTimeFormat: cfg.formats[threshold].bgTimeFormat,
  //     pointerTimeFormat: cfg.formats[threshold].pointerTimeFormat,
  //   });
  // });

  // if (timeSpacing < 100) drawMethods({ space: 10, scaleTimeFormat: 'mm:ss:SSS', bgTimeFormat: 'YYYY/MM/DD', pointerTimeFormat: 'HH:mm:ss:SSS' });
  // else if (timeSpacing < 1000) drawMethods({ space: 10, scaleTimeFormat: 'mm:ss', bgTimeFormat: 'YYYY/MM/DD', pointerTimeFormat: 'HH:mm:ss:SSS' });
  // else if (timeSpacing < 10000) drawMethods({ space: 10, scaleTimeFormat: 'mm:ss', bgTimeFormat: 'YYYY/MM/DD', pointerTimeFormat: 'HH:mm:ss' });
  // else if (timeSpacing < 60000) drawMethods({ space: 12, scaleTimeFormat: 'HH:mm:ss', bgTimeFormat: 'YYYY/MM/DD', pointerTimeFormat: 'HH:mm:ss' });
  // else if (timeSpacing < 600000) drawMethods({ space: 10, scaleTimeFormat: 'HH:mm:ss', bgTimeFormat: 'YYYY/MM/DD', pointerTimeFormat: 'HH:mm:ss' });
  // else if (timeSpacing < 3600000) drawMethods({ space: 12, scaleTimeFormat: 'MM/DD HH:mm', bgTimeFormat: 'YYYY/MM', pointerTimeFormat: 'MM/DD HH:mm:ss' });
  // else if (timeSpacing < 86400000) drawMethods({ space: 12, scaleTimeFormat: 'MM/DD HH:mm', bgTimeFormat: 'YYYY/MM', pointerTimeFormat: 'YYYY/MM/DD HH:mm' });
  // else if (timeSpacing < 604800000) drawMethods({ space: 10, scaleTimeFormat: 'YYYY/MM/DD', bgTimeFormat: 'YYYY', pointerTimeFormat: 'YYYY/MM/DD' });
  // else drawMethods({ space: 10, scaleTimeFormat: 'YYYY/MM/DD', bgTimeFormat: 'YYYY', pointerTimeFormat: 'YYYY/MM/DD' });
}
