using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WFACorreosClientesWEB.Interfaces;
using WFACorreosClientesWEB.Models;
using Microsoft.AspNetCore.Mvc;
using WFACorreosClientesWEB.service;

namespace WFACorreosClientesWEB.Controllers
{
    [Route("api/[controller]")]
    public class FacturasRFCController : Controller
    {
        private readonly IFacturasRFC objfacturas;

        public FacturasRFCController(IFacturasRFC _objfacturas)
        {
            objfacturas = _objfacturas;
        }

        //[HttpPost]
        //[Route("Index")]
        //public IEnumerable<FacturasRFC> Index([FromBody] DataFiltro datafiltro)
        //{
        //    return objfacturas.GetFacturasRFCs();
        //}

        [HttpPost]
        [Route("Index")]
        public IEnumerable<FacturasRFC> Index([FromBody] DataFactura datafactura)
        {
            return objfacturas.GetFacturasRFCs(datafactura);
        }
    }
}
