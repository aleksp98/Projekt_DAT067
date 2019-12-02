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
                                  Password = a.Password,
                                  First_name = a.First_name,
                                  Last_name = a.Last_name
                              }).ToListAsync();
            }
        }

          //check if email exist and is active
          //returns bool
        public bool CheckUser(string Email)
        {  bool temp = false;
             using (ciamContext db = new ciamContext())
            {
                Users user =
                     db.Users.Where(x => x.Email == Email && x.Verified ==true).FirstOrDefault();
                if (user != null)
                {
                   temp = true;
                }
                return temp;
            }
        }


         //check if email exist and is active
          //returns bool
        public async Task<bool> ConfirmMail(string token)
        {  
             using (ciamContext db = new ciamContext())
            {  //temporärt kollar Email istället för token (inte insatt än)
                Users user =
                     db.Users.Where(x => x.Email == token).FirstOrDefault();
                if (user != null)
                {
                    Console.WriteLine("Inside true {0} \n \n",token);
                   user.Verified = true;
                }
                return await db.SaveChangesAsync() >= 1;
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
                        Password = userItem.Password,
                        First_name = userItem.First_name,
                        Last_name = userItem.Last_name,
                    };
                    db.Users.Add(user);

                }
                else
                {
                    user.Email = userItem.Email;
                    user.Password = userItem.Password;
                    user.First_name = userItem.First_name;
                    user.Last_name = userItem.Last_name;
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
