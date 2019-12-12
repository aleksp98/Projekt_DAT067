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
    public class LanguageController : Controller
    {
        private readonly ILanguageService _languageService;
        public LanguageController(ILanguageService languageService)
        {
            _languageService = languageService;
        }

        [HttpGet]
        [Route("Search/{Id}")]
        public async Task<IActionResult> Search2(int Id)
        {
             Console.WriteLine("Inside ConfirmMail {0} \n \n");
            return Ok(await _languageService.Search(Id));
        }

          
            [HttpGet]
        [Route("SearchText/{Id}")]
        public async Task<IActionResult> SearchText(string text)
        {
             Console.WriteLine("Inside SearchText {0} \n \n");
            return Ok(await _languageService.SearchText(text));
        }


         
        
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Update([FromBody] LanguageItem model)
        {
            return Ok(await _languageService.Update(model));                
        }
        
        [HttpDelete]
        [Route("Delete/{Id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            return Ok(await _languageService.Delete(Id));
        }
    }
}
