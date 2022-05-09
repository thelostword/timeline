/*
 * @Author: losting
 * @Date: 2022-05-07 16:05:57
 * @LastEditTime: 2022-05-09 19:23:00
 * @LastEditors: losting
 * @Description: 
 * @FilePath: \timeline\src\utils\times.ts
 */
import dayjs from 'dayjs';
// 时间戳转时间
export const dateTime = (time: number, format: string = 'MM/DD HH:mm'): string => {
  return dayjs(time * 1000).format(format);
}
