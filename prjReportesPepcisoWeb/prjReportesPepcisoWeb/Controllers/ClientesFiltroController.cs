using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WFACorreosClientesWEB.Interfaces;
using WFACorreosClientesWEB.Models;
using Microsoft.AspNetCore.Mvc;

namespace WFACorreosClientesWEB.Controllers
{
    [Route("api/[controller]")]
    public class ClientesFiltroController : Controller
    {
        private readonly IClientesFiltro objcliente;

        public ClientesFiltroController(IClientesFiltro _objcliente)
        {
            objcliente = _objcliente;
        }

        [HttpPost]
        [Route("Index")]
        public IEnumerable<ClientesFiltro> Index([FromBody] DataFiltro datafiltro)
        {
            return objcliente.GetClientesFiltros(datafiltro);
        }

        [HttpGet]
        [Route("Inicio")]
        public IEnumerable<ClientesFiltro> Inicio()
        {
            return objcliente.GetClientesFiltrosNull();
        }

        [HttpPost]
        [Route("Edit")]
        public int Edit([FromBody] DataCorreo datacorreo)
        {
            return objcliente.updateClientesCorreos(datacorreo);
        }

    }
}
