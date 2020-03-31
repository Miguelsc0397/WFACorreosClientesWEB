using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WFACorreosClientesWEB.Interfaces;
using WFACorreosClientesWEB.Models;
using Microsoft.AspNetCore.Mvc;
using WFACorreosClientesWEB.service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WFACorreosClientesWEB.Controllers
{
    [Route("api/[controller]")]
    public class ChecklistazulController : Controller
    {
        private readonly IChecklistService _checklistService;

        public ChecklistazulController(IChecklistService checklistService)
        {
            _checklistService = checklistService;
        }

        [HttpPost]
        [Route("Index")]
        public IEnumerable<Checklistazul> Index([FromBody] DataCheck datacheck)
        {
            var checklistazuls = _checklistService.GetAllChecklistazuls(datacheck);
            return checklistazuls;
        }

    }
}
