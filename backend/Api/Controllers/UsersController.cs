using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IUserRepository repo) : ControllerBase
    {
        private readonly IUserRepository _repo = repo;

        [HttpPost("register")]
        public async Task<ActionResult<User>> CreateUser([FromBody] User user)
        {
            var newUser = await _repo.CreateUserAsync(user);
            return Ok(newUser);
        }
    }
}
