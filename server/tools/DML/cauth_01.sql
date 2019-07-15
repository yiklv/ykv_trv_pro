
delete from `trv_spot_info`;
delete from `sequence` where `seq_name` = 'tour_spot_category';
-- area序列
INSERT INTO sequence VALUES ('tour_spot_category','景点序列', '0', '1');

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'spot/spot_img1.png', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='新吴区') as area_id, 55.00, 85.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'spot/spot_img2.png', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='玄武区') as area_id, 58.00, 892.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='3A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'spot/spot_img3.png', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='鼓楼区') as area_id, 110.00, 150.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'spot/spot_img4png', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='江阴市') as area_id, 140.00, 200.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='5A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'spot/spot_img1.png', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='新吴区') as area_id, 55.00, 85.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'spot/spot_img2.png', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='玄武区') as area_id, 58.00, 892.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='3A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'spot/spot_img3.png', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='鼓楼区') as area_id, 110.00, 150.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'spot/spot_img4.png', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='江阴市') as area_id, 140.00, 200.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='5A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'spot/spot_img1.png', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='新吴区') as area_id, 55.00, 85.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'spot/spot_img2.png', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='玄武区') as area_id, 58.00, 892.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='3A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'spot/spot_img1.png', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='鼓楼区') as area_id, 110.00, 150.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'spot/spot_img2.png', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='江阴市') as area_id, 140.00, 200.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='5A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'spot/spot_img1.png', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='新吴区') as area_id, 55.00, 85.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'spot/spot_img2.png', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='玄武区') as area_id, 58.00, 892.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='3A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'spot/spot_img1.png', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='鼓楼区') as area_id, 110.00, 150.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'spot/spot_img2.png', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='江阴市') as area_id, 140.00, 200.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='5A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'spot/spot_img1.png', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='新吴区') as area_id, 55.00, 85.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'spot/spot_img2.png', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='玄武区') as area_id, 58.00, 892.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='3A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'spot/spot_img1.png', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='鼓楼区') as area_id, 110.00, 150.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'spot/spot_img2.png', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='江阴市') as area_id, 140.00, 200.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='5A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'spot/spot_img1.png', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='新吴区') as area_id, 55.00, 85.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'spot/spot_img2.png', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='玄武区') as area_id, 58.00, 892.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='3A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'spot/spot_img1.png', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='鼓楼区') as area_id, 110.00, 150.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'spot/spot_img2.png', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='江阴市') as area_id, 140.00, 200.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='5A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'spot/spot_img1.png', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='新吴区') as area_id, 55.00, 85.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'spot/spot_img2.png', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='玄武区') as area_id, 58.00, 892.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='3A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test3', 'spot/spot_img1.png', (select city_id from trv_syc_city where city_name ='南京市') as city_id,
	   (select area_id from trv_syc_area where area_name ='鼓楼区') as area_id, 110.00, 150.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='1A级景区'), '啊打发打发打发似的', '08:30-17:00';

INSERT INTO `trv_spot_info`(id_key, spot_id, spot_name, image_url, city_id, area_id, spot_price, spot_old_price,spot_level,spot_address, open_time_desc) 
SELECT rand_string (32), concat('SP',padIntToStr('L',nextval ('tour_spot_category'),16, '0')), 'test4', 'spot/spot_img2.png', (select city_id from trv_syc_city where city_name ='无锡市') as city_id,
	   (select area_id from trv_syc_area where area_name ='江阴市') as area_id, 140.00, 200.00, (SELECT LEVEL_ID FROM `trv_syc_spot_level` where level_name ='5A级景区'), '啊打发打发打发似的', '08:30-17:00';

commit;



delete from `trv_spot_img`;

insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000004', 'spot/spot_img4.png');
insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000004', 'spot/spot_img3.png');
insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000004', 'spot/spot_img2.png');
insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000004', 'spot/spot_img1.png');
insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000020', 'spot/spot_img4.png');
insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000020', 'spot/spot_img3.png');
insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000020', 'spot/spot_img1.png');
insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000020', 'spot/spot_img2.png');
insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000027', 'spot/spot_img4.png');
insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000027', 'spot/spot_img3.png');
insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000027', 'spot/spot_img2.png');
insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000027', 'spot/spot_img1.png');
insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000028', 'spot/spot_img4.png');
insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000028', 'spot/spot_img3.png');
insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000028', 'spot/spot_img1.png');
insert into `trv_spot_img`(`id_key`, `spot_id`, image_url)values(rand_string (32), 'SP0000000000000028', 'spot/spot_img2.png');

