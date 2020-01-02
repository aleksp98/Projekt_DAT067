using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.EntityModels
{
    public partial class LanguageText
    {
        public int id { get; set; }
        public int languageId { get; set; }
        public int textId { get; set; }
        public string languageText { get; set; }
        public DateTime? createDate { get; set; }
        public DateTime? modifyDate { get; set; }
    }
}
