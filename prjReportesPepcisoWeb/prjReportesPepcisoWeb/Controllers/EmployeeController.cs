using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using prjReportesPepcisoWeb.Interfaces;
using prjReportesPepcisoWeb.Models;
using Microsoft.AspNetCore.Mvc;
using prjReportesPepcisoWeb.service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace prjReportesPepcisoWeb.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        //private readonly IEmployee objemployee;
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            //objemployee = _objemployee;
            _employeeService = employeeService;
        }
        //public EmployeeController()
        //{
            
        //}

        [HttpGet]
        [Route("Index")]
        public IEnumerable<Employee> Index()
        {
            //return objemployee.GetAllEmployees();
            var employees = _employeeService.GetEmployees();
            return employees;
        }

        //[HttpPost]
        //[Route("Create")]
        //public int Create([FromBody] Employee employee)
        //{
        //    return objemployee.AddEmployee(employee);
        //}

        //[HttpGet]
        //[Route("Details/{id}")]
        //public Employee Details(int id)
        //{
        //    return objemployee.GetEmployeeData(id);
        //}

        //[HttpPut]
        //[Route("Edit")]
        //public int Edit([FromBody]Employee employee)
        //{
        //    return objemployee.UpdateEmployee(employee);
        //}

        //[HttpDelete]
        //[Route("Delete/{id}")]
        //public int Delete(int id)
        //{
        //    return objemployee.DeleteEmployee(id);
        //}

        //[HttpGet]
        //[Route("GetCityList")]
        //public IEnumerable<City> Details()
        //{
        //    return objemployee.GetCities();
        //}
    }
}
