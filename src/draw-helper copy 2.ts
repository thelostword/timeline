/*
 * @Author: losting
 * @Date: 2022-05-16 16:34:16
 * @LastEditTime: 2022-05-16 16:34:18
 * @LastEditors: losting
 * @Description: 
 * @FilePath: \timeline\src\draw-helper copy 2.ts
 */
/*
 * @Author: losting
 * @Date: 2022-05-10 11:30:36
 * @LastEditTime: 2022-05-16 16:30:03
 * @LastEditors: losting
 * @Description: 
 * @FilePath: \timeline\src\draw-helper.ts
 */
import { dateTime } from '@/utils/time';

export function drawHelper({
  timeSpacing,
  screenScaleCount,
  xOffset,
  scaleSpacing,
  scaleHeight,
  startTime,
  timeOffset,
  drawLine,
  drawText,
}) {
  // 密度为1s时
  if (timeSpacing === 1) {
    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset;
      const time = Math.floor(startTime + i * timeSpacing - timeOffset);
      // 10s刻度
      if (time % 10 === 0) {
        drawLine(x, scaleHeight.height4);
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
    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset;
      const time = Math.floor(startTime + i * timeSpacing - timeOffset);
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
    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing + xOffset;
      const time = Math.floor(startTime + i * timeSpacing + timeOffset);
      console.log(x, 'x', time, dateTime(time, 'YYYY/MM/DD HH:mm:ss'))
      // 2分钟刻度
      // if (time % (60 * 5) === 0) {
      //   drawLine(x, scaleHeight.height4);
      //   drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
      //   continue;
      // }
      // // 30秒刻度
      // if (time % 30 === 0) {
      //   drawLine(x, scaleHeight.height1);
      //   continue;
      // }
      drawLine(x, scaleHeight.height1);
    }
    return;
  }

  // 密度为1min时
  if (timeSpacing === 60) {
    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset;
      const time = Math.floor(startTime + i * timeSpacing - timeOffset);
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x - 30, 20, `${dateTime(time)}`);
        continue;
      }
      // 10分钟刻度
      if (time % (60 * 10) === 0) {
        drawLine(x, scaleHeight.height3);
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

  // // 密度为2min时
  // if (timeSpacing === 120) {
  //   for(let i = 0; i < screenScaleCount; i++) {
  //     const x = i * scaleSpacing - xOffset;
  //     const time = Math.floor(startTime + i * timeSpacing - timeOffset);
  //     // 30分钟刻度
  //     if (time % (60 * 30) === 0) {
  //       drawLine(x, scaleHeight.height5);
  //       drawText(x - 30, 20, `${dateTime(time)}`);
  //       continue;
  //     }
  //     // 10分钟刻度
  //     if (time % (60 * 10) === 0) {
  //       drawLine(x, scaleHeight.height3);
  //       continue;
  //     }
  //     // 2分钟刻度
  //     if (time % (60 * 2) === 0) {
  //       drawLine(x, scaleHeight.height1);
  //       continue;
  //     }
  //   }
  //   return;
  // }

  // // 密度为5min时
  // if (timeSpacing === 300) {
  //   for(let i = 0; i < screenScaleCount; i++) {
  //     const x = i * scaleSpacing - xOffset;
  //     const time = Math.floor(startTime + i * timeSpacing - timeOffset);
  //     // 小时刻度
  //     if (time % (60 * 60) === 0) {
  //       drawLine(x, scaleHeight.height5);
  //       drawText(x - 30, 20, `${dateTime(time)}`);
  //       continue;
  //     }
  //     // 30分钟刻度
  //     if (time % (60 * 30) === 0) {
  //       drawLine(x, scaleHeight.height3);
  //       continue;
  //     }
  //     // 5分钟刻度
  //     if (time % (60 * 5) === 0) {
  //       drawLine(x, scaleHeight.height1);
  //       continue;
  //     }
  //   }
  //   return;
  // }
  // // 密度为2h时
  // if (timeSpacing === 7200) {
  //   for(let i = 0; i < screenScaleCount; i++) {
  //     const x = i * scaleSpacing - xOffset;
  //     const time = Math.floor(startTime + i * timeSpacing - timeOffset);
  //     // 日期
  //     if (time % (3600 * 24) === 0) {
  //       drawLine(x, scaleHeight.height5);
  //       drawText(x - 40, 20, `${dateTime(time, 'YYYY/MM/DD HH:mm')}`);
  //       continue;
  //     }
  //     // 12小时刻度
  //     if (time % (3600 * 12) === 0) {
  //       drawLine(x, scaleHeight.height3);
  //       // drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
  //       continue;
  //     }
  //     // 2小时刻度
  //     if (time % (3600 * 2) === 0) {
  //       drawLine(x, scaleHeight.height1);
  //       // drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
  //       continue;
  //     }
  //   }
  //   return;
  // }
  // // 密度为24h时
  // if (timeSpacing === (3600 * 24)) {
  //   for(let i = 0; i < screenScaleCount; i++) {
  //     const x = i * scaleSpacing - xOffset;
  //     const time = Math.floor(startTime + i * timeSpacing - timeOffset);
  //     // 每月1号刻度
  //     if (time % (3600 * 24 * 30) === 0) {
  //       drawLine(x, scaleHeight.height5);
  //       drawText(x - 30, 20, `${dateTime(time, 'YYYY/MM/DD')}`);
  //       continue;
  //     }
  //     // 每日刻度
  //     if (time % (3600 * 24) === 0) {
  //       drawLine(x, scaleHeight.height1);
  //       continue;
  //     }
  //   }
  //   return;
  // }
  // // 密度为1周时
  // if (timeSpacing === (3600 * 24 * 7)) {
  //   for(let i = 0; i < screenScaleCount; i++) {
  //     const x = i * scaleSpacing - xOffset;
  //     const time = Math.floor(startTime + i * timeSpacing - timeOffset);
  //     // 每月1号刻度
  //     if (time % (3600 * 24 * 7 * 56) === 0) {
  //       drawLine(x, scaleHeight.height5);
  //       drawText(x - 30, 20, `${dateTime(time, 'YYYY/MM/DD')}`);
  //       continue;
  //     }
  //     // 每日刻度
  //     if (time % (3600 * 24 * 7) === 0) {
  //       drawLine(x, scaleHeight.height1);
  //       continue;
  //     }
  //   }
  //   return;
  // }
}
