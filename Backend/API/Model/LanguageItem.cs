using System;
using System.Collections.Generic;
using System.Text;

namespace API.Model
{
    public class LanguageItem
    {
        public int id { get; set; }
        public string languageShort { get; set; }
        public string language { get; set; }

        public string countryShort { get; set; }
        public string country { get; set; }

    }
}
