using System;
using System.Collections.Generic;
using System.Text;

namespace API.Model
{
    public class SocialUserItem
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string First_name { get; set; }
        public string Last_name { get; set; }
        public string Phone_number{ get; set; }
        public string Language{ get; set; }
        public DateTime Created_at {get;set;}
        public string Social_platform{ get; set; }
        public string Social_id{ get; set; }
    }
}
