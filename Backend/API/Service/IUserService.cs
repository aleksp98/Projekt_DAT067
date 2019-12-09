using API.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace API.Service
{
    public interface IUserService
    {
        Task<List<UserItem>> GetUsers();
        Task<UserItem> GetUser(string email);
        Task<bool> SaveUser(UserItem user);
        Task<bool> LoginUser(UserItem user);
        Task<bool> DeleteUser(int Id);
        Task<bool> UpdateUser(UserItem used);
        Task<bool> ConfirmMail(string token);
        Task<bool> ExpireDate();
        Task<bool> Resend_mail();
        Task<bool> CheckUser(string email);
    }
}
