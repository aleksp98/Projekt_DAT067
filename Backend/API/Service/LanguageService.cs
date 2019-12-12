using API.Model;
using API.Service;
using API.EntityModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Service
{
    public class LanguageService : ILanguageService
    {
        public async Task<LanguageItem> Search(int languageId)
        {
            using (languageContext db = new languageContext())
            {
                return await (from a in db.Language.AsNoTracking()
                              where a.Id == languageId
                              select new LanguageItem 
                              {
                                  Id = a.Id,
                                  Text = a.Text,

                              }).FirstOrDefaultAsync();
            }
        }
         public async Task<LanguageItem> Search2(String searchString)
        {
            using (languageContext db = new languageContext())
            {
                
                return await (from text in db.Language.AsNoTracking()
                              where text.Text == searchString
                              select new LanguageItem 
                              {
                                  
                                  Text = text.Text,

                              }).FirstOrDefaultAsync();
            }
        }


          public async Task<LanguageItem> SearchText(string Text)
        {
            using (languageContext db = new languageContext())
            {
                return await (from a in db.Language.AsNoTracking()
                             // where a.Id == languageId
                              select new LanguageItem 
                              {
                                  Id = a.Id,
                                  Text = a.Text,

                              }).FirstOrDefaultAsync();
            }
        }


        
        public async Task<bool> Update(LanguageItem languageItem)
        {
            using (languageContext db = new languageContext())
            {
                Language language = db.Language.Where
                         (x => x.Id == languageItem.Id).FirstOrDefault();
                if (language == null)
                {
                    language = new Language()
                    {
                        Text = languageItem.Text,
                    };
                    db.Language.Add(language);

                }
                else
                {
                    language.Text = languageItem.Text;
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> Delete(int languageId)
        {
            using (languageContext db = new languageContext())
            {
                Language language =
                     db.Language.Where(x => x.Id == languageId).FirstOrDefault();
                if (language != null)
                {
                    db.Language.Remove(language);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }
    }
}
