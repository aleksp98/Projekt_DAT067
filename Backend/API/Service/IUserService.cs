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
        Task<bool> SaveUser(UserItem user);
        Task<bool> LoginUser(UserItem user);
        Task<bool> DeleteUser(int Id);
        Task<bool> CheckUser(string email);
    }
}
