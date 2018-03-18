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
    public class M_ShiYanShiController : ApiController
    {
        private ShiYanShiEntities db = new ShiYanShiEntities();

        // GET: api/M_ShiYanShi
        [HttpGet]
        public IQueryable<object> GetM_ShiYanShi()
        {
            return from sys in db.M_ShiYanShi
                   orderby sys.louceng 
                   select new
                   {
                       sys.zidongbianhao,
                       sys.mingzi,
                       sys.louceng,
                       sys.miaoshu,
                       sys.tupian,
                       sys.fuzeren
                   };
        }

        // GET: api/M_ShiYanShi/5
        [ResponseType(typeof(M_ShiYanShi))]
        public async Task<IHttpActionResult> GetM_ShiYanShi(int id)
        {
            M_ShiYanShi m_ShiYanShi = await db.M_ShiYanShi.FindAsync(id);
            if (m_ShiYanShi == null)
            {
                return NotFound();
            }

            return Ok(m_ShiYanShi);
        }

        // PUT: api/M_ShiYanShi/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutM_ShiYanShi(int id, M_ShiYanShi m_ShiYanShi)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //if (id != m_ShiYanShi.zidongbianhao)
            //{
            //    return BadRequest();
            //}

            var old = db.M_ShiYanShi.FirstOrDefault(s => s.zidongbianhao == id);
            old.mingzi = m_ShiYanShi.mingzi;
            old.shifoutingyong = m_ShiYanShi.shifoutingyong;
            old.gengxinriqi = m_ShiYanShi.gengxinriqi;
            old.louceng = m_ShiYanShi.louceng;
            old.fuzeren = m_ShiYanShi.fuzeren;
            old.miaoshu = m_ShiYanShi.miaoshu;
            if (!string.IsNullOrEmpty(m_ShiYanShi.tupian))
            {
                old.tupian = m_ShiYanShi.tupian;

            }
            db.Entry(old).State = EntityState.Modified;

            //db.Entry(m_ShiYanShi).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!M_ShiYanShiExists(id))
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

        // POST: api/M_ShiYanShi
        [ResponseType(typeof(M_ShiYanShi))]
        public async Task<IHttpActionResult> PostM_ShiYanShi(M_ShiYanShi m_ShiYanShi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.M_ShiYanShi.Add(m_ShiYanShi);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = m_ShiYanShi.zidongbianhao }, m_ShiYanShi);
        }

        // DELETE: api/M_ShiYanShi/5
        [ResponseType(typeof(M_ShiYanShi))]
        public async Task<IHttpActionResult> DeleteM_ShiYanShi(int id)
        {
            M_ShiYanShi m_ShiYanShi = await db.M_ShiYanShi.FindAsync(id);
            if (m_ShiYanShi == null)
            {
                return NotFound();
            }

            db.M_ShiYanShi.Remove(m_ShiYanShi);
            await db.SaveChangesAsync();

            return Ok(m_ShiYanShi);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool M_ShiYanShiExists(int id)
        {
            return db.M_ShiYanShi.Count(e => e.zidongbianhao == id) > 0;
        }
    }
}