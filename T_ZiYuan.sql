USE [ShiYanShi]
GO

/****** Object:  Table [dbo].[T_ZiYuan]    Script Date: 2018/3/18 10:31:19 ******/
DROP TABLE [dbo].[T_ZiYuan]
GO

/****** Object:  Table [dbo].[T_ZiYuan]    Script Date: 2018/3/18 10:31:19 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[T_ZiYuan](
	[zidongbianhao] [int] IDENTITY(1,1) NOT NULL,
	[biaoti] [nvarchar](120) NOT NULL,
	[shuoming] [nvarchar](500) NULL,
	[url] [nvarchar](300) NULL,
 CONSTRAINT [PK_T_ZiYuan] PRIMARY KEY CLUSTERED 
(
	[zidongbianhao] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


