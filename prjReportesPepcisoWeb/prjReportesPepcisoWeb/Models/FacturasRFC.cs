using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WFACorreosClientesWEB.Models
{
    public class FacturasRFC
    {
        public string Cliente { get; set; }
        public string Nombre { get; set; }
        public string Factura { get; set; }
        public string Division { get; set; }
        public string UUID { get; set; }
        public double Total { get; set; }
        public string Moneda { get; set; }
        public string Fecha_factura { get; set; }
        public string Hora_factura { get; set; }
        public int Folio { get; set; }
    }
}
