import type timeline from './typings';
import dayjs from 'dayjs';

// 格式化
// https://day.js.org/docs/en/display/format
export const format = (timestamp: number, fmt = 'MM/DD HH:mm') => dayjs(timestamp).format(fmt);

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
export const drawScale: timeline.DrawScale = ({ xCenterPoint, cfg, timePerPixel, timeSpacing, currentTime, $canvas, screenScaleCount, scaleHeight, startTime, drawLine, drawText, drawArea }) => {
  const drawMethods = ({ space, scaleTimeFormat, bgTimeFormat, pointerTimeFormat }: { space: number, scaleTimeFormat: string, bgTimeFormat: string, pointerTimeFormat: string }) => {
    // 当前年月日
    drawText({
      x: $canvas.width - xCenterPoint / 10,
      y: 6,
      text: format(currentTime, bgTimeFormat),
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
          text: format(time, scaleTimeFormat),
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
      text: format(currentTime, pointerTimeFormat),
      align: 'center',
      baseLine: 'middle',
    });
  }

  if (timeSpacing < 100) drawMethods({ space: 10, scaleTimeFormat: 'mm:ss:SSS', bgTimeFormat: 'YYYY/MM/DD', pointerTimeFormat: 'HH:mm:ss:SSS' });
  else if (timeSpacing < 1000) drawMethods({ space: 10, scaleTimeFormat: 'mm:ss', bgTimeFormat: 'YYYY/MM/DD', pointerTimeFormat: 'HH:mm:ss:SSS' });
  else if (timeSpacing < 10000) drawMethods({ space: 10, scaleTimeFormat: 'mm:ss', bgTimeFormat: 'YYYY/MM/DD', pointerTimeFormat: 'HH:mm:ss' });
  else if (timeSpacing < 60000) drawMethods({ space: 12, scaleTimeFormat: 'HH:mm:ss', bgTimeFormat: 'YYYY/MM/DD', pointerTimeFormat: 'HH:mm:ss' });
  else if (timeSpacing < 600000) drawMethods({ space: 10, scaleTimeFormat: 'HH:mm:ss', bgTimeFormat: 'YYYY/MM/DD', pointerTimeFormat: 'HH:mm:ss' });
  else if (timeSpacing < 3600000) drawMethods({ space: 12, scaleTimeFormat: 'MM/DD HH:mm', bgTimeFormat: 'YYYY/MM', pointerTimeFormat: 'MM/DD HH:mm:ss' });
  else if (timeSpacing < 86400000) drawMethods({ space: 12, scaleTimeFormat: 'MM/DD HH:mm', bgTimeFormat: 'YYYY/MM', pointerTimeFormat: 'YYYY/MM/DD HH:mm' });
  else if (timeSpacing < 604800000) drawMethods({ space: 10, scaleTimeFormat: 'YYYY/MM/DD', bgTimeFormat: 'YYYY', pointerTimeFormat: 'YYYY/MM/DD' });
  else drawMethods({ space: 10, scaleTimeFormat: 'YYYY/MM/DD', bgTimeFormat: 'YYYY', pointerTimeFormat: 'YYYY/MM/DD' });
}
