using System;
using System.Collections.Generic;
using WFACorreosClientesWEB.Models;
using System.Linq;
using System.Threading.Tasks;

namespace WFACorreosClientesWEB.service
{
    public interface IEmployeeService
    {
        Employee[] GetEmployees();
    }
}
