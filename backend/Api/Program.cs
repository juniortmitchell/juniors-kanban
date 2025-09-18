using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
      options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
      options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

//cors - More permissive for development
builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(policy =>
  {
    policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
  });
});

builder.Services.AddDbContext<KanbanDbContext>(options => options.UseInMemoryDatabase("InMemory"));

builder.Services.AddScoped<IBoardRepository, BoardRepository>();
builder.Services.AddScoped<IKanbanListRepository, KanbanListRepository>();
builder.Services.AddScoped<ICardRepository, CardRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(); // Use the default policy

app.MapControllers();

app.Run();