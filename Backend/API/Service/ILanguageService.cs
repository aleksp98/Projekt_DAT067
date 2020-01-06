using API.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace API.Service
{
    public interface ILanguageService
    {
        Task<LanguageTextItem> Search(int Id);
        Task<List<LanguageTextItem>> SearchAll(string text);      
        Task<LanguageTextItem> SearchText(string text);
        Task<List<LanguageItem>> getLanguages(); 
        Task<bool> Update(LanguageTextItem user);
        Task<bool> Delete(LanguageTextItem languageItem);
    }
}
