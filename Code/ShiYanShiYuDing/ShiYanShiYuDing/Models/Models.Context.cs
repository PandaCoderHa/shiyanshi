﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace ShiYanShiYuDing.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ShiYanShiEntities : DbContext
    {
        public ShiYanShiEntities()
            : base("name=ShiYanShiEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<M_ShiYanShi> M_ShiYanShi { get; set; }
        public virtual DbSet<M_ZuoWei> M_ZuoWei { get; set; }
        public virtual DbSet<T_ShiYanShiBuKeYongShiJian> T_ShiYanShiBuKeYongShiJian { get; set; }
        public virtual DbSet<T_YuYue> T_YuYue { get; set; }
        public virtual DbSet<T_ZiYuan> T_ZiYuan { get; set; }
        public virtual DbSet<T_XiangMu> T_XiangMu { get; set; }
    }
}
