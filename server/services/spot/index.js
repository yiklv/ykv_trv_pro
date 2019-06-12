'use strict';

const pool = require('../../db/mysql');
const {random}= require('../../utils/stringutils');

const { query,insert } = pool;

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
const list = (val) => {
    // let tableName = 'trv_spot_info';
    // let column = ['spot_id as sportId', 'spot_name as spotName', 'image_url as imageUrl', 'spot_price as spotPirce','spot_old_price as spotOldPrice'];
    // let whereCond = {spot_status: 'Y'};
    // let joinCond = [{first: 'trv_spot_info.city_id', operator:'=', second: 'trv_syc_city.city_id'}, {first: 'trv_spot_info.city_id', operator:'=', second: 'trv_syc_city.city_id', conn: 'and'}];
    // return queryJoin(tableName, column, whereCond, 'trv_syc_city', 'inner',joinCond);
    console.log('============',val);
    let sql_str = 'select spot.spot_id as spotId, spot.spot_name as spotName, ' + 
                         '(select city_name from trv_syc_city c where c.city_id = spot.city_id) as cityName,' + 
                         '(select area_name from trv_syc_area c where c.area_id = spot.area_id) as areaName, ' + 
                         'spot.image_url as imageUrl, FORMAT(spot.spot_old_price, 2) spotOldPrice, FORMAT(spot.spot_price,2) as spotPrice, ' + 
                         '(select s.level_name from trv_syc_spot_level s where s.level_id = spot.spot_level) as spotLvlDesc ' + 
                   ' from trv_spot_info spot ' + 
                   ' where spot.spot_status = ? ' +
                   ' order by spot.date_created desc ' +
                   'limit ? , ?';
    let _rows = val.rows * 1;
    let _page = (val.page * 1) - 1;
    let param = ['Y', _page * _rows, _rows];
    return query(sql_str, param);
}

// 删除管理员
const del = val => {

    return null;
}

const querySpot= val =>{

}

module.exports = {
    list,
    add,
    update,
    del,

}