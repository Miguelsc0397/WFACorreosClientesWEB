using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WFACorreosClientesWEB.Models
{
    public class ClientesFiltro
    {
        public string Clave_cliente { get; set; }
        public string Nombre_cliente { get; set; }
        public string Pagos_anticipados { get; set; }
        public string Correos_cliente { get; set; }
        public string Correo_reseller { get; set; }
    }
}
