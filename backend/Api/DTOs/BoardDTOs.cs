using System;
using System.ComponentModel.DataAnnotations;

namespace Api.DTOs;

public class CreateBoardRequest
{
  [Required]
  [StringLength(200, MinimumLength = 1)]
  public string Title { get; set; } = string.Empty;
}

public class UpdateBoardRequest
{
  [Required]
  [StringLength(200, MinimumLength = 1)]
  public string Title { get; set; } = string.Empty;
}

public class BoardResponse
{
  public int Id { get; set; }
  public string Title { get; set; } = string.Empty;
  public DateTime CreatedAt { get; set; }
}
