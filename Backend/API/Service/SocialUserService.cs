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
    public class SocialUserService : ISocialUserService
    {
        // This is for debugging, we need to remove this later since its kinda dangerous
        public async Task<List<SocialUserItem>> GetUsers()
        {
            using (ciamContext db = new ciamContext())
            {
                return await (from a in db.SocialUsers.AsNoTracking()
                              select new SocialUserItem
                              {
                                  Id = a.Id,
                                  Email = a.Email,
                                  First_name = a.First_name,
                                  Last_name = a.Last_name,
                                  Social_platform = a.Social_platform,
                                  Social_id = a.Social_id
                              }).ToListAsync();
            }
        }

        public async Task<SocialUserItem> GetUser(string email)
        {
            using (ciamContext db = new ciamContext())
            {
                return await (from a in db.SocialUsers.AsNoTracking()
                              where a.Email == email
                              select new SocialUserItem 
                              {
                                  Id = a.Id,
                                  Email = a.Email,
                                  First_name = a.First_name,
                                  Last_name = a.Last_name,
                                  Phone_number = a.Phone_number,
                                  Language = a.Language
                              }).FirstOrDefaultAsync();
            }
        }

        public async Task<bool> SaveUser(SocialUserItem userItem)
        {
            using (ciamContext db = new ciamContext())
            {
                SocialUsers user = db.SocialUsers.Where
                         (x => x.Social_id == userItem.Social_id && x.Social_platform == userItem.Social_platform).FirstOrDefault();
                if (user == null)
                {
                    user = new SocialUsers()
                    {
                        Email = userItem.Email,
                        First_name = userItem.First_name,
                        Last_name = userItem.Last_name,
                        Created_at = DateTime.Now,
                        Social_platform = userItem.Social_platform,
                        Social_id = userItem.Social_id
                    };
                    db.SocialUsers.Add(user);

                }
                else
                {
                    user.Email = userItem.Email;
                    user.First_name = userItem.First_name;
                    user.Last_name = userItem.Last_name;
                    user.Created_at = DateTime.Now;
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteUser(int userId)
        {
            using (ciamContext db = new ciamContext())
            {
                SocialUsers user =
                     db.SocialUsers.Where(x => x.Id == userId).FirstOrDefault();
                if (user != null)
                {
                    db.SocialUsers.Remove(user);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }

         public async Task<bool> UpdateUser(SocialUserItem userItem)
        {
            using (ciamContext db = new ciamContext())
            {
                SocialUsers user = db.SocialUsers.Where(x => x.Id == userItem.Id).FirstOrDefault();
                if(userItem.Phone_number != null)
                    user.Phone_number = userItem.Phone_number;
                if(userItem.Language != null)
                    user.Language = userItem.Language;
                return await db.SaveChangesAsync() >= 1;
            }
        }
    }
}
