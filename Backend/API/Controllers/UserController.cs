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
           
              Console.WriteLine("SaveUser start 1\n \n \n \n");
             OkObjectResult ok = Ok(await _userService.SaveUser(model));   


             //kalla på funktionen här under
             Console.WriteLine("Email: {0}      FirstName: {1}\n \n \n \n",model.Email,model.First_name);

             Mail.sendMail(model.Email,model.First_name,model.Last_name, model.Token);
             
            return ok ;
        }


        //Check if account is active

        //returns to frontend 200 and bool value
        [HttpGet]
        [Route("CheckUser/{email}")]
        public async Task<IActionResult> CheckUser(string email)
        { 
         return Ok(await _userService.CheckUser(email));

        }

          /*
        [HttpPost]
        [Route("SaveUser")]
        public async Task<IActionResult> SaveUser([FromBody] UserItem model)
        {
            return Ok(await _userService.SaveUser(model));
        }
   */

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



        [HttpPost]
        [Route("LoginUser")]
        public async Task<IActionResult> LoginUser([FromBody] UserItem model)
        {
            return Ok(await _userService.LoginUser(model));
        }


        [HttpDelete]
        [Route("DeleteUser/{Id}")]
        public async Task<IActionResult> DeleteUser(int Id)
        {
            return Ok(await _userService.DeleteUser(Id));
        }
    }
}
