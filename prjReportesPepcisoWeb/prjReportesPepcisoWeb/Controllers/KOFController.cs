using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using prjReportesPepcisoWeb.Interfaces;
using prjReportesPepcisoWeb.Models;
using Microsoft.AspNetCore.Mvc;

namespace prjReportesPepcisoWeb.Controllers
{
    [Route("api/[controller]")]
    public class KOFController : Controller
    {
        private readonly IKOF objkof;

        public KOFController(IKOF _objkof)
        {
            objkof = _objkof;
        }

        [HttpPost]
        [Route("Index")]
        public IEnumerable<KOF> Index([FromBody] Data data)
        {
            return objkof.GetKOFs(data);
        }
    }
}