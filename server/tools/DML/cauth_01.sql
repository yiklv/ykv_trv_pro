

delete from `trv_syc_city`;
delete from `sequence` where `seq_name` = 'trv_city_category';
-- city序列
INSERT INTO sequence VALUES ('trv_city_category','城市序列', '0', '1');

insert into `trv_syc_city`(`id_key`, `city_id`,  `city_name`)values(rand_string(36), concat('CT', padIntToStr('L', nextval('trv_city_category'), 16, '0')), '南京市');
insert into `trv_syc_city`(`id_key`, `city_id`,  `city_name`)values(rand_string(36), concat('CT', padIntToStr('L', nextval('trv_city_category'), 16, '0')), '无锡市');

commit;

delete from `trv_syc_area`;
delete from `sequence` where `seq_name` = 'trv_area_category';
-- area序列
INSERT INTO sequence VALUES ('trv_area_category','区域序列', '0', '1');

INSERT INTO `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '玄武区', city_id from `trv_syc_city` where city_name = '南京市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '秦淮区', city_id from `trv_syc_city` where city_name = '南京市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '建邺区', city_id from `trv_syc_city` where city_name = '南京市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '鼓楼区', city_id from `trv_syc_city` where city_name = '南京市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '浦口区', city_id from `trv_syc_city` where city_name = '南京市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '栖霞区', city_id from `trv_syc_city` where city_name = '南京市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')),'雨花台区', city_id from `trv_syc_city` where city_name = '南京市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '江宁区', city_id from `trv_syc_city` where city_name = '南京市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '六合区', city_id from `trv_syc_city` where city_name = '南京市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '溧水区', city_id from `trv_syc_city` where city_name = '南京市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '高淳区', city_id from `trv_syc_city` where city_name = '南京市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '锡山区', city_id from `trv_syc_city` where city_name = '无锡市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '惠山区', city_id from `trv_syc_city` where city_name = '无锡市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '滨湖区', city_id from `trv_syc_city` where city_name = '无锡市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '梁溪区', city_id from `trv_syc_city` where city_name = '无锡市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '新吴区', city_id from `trv_syc_city` where city_name = '无锡市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '江阴市', city_id from `trv_syc_city` where city_name = '无锡市';
insert into `trv_syc_area`(`id_key`, `area_id`, `area_name`, `city_id`) select rand_string(36), concat('AR',padIntToStr('L', nextval('trv_area_category'),16,'0')) , '宜兴市', city_id from `trv_syc_city` where city_name = '无锡市';
commit;

delete from `trv_syc_spot_level`;
delete from `sequence` where `seq_name` = 'trv_spotLevel_category';
-- area序列
INSERT INTO sequence VALUES ('trv_spotLevel_category','景点等级序列', '0', '1');

insert into `trv_syc_spot_level`(`id_key`, `level_id`, `level_name`) values(rand_string(36), concat('SLVL',padIntToStr('L', nextval('trv_spotLevel_category'),12,'0')) , '1A级景区');
insert into `trv_syc_spot_level`(`id_key`, `level_id`, `level_name`) values(rand_string(36), concat('SLVL',padIntToStr('L', nextval('trv_spotLevel_category'),12,'0')) , '2A级景区');
insert into `trv_syc_spot_level`(`id_key`, `level_id`, `level_name`) values(rand_string(36), concat('SLVL',padIntToStr('L', nextval('trv_spotLevel_category'),12,'0')) , '3A级景区');
insert into `trv_syc_spot_level`(`id_key`, `level_id`, `level_name`) values(rand_string(36), concat('SLVL',padIntToStr('L', nextval('trv_spotLevel_category'),12,'0')) , '4A级景区');
insert into `trv_syc_spot_level`(`id_key`, `level_id`, `level_name`) values(rand_string(36), concat('SLVL',padIntToStr('L', nextval('trv_spotLevel_category'),12,'0')) , '5A级景区');

commit;

delete from `trv_wrk_advise`;
-- 初始化advice表的数据
insert into `trv_wrk_advise`(id_key, adv_name, adv_img, adv_status, adv_seq)
values(rand_string(36), '广告测试1', 'https://images.unsplash.com/photo-1651334787-21e6bd3ab135?w=640', 'Y',1);
insert into `trv_wrk_advise`(id_key, adv_name, adv_img,  adv_status, adv_seq)
values(rand_string(36), '广告测试2', 'https://images.unsplash.com/photo-1651214012-84f95e060dee?w=640', 'Y',2);
insert into `trv_wrk_advise`(id_key, adv_name, adv_img, adv_status, adv_seq)
values(rand_string(36), '广告测试3', 'https://images.unsplash.com/photo-1651446591-142875a901a1?w=640', 'Y',3);

commit;


delete from `trv_spot_keyword`;
delete from `sequence` where `seq_name` = 'trv_searchKey_category';
-- area序列
INSERT INTO sequence VALUES ('trv_searchKey_category','搜索关键字序列', '0', '1');
insert into `trv_spot_keyword`(`id_key`, `word_id`, `word_name`, `word_status`,`word_level` ) values(rand_string(32), concat('SKEY',padIntToStr('L', nextval('trv_searchKey_category'),14,'0')),'银杏湖', 'Y',1);
insert into `trv_spot_keyword`(`id_key`, `word_id`, `word_name`, `word_status`,`word_level` ) values(rand_string(32), concat('SKEY',padIntToStr('L', nextval('trv_searchKey_category'),14,'0')),'银杏湖1', 'Y',2);
insert into `trv_spot_keyword`(`id_key`, `word_id`, `word_name`, `word_status`,`word_level` ) values(rand_string(32), concat('SKEY',padIntToStr('L', nextval('trv_searchKey_category'),14,'0')),'银杏湖2', 'Y',3);
insert into `trv_spot_keyword`(`id_key`, `word_id`, `word_name`, `word_status`,`word_level` ) values(rand_string(32), concat('SKEY',padIntToStr('L', nextval('trv_searchKey_category'),14,'0')),'银杏湖3', 'Y',4);
insert into `trv_spot_keyword`(`id_key`, `word_id`, `word_name`, `word_status`,`word_level` ) values(rand_string(32), concat('SKEY',padIntToStr('L', nextval('trv_searchKey_category'),14,'0')),'银杏湖4', 'Y',5);
insert into `trv_spot_keyword`(`id_key`, `word_id`, `word_name`, `word_status`,`word_level` ) values(rand_string(32), concat('SKEY',padIntToStr('L', nextval('trv_searchKey_category'),14,'0')),'银杏湖5', 'Y',6);
insert into `trv_spot_keyword`(`id_key`, `word_id`, `word_name`, `word_status`,`word_level` ) values(rand_string(32), concat('SKEY',padIntToStr('L', nextval('trv_searchKey_category'),14,'0')),'银杏湖6', 'Y',7);
insert into `trv_spot_keyword`(`id_key`, `word_id`, `word_name`, `word_status`,`word_level` ) values(rand_string(32), concat('SKEY',padIntToStr('L', nextval('trv_searchKey_category'),14,'0')),'银杏湖7', 'Y',8);
commit;




delete from `trv_spot_info`;
delete from `sequence` where `seq_name` = 'tour_spot_category';
-- area序列
INSERT INTO sequence VALUES ('tour_spot_category','景点序列', '0', '1');

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'images/498300.jpg', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='新吴区') as area_id, 55.00, 85.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'images/829843.jpg', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='玄武区') as area_id, 58.00, 892.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='3A级景区'), '啊打发打发打发似的';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'images/498300.jpg', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='鼓楼区') as area_id, 110.00, 150.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'images/829843.jpg', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='江阴市') as area_id, 140.00, 200.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='5A级景区'), '啊打发打发打发似的';


commit;

