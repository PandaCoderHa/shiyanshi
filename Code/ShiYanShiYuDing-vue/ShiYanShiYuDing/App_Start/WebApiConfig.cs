using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ShiYanShiYuDing
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            var cors = new EnableCorsAttribute(origins: "*", headers: "*", methods: "*");
            
            config.EnableCors(cors);
            // Web API routes
            config.MapHttpAttributeRoutes();
            //config.Formatters.JsonFormatter.SerializerSettings.Converters.Add(new IsoDateTimeConverter.DateTimeStyles = { },DateTimeStyles.AdjustToUniversal);
            config.Formatters.JsonFormatter.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
