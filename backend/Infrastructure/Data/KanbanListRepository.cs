using Core.Entites;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class KanbanListRepository(KanbanDbContext dbContext) : IKanbanListRepository
{
  private readonly KanbanDbContext _dbContext = dbContext;

  public async Task<IEnumerable<KanbanList>> GetListsByBoardIdAsync(int boardId)
  {
    var lists = await _dbContext.KanbanLists
        .Where(l => l.BoardId == boardId)
        .OrderBy(l => l.Position)
        .ToListAsync();
    return lists;
  }

  public async Task<KanbanList?> GetListByIdAsync(int id)
  {
    var list = await _dbContext.KanbanLists.FindAsync(id);
    return list;
  }

  public async Task<KanbanList?> UpdateListTitleAsync(int id, string title)
  {
    var existingList = await _dbContext.KanbanLists.FindAsync(id);

    if (existingList == null) return null;

    // Update the properties of the tracked entity
    existingList.Title = title;

    await _dbContext.SaveChangesAsync();
    return existingList;
  }
}