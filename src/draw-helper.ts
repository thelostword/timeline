/*
 * @Author: losting
 * @Date: 2022-05-10 11:30:36
 * @LastEditTime: 2022-05-17 16:58:20
 * @LastEditors: losting
 * @Description: 
 * @FilePath: \timeline\src\draw-helper.ts
 */
import { dateTime, getWeekStartDate, getWeekEndDate } from '@/utils/time';
import dayjs from 'dayjs';

export function drawHelper({
  pointWidth,
  timePerPixel,
  timeSpacing,
  screenScaleCount,
  scaleSpacing,
  scaleHeight,
  startTime,
  drawLine,
  drawText,
}) {
  // 密度为1s时
  if (timeSpacing === 1) {
    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing + pointWidth / 2;
      const time = Math.ceil(startTime + i * timeSpacing);
      // 10s刻度
      if (time % 10 === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x - 15, 20, `${dateTime(time, 'HH:mm:ss')}`);
        continue;
      }
      // 5s 刻度
      if (time % 5 === 0) {
        drawLine(x, scaleHeight.height3);
        continue;
      }
      // 1秒刻度
      if (time % 1 === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }

  // 密度为10s时
  if (timeSpacing === 10) {
    const timeOffset: number = +dateTime(startTime, 's') % 10;
    const xOffset: number = timeOffset / timePerPixel;

    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset - pointWidth / 2;
      const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
      // 1分钟刻度
      if (time % 60 === 0) {
        drawLine(x, scaleHeight.height4);
        drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 10秒刻度
      if (time % 10 === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }

  // 密度为30s时
  if (timeSpacing === 30) {
    const timeOffset: number = +dateTime(startTime, 's') % 30;
    const xOffset: number = timeOffset / timePerPixel;

    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset - pointWidth / 2;
      const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
      // 5分钟刻度
      if (time % (60 * 5) === 0) {
        drawLine(x, scaleHeight.height4);
        drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 30秒刻度
      if (time % 30 === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }

  // 密度为1min时
  if (timeSpacing === 60) {
    const timeOffset: number = +dateTime(startTime, 's') % 60;
    const xOffset: number = timeOffset / timePerPixel;
    
    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset - pointWidth / 2;
      const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 5分钟刻度
      if (time % (60 * 5) === 0) {
        drawLine(x, scaleHeight.height3);
        if (time % (60 * 10) === 0) {
          drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        }
        continue;
      }
      // 1分钟刻度
      if (time % 60 === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }

  // 密度为2min时
  if (timeSpacing === 120) {
    const timeArr = dateTime(startTime, 'm:s').split(':');
    const timestamp = +timeArr[0] * 60 + +timeArr[1];
    const timeOffset: number = timestamp % 120;
    const xOffset: number = timeOffset / timePerPixel;

    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset - pointWidth / 2;
      const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
      // 30分钟刻度
      if (time % (60 * 30) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 10分钟刻度
      if (time % (60 * 10) === 0) {
        drawLine(x, scaleHeight.height3);
        continue;
      }
      // 2分钟刻度
      if (time % (60 * 2) === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }

  // 密度为5min时
  if (timeSpacing === 300) {
    const timeArr = dateTime(startTime, 'm:s').split(':');
    const timestamp = +timeArr[0] * 60 + +timeArr[1];
    const timeOffset: number = timestamp % 300;
    const xOffset: number = timeOffset / timePerPixel;

    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset - pointWidth / 2;
      const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 30分钟刻度
      if (time % (60 * 30) === 0) {
        drawLine(x, scaleHeight.height3);
        continue;
      }
      // 5分钟刻度
      if (time % (60 * 5) === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }
  // 密度为2h时 3600 * 2
  if (timeSpacing === 7200) {
    const timeArr = dateTime(startTime, 'H:m:s').split(':');
    const timestamp = +timeArr[0] * 3600 + +timeArr[1] * 60 + +timeArr[2];
    const timeOffset: number = timestamp % 7200;
    const xOffset: number = timeOffset / timePerPixel;

    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset - pointWidth / 2;
      const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
      // 每日刻度
      if (time % (3600 * 24) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x - 30, 20, `${dateTime(time, 'MM/DD HH:mm')}`);
        continue;
      }
      // 12小时刻度
      if (time % (3600 * 12) === 0) {
        drawLine(x, scaleHeight.height3);
        continue;
      }
      // 2小时刻度
      if (time % 7200 === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }
  // 密度为24h时 3600 * 24
  if (timeSpacing === 86400) {
    const timeArr = dateTime(startTime, 'H:m:s').split(':');
    const timestamp = +timeArr[0] * 3600 + +timeArr[1] * 60 + +timeArr[2];
    const timeOffset: number = timestamp % 86400;
    const xOffset: number = timeOffset / timePerPixel;

    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset - pointWidth / 2;
      const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
      // 每月1号刻度
      if (dateTime(time, 'D') === '1') {
        drawLine(x, scaleHeight.height5);
        drawText(x - 30, 20, `${dateTime(time, 'YYYY/MM/DD')}`);
        continue;
      }
      // 每日刻度
      if (time % 86400 === 57600) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }
  // 密度为1周时 3600 * 24 * 7
  if (timeSpacing === 604800) {
    const timeOffset = startTime - getWeekStartDate(startTime);
    const xOffset: number = timeOffset / timePerPixel;

    const yearText: boolean[] = new Array(screenScaleCount).fill(false);

    const canDrawYearScale = (index: number): boolean => {
      for (let i = index; i > index - 7; i--) {
        if (yearText[i]) {
          return false;
        }
      }
      return true;
    }

    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset;
      const time = Math.ceil(startTime + i * timeSpacing - timeOffset);

      if (dayjs(time * 1000).month() === 0 && (dayjs(time * 1000).date() > 0 || dayjs(time * 1000).date() <= 31) && canDrawYearScale(i)) {
        yearText[i] = true;
        drawLine(x, scaleHeight.height5);
        drawText(x - 30, 20, `${dateTime(time, 'YYYY/MM/DD')}`);
        continue;
      }
      if (dayjs(time * 1000).day() === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }
}
