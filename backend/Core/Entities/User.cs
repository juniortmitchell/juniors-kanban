using System;
using System.ComponentModel.DataAnnotations;
using Core.Entites;

namespace Core.Entities;

public class User
{
  public int Id { get; set; }

  [Required]
  [MaxLength(15)]
  public string Username { get; set; } = string.Empty;

  [Required]
  [EmailAddress]
  public string Email { get; set; } = string.Empty;

  [Required]
  public string PasswordHash { get; set; } = string.Empty;

  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

  public ICollection<Board> Boards { get; set; } = [];

}
