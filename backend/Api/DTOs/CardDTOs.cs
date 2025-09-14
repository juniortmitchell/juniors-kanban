using System.ComponentModel.DataAnnotations;

namespace Api.DTOs;

public class CardResponse
{
  public int Id { get; set; }
  public string Title { get; set; } = string.Empty;
  public string? Description { get; set; }
  public int Position { get; set; }
  public int ListId { get; set; }
  public DateTime CreatedAt { get; set; }
}

public class CreateCardRequest
{
  [Required]
  [StringLength(200, MinimumLength = 1)]
  public string Title { get; set; } = string.Empty;

  [StringLength(2000)]
  public string? Description { get; set; }

  [Required]
  public int ListId { get; set; }
}

public class UpdateCardRequest
{
  [Required]
  [StringLength(200, MinimumLength = 1)]
  public string Title { get; set; } = string.Empty;

  [StringLength(2000)]
  public string? Description { get; set; }
}

public class MoveCardRequest
{
  [Required]
  public int TargetListId { get; set; }

  [Required]
  public int Position { get; set; }
}