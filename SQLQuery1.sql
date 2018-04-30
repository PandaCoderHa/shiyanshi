-- alter table [dbo].[T_YuYue] add [xiangmu] nvarchar(500); 
-- alter table [dbo].[T_YuYue] add [zhidaojiaoshi] nvarchar(100);
-- alter table [dbo].[T_YuYue] add [banji] nvarchar(100);
-- alter table [dbo].[T_YuYue] add [xueshengxingming] nvarchar(200);

-- alter table [dbo].[M_ShiYanShi] alter column [mingzi] nvarchar(100); 

-- alter table [dbo].[T_YuYue] alter column [jiaoshibianhao] nvarchar(200)
--alter table [dbo].[T_YuYue] alter column [xueshengbianhao] nvarchar(200)

--alter table [dbo].[M_ShiYanShi] add louceng int
--alter table [dbo].[M_ShiYanShi] add miaoshu nvarchar(300)
--alter table [dbo].[M_ShiYanShi] add tupian nvarchar(300)
--alter table [dbo].[M_ShiYanShi] add fuzeren nvarchar(50)
--alter table  [dbo].[T_ShiYanShiBuKeYongShiJian] add kaishizhou int
--alter table  [dbo].[T_ShiYanShiBuKeYongShiJian] add jieshuzhou int

--20180313
--alter table [dbo].[T_ZiYuan] alter column [url] nvarchar(300); 
--update [dbo].[T_ZiYuan] set url=RTRIM([url])

alter table [dbo].[T_YuYue] add [xiangmuid] int not null default(1)

ALTER TABLE [dbo].[T_YuYue] ADD FOREIGN KEY [xiangmuid] REFERENCES [dbo].[T_YuYue](zidongbianhao)