using data_access.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace data_access.Service
{
    public interface IUserService
    {
        Task<List<UserModel>> GetUsers();
        Task<bool> SaveUser(UserModel user);
        Task<bool> DeleteUser(int Id);
    }
}
