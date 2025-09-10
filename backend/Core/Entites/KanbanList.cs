using System;

namespace Core.Entites;

public enum ListType
{
  Todo = 1,
  Doing = 2,
  Done = 3,
}

public class KanbanList
{
  public int Id { get; set; }
  public required ListType Type { get; set; }
  public required string Title { get; set; } = string.Empty;
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

  //Foreign Key 
  public int BoardId { get; set; }

  //Properties to help with navigation
  public Board Board { get; set; } = null!;
  public ICollection<Card> Cards { get; set; } = new List<Card>();
}
