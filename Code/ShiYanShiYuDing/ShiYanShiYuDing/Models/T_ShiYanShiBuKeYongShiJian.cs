//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class T_ShiYanShiBuKeYongShiJian
    {
        public int zidongbianhao { get; set; }
        public int zhouji { get; set; }
        public System.DateTime kaishiriqi { get; set; }
        public System.DateTime jieshuriqi { get; set; }
        public System.DateTime gengxinriqi { get; set; }
        public Nullable<int> kaishizhou { get; set; }
        public Nullable<int> jieshuzhou { get; set; }
    
        public virtual M_ShiYanShi M_ShiYanShi { get; set; }
    }
}
