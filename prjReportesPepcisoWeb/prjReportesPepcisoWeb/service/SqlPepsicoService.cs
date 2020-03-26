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
    public class SqlPepsicoService : IPepsicoService
    {
        private SqlDatabaseUtil DatabaseUtil { get; set; }
        public SqlPepsicoService(IMapper mapper, IConfiguration configuration)
        {
            DatabaseUtil = new SqlDatabaseUtil(mapper, configuration);
        }

        public Pepsico[] GetAllPepsicos(Data data)
        {
            if (data.Parameter1.Trim() == "") data.Parameter1 = data.Parameter2;
            if (data.Parameter2.Trim() == "") data.Parameter2 = data.Parameter1;

            int iFolioDesde = 0;
            Int32.TryParse(data.Parameter1.Trim(), out iFolioDesde);

            int iFolioHasta = 0;
            Int32.TryParse(data.Parameter2.Trim(), out iFolioHasta);

            var parameters = new[]
            {
                new SqlParameter("@iFolioDesde", iFolioDesde),
                new SqlParameter("@iFolioHasta", iFolioHasta)
            };

            return DatabaseUtil.Execute<Pepsico>("PA_ConInstalacionesPorFolio_PMF", parameters).ToArray();
        }
    }
}
