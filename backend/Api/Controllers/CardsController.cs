using Api.DTOs;
using Core.Entites;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CardsController(ICardRepository repo) : ControllerBase
{
  private readonly ICardRepository _repo = repo;

  [HttpGet("list/{listId}")]
  public async Task<ActionResult<IEnumerable<CardResponse>>> GetCardsByListId(int listId)
  {
    var cards = await _repo.GetCardsByListIdAsync(listId);
    var response = cards.Select(c => new CardResponse
    {
      Id = c.Id,
      Title = c.Title,
      Description = c.Description,
      Position = c.Position,
      ListId = c.ListId,
      CreatedAt = c.CreatedAt
    });
    return Ok(response);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<CardResponse>> GetCardById(int id)
  {
    var card = await _repo.GetCardByIdAsync(id);

    if (card == null)
    {
      return NotFound($"Card with ID {id} not found");
    }

    var response = new CardResponse
    {
      Id = card.Id,
      Title = card.Title,
      Description = card.Description,
      Position = card.Position,
      ListId = card.ListId,
      CreatedAt = card.CreatedAt
    };

    return Ok(response);
  }

  [HttpPost]
  public async Task<ActionResult<CardResponse>> CreateCard([FromBody] CreateCardRequest request)
  {
    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }
    var newCard = new Card
    {
      Title = request.Title,
      Description = request.Description,
      ListId = request.ListId
    };

    var createdCard = await _repo.CreateCardAsync(newCard);

    var response = new CardResponse
    {
      Id = createdCard.Id,
      Title = createdCard.Title,
      Description = createdCard.Description,
      Position = createdCard.Position,
      ListId = createdCard.ListId,
      CreatedAt = createdCard.CreatedAt
    };

    return CreatedAtAction(nameof(GetCardById), new { id = createdCard.Id }, response);
  }

  [HttpPut("{id}")]
  public async Task<ActionResult<CardResponse>> UpdateCard(int id, [FromBody] UpdateCardRequest request)
  {
    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }

    var cardToUpdate = new Card
    {
      Id = id,
      Title = request.Title,
      Description = request.Description
    };

    var updatedCard = await _repo.UpdateCardAsync(cardToUpdate);

    if (updatedCard == null)
    {
      return NotFound($"Card with ID {id} not found");
    }

    var response = new CardResponse
    {
      Id = updatedCard.Id,
      Title = updatedCard.Title,
      Description = updatedCard.Description,
      Position = updatedCard.Position,
      ListId = updatedCard.ListId,
      CreatedAt = updatedCard.CreatedAt
    };

    return Ok(response);
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteCard(int id)
  {
    var deletedCard = await _repo.DeleteCardAsync(id);

    if (deletedCard == null)
    {
      return NotFound($"Card with ID {id} not found");
    }

    return NoContent();
  }

  [HttpPut("{id}/move")]
  public async Task<ActionResult<CardResponse>> MoveCard(int id, [FromBody] MoveCardRequest request)
  {
    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }

    var movedCard = await _repo.MoveCardAsync(id, request.TargetListId, request.Position);

    if (movedCard == null)
    {
      return NotFound($"Card with ID {id} not found");
    }

    var response = new CardResponse
    {
      Id = movedCard.Id,
      Title = movedCard.Title,
      Description = movedCard.Description,
      Position = movedCard.Position,
      ListId = movedCard.ListId,
      CreatedAt = movedCard.CreatedAt
    };

    return Ok(response);
  }
}