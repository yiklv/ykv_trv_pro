CREATE USER 'trvdata'@'localhost' IDENTIFIED BY 'trvdata1234';

CREATE USER 'trvdata'@'127.0.0.1' IDENTIFIED BY 'trvdata1234';
CREATE USER 'trvdata'@'::1' IDENTIFIED BY 'trvdata1234';

create user 'trvdata'@'%' IDENTIFIED BY 'trvdata1234';

flush privileges;

CREATE DATABASE cAuth default character set utf8;

use travel_ykv;

grant all privileges on `cAuth`.* to 'trvdata'@'localhost';

grant all privileges on `cAuth`.* to 'trvdata'@'%';


-- 删除用户
-- DROP USER 'username'@'host';
-- 撤销权限
-- REVOKE privilege ON databasename.tablename FROM 'username'@'host';