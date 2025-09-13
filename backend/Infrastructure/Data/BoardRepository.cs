using System;
using Core.Entites;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class BoardRepository(KanbanDbContext dbContext) : IBoardRepository
{
  private readonly KanbanDbContext _dbContext = dbContext;
  public async Task<Board> CreateBoardAsync(string title)
  {
    Board newBoard = new Board() { Title = title };
    await _dbContext.Boards.AddAsync(newBoard);
    await _dbContext.SaveChangesAsync();
    return newBoard;
  }

  public async Task<Board?> DeleteBoardAsync(int boardId)
  {
    var itemToDelete = await _dbContext.Boards.FindAsync(boardId);

    if (itemToDelete != null)
    {
      _dbContext.Boards.Remove(itemToDelete);
      await _dbContext.SaveChangesAsync();
      return itemToDelete;
    }

    return null;
  }

  public async Task<Board?> GetBoardByIdAsync(int id)
  {

    var board = await _dbContext.Boards.FindAsync(id);

    if (board != null)
    {
      return board;
    }

    return null;
  }

  public async Task<IEnumerable<Board>> GetBoardsAsync()
  {
    var boards = await _dbContext.Boards.ToListAsync();
    return boards;
  }

  public Task<Board?> UpdateBoardAsync(Board board)
  {
    // var existingBoard = await _dbContext.Boards.FindAsync(board.Id);

    // if (existingBoard == null) return null;

    // existingBoard = board;

    // _dbContext.Boards.Update(board);
    // await _dbContext.SaveChangesAsync();
    // return existingBoard;
    throw new NotImplementedException();
  }
}
