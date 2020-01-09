using API.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace API.Service
{
    public interface ISocialUserService
    {
        Task<List<SocialUserItem>> GetUsers();
        Task<SocialUserItem> GetUser(string Social_id, string Social_platform);
        Task<bool> SaveUser(SocialUserItem user);
        Task<bool> DeleteUser(int Id);
        Task<bool> UpdateUser(SocialUserItem used);
        Task<SocialUserItem> getTwitterUserInfo(String token, String verifier);
        Task<SocialUserItem> getLinkedInUserInfo(String code);
        Task<bool> CheckUser(SocialUserItem userItem);
    }
}
