/*
 * @Author: losting
 * @Date: 2022-05-15 14:08:11
 * @LastEditTime: 2022-05-15 14:08:12
 * @LastEditors: losting
 * @Description: 
 * @FilePath: \timeline\src\draw-helper copy.ts
 */
/*
 * @Author: losting
 * @Date: 2022-05-10 11:30:36
 * @LastEditTime: 2022-05-15 13:09:53
 * @LastEditors: losting
 * @Description: 
 * @FilePath: \timeline\src\draw-helper.ts
 */
import { dateTime } from '@/utils/time';

export function drawHelper({
  beforePointCount,
  afterPointCount,
  centerTimePoint,
  xOffset,
  timeOffset,
  timeSpacing,
  scaleHeight,
  scaleSpacing,
  currentTime,
  drawLine,
  drawText
}) {
  // 密度为5s时
  if (timeSpacing === 5) {
    for(let i = 0; i < beforePointCount; i++) {
      const x = centerTimePoint - i * scaleSpacing - xOffset;
      const time = currentTime - i * timeSpacing - timeOffset;
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height6);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 30分钟刻度
      if (time % (60 * 30) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 10分钟刻度
      if (time % (60 * 10) === 0) {
        drawLine(x, scaleHeight.height4);
        drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 1分钟刻度
      if (time % 60 === 0) {
        drawLine(x, scaleHeight.height3);
        drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 5秒刻度
      if (time % 5 === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    for(let i = 0; i < afterPointCount; i++) {
      const x = centerTimePoint + i * scaleSpacing - xOffset;
      const time = currentTime + i * timeSpacing - timeOffset;
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height6);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 30分钟刻度
      if (time % (60 * 30) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 10分钟刻度
      if (time % (60 * 10) === 0) {
        drawLine(x, scaleHeight.height4);
        drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 1分钟刻度
      if (time % 60 === 0) {
        drawLine(x, scaleHeight.height3);
        drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 5秒刻度
      if (time % 5 === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }

  // 密度为10s时
  if (timeSpacing === 10) {
    for(let i = 0; i < beforePointCount; i++) {
      const x = centerTimePoint - i * scaleSpacing - xOffset;
      const time = currentTime - i * timeSpacing - timeOffset;
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height6);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 30分钟刻度
      if (time % (60 * 30) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 10分钟刻度
      if (time % (60 * 10) === 0) {
        drawLine(x, scaleHeight.height4);
        drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 1分钟刻度
      if (time % 60 === 0) {
        drawLine(x, scaleHeight.height3);
        if (time % (60 * 2) === 0) {
          drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        }
        continue;
      }
      // 10秒刻度
      if (time % 10 === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    for(let i = 0; i < afterPointCount; i++) {
      const x = centerTimePoint + i * scaleSpacing - xOffset;
      const time = currentTime + i * timeSpacing - timeOffset;
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height6);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 30分钟刻度
      if (time % (60 * 30) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 10分钟刻度
      if (time % (60 * 10) === 0) {
        drawLine(x, scaleHeight.height4);
        drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 1分钟刻度
      if (time % 60 === 0) {
        drawLine(x, scaleHeight.height3);
        if (time % (60 * 2) === 0) {
          drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        }
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
    for(let i = 0; i < beforePointCount; i++) {
      const x = centerTimePoint - i * scaleSpacing - xOffset;
      const time = currentTime - i * timeSpacing - timeOffset;
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height6);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 30分钟刻度
      if (time % (60 * 30) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 10分钟刻度
      if (time % (60 * 10) === 0) {
        drawLine(x, scaleHeight.height4);
        drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 2分钟刻度
      if (time % (60 * 2) === 0) {
        drawLine(x, scaleHeight.height3);
        continue;
      }
      // 30秒刻度
      if (time % 30 === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    for(let i = 0; i < afterPointCount; i++) {
      const x = centerTimePoint + i * scaleSpacing - xOffset;
      const time = currentTime + i * timeSpacing - timeOffset;
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height6);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 30分钟刻度
      if (time % (60 * 30) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 10分钟刻度
      if (time % (60 * 10) === 0) {
        drawLine(x, scaleHeight.height4);
        drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 2分钟刻度
      if (time % (60 * 2) === 0) {
        drawLine(x, scaleHeight.height3);
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
    for(let i = 0; i < beforePointCount; i++) {
      const x = centerTimePoint - i * scaleSpacing - xOffset;
      const time = currentTime - i * timeSpacing - timeOffset;
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height6);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 30分钟刻度
      if (time % (60 * 30) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 10分钟刻度
      if (time % (60 * 10) === 0) {
        drawLine(x, scaleHeight.height4);
        drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 5分钟刻度
      if (time % (60 * 5) === 0) {
        drawLine(x, scaleHeight.height3);
        continue;
      }
      // 1分钟刻度
      if (time % 60 === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    for(let i = 0; i < afterPointCount; i++) {
      const x = centerTimePoint + i * scaleSpacing - xOffset;
      const time = currentTime + i * timeSpacing - timeOffset;
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height6);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 30分钟刻度
      if (time % (60 * 30) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 10分钟刻度
      if (time % (60 * 10) === 0) {
        drawLine(x, scaleHeight.height4);
        drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 5分钟刻度
      if (time % (60 * 5) === 0) {
        drawLine(x, scaleHeight.height3);
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
    for(let i = 0; i < beforePointCount; i++) {
      const x = centerTimePoint - i * scaleSpacing - xOffset;
      const time = currentTime - i * timeSpacing - timeOffset;
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height6);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
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
    for(let i = 0; i < afterPointCount; i++) {
      const x = centerTimePoint + i * scaleSpacing - xOffset;
      const time = currentTime + i * timeSpacing - timeOffset;
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height6);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
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
    for(let i = 0; i < beforePointCount; i++) {
      const x = centerTimePoint - i * scaleSpacing - xOffset;
      const time = currentTime - i * timeSpacing - timeOffset;
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height6);
        drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 30分钟刻度
      if (time % (60 * 30) === 0) {
        drawLine(x, scaleHeight.height4);
        continue;
      }
      // 10分钟刻度
      if (time % (60 * 10) === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
      // 5分钟刻度
      if (time % (60 * 5) === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    for(let i = 0; i < afterPointCount; i++) {
      const x = centerTimePoint + i * scaleSpacing - xOffset;
      const time = currentTime + i * timeSpacing - timeOffset;
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height6);
        drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 30分钟刻度
      if (time % (60 * 30) === 0) {
        drawLine(x, scaleHeight.height4);
        continue;
      }
      // 10分钟刻度
      if (time % (60 * 10) === 0) {
        drawLine(x, scaleHeight.height1);
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
}
