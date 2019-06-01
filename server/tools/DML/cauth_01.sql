-- 初始化advice表的数据
insert into `trv_wrk_advise`(id_key, adv_name, adv_img, adv_status, adv_seq)
values(rand_string(32), '广告测试1', 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640', 'Y',1);
insert into `trv_wrk_advise`(id_key, adv_name, adv_img,  adv_status, adv_seq)
values(rand_string(32), '广告测试2', 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640', 'Y',2);
insert into `trv_wrk_advise`(id_key, adv_name, adv_img, adv_status, adv_seq)
values(rand_string(32), '广告测试3', 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640', 'Y',3);

commit;
