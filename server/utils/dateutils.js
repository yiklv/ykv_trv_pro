
const ADD_MINUTE = 1000 * 60;//设置新时间比旧时间多一分钟
const ADD_HOUR = ADD_MINUTE * 60;//设置新时间比旧时间多一小时
const ADD_DATE = ADD_HOUR * 24; //设置新时间比旧时间多一天
/**
 *  日期加多少天
 *  @author yiklv_yanguo
 *  @date    2019-07-22T01:24:49+0800
 *  @version [version]
 *  @param   {[type]}                 date [description]
 *  @param   {[type]}                 num  [description]
 *  @return  {[type]}                      [description]
 */
const addDate = (date, num) => {
	let parDate = date || new Date();
    let newDate = parDate.getTime(); //转化为时间戳毫秒数
    return new Date(newDate + ADD_DATE * num); //设置新时间比旧时间多num天
}

/**
 *  日期加多少天
 *  @author yiklv_yanguo
 *  @date    2019-07-22T01:24:49+0800
 *  @version [version]
 *  @param   {[type]}                 date [description]
 *  @param   {[type]}                 num  [description]
 *  @return  {[type]}                      [description]
 */
const addDateNew = (date, num) => {
	let parDate = date || new Date();
    parDate.setDate(d.getDate() + num);
    return parDate; //定义一个新时间
}
/**
 *  日期加多少分钟
 *  @author yiklv_yanguo
 *  @date    2019-07-22T01:24:49+0800
 *  @version [version]
 *  @param   {[type]}                 date [description]
 *  @param   {[type]}                 num  [description]
 *  @return  {[type]}                      [description]
 */
const addMinuteNew = (date, num) => {
	let parDate = date || new Date();
    parDate.setMinutes(d.getMinutes() + num);
    return parDate; //定义一个新时间
}
/**
 *  日期加多少分钟
 *  @author yiklv_yanguo
 *  @date    2019-07-22T01:24:49+0800
 *  @version [version]
 *  @param   {[type]}                 date [description]
 *  @param   {[type]}                 num  [description]
 *  @return  {[type]}                      [description]
 */
const addMinute = (date, num) => {
	let parDate = date || new Date();
    let newDate = parDate.getTime(); //转化为时间戳毫秒数
    return new Date(newDate + ADD_MINUTE * num); //设置新时间比旧时间多num天
}
/**
 *  日期加多少小时
 *  @author yiklv_yanguo
 *  @date    2019-07-22T01:24:49+0800
 *  @version [version]
 *  @param   {[type]}                 date [description]
 *  @param   {[type]}                 num  [description]
 *  @return  {[type]}                      [description]
 */
const aaddHourNew = (date, num) => {
	let parDate = date || new Date();
    parDate.setHours(d.getHours() + num);
    return parDate; //定义一个新时间
}
/**
 * 日期加多少小时
 *  @author yiklv_yanguo
 *  @date    2019-07-22T01:24:49+0800
 *  @version [version]
 *  @param   {[type]}                 date [description]
 *  @param   {[type]}                 num  [description]
 *  @return  {[type]}                      [description]
 */
const addHour = (date, num) => {
	let parDate = date || new Date();
    let newDate = parDate.getTime(); //转化为时间戳毫秒数
    return new Date(newDate + ADD_HOUR * num); //设置新时间比旧时间多num天
}


module.exports = {
	addDate:addDate,
	addMinute:addMinute,
	addHour:addHour

}