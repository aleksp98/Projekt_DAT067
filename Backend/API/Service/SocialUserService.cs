using API.Model;
using API.Service;
using API.EntityModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Net;
using System.Text.RegularExpressions;
using System.Web;
using System.Collections;
using System.Collections.Specialized;

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
                                  Social_id = a.Social_id,
                                  Phone_number = a.Phone_number,
                                  Language = a.Language
                              }).ToListAsync();
            }
        }

        public async Task<SocialUserItem> GetUser(string Social_id, string Social_platform)
        {
            using (ciamContext db = new ciamContext())
            {
                return await (from a in db.SocialUsers.AsNoTracking()
                              where a.Social_id == Social_id && a.Social_platform == Social_platform
                              select new SocialUserItem 
                              {
                                  Id = a.Id,
                                  Email = a.Email,
                                  First_name = a.First_name,
                                  Last_name = a.Last_name,
                                  Social_platform = a.Social_platform,
                                  Social_id = a.Social_id,
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
                        Social_platform = userItem.Social_platform,
                        Social_id = userItem.Social_id,
                        Created_at = DateTime.Now
                    };
                    db.SocialUsers.Add(user);

                }
                else
                {
                    user.Email = userItem.Email;
                    user.First_name = userItem.First_name;
                    user.Last_name = userItem.Last_name;
                    user.Social_platform = userItem.Social_platform;
                    user.Social_id = userItem.Social_id;
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

        public async Task<bool> getTwitterUserInfo(String token, String verifier)
        {
            Console.WriteLine("Token=" + token + ", Verifier=" + verifier);
            WebRequest access_request = WebRequest.Create("https://api.twitter.com/oauth/access_token?oauth_token=" + token +
                "&oauth_verifier=" + verifier);
            access_request.Method = "GET";
            WebResponse access_response = access_request.GetResponse();

            Stream access_receiveStream = access_response.GetResponseStream();
            StreamReader access_readStream = new StreamReader(access_receiveStream, Encoding.UTF8);
            String acces_response_body = access_readStream.ReadToEnd();
            Console.WriteLine(acces_response_body);
            NameValueCollection parsed_response = HttpUtility.ParseQueryString(acces_response_body);
            String user_token = parsed_response["oauth_token"];
            String user_secret = parsed_response["oauth_token_secret"];
            String consumer_key = "nJrY5ioXoNAP27qfW32E3V5Gs";
            String consumer_secret = "T1CWdHZfeI2SwPyha0bKZGTzgu6ssElfKJ2OiYhiJoHt9xC0Pv";
            Console.WriteLine(user_token);
            Console.WriteLine(user_secret);

            WebRequest account_info_request = WebRequest.Create("https://api.twitter.com/1.1/account/verify_credentials.json");
            account_info_request.Method = "GET";
            //https://gist.github.com/anova/9674023786ab31df43c07fd9bd53bc39#file-twitter-cs-L25
            string strBearerRequest = HttpUtility.UrlEncode(consumer_key) + ":" + HttpUtility.UrlEncode(consumer_secret);
            strBearerRequest = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(strBearerRequest));
            account_info_request.Headers.Add("Authorization", "Basic " + strBearerRequest);
            account_info_request.Headers.Add("oauth_token", user_token);
            account_info_request.Headers.Add("oauth_token_secret", user_secret);
            WebResponse account_info_response = account_info_request.GetResponse();

            Stream account_info_receiveStream = account_info_response.GetResponseStream();
            StreamReader account_info_readStream = new StreamReader(account_info_receiveStream, Encoding.UTF8);
            String account_info_response_body = account_info_readStream.ReadToEnd();
            Console.WriteLine(account_info_response_body);
            return true;
        }

        public async Task<bool> CheckUser(SocialUserItem userItem)
        {
            using (ciamContext db = new ciamContext())
            {
                Console.WriteLine("Platform" + userItem.Social_platform + ", ID: " + userItem.Social_id);
                return null != db.SocialUsers.Where
                         (x => x.Social_platform == userItem.Social_platform && x.Social_id == userItem.Social_id).FirstOrDefault();
            }
        }
    }
}
