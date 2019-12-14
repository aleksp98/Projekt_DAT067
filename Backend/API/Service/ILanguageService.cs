using API.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace API.Service
{
    public interface ILanguageService
    {
        Task<LanguageItem> Search(int Id);
        Task<LanguageItem> SearchText(string text);
        Task<bool> Update(LanguageItem user);
        Task<bool> Delete(int Id);
    }
}
