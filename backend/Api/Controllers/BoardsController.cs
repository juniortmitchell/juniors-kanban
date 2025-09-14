using Api.DTOs;
using Core.Entites;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardsController(IBoardRepository repo) : ControllerBase
    {
        private readonly IBoardRepository _repo = repo;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Board>>> GetBoards()
        {
            var boards = await _repo.GetBoardsAsync();
            return Ok(boards);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Board>> GetBoardById(int id)
        {
            var board = await _repo.GetBoardByIdAsync(id);

            if (board == null)
            {
                return NotFound($"Could not find board with ID {id}");
            }

            return Ok(board);
        }

        [HttpPost]
        public async Task<ActionResult<BoardResponse>> CreateBoard([FromBody] CreateBoardRequest request)
        {
            var newBoard = await _repo.CreateBoardAsync(request.Title);
            var response = new BoardResponse
            {
                Id = newBoard.Id,
                Title = newBoard.Title,
                CreatedAt = newBoard.CreatedAt
            };
            return CreatedAtAction(nameof(GetBoardById), new { id = newBoard.Id }, response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBoard(int id)
        {
            await _repo.DeleteBoardAsync(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BoardResponse>> UpdateBoard(int id, [FromBody] UpdateBoardRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var boardToUpdate = new Board { Id = id, Title = request.Title };
            var updatedBoard = await _repo.UpdateBoardAsync(boardToUpdate);

            if (updatedBoard == null)
            {
                return NotFound($"Could not find board with ID {id}");
            }

            var response = new BoardResponse
            {
                Id = updatedBoard.Id,
                Title = updatedBoard.Title,
                CreatedAt = updatedBoard.CreatedAt
            };

            return Ok(response);
        }
    }
}
