using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WFACorreosClientesWEB.Models
{
    public class DataDivision
    {
        public string Rfc { get; set; }
        public string Cliente { get; set; }
        public string Division { get; set; }
        public string Usuario { get; set; }
        public int Idcambio { get; set; }
        public string Filial { get; set; }
        public string Sucursal { get; set; }

        public List<FacturasRFC> Selectedrows { get; set; }

        public DataDivision()
        {
            Selectedrows = new List<FacturasRFC>();
        }

    }
}
