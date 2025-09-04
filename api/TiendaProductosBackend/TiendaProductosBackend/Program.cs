using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
   options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Fix: Correctly access the CORS policy configuration by using builder.Services.AddCors
builder.Services.AddCors(options =>
   options.AddPolicy("AllowAll", policy =>
       policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
             .AllowAnyMethod()
             .AllowAnyHeader()
             .AllowCredentials()));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
