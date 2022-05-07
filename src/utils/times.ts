/*
 * @Author: losting
 * @Date: 2022-05-07 16:05:57
 * @LastEditTime: 2022-05-07 16:18:02
 * @LastEditors: losting
 * @Description: 
 * @FilePath: \timeline\src\utils\times.ts
 */
// 时间戳转时间
export function getTime(timestamp) {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '-';
  var M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-';
  var D =
    date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h =
    date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var m =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + ' ' + h + ':' + m + ':' + s;
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
