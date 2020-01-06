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
        // This is for debugging, we need to remove this later since its kinda dangerous
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
                                  Last_name = a.Last_name,
                                  Token = a.Token,
                                  Verified = a.Verified,
                                  Resended_mail = a.Resended_mail
                              }).ToListAsync();
            }
        }

        public async Task<UserItem> GetUser(string email)
        {
            using (ciamContext db = new ciamContext())
            {
                return await (from a in db.Users.AsNoTracking()
                              where a.Email == email
                              select new UserItem 
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

          //check if email exist and is active
          //returns bool
        public async Task<bool> CheckUser(string Email)
        {
             using (ciamContext db = new ciamContext())
            {
                return null != db.Users.Where(x => x.Email == Email && x.Verified == true).FirstOrDefault();
            }
        }



         //check if email exist and is active
          //returns bool
        public async Task<bool> ConfirmMail(string token)
        {  

            Console.WriteLine(token);
             using (ciamContext db = new ciamContext())
            {  //change use x.Token instead of -> x.Email (OBS need to put in token in database)
                Users user =
                     db.Users.Where(x => x.Token == token).FirstOrDefault();
                if (user != null)
                {
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
                        Token = userItem.Token,
                        Created_at = DateTime.Now
                    };
                    db.Users.Add(user);

                }
                else
                {
                    user.Email = userItem.Email;
                    user.Password = userItem.Password;
                    user.First_name = userItem.First_name;
                    user.Last_name = userItem.Last_name;
                    user.Token = userItem.Token;
                    user.Created_at = DateTime.Now;
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> LoginUser(UserItem userItem)
        {
            using (ciamContext db = new ciamContext())
            {
                return null != db.Users.Where
                         (x => x.Email == userItem.Email && x.Password == userItem.Password).FirstOrDefault();
            }
        }



        
          //delete account if 14 days has gone
          //after registration
          //testar med en offset på 1 timma
        public async Task<bool> ExpireDate()
        {
           using (ciamContext db = new ciamContext())
         {      
                 
               DateTime cur = DateTime.Now;
               List<Users> userList =
                     db.Users.Where(x => x.Verified == false && x.Resended_mail == true && x.Created_at < cur.AddMinutes(-40.0)).ToList();
                
                foreach(Users user in userList){
                if (user != null)
                {  
                    Console.WriteLine("ExpireDate delete /n /n");
                    db.Users.Remove(user);
                }
                }


                return await db.SaveChangesAsync() >= 1;
            }
        }



        //resends activiation mail if it hasn't been done
          //testar med en offset på 5 minuter
        public async Task<bool> Resend_mail()
        {
           using (ciamContext db = new ciamContext())
         {     

               DateTime cur = DateTime.Now;
               List<Users> userList =
                     db.Users.Where(x => x.Verified == false && x.Resended_mail == false && x.Created_at < cur.AddMinutes(-20.0)).ToList();
                
                foreach(Users user in userList){
                if (user != null)
                {   
                    
                     Console.WriteLine("Resend_mail send mail\n \n");
                    //check if mail got sended
                    await Mail.sendMail(user.Email,user.First_name,user.Last_name,user.Token);
                    //if mail sended do changes
                    //if not do nothing
                    user.Resended_mail = true;
                }
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

        public async Task<bool> UpdateUser(UserItem userItem)
        {
            using (ciamContext db = new ciamContext())
            {
                Console.WriteLine(userItem);
                Users user = db.Users.Where(x => x.Id == userItem.Id).FirstOrDefault();
                if(userItem.Email != null)
                    user.Email = userItem.Email;
                if(userItem.Password != null)
                    user.Password = userItem.Password;
                if(userItem.First_name != null)
                    user.First_name = userItem.First_name;
                if(userItem.Last_name != null)
                    user.Last_name = userItem.Last_name;
                if(userItem.Phone_number != null)
                    user.Phone_number = userItem.Phone_number;
                if(userItem.Language != null)
                    user.Language = userItem.Language;
                return await db.SaveChangesAsync() >= 1;
            }
        }
    }
}
