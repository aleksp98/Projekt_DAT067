using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.EntityModels
{
    public partial class Text
    {
        public int id { get; set; }
        public string text { get; set; }
        public string comment { get; set; }
        public DateTime? createDate { get; set; }
        public DateTime? modifyDate { get; set; }
    }
}
