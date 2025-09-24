using System;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class UserRepository(KanbanDbContext dbContext) : IUserRepository
{
  private readonly KanbanDbContext _dbContext = dbContext;

  public async Task<User?> CreateUserAsync(User user)
  {
    // Check if email already exists
    if (await EmailExistsAsync(user.Email))
    {
      return null; // Email already exists
    }

    await _dbContext.Users.AddAsync(user);
    await _dbContext.SaveChangesAsync();
    return user;
  }

  public async Task<User?> GetUserByEmailAsync(string email)
  {
    return await _dbContext.Users
        .FirstOrDefaultAsync(u => u.Email == email);
  }

  private async Task<bool> EmailExistsAsync(string email)
  {
    return await _dbContext.Users
        .AnyAsync(u => u.Email == email);
  }
}
