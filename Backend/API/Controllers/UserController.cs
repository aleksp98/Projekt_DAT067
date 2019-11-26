using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NGCI.Model;
using NGCI.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NGCI.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("Users")]
        public async Task<IActionResult> Users()
        {
            return Ok(await _userService.GetUsers());
        }

        [HttpPost]
        [Route("SaveUser")]
        public async Task<IActionResult> SaveUser([FromBody] UserItem model)
        {
            return Ok(await _userService.SaveUser(model));
        }

        [HttpDelete]
        [Route("DeleteUser/{Id}")]
        public async Task<IActionResult> DeleteUser(int Id)
        {
            return Ok(await _userService.DeleteUser(Id));
        }
    }
}
