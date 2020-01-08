﻿using System;
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
            Console.WriteLine("Inside constructor\n \n");
        }

        [HttpGet]
        [Route("SearchAll/{text}")]
        public async Task<IActionResult> SearchAll(string text)
        {
             Console.WriteLine("Inside SearchAll {0} \n \n",text);
            return Ok(await _languageService.SearchAll(text));
        }

          
        [HttpGet]
        [Route("SearchText/{text}")]
        public async Task<IActionResult> SearchText(string text)
        {
             Console.WriteLine("Inside SearchText API port {0} \n \n",text);
            return Ok(await _languageService.SearchText(text));
        }


        // Jag använde mig av "[System.Web.Http.FromUri]" istället för [FromBody]
        // eftersom att man snabbt och smidigt kunde köra
        // med en länk istället för "POST", t.ex genom att ha följande format
        // https://localhost:5001/api/Language/Create/?Parameter1=2&parameter2=hejehj&parameter3=false
        // Där parameter1, 2 och 3 är en integer, string och bool från "LanguageTextItem" modellen
        // Ett riktigt exempel på detta är
        // https://localhost:5001/api/Language/Create/?languageText=eriksberg&languageId=1
        [HttpGet]
        [Route("Create")]
        public async Task<IActionResult> Update([System.Web.Http.FromUri /*FromBody*/] LanguageTextItem model)
        {
            return Ok(await _languageService.Update(model));    
        }

        // https://localhost:5001/api/Language/addLanguage/?languageShort=SR&language=Srpski&countryShort=RS&country=Srbija
        [HttpPost]
        [Route("addLanguage")]
        public async Task<IActionResult> addLanguage([FromBody] LanguageItem model)
        {
              Console.WriteLine("Inside addLanguage {0},{1},{2},{3}\n \n",model.languageShort,model.language,model.countryShort,model.country);
            return Ok(await _languageService.addLanguage(model));    
        }


        
        [HttpGet]
        [Route("Test")]
        public ActionResult test()
        {
            return Content("Test");
        }


        
        [HttpGet]
        [Route("getLanguages")]
        public async Task<IActionResult> getLanguages()
        {
             return Ok(await _languageService.getLanguages());
        }

        // Jag använde mig av "[System.Web.Http.FromUri]" istället för [FromBody]
        // eftersom att man snabbt och smidigt kunde köra
        // med en länk istället för "POST", t.ex genom att ha följande format
        // https://localhost:5001/api/Language/Delete/?Parameter1=2&parameter2=hejehj&parameter3=false
        // Där parameter1, 2 och 3 är en integer, string och bool från "LanguageTextItem" modellen
        // Ett riktigt exempel på detta är
        // https://localhost:5001/api/Language/Delete/?textId=5
        [HttpGet]
        [Route("Delete")]
        public async Task<IActionResult> Delete([System.Web.Http.FromUri /*FromBody*/] LanguageTextItem model)
        {
            return Ok(await _languageService.Delete(model));
        }
    }
}
