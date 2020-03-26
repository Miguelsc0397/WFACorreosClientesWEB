using System;
using System.Collections.Generic;
using prjReportesPepcisoWeb.Models;
using System.Linq;
using System.Threading.Tasks;

namespace prjReportesPepcisoWeb.service
{
    public interface IEmployeeService
    {
        Employee[] GetEmployees();
    }
}
