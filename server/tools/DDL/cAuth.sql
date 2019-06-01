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
	`id_key` varchar(36) COLLATE utf8mb4_unicode_ci not null comment '主键',
	`city_id` varchar(18) COLLATE utf8mb4_unicode_ci not null comment '城市ID',
	`city_name` varchar(128) COLLATE utf8mb4_unicode_ci not null  comment '城市名称',
	`date_created` timestamp  default CURRENT_TIMESTAMP,
	`created_by` varchar(64) COLLATE utf8mb4_unicode_ci  default 'SYSTEM',
	`date_updated` timestamp  default CURRENT_TIMESTAMP,
	`updated_by` varchar(64) COLLATE utf8mb4_unicode_ci default 'SYSTEM',
	 PRIMARY KEY (`id_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='景区城市表';


SET FOREIGN_KEY_CHECKS = 1;
