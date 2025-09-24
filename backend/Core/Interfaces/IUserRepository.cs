using System;
using Core.Entities;

namespace Core.Interfaces;

public interface IUserRepository
{
  Task<User?> CreateUserAsync(User user);
  Task<User?> GetUserByEmailAsync(string email);

}
