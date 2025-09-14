using Api.DTOs;
using Core.Entites;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ListsController(IKanbanListRepository repo) : ControllerBase
{
  private readonly IKanbanListRepository _repo = repo;

  [HttpGet("board/{boardId}")]
  public async Task<ActionResult<IEnumerable<KanbanListResponse>>> GetListsByBoardId(int boardId)
  {
    var lists = await _repo.GetListsByBoardIdAsync(boardId);
    var response = lists.Select(l => new KanbanListResponse
    {
      Id = l.Id,
      Title = l.Title,
      Type = l.Type.ToString(),
      // Position = l.Position,
      BoardId = l.BoardId,
      CreatedAt = l.CreatedAt
    });
    return Ok(response);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<KanbanListResponse>> GetListById(int id)
  {
    var list = await _repo.GetListByIdAsync(id);

    if (list == null)
    {
      return NotFound($"List with ID {id} not found");
    }

    var response = new KanbanListResponse
    {
      Id = list.Id,
      Title = list.Title,
      Type = list.Type.ToString(),
      // Position = list.Position,
      BoardId = list.BoardId,
      CreatedAt = list.CreatedAt
    };

    return Ok(response);
  }

  [HttpPut("{id}")]
  public async Task<ActionResult<KanbanListResponse>> UpdateList(int id, [FromBody] UpdateKanbanListRequest request)
  {
    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }

    var updatedList = await _repo.UpdateListTitleAsync(id, request.Title);

    if (updatedList == null)
    {
      return NotFound($"List with ID {id} not found");
    }

    var response = new KanbanListResponse
    {
      Id = updatedList.Id,
      Title = updatedList.Title,
      Type = updatedList.Type.ToString(),
      BoardId = updatedList.BoardId,
      CreatedAt = updatedList.CreatedAt
    };

    return Ok(response);
  }
}