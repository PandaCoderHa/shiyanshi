using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace ShiYanShiYuDing.Controllers
{
    public class ImageController : ApiController
    {
        ///// <summary>
        ///// 上传文件
        ///// </summary>
        ///// <returns></returns>
        //[HttpPost]
        //public string PostFiles()
        //{
        //    string result = "";
        //    HttpFileCollection filelist = HttpContext.Current.Request.Files;
        //    if (filelist != null && filelist.Count > 0)
        //    {
        //        for (int i = 0; i < filelist.Count; i++)
        //        {
        //            HttpPostedFile file = filelist[i];
        //            String Tpath = "/" + DateTime.Now.ToString("yyyy-MM-dd") + "/";
        //            string filename = file.FileName;
        //            string FileName = DateTime.Now.ToString("yyyyMMddHHmmssfff");
        //            string FilePath =  . System.Web.Hosting.HostingEnvironment.MapPath("~/")+ "\\" + Tpath + "\\";
        //            DirectoryInfo di = new DirectoryInfo(FilePath);
        //            if (!di.Exists) { di.Create(); }
        //            try
        //            {
        //                file.SaveAs(FilePath + FileName);
        //                result.obj = (Tpath + FileName).Replace("\\", "/");
        //            }
        //            catch (Exception ex)
        //            {
        //                result = "上传文件写入失败：" + ex.Message;
        //            }
        //        }
        //    }
        //    else
        //    {
        //        result = "上传的文件信息不存在！";
        //    }

        //    return result;
        //}


        
        public async Task<string> PostImage()
        {
            try
            {
                //web api 获取项目根目录下指定的文件下
                var root = System.Web.Hosting.HostingEnvironment.MapPath("/Imgs");
                if (!Directory.Exists(root))
                {
                    Directory.CreateDirectory(root);
                }
                var provider = new MultipartFormDataStreamProvider(root);

                //文件已经上传  但是文件没有后缀名  需要给文件添加后缀名
                await Request.Content.ReadAsMultipartAsync(provider);
                string resultPath = "";
                foreach (var file in provider.FileData)
                {
                    //这里获取含有双引号'" '
                    string filename = file.Headers.ContentDisposition.FileName.Trim('"');
                    //获取对应文件后缀名
                    string fileExt = filename.Substring(filename.LastIndexOf('.'));

                    FileInfo fileinfo = new FileInfo(file.LocalFileName);
                    //fileinfo.Name 上传后的文件路径 此处不含后缀名 
                    //修改文件名 添加后缀名
                    string newFilename = fileinfo.Name + fileExt;
                    //最后保存文件路径
                    resultPath = Path.Combine(root, newFilename);
                    fileinfo.MoveTo(resultPath);
                }
                return resultPath;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
