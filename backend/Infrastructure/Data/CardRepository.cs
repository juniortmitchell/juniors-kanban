using Core.Entites;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class CardRepository(KanbanDbContext dbContext) : ICardRepository
{
  private readonly KanbanDbContext _dbContext = dbContext;

  public async Task<IEnumerable<Card>> GetCardsByListIdAsync(int listId)
  {
    var cards = await _dbContext.Cards
        .Where(c => c.ListId == listId)
        .OrderBy(c => c.Position)
        .ToListAsync();
    return cards;
  }

  public async Task<Card?> GetCardByIdAsync(int id)
  {
    var card = await _dbContext.Cards.FindAsync(id);
    return card;
  }

  public async Task<Card> CreateCardAsync(Card card)
  {
    // Get the next position in the target list
    var maxPosition = await _dbContext.Cards
        .Where(c => c.ListId == card.ListId)
        .MaxAsync(c => (int?)c.Position) ?? 0;

    card.Position = maxPosition + 1;

    await _dbContext.Cards.AddAsync(card);
    await _dbContext.SaveChangesAsync();
    return card;
  }

  public async Task<Card?> UpdateCardAsync(Card card)
  {
    var existingCard = await _dbContext.Cards.FindAsync(card.Id);

    if (existingCard == null) return null;

    // Update the properties of the tracked entity
    existingCard.Title = card.Title;
    existingCard.Description = card.Description;

    await _dbContext.SaveChangesAsync();
    return existingCard;
  }

  public async Task<Card?> DeleteCardAsync(int id)
  {
    var cardToDelete = await _dbContext.Cards.FindAsync(id);

    if (cardToDelete != null)
    {
      _dbContext.Cards.Remove(cardToDelete);
      await _dbContext.SaveChangesAsync();
      return cardToDelete;
    }

    return null;
  }

  public async Task<Card?> MoveCardAsync(int cardId, int targetListId, int position)
  {
    var card = await _dbContext.Cards.FindAsync(cardId);

    if (card == null) return null;

    var oldListId = card.ListId;

    // Update card's list and position
    card.ListId = targetListId;
    card.Position = position;

    // Adjust positions in both old and new lists
    await ReorderCardsInList(oldListId, card.Id);
    await ReorderCardsInList(targetListId, card.Id, position);

    await _dbContext.SaveChangesAsync();
    return card;
  }

  private async Task ReorderCardsInList(int listId, int excludeCardId, int? insertPosition = null)
  {
    var cardsInList = await _dbContext.Cards
        .Where(c => c.ListId == listId && c.Id != excludeCardId)
        .OrderBy(c => c.Position)
        .ToListAsync();

    for (int i = 0; i < cardsInList.Count; i++)
    {
      var newPosition = i + 1;
      if (insertPosition.HasValue && newPosition >= insertPosition.Value)
      {
        newPosition++;
      }
      cardsInList[i].Position = newPosition;
    }
  }
}