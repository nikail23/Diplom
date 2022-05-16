using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using System.Globalization;
using Microsoft.AspNetCore.Localization;
using FlowerShop.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace FlowerShop
{
    public class Startup
    {
        public IConfiguration Configuration;

        public static class Settings
        {
            public static IConfiguration Configuration;
        }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            Settings.Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = "Server=WIN-FRQSB8E8M2S\\SQLEXPRESS;Database=FlowerShop;Trusted_Connection=True;";
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connectionString));

            services.AddControllers().AddNewtonsoftJson();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(o =>
            {
                o.Authority = Configuration["Jwt:Authority"];
                o.Audience = Configuration["Jwt:Audience"];
                o.RequireHttpsMetadata = false;
                o.SaveToken = true;

                o.Events = new JwtBearerEvents()
                {
                    OnAuthenticationFailed = c =>
                    {
                        c.NoResult();

                        c.Response.StatusCode = 500;
                        c.Response.ContentType = "text/plain";

                        return c.Response.WriteAsync("An error occured processing your authentication.");
                    }
                };
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Manager", policy => policy.RequireClaim("user_roles", "[Manager]"));
                options.AddPolicy("User", policy => policy.RequireClaim("user_roles", "[User]"));
            });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "client/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseCors(option =>
               option.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   );

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "client";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
