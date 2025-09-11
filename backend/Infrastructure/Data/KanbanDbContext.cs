using System;
using Core.Entites;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class KanbanDbContext(DbContextOptions options) : DbContext(options)
{
  public DbSet<Board> Boards { get; set; }
  public DbSet<Card> Cards { get; set; }
  public DbSet<KanbanList> KanbanLists { get; set; }

}
