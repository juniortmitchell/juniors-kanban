using System;
using System.ComponentModel.DataAnnotations;

namespace Core.Entites;

public class Card
{
  public int Id { get; set; }

  public required string Title { get; set; } = string.Empty;

  [MaxLength(200)]
  public string? Description { get; set; }
  public int Position { get; set; }
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

  //Foreign
  public int ListId { get; set; }

  public KanbanList List { get; set; } = null!;
}
