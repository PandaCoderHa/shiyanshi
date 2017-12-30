 alter table [dbo].[T_YuYue] add [xiangmu] nvarchar(500); 
 alter table [dbo].[T_YuYue] add [zhidaojiaoshi] nvarchar(100);
 alter table [dbo].[T_YuYue] add [banji] nvarchar(100);
 alter table [dbo].[T_YuYue] add [xueshengxingming] nvarchar(200);

 alter table [dbo].[M_ShiYanShi] alter column [mingzi] nvarchar(100); 

 alter table [dbo].[T_YuYue] alter column [jiaoshibianhao] nvarchar(200)
alter table [dbo].[T_YuYue] alter column [xueshengbianhao] nvarchar(200)