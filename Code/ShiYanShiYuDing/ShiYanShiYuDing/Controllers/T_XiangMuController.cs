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
    public class T_XiangMuController : ApiController
    {
        private ShiYanShiEntities db = new ShiYanShiEntities();

        // GET: api/T_XiangMu
        public IQueryable<object> GetT_XiangMu()
        {
            //return db.T_XiangMu;
            return from x in db.T_XiangMu
                   orderby x.xueyuan,x.xiangmuming
                   select new
                   {
                       x.zidongbianhao,
                       x.xueyuan,
                       x.xiangmuming
                   };
        }

        // GET: api/T_XiangMu/5
        [ResponseType(typeof(T_XiangMu))]
        public async Task<IHttpActionResult> GetT_XiangMu(int id)
        {
            T_XiangMu t_XiangMu = await db.T_XiangMu.FindAsync(id);
            if (t_XiangMu == null)
            {
                return NotFound();
            }

            return Ok(t_XiangMu);
        }

        // PUT: api/T_XiangMu/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutT_XiangMu(int id, T_XiangMu t_XiangMu)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //if (id != t_XiangMu.zidongbianhao)
            //{
            //    return BadRequest();
            //}

            var old = db.T_XiangMu.FirstOrDefault(x => x.zidongbianhao == id);
            old.xueyuan = t_XiangMu.xueyuan;
            old.xiangmuming = t_XiangMu.xiangmuming;

            db.Entry(old).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!T_XiangMuExists(id))
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

        // POST: api/T_XiangMu
        [ResponseType(typeof(T_XiangMu))]
        public async Task<IHttpActionResult> PostT_XiangMu(T_XiangMu t_XiangMu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.T_XiangMu.Add(t_XiangMu);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = t_XiangMu.zidongbianhao }, t_XiangMu);
        }

        // DELETE: api/T_XiangMu/5
        [ResponseType(typeof(T_XiangMu))]
        public async Task<IHttpActionResult> DeleteT_XiangMu(int id)
        {
            T_XiangMu t_XiangMu = await db.T_XiangMu.FindAsync(id);
            if (t_XiangMu == null)
            {
                return NotFound();
            }

            db.T_XiangMu.Remove(t_XiangMu);
            await db.SaveChangesAsync();

            return Ok(t_XiangMu);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool T_XiangMuExists(int id)
        {
            return db.T_XiangMu.Count(e => e.zidongbianhao == id) > 0;
        }
    }
}