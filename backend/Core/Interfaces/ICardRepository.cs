using Core.Entites;

namespace Core.Interfaces;

public interface ICardRepository
{
  Task<IEnumerable<Card>> GetCardsByListIdAsync(int listId);
  Task<Card?> GetCardByIdAsync(int id);
  Task<Card> CreateCardAsync(Card card);
  Task<Card?> UpdateCardAsync(Card card);
  Task<Card?> DeleteCardAsync(int id);
  Task<Card?> MoveCardAsync(int cardId, int targetListId, int position);
}