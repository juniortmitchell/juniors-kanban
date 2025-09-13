using System;
using Core.Entites;

namespace Core.Interfaces;

public interface IBoardRepository
{
  public Task<Board> CreateBoardAsync(string title);
  public Task<Board?> DeleteBoardAsync(int boardId);
  public Task<Board?> UpdateBoardAsync(Board board);
  public Task<Board?> GetBoardByIdAsync(int boardId);
  public Task<IEnumerable<Board>> GetBoardsAsync();
}
