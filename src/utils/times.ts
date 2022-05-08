/*
 * @Author: losting
 * @Date: 2022-05-07 16:05:57
 * @LastEditTime: 2022-05-08 12:38:03
 * @LastEditors: losting
 * @Description: 
 * @FilePath: \timeline\src\utils\times.ts
 */
import dayjs from 'dayjs';
// 时间戳转时间
export const dateTime = (time: number, format: string = 'MM/DD HH:mm:ss') => {
  return dayjs(time).format(format);
}

// 今日开始时间戳
export function getTodayStartTime(): number {
  var today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  return today.getTime();
}

// 今日结束时间戳
export function getTodayEndTime(): number {
  var today = new Date();
  today.setHours(23);
  today.setMinutes(59);
  today.setSeconds(59);
  today.setMilliseconds(999);
  return today.getTime();
}
