using Microsoft.EntityFrameworkCore;
using VideoAppTests.Data;
using VideoAppTests.Services;

namespace VideoAppTests
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddTransient<CategoryService>();
            builder.Services.AddTransient<VideoService>();

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
                
            // Swagger configuration
            builder.Services.AddOpenApiDocument(); // Nswag for OpenAPI/Swagger support
            builder.Services.AddControllers(); // Add support for API controllers

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/error"); // Generic error handling
                app.UseHsts();
            }
            else
            {
                app.UseOpenApi(); // serve OpenAPI/Swagger documents
                app.UseSwaggerUi(settings =>
                {
                    settings.DocumentPath = "/swagger/v1/swagger.json"; // Swagger JSON endpoint
                });
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseRouting();
            app.UseAuthorization(); // Enable authorization middleware

            app.MapControllers(); // Map API controller routes

            app.Run();
        }
    }
}