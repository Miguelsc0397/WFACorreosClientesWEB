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
    public class ClientesRFCController : Controller
    {
        private readonly IClientesRFC objcliente;

        public ClientesRFCController(IClientesRFC _objcliente)
        {
            objcliente = _objcliente;
        }

        [HttpGet]
        [Route("Index")]
        public IEnumerable<ClientesRFC> Index()
        {
            return objcliente.GetClientesRFCs();
        }
    }
}
