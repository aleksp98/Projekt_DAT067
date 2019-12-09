using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;
using API.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
           Timer myTimer;
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
                                    //varje 15 minut
              myTimer = new Timer(myTimerCallback, null, 5 *1000, 15*60*1000);
        }



             public async void myTimerCallback(Object obj)
              {
                  Console.WriteLine("Timer triggered \n \n");
                    await _userService.ExpireDate();
                 await _userService.Resend_mail();
              
          }

        [HttpGet]
        [Route("Users")]
        public async Task<IActionResult> Users()
        {
            return Ok(await _userService.GetUsers());
        }

        [HttpGet]
        [Route("User/{id}")]
        public async Task<IActionResult> User(int id)
        {
            return Ok(await _userService.GetUser(id));
        }


        [HttpPost]
        [Route("SaveUser")]
        public async Task<IActionResult> SaveUser([FromBody] UserItem model)
        {
            OkObjectResult ok = Ok(await _userService.SaveUser(model));   

            //send the confirmation mail
            await Mail.sendMail(model.Email,model.First_name,model.Last_name, model.Token);
            return ok;
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

        [HttpPost]
        [Route("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UserItem model)
        {
            
            return Ok(await _userService.UpdateUser(model));
        }


        [HttpDelete]
        [Route("DeleteUser/{Id}")]
        public async Task<IActionResult> DeleteUser(int Id)
        {
            return Ok(await _userService.DeleteUser(Id));
        }
    }
}
