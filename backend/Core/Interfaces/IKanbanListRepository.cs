using Core.Entites;

namespace Core.Interfaces;

public interface IKanbanListRepository
{
  Task<IEnumerable<KanbanList>> GetListsByBoardIdAsync(int boardId);
  Task<KanbanList?> GetListByIdAsync(int id);
  Task<KanbanList?> UpdateListTitleAsync(int id, string title);
}