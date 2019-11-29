using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;
using API.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
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


        //Check if account is active
        //returns to frontend 200 and bool value
        [HttpGet]
        [Route("CheckUser/{email}")]
        public IActionResult CheckUser(string email)
        { 
         ObjectResult temp = Ok(_userService.CheckUser(email));
         return temp;

        }


         //Check if account is active
        //returns to frontend 200 and bool value
        [HttpGet]
        [Route("ConfirmMail/{token}")]
        public async Task<IActionResult> ConfirmMail(string token)
        { 
            Console.WriteLine("Inside ConfirmMail {0} \n \n",token);
         ObjectResult temp = Ok(await _userService.ConfirmMail(token));
         return temp;

        }



        [HttpDelete]
        [Route("DeleteUser/{Id}")]
        public async Task<IActionResult> DeleteUser(int Id)
        {
            return Ok(await _userService.DeleteUser(Id));
        }
    }
}
