using System;
using System.Collections.Generic;
using System.Text;

namespace API.Model
{
    public class UserItem
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string First_name { get; set; }
        public string Last_name { get; set; }

         public bool Verified{get;set;}
    }
}
