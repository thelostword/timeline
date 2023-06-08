import type timeline from '../types';
import dayjs from 'dayjs';

// 格式化
// https://day.js.org/docs/en/display/format
export const formatTimestamp = (timestamp: number, format = 'MM/DD HH:mm') => dayjs(timestamp).format(format);

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
export const drawScale: timeline.DrawScale = ({xCenterPoint, cfg, timePerPixel, timeSpacing, currentTime, $canvas, screenScaleCount, scaleHeight, startTime, drawLine, drawText, drawArea }) => {
  const drawMethods = ({ space, scaleFormat, bgFormat, currentFormat }: { space: number, scaleFormat: string, bgFormat: string, currentFormat: string }) => {
    // 当前年月日
    drawText({
      x: $canvas.width - xCenterPoint / 10,
      y: 6,
      text: formatTimestamp(currentTime, bgFormat),
      fontSize: `${$canvas.height - 5}px`,
      align: 'right',
      baseLine: 'top',
      color: cfg.bgTextColor,
    });

    // 刻度
    const timeOffset = startTime % timeSpacing;
    const xOffset = timeOffset / timePerPixel;

    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * cfg.scaleSpacing - xOffset - cfg.pointWidth / 2;
      const time = startTime + i * timeSpacing - timeOffset;
      if (time % (timeSpacing * space) === 0) {
        drawLine({ x, y: scaleHeight.long });
        drawText({
          x,
          y: $canvas.height - scaleHeight.long - 5,
          text: formatTimestamp(time, scaleFormat),
          baseLine: 'bottom',
        });
        continue;
      }
      drawLine({ x, y: scaleHeight.short });
    }

    // 当前时间指针
    drawLine({
      x: xCenterPoint - cfg.pointWidth / 2,
      y: $canvas.height,
      width: cfg.pointWidth,
      color: cfg.pointColor,
    });
    drawArea({
      startX: xCenterPoint - 50,
      startY: 4,
      endX: xCenterPoint + 50,
      endY: 18,
      bgColor: cfg.pointColor,
    });
    drawText({
      x: xCenterPoint,
      y: 6,
      text: formatTimestamp(currentTime, currentFormat),
      align: 'center',
      baseLine: 'top',
    });
  }

  if (timeSpacing < 100) drawMethods({ space: 10, scaleFormat: 'mm:ss:SSS', bgFormat: 'YYYY/MM/DD', currentFormat: 'HH:mm:ss:SSS' });
  else if (timeSpacing < 1000) drawMethods({ space: 10, scaleFormat: 'mm:ss', bgFormat: 'YYYY/MM/DD', currentFormat: 'HH:mm:ss:SSS' });
  else if (timeSpacing < 10000) drawMethods({ space: 10, scaleFormat: 'mm:ss', bgFormat: 'YYYY/MM/DD', currentFormat: 'HH:mm:ss' });
  else if (timeSpacing < 60000) drawMethods({ space: 12, scaleFormat: 'HH:mm:ss', bgFormat: 'YYYY/MM/DD', currentFormat: 'HH:mm:ss' });
  else if (timeSpacing < 600000) drawMethods({ space: 10, scaleFormat: 'HH:mm:ss', bgFormat: 'YYYY/MM/DD', currentFormat: 'HH:mm:ss' });
  else if (timeSpacing < 3600000) drawMethods({ space: 12, scaleFormat: 'MM/DD HH:mm', bgFormat: 'YYYY/MM', currentFormat: 'MM/DD HH:mm:ss' });
  else if (timeSpacing < 86400000) drawMethods({ space: 12, scaleFormat: 'MM/DD HH:mm', bgFormat: 'YYYY/MM', currentFormat: 'YYYY/MM/DD HH:mm' });
  else if (timeSpacing < 604800000) drawMethods({ space: 10, scaleFormat: 'YYYY/MM/DD', bgFormat: 'YYYY', currentFormat: 'YYYY/MM/DD' });
  else drawMethods({ space: 10, scaleFormat: 'YYYY/MM/DD', bgFormat: 'YYYY', currentFormat: 'YYYY/MM/DD' });
}



