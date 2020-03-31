using System;
using WFACorreosClientesWEB.Interfaces;
using WFACorreosClientesWEB.Models;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WFACorreosClientesWEB.utils;
using AutoMapper;
using Microsoft.Extensions.Configuration;

namespace WFACorreosClientesWEB.service
{
    public class SqlChecklistService : IChecklistService
    {
        private SqlDatabaseUtil DatabaseUtil { get; set; }
        public SqlChecklistService(IMapper mapper, IConfiguration configuration)
        {
            DatabaseUtil = new SqlDatabaseUtil(mapper, configuration);
        }
        public Checklistazul[] GetAllChecklistazuls(DataCheck datacheck)
        {
            if (datacheck.Parameter1.Trim() == "") datacheck.Parameter1 = datacheck.Parameter2;
            if (datacheck.Parameter2.Trim() == "") datacheck.Parameter2 = datacheck.Parameter1;

            int iFolioDesde = 0;
            Int32.TryParse(datacheck.Parameter1.Trim(), out iFolioDesde);

            int iFolioHasta = 0;
            Int32.TryParse(datacheck.Parameter2.Trim(), out iFolioHasta);

            var parameters = new[]
            {
                new SqlParameter("@bSoloCompletos", datacheck.Showcompletos == true ? 1 : 0),
                new SqlParameter("@iFolioIni", iFolioDesde),
                new SqlParameter("@iFolioFin", iFolioHasta)
            };
            return DatabaseUtil.Execute<Checklistazul>("SP_ConChecklistAzul", parameters).ToArray();
        }
    }
}