commit;


delete from `trv_tkt_info`;
delete from `sequence` where `seq_name` = 'trv_ticketKey_category';
-- area序列
INSERT INTO sequence VALUES ('trv_ticketKey_category','票务序列', '0', '1');
insert into `trv_tkt_info`(`id_key`, `tkt_id`, `tkt_name` ,`tkt_price`, `tkt_old_price`, `spot_id`,`tkt_type` ) values(rand_string(36), concat('TKT',padIntToStr('L', nextval('trv_ticketKey_category'),15,'0')),'成人票1',100.25,200.25,'SP0000000000000027','STKT00000000000002');
insert into `trv_tkt_info`(`id_key`, `tkt_id`, `tkt_name` ,`tkt_price`, `tkt_old_price`, `spot_id`,`tkt_type` ) values(rand_string(36), concat('TKT',padIntToStr('L', nextval('trv_ticketKey_category'),15,'0')),'成人票2',100.25,200.25,'SP0000000000000027','STKT00000000000002');
insert into `trv_tkt_info`(`id_key`, `tkt_id`, `tkt_name` ,`tkt_price`, `tkt_old_price`, `spot_id`,`tkt_type` ) values(rand_string(36), concat('TKT',padIntToStr('L', nextval('trv_ticketKey_category'),15,'0')),'成人票3',100.25,200.25,'SP0000000000000027','STKT00000000000001');
insert into `trv_tkt_info`(`id_key`, `tkt_id`, `tkt_name` ,`tkt_price`, `tkt_old_price`, `spot_id`,`tkt_type` ) values(rand_string(36), concat('TKT',padIntToStr('L', nextval('trv_ticketKey_category'),15,'0')),'成人票4',100.25,200.25,'SP0000000000000027','STKT00000000000001');
insert into `trv_tkt_info`(`id_key`, `tkt_id`, `tkt_name` ,`tkt_price`, `tkt_old_price`, `spot_id`,`tkt_type` ) values(rand_string(36), concat('TKT',padIntToStr('L', nextval('trv_ticketKey_category'),15,'0')),'成人票5',100.25,200.25,'SP0000000000000027','STKT00000000000003');

insert into `trv_tkt_info`(`id_key`, `tkt_id`, `tkt_name` ,`tkt_price`, `tkt_old_price`, `spot_id`,`tkt_type` ) values(rand_string(36), concat('TKT',padIntToStr('L', nextval('trv_ticketKey_category'),15,'0')),'成人票1',100.25,200.25,'SP0000000000000028','STKT00000000000002');
insert into `trv_tkt_info`(`id_key`, `tkt_id`, `tkt_name` ,`tkt_price`, `tkt_old_price`, `spot_id`,`tkt_type` ) values(rand_string(36), concat('TKT',padIntToStr('L', nextval('trv_ticketKey_category'),15,'0')),'成人票2',100.25,200.25,'SP0000000000000028','STKT00000000000002');
insert into `trv_tkt_info`(`id_key`, `tkt_id`, `tkt_name` ,`tkt_price`, `tkt_old_price`, `spot_id`,`tkt_type` ) values(rand_string(36), concat('TKT',padIntToStr('L', nextval('trv_ticketKey_category'),15,'0')),'成人票3',100.25,200.25,'SP0000000000000028','STKT00000000000001');
insert into `trv_tkt_info`(`id_key`, `tkt_id`, `tkt_name` ,`tkt_price`, `tkt_old_price`, `spot_id`,`tkt_type` ) values(rand_string(36), concat('TKT',padIntToStr('L', nextval('trv_ticketKey_category'),15,'0')),'成人票4',100.25,200.25,'SP0000000000000028','STKT00000000000001');
insert into `trv_tkt_info`(`id_key`, `tkt_id`, `tkt_name` ,`tkt_price`, `tkt_old_price`, `spot_id`,`tkt_type` ) values(rand_string(36), concat('TKT',padIntToStr('L', nextval('trv_ticketKey_category'),15,'0')),'学生票1',100.25,200.25,'SP0000000000000028','STKT00000000000006');


