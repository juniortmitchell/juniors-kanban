using System;

namespace Core.Entites;

public class Board
{
  public int Id { get; set; }
  public required string Title { get; set; }
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

  //foreign key to show who owns it
  //this will be removed later 
  // because am going to add a many to many table for multiuser access
  public int UserId { get; set; }
  public ICollection<KanbanList> Lists { get; set; } = [];
}
