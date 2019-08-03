const utils = {};
const fs = require('fs');
const qr = require('qr-image');
//var images = require("images");
/**
 * 根据地址生成二维码
 * 参数 url(string) 地址
 * 参数 callback(Function)
 */
utils.createQr = (url) =>{
 
    let qr_png = qr.imageSync(url, { type: 'png'});
    let qr_res = Buffer(qr_png).toString('base64');
    return 'data:image/jpeg;base64,' + qr_res;
};
 
/**
 * 给图片添加水印
 * 参数 sourceImg(string) 原图片路径
 * 参数 waterImg(string) 水印图片路径
 * 参数 callback(Function)
 */
// utils.addWater = function(sourceImg, waterImg, callback){
//     var lastput = "2.jpg";
//     images(sourceImg)                     //Load image from file 
//                                             //加载图像文件
//         .size(400)                          //Geometric scaling the image to 400 pixels width
//                                             //等比缩放图像到400像素宽
//         .draw(images(waterImg), 70, 260)   //Drawn logo at coordinates (70,260)//为了遮住不该看的东西..
//                                             //在(10,10)处绘制Logo
//         .save(lastput, {               //Save the image to a file,whih quality 50
//             quality : 50                    //保存图片到文件,图片质量为50
//         });
//     callback(lastput);
// };
// // 
 
module.exports = utils;