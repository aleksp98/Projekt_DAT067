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
        
        public async Task<LanguageTextItem> Search(int languageId)
        {
            using (languageContext db = new languageContext())
            {
                LanguageText languageText = await db.LanguageText.Where(x => x.languageId == languageId).FirstOrDefaultAsync();

                return await (from a in db.LanguageText.AsNoTracking()
                              where a.textId == languageText.textId
                              select new LanguageTextItem 
                              {
                                  textId = a.id,
                                  languageText = a.languageText,
                                  languageId = a.languageId
                              }).FirstOrDefaultAsync();
            }
        }
         public async Task<List<LanguageTextItem>> SearchAll(string text)      
        {
           
            using (languageContext db = new languageContext())
            {        Console.WriteLine("Inside SerachAll xxx\n \n");

                //List<LanguageText> temp = db.LanguageText.Where(x => x.languageText == text).ToList();
                return await (from a in db.LanguageText.AsNoTracking()
                              where a.languageText == text
                              select new LanguageTextItem 
                              {
                                  languageText = a.languageText,
                                  textId = a.textId,
                                  languageId = a.languageId
                              }).ToListAsync();
            }
        }
         

         public async Task<List<LanguageItem>> getLanguages()      
        {
           
            using (languageContext db = new languageContext())
            {        Console.WriteLine("Inside getLanguages xxx\n \n");

                //List<LanguageText> temp = db.LanguageText.Where(x => x.languageText == text).ToList();
                return await (from a in db.Language.AsNoTracking()
                              // where a.languageText == text
                              select new LanguageItem 
                              {
                                  id = a.Id,
                                  languageShort = a.LanguageShort,
                                  language = a.LanguageValue,
                                  countryShort = a.CountryShort ,
                                  country = a.Country
                              }).ToListAsync();
            }
        }




          public async Task<LanguageTextItem> SearchText(string Text)
        {
            using (languageContext db = new languageContext())
            {
                return await (from a in db.LanguageText.AsNoTracking()
                              where a.languageText == Text
                              select new LanguageTextItem 
                              {
                                  textId = a.textId,
                                  languageText = a.languageText,
                                  languageId = a.languageId

                              }).FirstOrDefaultAsync();
            }
        }


        
        public async Task<bool> Update(LanguageTextItem languageItem)
        {
            using (languageContext db = new languageContext())
            {
                bool saveChange1 = true;
                Text text = db.Text.Where
                         (x => x.id == languageItem.textId).FirstOrDefault();
                if (text == null)
                {
                    text = new Text()
                    {
                        text = languageItem.languageText,
                        createDate = DateTime.Now,
                        modifyDate = DateTime.Now
                    };
                    db.Text.Add(text);

                    saveChange1 = (await db.SaveChangesAsync() >= 1);

                    languageItem.textId = db.Text.Max(p => p.id);

                    LanguageText languageText = new LanguageText()
                    {
                        languageText = languageItem.languageText,
                        languageId = languageItem.languageId,
                        createDate = DateTime.Now,
                        modifyDate = DateTime.Now,
                        textId = languageItem.textId
                    };
                    db.LanguageText.Add(languageText);
                }
                else
                {
                    text.text = languageItem.languageText;
                    text.modifyDate = DateTime.Now;
                    LanguageText languageText = db.LanguageText.Where
                        (x => x.textId == languageItem.textId && x.languageId == languageItem.languageId).FirstOrDefault();
                    if (languageText == null)
                    {
                        languageText = new LanguageText()
                        {
                            languageText = languageItem.languageText,
                            languageId = languageItem.languageId,
                            createDate = DateTime.Now,
                            modifyDate = DateTime.Now,
                            textId = text.id
                        };
                        db.LanguageText.Add(languageText);
                    }
                    else
                    {
                        languageText.languageText = languageItem.languageText;
                        languageText.modifyDate = DateTime.Now;
                    }
                }
                return (await db.SaveChangesAsync() >= 1)&&saveChange1;
            }
        }

        public async Task<bool> Delete(LanguageTextItem languageItem)
        {
            using (languageContext db = new languageContext())
            {
                Text text = db.Text.Where
                (x => x.id == languageItem.textId).FirstOrDefault();
                if(text != null) // If a matching TextID is inserted
                {
                    db.Text.Remove(text);
                    LanguageText languageText = db.LanguageText.Where
                    (x => x.textId == languageItem.textId && x.languageId == languageItem.languageId).FirstOrDefault();
                    if(languageText != null) // If a matching languageId and a correct textId is inserted, prefer to remove this one
                    {
                        db.LanguageText.Remove(languageText);
                    }
                    else
                    {
                        languageText = db.LanguageText.Where
                    (x => x.textId == languageItem.textId).FirstOrDefault();
                        if(languageText != null) { // If there is a matchin string but no languageId in the input parameter, remove the first matching text
                            db.LanguageText.Remove(languageText);
                        }
                    }
                }
                else{
                    text = db.Text.Where
                (x => x.text == languageItem.languageText).FirstOrDefault();
                    if(text != null){ // If hasn't been inserted, check for the first matching text message 
                        LanguageText languageText = db.LanguageText.Where
                    (x => x.textId == text.id).FirstOrDefault();
                        if(languageText != null) // Checks if that matched text matches with the "LanguageText" textID so that the leafs will be removed aswell.
                        {
                            db.LanguageText.Remove(languageText);
                        }
                        db.Text.Remove(text);
                    }
                }
                return (await db.SaveChangesAsync() >= 1);
            }
        }
    }
}