insert into `trv_tkt_info`(`id_key`, `tkt_id`, `tkt_name` ,`tkt_price`, `tkt_old_price`, `spot_id`,`tkt_type` ) values(rand_string(36), concat('TKT',padIntToStr('L', nextval('trv_ticketKey_category'),15,'0')),'成人票1',100.25,200.25,'SP0000000000000004','STKT00000000000002');
insert into `trv_tkt_info`(`id_key`, `tkt_id`, `tkt_name` ,`tkt_price`, `tkt_old_price`, `spot_id`,`tkt_type` ) values(rand_string(36), concat('TKT',padIntToStr('L', nextval('trv_ticketKey_category'),15,'0')),'成人票2',100.25,200.25,'SP0000000000000004','STKT00000000000004');
insert into `trv_tkt_info`(`id_key`, `tkt_id`, `tkt_name` ,`tkt_price`, `tkt_old_price`, `spot_id`,`tkt_type` ) values(rand_string(36), concat('TKT',padIntToStr('L', nextval('trv_ticketKey_category'),15,'0')),'成人票3',100.25,200.25,'SP0000000000000004','STKT00000000000005');
insert into `trv_tkt_info`(`id_key`, `tkt_id`, `tkt_name` ,`tkt_price`, `tkt_old_price`, `spot_id`,`tkt_type` ) values(rand_string(36), concat('TKT',padIntToStr('L', nextval('trv_ticketKey_category'),15,'0')),'成人票4',100.25,200.25,'SP0000000000000004','STKT00000000000001');
insert into `trv_tkt_info`(`id_key`, `tkt_id`, `tkt_name` ,`tkt_price`, `tkt_old_price`, `spot_id`,`tkt_type` ) values(rand_string(36), concat('TKT',padIntToStr('L', nextval('trv_ticketKey_category'),15,'0')),'学生票1',100.25,200.25,'SP0000000000000004','STKT00000000000006');



commit;


