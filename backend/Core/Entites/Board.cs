using System;

namespace Core.Entites;

public class Board
{
  public int Id { get; set; }
  public required string Title { get; set; }
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  public ICollection<KanbanList> Lists { get; set; } = [];
}
