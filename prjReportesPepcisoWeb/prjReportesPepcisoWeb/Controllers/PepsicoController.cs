using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using prjReportesPepcisoWeb.Interfaces;
using prjReportesPepcisoWeb.Models;
using Microsoft.AspNetCore.Mvc;
using prjReportesPepcisoWeb.service;

namespace prjReportesPepcisoWeb.Controllers
{
    [Route("api/[controller]")]
    public class PepsicoController : Controller
    {
        //private readonly IPepsico objpepsico;
        private readonly IPepsicoService _pepsicoService;

        public PepsicoController(IPepsicoService pepsicoservice)
        {
            //objpepsico = _objpepsico;
            _pepsicoService = pepsicoservice;
        }

        [HttpPost]
        [Route("Index")]
        public IEnumerable<Pepsico> Index([FromBody] Data data)
        {
            var pepsico = _pepsicoService.GetAllPepsicos(data);
            return pepsico;
        }
    }
}