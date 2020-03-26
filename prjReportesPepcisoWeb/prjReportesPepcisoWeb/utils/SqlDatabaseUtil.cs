using System;
using prjReportesPepcisoWeb.Interfaces;
using prjReportesPepcisoWeb.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using AutoMapper;

namespace prjReportesPepcisoWeb.utils
{
    public class SqlDatabaseUtil
    {
        private string ConnectionString { get; }
        private string ConnectionPepsico { get; }

        private string ConnectionUni { get; set;  }

        //private string ConnectionStringCheck { get; }
        private IMapper Mapper { get; set; }

        public SqlDatabaseUtil(IMapper mapper, IConfiguration configuration)
        {
            Mapper = mapper;
            ConnectionPepsico = configuration["ConnectionStrings:DefaultConnection"];
            ConnectionString = configuration["ConnectionStrings:ChecklistConnection"];
            //ConnectionStringCheck = configuration["ConnectionStringChecks:ChecklistConnection"];  
            
        }

        public IEnumerable<T> Execute<T>(string storedProcedureName, SqlParameter[] parameters = null, Func<SqlDataReader, List<T>, List<T>> mappingFunc = null)
        {
            SqlConnection connection = null;
            SqlDataReader reader = null;
            var results = new List<T>();

            if (storedProcedureName == "SP_ConChecklistAzul")
            {
                ConnectionUni = ConnectionString;
            }
            if (storedProcedureName == "PA_ConInstalacionesPorFolio_PMF")
            {
                ConnectionUni = ConnectionPepsico;
            }

            try
            {
                connection = new SqlConnection(ConnectionUni);
                connection.Open();

                SqlCommand cmd = new SqlCommand(storedProcedureName, connection);
                cmd.CommandType = CommandType.StoredProcedure;
                if (parameters != null && parameters.Any())
                {
                    cmd.Parameters.AddRange(parameters);
                }


                reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        results.Add(Mapper.Map<T>(reader));
                    }
                }

                if (mappingFunc != null)
                {
                    results = mappingFunc(reader, results);
                }
            }
            finally
            {
                connection?.Close();
                reader?.Close();
            }

            return results;
        }

        public int ExecuteNonQuery(string storedProcedureName, SqlParameter[] parameters = null)
        {
            SqlConnection connection = null;
            int results;

            try
            {
                connection = new SqlConnection(ConnectionString);
                connection.Open();

                SqlCommand cmd = new SqlCommand(storedProcedureName, connection);
                cmd.CommandType = CommandType.StoredProcedure;
                if (parameters != null && parameters.Any())
                {
                    cmd.Parameters.AddRange(parameters);
                }

                results = cmd.ExecuteNonQuery();
            }
            finally
            {
                connection?.Close();
            }

            return results;
        }
    }
}

