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
    public class T_ZiYuanController : ApiController
    {
        private ShiYanShiEntities db = new ShiYanShiEntities();

        // GET: api/T_ZiYuan
        public IQueryable<object> GetT_ZiYuan()
        {
            return from z in db.T_ZiYuan
                   select new {
                       z.zidongbianhao,
                       z.biaoti,
                       z.shuoming,
                       z.url
                   };
        }

        // GET: api/T_ZiYuan/5
        [ResponseType(typeof(T_ZiYuan))]
        public async Task<IHttpActionResult> GetT_ZiYuan(int id)
        {
            T_ZiYuan t_ZiYuan = await db.T_ZiYuan.FindAsync(id);
            if (t_ZiYuan == null)
            {
                return NotFound();
            }

            return Ok(t_ZiYuan);
        }

        // PUT: api/T_ZiYuan/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutT_ZiYuan(int id, T_ZiYuan t_ZiYuan)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != t_ZiYuan.zidongbianhao)
            {
                return BadRequest();
            }

            db.Entry(t_ZiYuan).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!T_ZiYuanExists(id))
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

        // POST: api/T_ZiYuan
        [ResponseType(typeof(T_ZiYuan))]
        public async Task<IHttpActionResult> PostT_ZiYuan(T_ZiYuan t_ZiYuan)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.T_ZiYuan.Add(t_ZiYuan);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = t_ZiYuan.zidongbianhao }, t_ZiYuan);
        }

        // DELETE: api/T_ZiYuan/5
        [ResponseType(typeof(T_ZiYuan))]
        public async Task<IHttpActionResult> DeleteT_ZiYuan(int id)
        {
            T_ZiYuan t_ZiYuan = await db.T_ZiYuan.FindAsync(id);
            if (t_ZiYuan == null)
            {
                return NotFound();
            }

            db.T_ZiYuan.Remove(t_ZiYuan);
            await db.SaveChangesAsync();

            return Ok(t_ZiYuan);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool T_ZiYuanExists(int id)
        {
            return db.T_ZiYuan.Count(e => e.zidongbianhao == id) > 0;
        }
    }
}