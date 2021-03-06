USE [master]
GO
/****** Object:  Database [ShiYanShi]    Script Date: 2017/10/13 下午 9:17:17 ******/
CREATE DATABASE [ShiYanShi]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ShiYanShi', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER2017\MSSQL\DATA\ShiYanShi.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ShiYanShi_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER2017\MSSQL\DATA\ShiYanShi_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [ShiYanShi] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ShiYanShi].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ShiYanShi] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ShiYanShi] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ShiYanShi] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ShiYanShi] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ShiYanShi] SET ARITHABORT OFF 
GO
ALTER DATABASE [ShiYanShi] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ShiYanShi] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ShiYanShi] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ShiYanShi] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ShiYanShi] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ShiYanShi] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ShiYanShi] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ShiYanShi] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ShiYanShi] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ShiYanShi] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ShiYanShi] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ShiYanShi] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ShiYanShi] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ShiYanShi] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ShiYanShi] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ShiYanShi] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ShiYanShi] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ShiYanShi] SET RECOVERY FULL 
GO
ALTER DATABASE [ShiYanShi] SET  MULTI_USER 
GO
ALTER DATABASE [ShiYanShi] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ShiYanShi] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ShiYanShi] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ShiYanShi] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ShiYanShi] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'ShiYanShi', N'ON'
GO
ALTER DATABASE [ShiYanShi] SET QUERY_STORE = OFF
GO
USE [ShiYanShi]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [ShiYanShi]
GO
/****** Object:  Table [dbo].[M_ShiYanShi]    Script Date: 2017/10/13 下午 9:17:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[M_ShiYanShi](
	[zidongbianhao] [int] IDENTITY(1,1) NOT NULL,
	[mingzi] [nchar](60) NOT NULL,
	[shifoutingyong] [bit] NULL,
	[shifoushanchu] [bit] NOT NULL,
	[gengxinriqi] [datetime] NULL,
 CONSTRAINT [PK_M_ShiYanShi] PRIMARY KEY CLUSTERED 
(
	[zidongbianhao] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[M_ZuoWei]    Script Date: 2017/10/13 下午 9:18:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[M_ZuoWei](
	[zidongbianhao] [int] IDENTITY(1,1) NOT NULL,
	[shiyanshibianhao] [int] NOT NULL,
	[zuoweimingcheng] [nchar](60) NOT NULL,
	[shifoutingyong] [bit] NULL,
	[shifoushanchu] [bit] NOT NULL,
	[gengxinriqi] [datetime] NOT NULL,
 CONSTRAINT [PK_M_ZuoWei] PRIMARY KEY CLUSTERED 
(
	[zidongbianhao] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_CaoZuoJiLu]    Script Date: 2017/10/13 下午 9:19:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_CaoZuoJiLu](
	[zidongbianhao] [int] NULL,
	[shiyanshibianhao] [int] NULL,
	[zuoweibianhao] [int] NULL,
	[jiaoshibianhao] [int] NULL,
	[xueshengbianhao] [int] NULL,
	[yuyuekaishiriqi] [datetime] NULL,
	[yuyuejieshuriqi] [datetime] NULL,
	[yuyuechexiao] [bit] NULL,
	[gengxinriqi] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_ShiYanShiBuKeYongShiJian]    Script Date: 2017/10/13 下午 9:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_ShiYanShiBuKeYongShiJian](
	[zidongbianhao] [int] IDENTITY(1,1) NOT NULL,
	[shiyanshibianhao] [int] NOT NULL,
	[zhouji] [int] NOT NULL,
	[kaishiriqi] [datetime] NOT NULL,
	[jieshuriqi] [datetime] NOT NULL,
	[gengxinriqi] [datetime] NOT NULL,
 CONSTRAINT [PK_T_ShiYanShiBuKeYongShiJian] PRIMARY KEY CLUSTERED 
(
	[zidongbianhao] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_YuYue]    Script Date: 2017/10/13 下午 9:22:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_YuYue](
	[zidongbianhao] [int] IDENTITY(1,1) NOT NULL,
	[shiyanshibianhao] [int] NOT NULL,
	[zuoweibianhao] [int] NOT NULL,
	[jiaoshibianhao] [int] NULL,
	[xueshengbianhao] [int] NOT NULL,
	[yuyuekaishiriqi] [datetime] NOT NULL,
	[yuyuejieshuriqi] [datetime] NOT NULL,
	[gengxinriqi] [datetime] NOT NULL,
 CONSTRAINT [PK_T_YuYue] PRIMARY KEY CLUSTERED 
(
	[zidongbianhao] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[M_ShiYanShi] ADD  CONSTRAINT [DF_M_ShiYanShi_gengxinriqi]  DEFAULT (getdate()) FOR [gengxinriqi]
GO
ALTER TABLE [dbo].[M_ZuoWei] ADD  CONSTRAINT [DF_M_ZuoWei_gengxinriqi]  DEFAULT (getdate()) FOR [gengxinriqi]
GO
ALTER TABLE [dbo].[T_CaoZuoJiLu] ADD  CONSTRAINT [DF_T_CaoZuoJiLu_yuyuekaishiriqi]  DEFAULT (getdate()) FOR [yuyuekaishiriqi]
GO
ALTER TABLE [dbo].[T_CaoZuoJiLu] ADD  CONSTRAINT [DF_T_CaoZuoJiLu_yuyuejieshuriqi]  DEFAULT (getdate()) FOR [yuyuejieshuriqi]
GO
ALTER TABLE [dbo].[T_CaoZuoJiLu] ADD  CONSTRAINT [DF_T_CaoZuoJiLu_gengxinriqi]  DEFAULT (getdate()) FOR [gengxinriqi]
GO
ALTER TABLE [dbo].[T_YuYue] ADD  CONSTRAINT [DF_T_YuYue_yuyuekaishiriqi]  DEFAULT (getdate()) FOR [yuyuekaishiriqi]
GO
ALTER TABLE [dbo].[T_YuYue] ADD  CONSTRAINT [DF_T_YuYue_yuyuejieshuriqi]  DEFAULT (getdate()) FOR [yuyuejieshuriqi]
GO
ALTER TABLE [dbo].[T_YuYue] ADD  CONSTRAINT [DF_T_YuYue_gengxinriqi]  DEFAULT (getdate()) FOR [gengxinriqi]
GO
ALTER TABLE [dbo].[M_ZuoWei]  WITH CHECK ADD  CONSTRAINT [FK_M_ZuoWei_M_ShiYanShi] FOREIGN KEY([shiyanshibianhao])
REFERENCES [dbo].[M_ShiYanShi] ([zidongbianhao])
GO
ALTER TABLE [dbo].[M_ZuoWei] CHECK CONSTRAINT [FK_M_ZuoWei_M_ShiYanShi]
GO
ALTER TABLE [dbo].[T_ShiYanShiBuKeYongShiJian]  WITH CHECK ADD  CONSTRAINT [FK_T_ShiYanShiBuKeYongShiJian_M_ShiYanShi] FOREIGN KEY([zidongbianhao])
REFERENCES [dbo].[M_ShiYanShi] ([zidongbianhao])
GO
ALTER TABLE [dbo].[T_ShiYanShiBuKeYongShiJian] CHECK CONSTRAINT [FK_T_ShiYanShiBuKeYongShiJian_M_ShiYanShi]
GO
ALTER TABLE [dbo].[T_YuYue]  WITH CHECK ADD  CONSTRAINT [FK_T_YuYue_M_ShiYanShi] FOREIGN KEY([shiyanshibianhao])
REFERENCES [dbo].[M_ShiYanShi] ([zidongbianhao])
GO
ALTER TABLE [dbo].[T_YuYue] CHECK CONSTRAINT [FK_T_YuYue_M_ShiYanShi]
GO
ALTER TABLE [dbo].[T_YuYue]  WITH CHECK ADD  CONSTRAINT [FK_T_YuYue_M_ZuoWei] FOREIGN KEY([zuoweibianhao])
REFERENCES [dbo].[M_ZuoWei] ([zidongbianhao])
GO
ALTER TABLE [dbo].[T_YuYue] CHECK CONSTRAINT [FK_T_YuYue_M_ZuoWei]
GO
USE [master]
GO
ALTER DATABASE [ShiYanShi] SET  READ_WRITE 
GO
