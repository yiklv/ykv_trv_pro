'use strict';

const pool = require('../../db/mysql');
const { random } = require('../../utils/stringutils');

const { query, insert } = pool;

// 新添管理员
const add = (val) => {
    console.log(val);
    let insertParam = val;
    insertParam['id_key'] = random(32);
    return null;
}


// 更改管理员
const update = (val) => {

    return null;
}

// 查询管理员
const list = async (val) => {
    // 总条数
    let _totalNum;
    // 每页条数
    let _rows = val.rows * 1;
    // 第几页
    let _page = (val.page * 1) - 1;

    let sql_count = ' select count(1) cntNum from trv_spot_info spot where spot.spot_status = ? ';
    await query(sql_count, ['Y']).then(result => {
        _totalNum = result[0].cntNum;
    });
    if (_totalNum > _rows * _page) {
        let sql_str = 'select spot.spot_id as spotId, spot.spot_name as spotName, ' +
            '(select city_name from trv_syc_city c where c.city_id = spot.city_id) as cityName,' +
            '(select area_name from trv_syc_area c where c.area_id = spot.area_id) as areaName, ' +
            'spot.image_url as imageUrl, FORMAT(spot.spot_old_price, 2) spotOldPrice, FORMAT(spot.spot_price,2) as spotPrice, ' +
            '(select s.level_name from trv_syc_spot_level s where s.level_id = spot.spot_level) as spotLvlDesc ' +
            ' from trv_spot_info spot ' +
            ' where spot.spot_status = ? ' +
            ' order by spot.date_created desc ' +
            'limit ? , ?';

        let param = ['Y', _page * _rows, _rows];
        return query(sql_str, param);
    } else {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }

}

// 删除管理员
const del = val => {

    return null;
}

/**
 *  查询景点详情
 *  @author yiklv_yanguo
 *  @date    2019-06-14T06:37:33+0800
 *  @version [version]
 *  @param   {[type]}                 val [description]
 *  @return  {[type]}                     [description]
 */
const querySpot = val => {
    let spotId = val.spotId;
    let sql_spot_detail = 'select spot.spot_id as spotId,spot.spot_name as spotName, spot.spot_address as spotAddress, ' +
        ' spot.open_time_desc as openTime,spot.image_url as imageUrl,(select area_name from trv_syc_area c where c.area_id = spot.area_id) as areaName ' +
        ' from trv_spot_info spot where spot.spot_id = ? ';
    let param = [spotId];
    return query(sql_spot_detail, param);
}
/**
 *  查询景点图片
 *  @author yiklv_yanguo
 *  @date    2019-06-14T06:37:36+0800
 *  @version [version]
 *  @param   {[type]}                 val [description]
 *  @return  {[type]}                     [description]
 */
const querySpotImgs = val => {
    let spotId = val.spotId;
    let sql_spot_img = 'select si.image_url as imgUrl from trv_spot_img si where si.spot_id = ? ';
    let param = [spotId];
    return query(sql_spot_img, param);
}
/**
 *  查询景点门票
 *  @author yiklv_yanguo
 *  @date    2019-06-15T13:23:26+0800
 *  @version [version]
 *  @param   {[type]}                 val [description]
 *  @return  {[type]}                     [description]
 */
const querySpotTktList = async (val) => {
    let spotId = val.spotId;
    let sql_tkt_type = 'select tt.type_id as tktType,tt.type_image tktTypeImg, tt.type_name as tktTypeName from trv_syc_tkttype tt' +
        ' where exists (select 1 from trv_tkt_info t where t.tkt_type= tt.type_id and t.spot_id = ? ) order by type_level asc ';
    let typeparam = [spotId];
    // 景点所有信息
    let tktInfoList = [];
    // 景点类型信息
    let tktTypeLIst = [];
    await query(sql_tkt_type, typeparam).then(res => {
        tktTypeLIst = res;
    });

    let sql_tkt_info = 'select ti.tkt_id tktId, ti.tkt_name tktName, ti.tkt_old_price tktOldPrice, ti.tkt_price tktPrice from trv_tkt_info ti where ti.spot_id = ? and ti.tkt_type = ?';

    for (var i = 0; i < tktTypeLIst.length; i++) {
        let obj = new Object();
        obj.typeName = tktTypeLIst[i].tktTypeName;
        obj.typeId = tktTypeLIst[i].tktType;
        obj.tktTypeImg = tktTypeLIst[i].tktTypeImg;

        let tktparam = [spotId, tktTypeLIst[i].tktType];
        await query(sql_tkt_info, tktparam).then(res => {
            obj.tktInfo = res;
        });
        tktInfoList.push(obj);
    }

    return new Promise((resolve, reject) => { resolve(tktInfoList); });
}


module.exports = {
    list,
    add,
    update,
    del,
    querySpot,
    querySpotImgs,
    querySpotTktList
}