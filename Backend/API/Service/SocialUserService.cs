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
using System.Security.Cryptography;
using OAuth;
using Newtonsoft.Json.Linq;

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

        public async Task<SocialUserItem> getTwitterUserInfo(String token, String verifier)
        {
            WebRequest access_request = WebRequest.Create("https://api.twitter.com/oauth/access_token?oauth_token=" + token +
                "&oauth_verifier=" + verifier);
            access_request.Method = "GET";
            WebResponse access_response = access_request.GetResponse();

            Stream access_receiveStream = access_response.GetResponseStream();
            StreamReader access_readStream = new StreamReader(access_receiveStream, Encoding.UTF8);
            String acces_response_body = access_readStream.ReadToEnd();
            NameValueCollection parsed_response = HttpUtility.ParseQueryString(acces_response_body);

            String user_token = parsed_response["oauth_token"];
            String user_secret = parsed_response["oauth_token_secret"];
            String consumer_key = "nJrY5ioXoNAP27qfW32E3V5Gs";
            String consumer_secret = "T1CWdHZfeI2SwPyha0bKZGTzgu6ssElfKJ2OiYhiJoHt9xC0Pv";
            String timestamp = "" + (int)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds;
            String nonce2 = "IW0mgx";
            String URL = "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true";
            string SigBaseString = "GET&";
            string SigBaseStringParams = "oauth_consumer_key=" + consumer_key;
            SigBaseStringParams += "&" + "oauth_signature_method=HMAC-SHA1";
            SigBaseStringParams += "&" + "oauth_timestamp=" + timestamp;
            SigBaseStringParams += "&" + "oauth_nonce=" + nonce2;
            SigBaseStringParams += "&" + "oauth_version=1.0";
            SigBaseString += Uri.EscapeDataString(URL) + "&" + Uri.EscapeDataString(SigBaseStringParams);
            String oauth_signature = GetSignature(SigBaseString, consumer_secret);

            OAuthBase oAuth = new OAuthBase();
            string nonce = oAuth.GenerateNonce();
            string timeStamp = oAuth.GenerateTimeStamp();
            string normalizedUrl;
            string normalizedParameters;
            var uri = new Uri(URL);
            string sig = oAuth.GenerateSignature(uri,
                consumer_key, consumer_secret, 
                user_token, user_secret,
                "GET", timeStamp, nonce,
                OAuthBase.SignatureTypes.HMACSHA1,
                out normalizedUrl, out normalizedParameters);
            sig = HttpUtility.UrlEncode(sig);

            WebRequest account_info_request = WebRequest.Create("https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true");
            account_info_request.Method = "GET";
            String oauth = "OAuth oauth_consumer_key=" + consumer_key + ",oauth_token=" + user_token + ",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=" + timeStamp + ",oauth_nonce=" + nonce + ",oauth_version=\"1.0\",oauth_signature=" + sig;
            account_info_request.Headers.Add("Authorization", oauth);
            WebResponse account_info_response = account_info_request.GetResponse();

            Stream account_info_receiveStream = account_info_response.GetResponseStream();
            StreamReader account_info_readStream = new StreamReader(account_info_receiveStream, Encoding.UTF8);
            String account_info_response_body = account_info_readStream.ReadToEnd();

            dynamic json = JObject.Parse(account_info_response_body);
            string email = json.email;
            string name = json.name;
            string screen_name = json.screen_name;

            SocialUserItem socialUsers = new SocialUserItem();
            socialUsers.Social_platform = "twitter";
            socialUsers.Social_id = user_token;
            socialUsers.Email = email;
            socialUsers.First_name = name;
            socialUsers.Last_name = screen_name;

            await SaveUser(socialUsers);
            return socialUsers;
        }

        public async Task<SocialUserItem> getLinkedInUserInfo(String code)
        {
            String consumer_key = "86wtuouhirmnef";
            String consumer_secret = "uUZ5A6IWIQTnGHvz";
            
            WebRequest access_request = WebRequest.Create("https://www.linkedin.com/oauth/v2/accessToken");
            access_request.Method = "POST";
            access_request.Headers.Add("Content-Type", "application/x-www-form-urlencoded");
            var uri = new Uri("http://localhost:3000/LinkedInAccount");
            var postData = "grant_type=authorization_code";
                postData += "&code=" + code;
                postData += "&redirect_uri=" + uri;
                postData += "&client_id=" + consumer_key;
                postData += "&client_secret=" + consumer_secret;
            var data = Encoding.ASCII.GetBytes(postData);
            access_request.ContentLength = data.Length;

            using (var stream = access_request.GetRequestStream())
            {
                stream.Write(data, 0, data.Length);
            }

            WebResponse access_response = access_request.GetResponse();

            Stream access_receiveStream = access_response.GetResponseStream();
            StreamReader access_readStream = new StreamReader(access_receiveStream, Encoding.UTF8);
            String acces_response_body = access_readStream.ReadToEnd();
            dynamic json = JObject.Parse(acces_response_body);
            string user_token = json.access_token;
            Console.WriteLine("test");
            Console.WriteLine(user_token);
            Console.WriteLine("test");

            WebRequest account_email_request = WebRequest.Create("https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))");
            account_email_request.Method = "GET";
            account_email_request.Headers.Add("Authorization", "Bearer " + user_token);
            WebResponse account_email_response = account_email_request.GetResponse();

            Stream account_email_receiveStream = account_email_response.GetResponseStream();
            StreamReader account_email_readStream = new StreamReader(account_email_receiveStream, Encoding.UTF8);
            String account_email_response_body = account_email_readStream.ReadToEnd();
            dynamic account_email = JObject.Parse(account_email_response_body);
            Console.WriteLine(account_email);
            string email = account_email.elements[0]["handle~"].emailAddress;
            Console.WriteLine(email);

            WebRequest account_info_request = WebRequest.Create("https://api.linkedin.com/v2/me");
            account_info_request.Method = "GET";
            account_info_request.Headers.Add("Authorization", "Bearer " + user_token);
            WebResponse account_info_response = account_info_request.GetResponse();

            Stream account_info_receiveStream = account_info_response.GetResponseStream();
            StreamReader account_info_readStream = new StreamReader(account_info_receiveStream, Encoding.UTF8);
            String account_info_response_body = account_info_readStream.ReadToEnd();
            dynamic account_info = JObject.Parse(account_info_response_body);
            Console.WriteLine(account_info);
            string id = account_info.id;
            string first_name = account_info["localizedFirstName"];
            string last_name = account_info["localizedLastName"];
            Console.WriteLine(id);
            Console.WriteLine(first_name);
            Console.WriteLine(last_name);
            
            SocialUserItem socialUsers = new SocialUserItem();
            socialUsers.Social_platform = "linkedin";
            socialUsers.Social_id = id;
            socialUsers.Email = email;
            socialUsers.First_name = first_name;
            socialUsers.Last_name = last_name;

            await SaveUser(socialUsers);
            return socialUsers;
        }

        string GetSignature(string signatureString, string secretKey)
        {
            var enc = Encoding.ASCII;
            HMACSHA1 hmac = new HMACSHA1(enc.GetBytes(secretKey));
            hmac.Initialize();

            byte[] buffer = enc.GetBytes(signatureString);
            return BitConverter.ToString(hmac.ComputeHash(buffer)).Replace("-", "").ToLower();
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
