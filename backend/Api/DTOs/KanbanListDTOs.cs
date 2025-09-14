using System.ComponentModel.DataAnnotations;

namespace Api.DTOs;

public class KanbanListResponse
{
  public int Id { get; set; }
  public string Title { get; set; } = string.Empty;
  public string Type { get; set; } = string.Empty;
  public int BoardId { get; set; }
  public DateTime CreatedAt { get; set; }
}

public class UpdateKanbanListRequest
{
  [Required]
  [StringLength(100, MinimumLength = 1)]
  public string Title { get; set; } = string.Empty;
}