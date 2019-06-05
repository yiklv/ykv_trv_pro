drop table if exists `sequence`;

/*==============================================================*/
/* Table: cm_sequence                                           */
/*==============================================================*/
drop table if exists `sequence`;
create table `sequence`
(
`seq_name`                 varchar(50) not null comment '序列的名字，唯一',
`seq_desc`    varchar(200) comment '序列对应的描述',
`current_val`        bigint not null comment '当前的值',
`increment_val`      int not null default 1 comment '步长，默认为1',
primary key (`seq_name`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='序列表';

alter table `sequence` comment '公共的序列表，用于为非自增且要求唯一的字段记录和获取唯一ID。';

delimiter #  
create function currval(v_seq_name VARCHAR(50))  
returns integer  
begin  
    declare value integer;  
    set value = 0;  
    select current_val into value  from sequence where seq_name = v_seq_name;  
   return value;  
end;  
#


delimiter #  
create function nextval (v_seq_name VARCHAR(50)) returns integer  
begin  
    update sequence set current_val = current_val + increment_val  where seq_name = v_seq_name;  
    return currval(v_seq_name);  
end; 
#

-- 
--  INSERT INTO sequence VALUES ('seq_test1_num2', '0', '2');
-- CREATE TRIGGER `TRI_shop_category` BEFORE INSERT ON `shop_category` FOR EACH ROW BEGIN
-- set NEW.category_id = nextval('seq_category');
-- END;



-- set global log_bin_trust_function_creators = 1;
DROP FUNCTION IF EXISTS rand_string;
DELIMITER $$
CREATE FUNCTION rand_string(n INT)
RETURNS VARCHAR(255)
BEGIN
    DECLARE chars_str varchar(100) DEFAULT 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    DECLARE return_str varchar(255) DEFAULT '';
    DECLARE i INT DEFAULT 0;
    WHILE i < n DO
        SET return_str = concat(return_str,substring(chars_str , FLOOR(1 + RAND()*62 ),1));
        SET i = i +1;
    END WHILE;
    RETURN return_str;
END $$
DELIMITER ;


DELIMITER #
create function padIntToStr(padType varchar(2), num int, length int, padStr varchar(2)) returns varchar(200)
begin
  declare return_str varchar(200) default '';
  case when padType = 'L' THEN
    set return_str = lpad(concat(num, ''), length, padStr);
  when padType = 'R' THEN
    set return_str = rpad(concat(num, ''), length, padStr);
  else
    set return_str = lpad(concat(num, ''), length, padStr);
  end case;
  return return_str;
end;
#
DELIMITER #
create function padStrToStr(padType varchar(2), str varchar(20), length int, padStr varchar(2)) returns varchar(200)
begin
  declare return_str varchar(200) default '';
  if padType = 'L' THEN
    set return_str = lpad(str, length, padStr);
  ELSEIF padType = 'R' THEN
    set return_str = rpad(str, length, padStr);
  else
    set return_str = lpad(str, length, padStr);
  end if;
  return return_str;
end;
#