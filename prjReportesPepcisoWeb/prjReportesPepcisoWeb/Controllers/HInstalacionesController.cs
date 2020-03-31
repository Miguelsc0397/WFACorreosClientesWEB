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
    public class HInstalacionesController : Controller
    {
        private readonly IHeinekenInstalaciones objinstalaciones;

        public HInstalacionesController(IHeinekenInstalaciones _objinstalaciones)
        {
            objinstalaciones = _objinstalaciones;
        }

        [HttpPost]
        [Route("Index")]
        public IEnumerable<HeinekenInstalaciones> Index([FromBody] Data data)
        {
            return objinstalaciones.GetInstalaciones(data);
        }
    }
}