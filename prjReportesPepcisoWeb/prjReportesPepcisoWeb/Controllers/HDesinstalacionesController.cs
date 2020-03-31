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
    public class HDesinstalacionesController : Controller
    {
        private readonly IHeineken_Desinstalaciones objdesinstalaciones;

        public HDesinstalacionesController(IHeineken_Desinstalaciones _objdesinstalaciones)
        {
            objdesinstalaciones = _objdesinstalaciones;
        }

        [HttpPost]
        [Route("Index")]
        public IEnumerable<Heineken_Desinstalaciones> Index([FromBody] Data data)
        {
            return objdesinstalaciones.GetDesinstalaciones(data);
        }
    }
}