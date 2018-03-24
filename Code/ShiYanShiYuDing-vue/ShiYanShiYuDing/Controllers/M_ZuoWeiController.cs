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
using Newtonsoft.Json;

namespace ShiYanShiYuDing.Controllers
{
    public class M_ZuoWeiController : ApiController
    {
        private ShiYanShiEntities db = new ShiYanShiEntities();

        // GET: api/M_ZuoWei
        public IQueryable<object> GetM_ZuoWei()
        {
            return from z in db.M_ZuoWei.Include(zw => zw.M_ShiYanShi)
                   orderby z.zhuohao
                   select new
                   {
                       z.zuoweimingcheng,
                       z.zidongbianhao,
                       z.zhuohao,
                       z.M_ShiYanShi.mingzi,
                       M_ShiYanShi_zidongbianhao = z.M_ShiYanShi.zidongbianhao

                   };
        }

        // GET api/M_ZuoWei?shiyanshihao={shiyanshihao}
        public IQueryable<object> GetM_ZuoWeiByShiyanshi(int shiyanshihao)
        {
            return from z in db.M_ZuoWei.Include(zw => zw.M_ShiYanShi)
                   where z.M_ShiYanShi.zidongbianhao == shiyanshihao
                   orderby z.zhuohao
                   select new
                   {
                       z.zuoweimingcheng,
                       z.zidongbianhao,
                       z.zhuohao,
                       z.M_ShiYanShi.mingzi,
                       M_ShiYanShi_zidongbianhao = z.M_ShiYanShi.zidongbianhao

                   };
        }

        // GET: api/M_ZuoWei/5
        [ResponseType(typeof(M_ZuoWei))]
        public async Task<IHttpActionResult> GetM_ZuoWei(int id)
        {
            M_ZuoWei m_ZuoWei = await db.M_ZuoWei.FindAsync(id);
            if (m_ZuoWei == null)
            {
                return NotFound();
            }

            return Ok(m_ZuoWei.zuoweimingcheng);
        }

        // PUT: api/M_ZuoWei/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutM_ZuoWei(int id, M_ZuoWei m_ZuoWei)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != m_ZuoWei.zidongbianhao)
            {
                return BadRequest();
            }
            //var stateEntry = ((IObjectContextAdapter)db).ObjectContext.
            //   ObjectStateManager.GetObjectStateEntry(m_ZuoWei);
            //stateEntry.SetModifiedProperty("zuoweimingcheng");
            var old = db.M_ZuoWei.FirstOrDefault(z => z.zidongbianhao == id);
            old.zuoweimingcheng = m_ZuoWei.zuoweimingcheng;
            db.Entry(old).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!M_ZuoWeiExists(id))
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

        // POST: api/M_ZuoWei
        [ResponseType(typeof(M_ZuoWei))]
        public async Task<IHttpActionResult> PostM_ZuoWei(M_ZuoWei m_ZuoWei, int shiyanshibianhao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            m_ZuoWei.M_ShiYanShi = db.M_ShiYanShi.FirstOrDefault(s => s.zidongbianhao == shiyanshibianhao);
            db.M_ZuoWei.Add(m_ZuoWei);
            await db.SaveChangesAsync();
            //setHeader("Access-Control-Allow-Origin", "*")
            CreatedAtRoute("DefaultApi", new { id = m_ZuoWei.zidongbianhao }, m_ZuoWei);
            return StatusCode(HttpStatusCode.OK);
        }

        // DELETE: api/M_ZuoWei/5
        [ResponseType(typeof(M_ZuoWei))]
        public async Task<IHttpActionResult> DeleteM_ZuoWei(int id)
        {
            M_ZuoWei m_ZuoWei = await db.M_ZuoWei.FindAsync(id);
            if (m_ZuoWei == null)
            {
                return NotFound();
            }
            //var z = new M_ZuoWei() { zidongbianhao = id };
            if (m_ZuoWei.T_YuYue.Count > 0)
            {
                while (m_ZuoWei.T_YuYue.Count > 0)
                {
                    db.T_YuYue.Remove(m_ZuoWei.T_YuYue.FirstOrDefault());
                }
            }
            db.M_ZuoWei.Remove(m_ZuoWei);
            await db.SaveChangesAsync();

            return Ok(m_ZuoWei);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool M_ZuoWeiExists(int id)
        {
            return db.M_ZuoWei.Count(e => e.zidongbianhao == id) > 0;
        }
    }
}