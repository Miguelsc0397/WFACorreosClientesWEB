using WFACorreosClientesWEB.DataAccess;
using WFACorreosClientesWEB.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WFACorreosClientesWEB.service;
using AutoMapper;

namespace WFACorreosClientesWEB
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IEmployee, EmployeeDataAccessLayer>();
            services.AddTransient<IEmployeeService, SqlEmployeeService>();
            services.AddTransient<IChecklistService, SqlChecklistService>();
            services.AddTransient<IPepsicoService, SqlPepsicoService>();
            services.AddTransient<IPepsico, PepsicoDataAccessLayer>();
            services.AddTransient<IKOF, KOFDataAccessLayer>();
            services.AddTransient<IHeineken_Desinstalaciones, HeinekenDesinDataAccessLayer>();
            services.AddTransient<IHeinekenInstalaciones, HeinekenInstDataAccessLayer>();
            services.AddTransient<IChecklistazul, ChecklistazulDataAccessLayer>();
            services.AddTransient<IClientesFiltro, ClientesFiltroDataAccessLayer>();
            services.AddAutoMapper(typeof(Startup));

            services.AddMvc(options => options.EnableEndpointRouting = false);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.Options.StartupTimeout = new System.TimeSpan(0, 0, 80);
                    spa.UseAngularCliServer(npmScript: "start");
                    
                }
            });
        }
    }
}
