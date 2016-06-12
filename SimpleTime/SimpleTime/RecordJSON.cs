using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimpleTime
{
    class RecordJSON
    {
        public string name;
        public string desc;
        public string registered;
        public string left;

        public RecordJSON(string name, string desc, string registered, string left) {
            this.name = name;
            this.desc = desc;
            this.registered = registered;
            this.left = left;
            
        }
    }
}
