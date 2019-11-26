using NGCI.Model;
using NGCI.Service;
using NGCI.EntityModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NGCI.Service
{
    public class UserService : IUserService
    {
        public async Task<List<UserItem>> GetUsers()
        {
            using (ciamContext db = new ciamContext())
            {
                return await (from a in db.Users.AsNoTracking()
                              select new UserItem
                              {
                                  Id = a.Id,
                                  Email = a.Email,
                                  Password = a.Password
                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveUser(UserItem userItem)
        {
            using (ciamContext db = new ciamContext())
            {
                Users user = db.Users.Where
                         (x => x.Id == userItem.Id).FirstOrDefault();
                if (user == null)
                {
                    user = new Users()
                    {
                        Email = userItem.Email,
                        Password = userItem.Password
                    };
                    db.Users.Add(user);

                }
                else
                {
                    user.Email = userItem.Email;
                    user.Password = userItem.Password;
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteUser(int userId)
        {
            using (ciamContext db = new ciamContext())
            {
                Users user =
                     db.Users.Where(x => x.Id == userId).FirstOrDefault();
                if (user != null)
                {
                    db.Users.Remove(user);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }
    }
}
