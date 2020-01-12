/* 
日期、时间处理模块
 */
// 传入时间 格式化为日期+时间 2019-12-12 20:23:22
export function formateDate(time) {
   if (!time) {
     return;
   }
   let date = new Date(time);
   return date.getFullYear() + '-' + (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0'+(date.getMonth() + 1 )) + '-' + (date.getDate()> 9 ? date.getDate() : '0'+(date.getDate())) + ' ' + date.getHours() + ':' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) + ':' +(date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds())
 }