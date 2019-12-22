using System;
using System.Collections.Generic;
using System.Data.OleDb;

namespace API.EntityModels
{
    public partial class Language
    {
        public int Id { get; set; }
        public string LanguageShort { get; set; }
        public string LanguageValue { get; set; }
        public string CountryShort { get; set; }
        public string Country { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? ModifyDate { get; set; }
        //public string Text { get; set; }
    }

}
