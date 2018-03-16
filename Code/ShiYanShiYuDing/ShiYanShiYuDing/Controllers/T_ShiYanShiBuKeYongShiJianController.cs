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
    public class T_ShiYanShiBuKeYongShiJianController : ApiController
    {
        private ShiYanShiEntities db = new ShiYanShiEntities();

        // GET: api/T_ShiYanShiBuKeYongShiJian
        public IQueryable<object> GetT_ShiYanShiBuKeYongShiJian()
        {
            return from sysbky in db.T_ShiYanShiBuKeYongShiJian
                   select new
                   {
                       sysbky.zidongbianhao,
                       sysbky.kaishiriqi,
                       sysbky.jieshuriqi,
                       sysbky.zhouji,
                       sysbky.kaishizhou,
                       sysbky.jieshuzhou
                   };
        }
        public IList<object> GetT_ShiYanShiBuKeYongShiJianByShiYanShi(int shiyanshihao)
        {
            //return db.T_ShiYanShiBuKeYongShiJian;
            var tb1 = (from sysbky in db.T_ShiYanShiBuKeYongShiJian
                   where sysbky.M_ShiYanShi.zidongbianhao == shiyanshihao
                   select new
                   {
                       sysbky.zidongbianhao,
                       kaishiriqi = sysbky.kaishiriqi,
                       jieshuriqi=sysbky.jieshuriqi,
                       sysbky.zhouji,
                       sysbky.kaishizhou,
                       sysbky.jieshuzhou
                   }).ToList();
            return (from sysbky in tb1
                    orderby sysbky.zhouji
                   select new
                   {
                       sysbky.zidongbianhao,
                       kaishiriqi = sysbky.kaishiriqi.ToString("HH:mm"),
                       jieshuriqi = sysbky.jieshuriqi.ToString("HH:mm"),
                       sysbky.zhouji,
                       sysbky.kaishizhou,
                       sysbky.jieshuzhou
                   }).ToList<object>();
        }
        public string formatTiem(DateTime a)
        {
            return a.ToString();
        }

        // GET: api/T_ShiYanShiBuKeYongShiJian/5
        [ResponseType(typeof(T_ShiYanShiBuKeYongShiJian))]
        public async Task<IHttpActionResult> GetT_ShiYanShiBuKeYongShiJian(int id)
        {
            T_ShiYanShiBuKeYongShiJian t_ShiYanShiBuKeYongShiJian = await db.T_ShiYanShiBuKeYongShiJian.FindAsync(id);
            if (t_ShiYanShiBuKeYongShiJian == null)
            {
                return NotFound();
            }

            return Ok(t_ShiYanShiBuKeYongShiJian);
        }

        // PUT: api/T_ShiYanShiBuKeYongShiJian/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutT_ShiYanShiBuKeYongShiJian(int id, T_ShiYanShiBuKeYongShiJian t_ShiYanShiBuKeYongShiJian)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //if (id != t_ShiYanShiBuKeYongShiJian.zidongbianhao)
            //{
            //    return BadRequest();
            //}

            var old = db.T_ShiYanShiBuKeYongShiJian.FirstOrDefault(z => z.zidongbianhao == id);
            old.zhouji = t_ShiYanShiBuKeYongShiJian.zhouji;
            old.kaishiriqi = t_ShiYanShiBuKeYongShiJian.kaishiriqi;
            old.jieshuriqi = t_ShiYanShiBuKeYongShiJian.jieshuriqi;
            old.gengxinriqi = t_ShiYanShiBuKeYongShiJian.gengxinriqi;
            old.kaishizhou = t_ShiYanShiBuKeYongShiJian.kaishizhou;
            old.jieshuzhou = t_ShiYanShiBuKeYongShiJian.jieshuzhou;
            db.Entry(old).State = EntityState.Modified;


            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!T_ShiYanShiBuKeYongShiJianExists(id))
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

        // POST: api/T_ShiYanShiBuKeYongShiJian
        [ResponseType(typeof(T_ShiYanShiBuKeYongShiJian))]
        public async Task<IHttpActionResult> PostT_ShiYanShiBuKeYongShiJian(T_ShiYanShiBuKeYongShiJian t_ShiYanShiBuKeYongShiJian, int shiyanshibianhao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            t_ShiYanShiBuKeYongShiJian.M_ShiYanShi = db.M_ShiYanShi.FirstOrDefault(s => s.zidongbianhao == shiyanshibianhao);

            db.T_ShiYanShiBuKeYongShiJian.Add(t_ShiYanShiBuKeYongShiJian);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = t_ShiYanShiBuKeYongShiJian.zidongbianhao }, t_ShiYanShiBuKeYongShiJian);
        }

        // DELETE: api/T_ShiYanShiBuKeYongShiJian/5
        [ResponseType(typeof(T_ShiYanShiBuKeYongShiJian))]
        public async Task<IHttpActionResult> DeleteT_ShiYanShiBuKeYongShiJian(int id)
        {
            T_ShiYanShiBuKeYongShiJian t_ShiYanShiBuKeYongShiJian = await db.T_ShiYanShiBuKeYongShiJian.FindAsync(id);
            if (t_ShiYanShiBuKeYongShiJian == null)
            {
                return NotFound();
            }

            db.T_ShiYanShiBuKeYongShiJian.Remove(t_ShiYanShiBuKeYongShiJian);
            await db.SaveChangesAsync();

            return Ok(t_ShiYanShiBuKeYongShiJian);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool T_ShiYanShiBuKeYongShiJianExists(int id)
        {
            return db.T_ShiYanShiBuKeYongShiJian.Count(e => e.zidongbianhao == id) > 0;
        }
    }
}