using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.EntityModels
{
    public partial class CollectionText
    {
        public int id { get; set; }
        public int textId { get; set; }
        public int CollectionID { get; set; }
        public DateTime? createDate { get; set; }
    }
}
