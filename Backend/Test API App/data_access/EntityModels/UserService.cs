using data_access.Model;
using data_access.Service;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data_access.EntityModels
{
    public class UserService : IUserService
    {
        public async Task<List<UserModel>> GetUsers()
        {
            using (ciamContext db = new ciamContext())
            {
                return await (from a in db.Users.AsNoTracking()
                              select new UserModel
                              {
                                  Id = a.Id,
                                  Email = a.Email,
                                  Password = a.Password
                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveUser(UserModel userModel)
        {
            System.IO.File.WriteAllText(@"C:\Skola\Projekt\test\data_access\test.txt", "test");
            using (ciamContext db = new ciamContext())
            {
                Users user = db.Users.Where
                         (x => x.Id == userModel.Id).FirstOrDefault();
                if (user == null)
                {
                    user = new Users()
                    {
                        Email = userModel.Email,
                        Password = userModel.Password
    };
                    db.Users.Add(user);

                }
                else
                {
                    user.Email = userModel.Email;
                    user.Password = userModel.Password;
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
