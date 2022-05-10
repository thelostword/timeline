/*
 * @Author: losting
 * @Date: 2022-05-10 11:53:49
 * @LastEditTime: 2022-05-10 11:53:50
 * @LastEditors: losting
 * @Description: 
 * @FilePath: \timeline\src\draw-copy.ts
 */
// // 密度为5s时
    // if (this.#timeSpacing === 5) {
    //   for(let i = 0; i < beforePointCount; i++) {
    //     const x = centerTimePoint - i * this.spacing - xOffset;
    //     const time = this.currentTime - i * this.#timeSpacing - timeOffset;
    //     // 小时刻度
    //     if (time % (60 * 60) === 0) {
    //       this.drawLine(x, this.#pointHeight.hour1);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 30分钟刻度
    //     if (time % (60 * 30) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute30);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 10分钟刻度
    //     if (time % (60 * 10) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute10);
    //       this.drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
    //       continue;
    //     }
    //     // 1分钟刻度
    //     if (time % 60 === 0) {
    //       this.drawLine(x, this.#pointHeight.minute1);
    //       this.drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
    //       continue;
    //     }
    //     // 5秒刻度
    //     if (time % 5 === 0) {
    //       this.drawLine(x, this.#pointHeight.second5);
    //       continue;
    //     }
    //   }
    //   for(let i = 0; i < afterPointCount; i++) {
    //     const x = centerTimePoint + i * this.spacing - xOffset;
    //     const time = this.currentTime + i * this.#timeSpacing - timeOffset;
    //     // 小时刻度
    //     if (time % (60 * 60) === 0) {
    //       this.drawLine(x, this.#pointHeight.hour1);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 30分钟刻度
    //     if (time % (60 * 30) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute30);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 10分钟刻度
    //     if (time % (60 * 10) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute10);
    //       this.drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
    //       continue;
    //     }
    //     // 1分钟刻度
    //     if (time % 60 === 0) {
    //       this.drawLine(x, this.#pointHeight.minute1);
    //       this.drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
    //       continue;
    //     }
    //     // 5秒刻度
    //     if (time % 5 === 0) {
    //       this.drawLine(x, this.#pointHeight.second5);
    //       continue;
    //     }
    //   }
    // }

    // // 密度为10s时
    // if (this.#timeSpacing === 10) {
    //   for(let i = 0; i < beforePointCount; i++) {
    //     const x = centerTimePoint - i * this.spacing - xOffset;
    //     const time = this.currentTime - i * this.#timeSpacing - timeOffset;
    //     // 小时刻度
    //     if (time % (60 * 60) === 0) {
    //       this.drawLine(x, this.#pointHeight.hour1);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 30分钟刻度
    //     if (time % (60 * 30) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute30);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 10分钟刻度
    //     if (time % (60 * 10) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute10);
    //       this.drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
    //       continue;
    //     }
    //     // 1分钟刻度
    //     if (time % 60 === 0) {
    //       this.drawLine(x, this.#pointHeight.minute1);
    //       if (time % (60 * 2) === 0) {
    //         this.drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
    //       }
    //       continue;
    //     }
    //     // 10秒刻度
    //     if (time % 10 === 0) {
    //       this.drawLine(x, this.#pointHeight.second5);
    //       continue;
    //     }
    //   }
    //   for(let i = 0; i < afterPointCount; i++) {
    //     const x = centerTimePoint + i * this.spacing - xOffset;
    //     const time = this.currentTime + i * this.#timeSpacing - timeOffset;
    //     // 小时刻度
    //     if (time % (60 * 60) === 0) {
    //       this.drawLine(x, this.#pointHeight.hour1);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 30分钟刻度
    //     if (time % (60 * 30) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute30);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 10分钟刻度
    //     if (time % (60 * 10) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute10);
    //       this.drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
    //       continue;
    //     }
    //     // 1分钟刻度
    //     if (time % 60 === 0) {
    //       this.drawLine(x, this.#pointHeight.minute1);
    //       if (time % (60 * 2) === 0) {
    //         this.drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
    //       }
    //       continue;
    //     }
    //     // 10秒刻度
    //     if (time % 10 === 0) {
    //       this.drawLine(x, this.#pointHeight.second5);
    //       continue;
    //     }
    //   }
    // }

    // // 密度为30s时
    // if (this.#timeSpacing === 30) {
    //   for(let i = 0; i < beforePointCount; i++) {
    //     const x = centerTimePoint - i * this.spacing - xOffset;
    //     const time = this.currentTime - i * this.#timeSpacing - timeOffset;
    //     // 小时刻度
    //     if (time % (60 * 60) === 0) {
    //       this.drawLine(x, this.#pointHeight.hour1);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 30分钟刻度
    //     if (time % (60 * 30) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute30);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 10分钟刻度
    //     if (time % (60 * 10) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute10);
    //       this.drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
    //       continue;
    //     }
    //     // 2分钟刻度
    //     if (time % (60 * 2) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute1);
    //       continue;
    //     }
    //     // 30秒刻度
    //     if (time % 30 === 0) {
    //       this.drawLine(x, this.#pointHeight.second5);
    //       continue;
    //     }
    //   }
    //   for(let i = 0; i < afterPointCount; i++) {
    //     const x = centerTimePoint + i * this.spacing - xOffset;
    //     const time = this.currentTime + i * this.#timeSpacing - timeOffset;
    //     // 小时刻度
    //     if (time % (60 * 60) === 0) {
    //       this.drawLine(x, this.#pointHeight.hour1);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 30分钟刻度
    //     if (time % (60 * 30) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute30);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 10分钟刻度
    //     if (time % (60 * 10) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute10);
    //       this.drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
    //       continue;
    //     }
    //     // 2分钟刻度
    //     if (time % (60 * 2) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute1);
    //       continue;
    //     }
    //     // 30秒刻度
    //     if (time % 30 === 0) {
    //       this.drawLine(x, this.#pointHeight.second5);
    //       continue;
    //     }
    //   }
    // }

    // // 密度为1min时
    // if (this.#timeSpacing === 60) {
    //   for(let i = 0; i < beforePointCount; i++) {
    //     const x = centerTimePoint - i * this.spacing - xOffset;
    //     const time = this.currentTime - i * this.#timeSpacing - timeOffset;
    //     // 小时刻度
    //     if (time % (60 * 60) === 0) {
    //       this.drawLine(x, this.#pointHeight.hour1);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 30分钟刻度
    //     if (time % (60 * 30) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute30);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 10分钟刻度
    //     if (time % (60 * 10) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute10);
    //       this.drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
    //       continue;
    //     }
    //     // 5分钟刻度
    //     if (time % (60 * 5) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute1);
    //       continue;
    //     }
    //     // 1分钟刻度
    //     if (time % 60 === 0) {
    //       this.drawLine(x, this.#pointHeight.second5);
    //       continue;
    //     }
    //   }
    //   for(let i = 0; i < afterPointCount; i++) {
    //     const x = centerTimePoint + i * this.spacing - xOffset;
    //     const time = this.currentTime + i * this.#timeSpacing - timeOffset;
    //     // 小时刻度
    //     if (time % (60 * 60) === 0) {
    //       this.drawLine(x, this.#pointHeight.hour1);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 30分钟刻度
    //     if (time % (60 * 30) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute30);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 10分钟刻度
    //     if (time % (60 * 10) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute10);
    //       this.drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
    //       continue;
    //     }
    //     // 5分钟刻度
    //     if (time % (60 * 5) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute1);
    //       continue;
    //     }
    //     // 1分钟刻度
    //     if (time % 60 === 0) {
    //       this.drawLine(x, this.#pointHeight.second5);
    //       continue;
    //     }
    //   }
    // }

    // // 密度为2min时
    // if (this.#timeSpacing === 120) {
    //   for(let i = 0; i < beforePointCount; i++) {
    //     const x = centerTimePoint - i * this.spacing - xOffset;
    //     const time = this.currentTime - i * this.#timeSpacing - timeOffset;
    //     // 小时刻度
    //     if (time % (60 * 60) === 0) {
    //       this.drawLine(x, this.#pointHeight.hour1);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 30分钟刻度
    //     if (time % (60 * 30) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute30);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 10分钟刻度
    //     if (time % (60 * 10) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute1);
    //       continue;
    //     }
    //     // 2分钟刻度
    //     if (time % (60 * 2) === 0) {
    //       this.drawLine(x, this.#pointHeight.second5);
    //       continue;
    //     }
    //   }
    //   for(let i = 0; i < afterPointCount; i++) {
    //     const x = centerTimePoint + i * this.spacing - xOffset;
    //     const time = this.currentTime + i * this.#timeSpacing - timeOffset;
    //     // 小时刻度
    //     if (time % (60 * 60) === 0) {
    //       this.drawLine(x, this.#pointHeight.hour1);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 30分钟刻度
    //     if (time % (60 * 30) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute30);
    //       this.drawText(x - 30, 20, `${dateTime(time)}`);
    //       continue;
    //     }
    //     // 10分钟刻度
    //     if (time % (60 * 10) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute1);
    //       continue;
    //     }
    //     // 2分钟刻度
    //     if (time % (60 * 2) === 0) {
    //       this.drawLine(x, this.#pointHeight.second5);
    //       continue;
    //     }
    //   }
    // }

    // // 密度为5min时
    // if (this.#timeSpacing === 300) {
    //   for(let i = 0; i < beforePointCount; i++) {
    //     const x = centerTimePoint - i * this.spacing - xOffset;
    //     const time = this.currentTime - i * this.#timeSpacing - timeOffset;
    //     // 小时刻度
    //     if (time % (60 * 60) === 0) {
    //       this.drawLine(x, this.#pointHeight.hour1);
    //       this.drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
    //       continue;
    //     }
    //     // 30分钟刻度
    //     if (time % (60 * 30) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute10);
    //       continue;
    //     }
    //     // 10分钟刻度
    //     if (time % (60 * 10) === 0) {
    //       this.drawLine(x, this.#pointHeight.second5);
    //       continue;
    //     }
    //     // 5分钟刻度
    //     if (time % (60 * 5) === 0) {
    //       this.drawLine(x, this.#pointHeight.second5);
    //       continue;
    //     }
    //   }
    //   for(let i = 0; i < afterPointCount; i++) {
    //     const x = centerTimePoint + i * this.spacing - xOffset;
    //     const time = this.currentTime + i * this.#timeSpacing - timeOffset;
    //     // 小时刻度
    //     if (time % (60 * 60) === 0) {
    //       this.drawLine(x, this.#pointHeight.hour1);
    //       this.drawText(x - 15, 20, `${dateTime(time, 'HH:mm')}`);
    //       continue;
    //     }
    //     // 30分钟刻度
    //     if (time % (60 * 30) === 0) {
    //       this.drawLine(x, this.#pointHeight.minute10);
    //       continue;
    //     }
    //     // 10分钟刻度
    //     if (time % (60 * 10) === 0) {
    //       this.drawLine(x, this.#pointHeight.second5);
    //       continue;
    //     }
    //     // 5分钟刻度
    //     if (time % (60 * 5) === 0) {
    //       this.drawLine(x, this.#pointHeight.second5);
    //       continue;
    //     }
    //   }
    // }
