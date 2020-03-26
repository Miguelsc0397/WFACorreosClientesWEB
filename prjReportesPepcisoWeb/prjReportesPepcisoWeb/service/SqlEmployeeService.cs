using System;
using prjReportesPepcisoWeb.Interfaces;
using prjReportesPepcisoWeb.Models;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using prjReportesPepcisoWeb.utils;
using AutoMapper;
using Microsoft.Extensions.Configuration;

namespace prjReportesPepcisoWeb.service
{
    public class SqlEmployeeService : IEmployeeService
    {
        private SqlDatabaseUtil DatabaseUtil { get; set; }
        public SqlEmployeeService(IMapper mapper, IConfiguration configuration)
        {
            DatabaseUtil = new SqlDatabaseUtil(mapper, configuration);
        }
        public Employee[] GetEmployees()
        {
            return DatabaseUtil.Execute<Employee>("spGetAllEmployees").ToArray();
        }
    }
}
