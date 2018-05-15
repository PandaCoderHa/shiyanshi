using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using ShiYanShiYuDing.Models;

namespace ShiYanShiYuDing.Controllers
{
    public class T_YuYueController : ApiController
    {
        private ShiYanShiEntities db = new ShiYanShiEntities();

        // GET: api/T_YuYue
        public IList<object> GetT_YuYue()
        {
            var tb1 = (from yy in db.T_YuYue
                      select new
                       {
                           yy.zidongbianhao,
                           yy.xueshengbianhao,
                           yy.xueshengxingming,
                           yy.jiaoshibianhao,
                           shiyanshihao = yy.M_ShiYanShi.zidongbianhao,
                           shiyanshiMing = yy.M_ShiYanShi.mingzi,
                           zuoweihao = yy.M_ZuoWei.zidongbianhao,
                           zuoweiMing = yy.M_ZuoWei.zuoweimingcheng,
                           yy.xiangmu,
                           yy.zhidaojiaoshi,
                           yy.banji,
                           yy.yuyuekaishiriqi,
                          yy.yuyuejieshuriqi,
                          yy.xueyuan
                       }).ToList();

            var result = (from yy in tb1
                          where yy.yuyuekaishiriqi >= new DateTime( DateTime.Now.Year,1,1)
                          orderby yy.zidongbianhao descending
                          select new
                          {
                              yy.zidongbianhao,
                              yy.xueshengbianhao,
                              yy.xueshengxingming,
                              yy.jiaoshibianhao,
                              yy.shiyanshihao,
                              yy.shiyanshiMing,
                              yy.zuoweihao,
                              yy.zuoweiMing,
                              yy.xiangmu,
                              yy.banji,
                              yy.zhidaojiaoshi,
                              kaishi = yy.yuyuekaishiriqi.ToString("yyyy-MM-dd HH:mm"),
                              jieshu = yy.yuyuejieshuriqi.ToString("yyyy-MM-dd HH:mm"),
                              yy.xueyuan
                          }).ToList<object>();
            return result;
        }

        // GET api/T_YuYue?user={user}&shiyanshihao={shiyanshihao}
        public IList<object> GetT_YuYue(string user, int shiyanshihao)
        {
            var tb1 = (from yy in db.T_YuYue
                       where yy.xueshengbianhao == ((user != "-1" && user.ToString().Length == 10) ? user : yy.xueshengbianhao)
                       && yy.jiaoshibianhao == ((user !="-1" && user.ToString().Length == 8) ? user : yy.jiaoshibianhao)
                       && (yy.M_ShiYanShi.zidongbianhao == ((shiyanshihao != -1) ? shiyanshihao : yy.M_ShiYanShi.zidongbianhao))
                       select new
                       {
                           yy.zidongbianhao,
                           yy.xueshengbianhao,
                           yy.xueshengxingming,
                           yy.jiaoshibianhao,
                           shiyanshihao = yy.M_ShiYanShi.zidongbianhao,
                           shiyanshiMing = yy.M_ShiYanShi.mingzi,
                           zuoweihao = yy.M_ZuoWei.zidongbianhao,
                           zuoweiMing = yy.M_ZuoWei.zuoweimingcheng,
                           yy.xiangmu,
                           yy.zhidaojiaoshi,
                           yy.banji,
                           yy.yuyuekaishiriqi,
                           yy.yuyuejieshuriqi,
                           yy.xueyuan
                       }).ToList();

            var result = (from yy in tb1
                          where yy.yuyuekaishiriqi >= DateTime.Now
                          select new
                          {
                              yy.zidongbianhao,
                              yy.xueshengbianhao,
                              yy.xueshengxingming,
                              yy.jiaoshibianhao,
                              yy.shiyanshihao,
                              yy.shiyanshiMing,
                              yy.zuoweihao,
                              yy.zuoweiMing,
                              yy.xiangmu,
                              yy.zhidaojiaoshi,
                              yy.banji,
                              kaishi = yy.yuyuekaishiriqi.ToString("yyyy-MM-d HH:mm"),
                              jieshu = yy.yuyuejieshuriqi.ToString("yyyy-MM-d HH:mm"),
                              yy.xueyuan
                          }).ToList<object>();
            return result;
        }

        // GET: api/T_YuYue/5
        [ResponseType(typeof(T_YuYue))]
        public async Task<IHttpActionResult> GetT_YuYue(int id)
        {
            T_YuYue t_YuYue = await db.T_YuYue.FindAsync(id);
            if (t_YuYue == null)
            {
                return NotFound();
            }

            return Ok(t_YuYue);
        }

        // PUT: api/T_YuYue/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutT_YuYue(int id, T_YuYue t_YuYue)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != t_YuYue.zidongbianhao)
            {
                return BadRequest();
            }

            db.Entry(t_YuYue).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!T_YuYueExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/T_YuYue
        [ResponseType(typeof(T_YuYue))]
        public async Task<IHttpActionResult> PostT_YuYue(T_YuYue t_YuYue, int shiyanshihao, int zuoweihao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            t_YuYue.M_ShiYanShi = db.M_ShiYanShi.First(s => s.zidongbianhao == shiyanshihao);
            t_YuYue.M_ZuoWei = db.M_ZuoWei.First(z => z.zidongbianhao == zuoweihao);

            db.T_YuYue.Add(t_YuYue);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = t_YuYue.zidongbianhao }, t_YuYue);
        }

        // DELETE: api/T_YuYue/5
        [ResponseType(typeof(T_YuYue))]
        public async Task<IHttpActionResult> DeleteT_YuYue(int id)
        {
            T_YuYue t_YuYue = await db.T_YuYue.FindAsync(id);
            if (t_YuYue == null)
            {
                return NotFound();
            }

            db.T_YuYue.Remove(t_YuYue);
            await db.SaveChangesAsync();

            return Ok(t_YuYue);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool T_YuYueExists(int id)
        {
            return db.T_YuYue.Count(e => e.zidongbianhao == id) > 0;
        }
    }
}