delete from `trv_spot_info_desc`;
INSERT INTO `trv_spot_info_desc` VALUES (rand_string(36), 'SP0000000000000027', '<p>A、入住企业工位费减免政策（每项减免 1~3 个月工位费，可累加计算）</p><p>1）在校学生（或毕业 1 年内应届毕业生）发起创立的小微企业。 &nbsp; &nbsp;</p><p>2）创业项目在最近一年内获得过国内知名创新创业竞赛名次。 &nbsp; &nbsp;&nbsp;</p><p>3）创立后至少完成一次股权融资。 &nbsp;</p><p>4）创立者有外资成份，且外资占比不少于 30%的创业项目。 &nbsp; &nbsp;&nbsp;</p><p>5）互联网及新兴行业的创新产品和商业模式，向我司提交申请及商业计划书，</p><p>经我方审核通过，且向我方开放股权投资的企业。&nbsp;</p><p>6） 合作机构推荐的企业也享有相应的优惠政策。 &nbsp;</p><p><br></p><p>B、阿里云扶持政策&nbsp;</p><p>1） 免费阿里云使用、上云支持、支付产品、移动产品、安全产品等等；&nbsp;</p><p>2） 不定期培训和沙龙、创业大赛、阿里集团优质资源对接；&nbsp;</p><p>3） 风投对接、淘宝众筹平台、投融资对接。 &nbsp;</p><p><br></p><p>C、科技政策咨询服务&nbsp;</p><p>我们的团队可帮助入驻企业提供国家级、市级、区级各部门的科技政策项目</p><p>咨询，争取一些政府各类优惠政策的支持。&nbsp;</p><p>1） 无偿资助类（创新基金、科技小巨人、区级研发机构）；&nbsp;</p><p>2） 税务减免类（高新技术企业认定、高新技术成果转化认定、双软认定、技术</p><p>合同认定）；&nbsp;</p><p>3） 人才补助类（浦江人才计划、启明星计划、千人计划）。</p>', '<p>A、入住企业工位费减免政策（每项减免 1~3 个月工位费，可累加计算）</p><p>1）在校学生（或毕业 1 年内应届毕业生）发起创立的小微企业。 &nbsp; &nbsp;</p><p>2）创业项目在最近一年内获得过国内知名创新创业竞赛名次。 &nbsp; &nbsp;&nbsp;</p><p>3）创立后至少完成一次股权融资。 &nbsp;</p><p>4）创立者有外资成份，且外资占比不少于 30%的创业项目。 &nbsp; &nbsp;&nbsp;</p><p>5）互联网及新兴行业的创新产品和商业模式，向我司提交申请及商业计划书，</p><p>经我方审核通过，且向我方开放股权投资的企业。&nbsp;</p><p>6） 合作机构推荐的企业也享有相应的优惠政策。 &nbsp;</p><p><br></p><p>B、阿里云扶持政策&nbsp;</p><p>1） 免费阿里云使用、上云支持、支付产品、移动产品、安全产品等等；&nbsp;</p><p>2） 不定期培训和沙龙、创业大赛、阿里集团优质资源对接；&nbsp;</p><p>3） 风投对接、淘宝众筹平台、投融资对接。 &nbsp;</p><p><br></p><p>C、科技政策咨询服务&nbsp;</p><p>我们的团队可帮助入驻企业提供国家级、市级、区级各部门的科技政策项目</p><p>咨询，争取一些政府各类优惠政策的支持。&nbsp;</p><p>1） 无偿资助类（创新基金、科技小巨人、区级研发机构）；&nbsp;</p><p>2） 税务减免类（高新技术企业认定、高新技术成果转化认定、双软认定、技术</p><p>合同认定）；&nbsp;</p><p>3） 人才补助类（浦江人才计划、启明星计划、千人计划）。</p>', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');

commit;


delete from `trv_tkt_info_desc`;
INSERT INTO `trv_tkt_info_desc` VALUES (rand_string(36), 'TKT000000000000007', '<p>A、入住企业工位费减免政策（每项减免 1~3 个月工位费，可累加计算）</p><p>1）在校学生（或毕业 1 年内应届毕业生）发起创立的小微企业。 &nbsp; &nbsp;</p><p>2）创业项目在最近一年内获得过国内知名创新创业竞赛名次。 &nbsp; &nbsp;&nbsp;</p><p>3）创立后至少完成一次股权融资。 &nbsp;</p><p>4）创立者有外资成份，且外资占比不少于 30%的创业项目。 &nbsp; &nbsp;&nbsp;</p><p>5）互联网及新兴行业的创新产品和商业模式，向我司提交申请及商业计划书，</p><p>经我方审核通过，且向我方开放股权投资的企业。&nbsp;</p><p>6） 合作机构推荐的企业也享有相应的优惠政策。 &nbsp;</p><p><br></p><p>B、阿里云扶持政策&nbsp;</p><p>1） 免费阿里云使用、上云支持、支付产品、移动产品、安全产品等等；&nbsp;</p><p>2） 不定期培训和沙龙、创业大赛、阿里集团优质资源对接；&nbsp;</p><p>3） 风投对接、淘宝众筹平台、投融资对接。 &nbsp;</p><p><br></p><p>C、科技政策咨询服务&nbsp;</p><p>我们的团队可帮助入驻企业提供国家级、市级、区级各部门的科技政策项目</p><p>咨询，争取一些政府各类优惠政策的支持。&nbsp;</p><p>1） 无偿资助类（创新基金、科技小巨人、区级研发机构）；&nbsp;</p><p>2） 税务减免类（高新技术企业认定、高新技术成果转化认定、双软认定、技术</p><p>合同认定）；&nbsp;</p><p>3） 人才补助类（浦江人才计划、启明星计划、千人计划）。</p>', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO `trv_tkt_info_desc` VALUES (rand_string(36), 'TKT000000000000010', '<p>A、入住企业工位费减免政策（每项减免 1~3 个月工位费，可累加计算）</p><p>1）在校学生（或毕业 1 年内应届毕业生）发起创立的小微企业。 &nbsp; &nbsp;</p><p>2）创业项目在最近一年内获得过国内知名创新创业竞赛名次。 &nbsp; &nbsp;&nbsp;</p><p>3）创立后至少完成一次股权融资。 &nbsp;</p><p>4）创立者有外资成份，且外资占比不少于 30%的创业项目。 &nbsp; &nbsp;&nbsp;</p><p>5）互联网及新兴行业的创新产品和商业模式，向我司提交申请及商业计划书，</p><p>经我方审核通过，且向我方开放股权投资的企业。&nbsp;</p><p>6） 合作机构推荐的企业也享有相应的优惠政策。 &nbsp;</p><p><br></p><p>B、阿里云扶持政策&nbsp;</p><p>1） 免费阿里云使用、上云支持、支付产品、移动产品、安全产品等等；&nbsp;</p><p>2） 不定期培训和沙龙、创业大赛、阿里集团优质资源对接；&nbsp;</p><p>3） 风投对接、淘宝众筹平台、投融资对接。 &nbsp;</p><p><br></p><p>C、科技政策咨询服务&nbsp;</p><p>我们的团队可帮助入驻企业提供国家级、市级、区级各部门的科技政策项目</p><p>咨询，争取一些政府各类优惠政策的支持。&nbsp;</p><p>1） 无偿资助类（创新基金、科技小巨人、区级研发机构）；&nbsp;</p><p>2） 税务减免类（高新技术企业认定、高新技术成果转化认定、双软认定、技术</p><p>合同认定）；&nbsp;</p><p>3） 人才补助类（浦江人才计划、启明星计划、千人计划）。</p>', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO `trv_tkt_info_desc` VALUES (rand_string(36), 'TKT000000000000009', '<p>A、入住企业工位费减免政策（每项减免 1~3 个月工位费，可累加计算）</p><p>1）在校学生（或毕业 1 年内应届毕业生）发起创立的小微企业。 &nbsp; &nbsp;</p><p>2）创业项目在最近一年内获得过国内知名创新创业竞赛名次。 &nbsp; &nbsp;&nbsp;</p><p>3）创立后至少完成一次股权融资。 &nbsp;</p><p>4）创立者有外资成份，且外资占比不少于 30%的创业项目。 &nbsp; &nbsp;&nbsp;</p><p>5）互联网及新兴行业的创新产品和商业模式，向我司提交申请及商业计划书，</p><p>经我方审核通过，且向我方开放股权投资的企业。&nbsp;</p><p>6） 合作机构推荐的企业也享有相应的优惠政策。 &nbsp;</p><p><br></p><p>B、阿里云扶持政策&nbsp;</p><p>1） 免费阿里云使用、上云支持、支付产品、移动产品、安全产品等等；&nbsp;</p><p>2） 不定期培训和沙龙、创业大赛、阿里集团优质资源对接；&nbsp;</p><p>3） 风投对接、淘宝众筹平台、投融资对接。 &nbsp;</p><p><br></p><p>C、科技政策咨询服务&nbsp;</p><p>我们的团队可帮助入驻企业提供国家级、市级、区级各部门的科技政策项目</p><p>咨询，争取一些政府各类优惠政策的支持。&nbsp;</p><p>1） 无偿资助类（创新基金、科技小巨人、区级研发机构）；&nbsp;</p><p>2） 税务减免类（高新技术企业认定、高新技术成果转化认定、双软认定、技术</p><p>合同认定）；&nbsp;</p><p>3） 人才补助类（浦江人才计划、启明星计划、千人计划）。</p>', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO `trv_tkt_info_desc` VALUES (rand_string(36), 'TKT000000000000006', '<p>A、入住企业工位费减免政策（每项减免 1~3 个月工位费，可累加计算）</p><p>1）在校学生（或毕业 1 年内应届毕业生）发起创立的小微企业。 &nbsp; &nbsp;</p><p>2）创业项目在最近一年内获得过国内知名创新创业竞赛名次。 &nbsp; &nbsp;&nbsp;</p><p>3）创立后至少完成一次股权融资。 &nbsp;</p><p>4）创立者有外资成份，且外资占比不少于 30%的创业项目。 &nbsp; &nbsp;&nbsp;</p><p>5）互联网及新兴行业的创新产品和商业模式，向我司提交申请及商业计划书，</p><p>经我方审核通过，且向我方开放股权投资的企业。&nbsp;</p><p>6） 合作机构推荐的企业也享有相应的优惠政策。 &nbsp;</p><p><br></p><p>B、阿里云扶持政策&nbsp;</p><p>1） 免费阿里云使用、上云支持、支付产品、移动产品、安全产品等等；&nbsp;</p><p>2） 不定期培训和沙龙、创业大赛、阿里集团优质资源对接；&nbsp;</p><p>3） 风投对接、淘宝众筹平台、投融资对接。 &nbsp;</p><p><br></p><p>C、科技政策咨询服务&nbsp;</p><p>我们的团队可帮助入驻企业提供国家级、市级、区级各部门的科技政策项目</p><p>咨询，争取一些政府各类优惠政策的支持。&nbsp;</p><p>1） 无偿资助类（创新基金、科技小巨人、区级研发机构）；&nbsp;</p><p>2） 税务减免类（高新技术企业认定、高新技术成果转化认定、双软认定、技术</p><p>合同认定）；&nbsp;</p><p>3） 人才补助类（浦江人才计划、启明星计划、千人计划）。</p>', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');
INSERT INTO `trv_tkt_info_desc` VALUES (rand_string(36), 'TKT000000000000008', '<p>A、入住企业工位费减免政策（每项减免 1~3 个月工位费，可累加计算）</p><p>1）在校学生（或毕业 1 年内应届毕业生）发起创立的小微企业。 &nbsp; &nbsp;</p><p>2）创业项目在最近一年内获得过国内知名创新创业竞赛名次。 &nbsp; &nbsp;&nbsp;</p><p>3）创立后至少完成一次股权融资。 &nbsp;</p><p>4）创立者有外资成份，且外资占比不少于 30%的创业项目。 &nbsp; &nbsp;&nbsp;</p><p>5）互联网及新兴行业的创新产品和商业模式，向我司提交申请及商业计划书，</p><p>经我方审核通过，且向我方开放股权投资的企业。&nbsp;</p><p>6） 合作机构推荐的企业也享有相应的优惠政策。 &nbsp;</p><p><br></p><p>B、阿里云扶持政策&nbsp;</p><p>1） 免费阿里云使用、上云支持、支付产品、移动产品、安全产品等等；&nbsp;</p><p>2） 不定期培训和沙龙、创业大赛、阿里集团优质资源对接；&nbsp;</p><p>3） 风投对接、淘宝众筹平台、投融资对接。 &nbsp;</p><p><br></p><p>C、科技政策咨询服务&nbsp;</p><p>我们的团队可帮助入驻企业提供国家级、市级、区级各部门的科技政策项目</p><p>咨询，争取一些政府各类优惠政策的支持。&nbsp;</p><p>1） 无偿资助类（创新基金、科技小巨人、区级研发机构）；&nbsp;</p><p>2） 税务减免类（高新技术企业认定、高新技术成果转化认定、双软认定、技术</p><p>合同认定）；&nbsp;</p><p>3） 人才补助类（浦江人才计划、启明星计划、千人计划）。</p>', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');

commit;

delete from `trv_tkt_price_date`;
insert into `trv_tkt_price_date` values(rand_string(36), 'TKT000000000000007','201906','29',125.01, CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');
insert into `trv_tkt_price_date` values(rand_string(36), 'TKT000000000000010','201906','29',15.01, CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');
insert into `trv_tkt_price_date` values(rand_string(36), 'TKT000000000000007','201906','28',125.01, CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');
insert into `trv_tkt_price_date` values(rand_string(36), 'TKT000000000000009','201906','29',18.01, CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');
insert into `trv_tkt_price_date` values(rand_string(36), 'TKT000000000000006','201906','29',154.01, CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');
insert into `trv_tkt_price_date` values(rand_string(36), 'TKT000000000000008','201906','29',128.01, CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');
insert into `trv_tkt_price_date` values(rand_string(36), 'TKT000000000000004','201906','29',128.01, CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');
insert into `trv_tkt_price_date` values(rand_string(36), 'TKT000000000000004','201906','28',128.01, CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');
insert into `trv_tkt_price_date` values(rand_string(36), 'TKT000000000000004','201906','27',128.01, CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM');

