USE [ShiYanShi]
GO

/****** Object:  Table [dbo].[T_XiangMu]    Script Date: 2018/4/29 19:25:38 ******/
DROP TABLE [dbo].[T_XiangMu]
GO

/****** Object:  Table [dbo].[T_XiangMu]    Script Date: 2018/4/29 19:25:38 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[T_XiangMu](
	[zidongbianhao] [int] IDENTITY(1,1) NOT NULL,
	[xueyuan] [nvarchar](500) NOT NULL,
	[xiangmuming] [nvarchar](500) NULL
 CONSTRAINT [PK_T_XiangMu] PRIMARY KEY CLUSTERED 
(
	[zidongbianhao] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


