using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.EntityModels
{
    public partial class Collection
    {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public DateTime? createDate { get; set; }
        public DateTime? modifyDate { get; set; }
    }
}
