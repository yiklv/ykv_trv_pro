/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cSessionInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cSessionInfo`;
CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';

-- create table user
DROP TABLE IF EXISTS `trv_wrk_advise`;

CREATE TABLE `trv_wrk_advise` (
	`id_key` VARCHAR (36) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主键',
	-- `adv_id` VARCHAR (18) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '广告ID',
	`adv_name` VARCHAR (1000) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '广告标题',
	`adv_img` VARCHAR (1000) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '广告图片',
	`adv_url` VARCHAR (1000) COLLATE utf8mb4_unicode_ci COMMENT '广告URL链接',
	`adv_status` VARCHAR (2) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '广告是否有效 N无效 Y有效',
	`adv_seq` INTEGER (2) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '广告前台展示顺序 小的展示在前方',
	`date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`created_by` VARCHAR (64) COLLATE utf8mb4_unicode_ci DEFAULT 'SYSTEM',
	`date_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updated_by` VARCHAR (64) COLLATE utf8mb4_unicode_ci DEFAULT 'SYSTEM',
	PRIMARY KEY (`id_key`)
) ENGINE = INNODB DEFAULT CHARSET = utf8 COMMENT = '广告展示表';



-- create table user
drop table if exists `trv_syc_city`;
create table `trv_syc_city`(
	`id_key` varchar(36) not null,
	`city_id` varchar(18) not null,
	`city_name` varchar(128) not null,
	`date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	 PRIMARY KEY (`id_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='景区城市表';

drop table if exists `trv_syc_area`;
create table `trv_syc_area`(
	`id_key` varchar(36) not null,
	`area_id` varchar(18) not null,
	`area_name` varchar(128) not null,
	`city_id` varchar(18) not null,
	`date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	 PRIMARY KEY (`id_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='城市对应的区表';

drop table if exists `trv_spot_info`;
create table `trv_spot_info`(
	`id_key` varchar(36) not null,
	`spot_id` varchar(18) not null comment '景区id',
	`spot_name` varchar(128) not null comment '景区名称',
	`image_url` varchar(128) not null comment '景区缩略图',
	`city_id` varchar(18) not null comment '城市id',
	`area_id` varchar(18) not null comment '地区id',
	`spot_price` DECIMAL(10,2) not null comment '景点现价',
	`spot_old_price` DECIMAL(10,2) not null comment '景点原价',
	`spot_level` varchar(16) comment '景区级别  3A景区，4A景区，5A景区',
	`spot_address` varchar(500) not null comment '景区地址',
	`open_time_desc` varchar(128) not null comment '景区图路径',
	`spot_status` varchar(3) default 'Y'not null comment '景区状态 Y有效 N无效',
	`date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	 PRIMARY KEY (`id_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='景点表';
create unique INDEX `pk_trv_spot_info` on `trv_spot_info`(`id_key`);
create INDEX `ix_trv_spot_info_sid` on `trv_spot_info`(`spot_id`);

drop table if exists `trv_spot_info_desc`;
create table `trv_spot_info_desc`(
	`id_key` varchar(36) not null,
	`spot_id` varchar(18) not null comment '景区id',
	`spot_intr_desc` TEXT comment '景点介绍',
	`spot_note_desc` TEXT comment '景点须知',
	`date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	 PRIMARY KEY (`id_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='景点介绍表';
create unique INDEX `trv_spot_info_desc_sid` on `trv_spot_info_desc`(`spot_id`);

drop table if exists `trv_spot_img`;
create table `trv_spot_img`(
	`id_key` varchar(36) not null,
	`spot_id` varchar(18) not null,
	`image_url` varchar(128) not null comment '景区图路径',
	`date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	 PRIMARY KEY (`id_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='景点对应的轮播图表';
create INDEX `trv_spot_img_sid` on  `trv_spot_img`(`spot_id`);
/**
drop table if exists `trv_spot_opentime`;
create table `trv_spot_opentime`(
	`id_key` varchar(36) not null,
	`spot_id` varchar(18) not null,
	`open_time_desc` varchar(128) not null comment '景区图路径',
	`date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	 PRIMARY KEY (`id_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='景点对应的开放时间表';
create INDEX `trv_spot_opentime_sid` on `trv_spot_opentime`(`spot_id`);

drop table if exists `trv_spot_tkt_type`;
create table `trv_spot_tkt_type`(
	`id_key` varchar(36) not null,
	`spot_id` varchar(18) not null,
	`tkt_type` varchar(128) not null comment '景区图路径',
	`date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	 PRIMARY KEY (`id_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='景点和票务类型对应表';
create unique INDEX `trv_spot_tkt_type_uk` on `trv_spot_tkt_type`(`spot_id`, `tkt_type`);
create INDEX `trv_spot_tkt_type_sid` on  `trv_spot_tkt_type`(`spot_id`);
*/

drop table if exists `trv_syc_tkttype`;
create table `trv_syc_tkttype`(
	`id_key` varchar(36) not null,
	`type_id` varchar(18) not null comment '票务类型',
	`type_name` varchar(128) not null comment '票务类型名称',
	`type_image` varchar(200) not null comment '类型对应图片名称',
	`type_level` INTEGER(2) not null comment '类型对应优先级',
	`date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	 PRIMARY KEY (`id_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='门票类型表';

drop table if exists `trv_tkt_info`;
create table `trv_tkt_info`(
	`id_key` varchar(36) not null,
	`tkt_id` varchar(18) not null comment '票务id',
	`tkt_name` varchar(200) not null comment '票务名称',
	`tkt_price` decimal(18, 2) not null comment '票价',
	`tkt_old_price` decimal(18, 2) not null comment '票原价',
	`spot_id` varchar(128) not null comment '景点id',
	`tkt_type` varchar(18) not null comment '票务类型',
	`tkt_book_time` INTEGER(2) not null default '0' comment '需要提前预定的时间',
	`date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	 PRIMARY KEY (`id_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='门票表';
create unique INDEX `pk_trv_tkt_info_sid` on `trv_tkt_info`(`tkt_id`);
create INDEX `ix_trv_tkt_info_spid` on `trv_tkt_info`(`spot_id`);


drop table if exists `trv_tkt_info_desc`;
create table `trv_tkt_info_desc`(
	`id_key` varchar(36) not null,
	`tkt_id` varchar(18) not null comment '票务id',
	`tkt_note_desc` TEXT not null comment '购票须知',
	`date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	 PRIMARY KEY (`id_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='门票购票须知表';
create INDEX `trv_tkt_info_desc_sid` on `trv_tkt_info_desc`(`tkt_id`);

drop table if exists `trv_spot_keyword`;
create table `trv_spot_keyword`(
  `id_key` varchar(36) not null,
  `word_id` varchar(18) not null comment 'spotid',
  `word_name` varchar(100) not null comment '关键词名称',
  `word_status` varchar(2) not null comment '关键词是否有效  N失效 , Y有效',
  `word_level` int comment '关键词的优先级',
  `date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	PRIMARY KEY (`id_key`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='景点关键词表';


drop table if exists `trv_spot_order`;
create table `trv_spot_order`(
  `id_key` varchar(36) not null,
  `order_id` varchar(16) not null comment '订单id',
  `order_info` varchar(100) comment '订单详情',
  `user_id` varchar(16) not null comment '订单用户',
  `spot_id` varchar(18) not null comment '景点id',
  `tkt_id` varchar(18) not null comment '票务id',
  `trv_time` varchar(10) not null comment '游玩日期',
  `order_price` decimal(18, 2) not null comment '单价',
  `tkt_num` tinyint not null comment '购票数量',
  `date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	PRIMARY KEY (`id_key`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单信息';

drop table if exists `trv_spot_book_info`;
create table `trv_spot_book_info`(
  `id_key` varchar(36) not null,
  `open_id` varchar(100) not null comment 'open_id',
  `real_name` varchar(64) not null comment '姓名',
  `mobilePhone` varchar(12) comment '手机号',
  `id_no` varchar(20) not null comment '身份证',
  `date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	PRIMARY KEY (`id_key`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='取票人信息';
create unique INDEX `trv_spot_book_info_opid` on `trv_spot_book_info`(`open_id`);


drop table if exists `trv_syc_user`;
create table `trv_syc_user`(
  `id_key` varchar(36) not null,
  `user_id` varchar(32) not null comment '用户id',
  `nick_name` varchar(16) not null comment '微信用户名',
  `avatar_url` varchar(300 ) not null comment '头像的url',
  `gender` varchar(2) not null comment '性别 1 男',
  `city` varchar(32) not null comment '城市',
  `country` varchar(32) not null comment '国家',
  `province` varchar(32) not null comment '省份',
  `signature` varchar(64) not null comment '签名',
  `date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	PRIMARY KEY (`id_key`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='小程序用户信息';
create unique INDEX `trv_syc_user_sid` on `trv_syc_user`(`user_id`);


drop table if exists `trv_syc_spot_level`;
create table `trv_syc_spot_level`(
  `id_key` varchar(36) not null,
  `level_id` varchar(16) not null comment '景点等级id',
  `level_name` varchar(32) not null comment '景点等级名称',
  `date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	PRIMARY KEY (`id_key`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='小程序用户信息';
create unique INDEX `trv_syc_user_sid` on `trv_syc_spot_level`(`id_key`);


drop table if exists `trv_tkt_price_date`;
create table `trv_tkt_price_date`(
    `id_key` varchar(36) not null,
    `tkt_id` varchar(18) not null comment '票务id',
    `spc_date` varchar(8) not null comment '年月',
    `spc_day` varchar(8) not null comment '日',
    `spc_price` decimal(18, 2) not null comment '价格',
    `date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	PRIMARY KEY (`id_key`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='门票日期特殊价格表';
create unique INDEX `trv_tkt_price_date_id` on `trv_tkt_price_date`(`id_key`);
create INDEX `trv_tkt_price_date_td` on `trv_tkt_price_date`(`tkt_id`,`spc_date`);

drop table if exists `trv_syc_pay_banktype`;
create table `trv_syc_pay_banktype`(
    `id_key` varchar(36) not null,
    `banktype_code` varchar(32) not null comment '银行类型编码',
    `banktype_desc` varchar(128) not null comment '银行类型描述',
    `date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) default 'SYSTEM',
	PRIMARY KEY (`id_key`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='银行类型表';
create unique INDEX `trv_syc_pay_banktype_id` on `trv_syc_pay_banktype`(`id_key`);

SET FOREIGN_KEY_CHECKS = 1;
