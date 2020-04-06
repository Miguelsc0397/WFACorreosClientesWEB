using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WFACorreosClientesWEB.Models
{
    public class DataCorreo
    {
        public string Numerocliente { get; set; }
        public string Nombrecliente { get; set; }
        public bool? Pagos { get; set; }
        public string Correosactuales { get; set; }
        public string Correosnuevos { get; set; }
        
    }
}
