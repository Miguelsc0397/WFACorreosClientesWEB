using WFACorreosClientesWEB.Interfaces;
using WFACorreosClientesWEB.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace WFACorreosClientesWEB.DataAccess
{
    public class HeinekenDesinDataAccessLayer : IHeineken_Desinstalaciones
    {
        private string connectionString;

        public HeinekenDesinDataAccessLayer(IConfiguration configuration)
        {
            connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        public IEnumerable<Heineken_Desinstalaciones> GetDesinstalaciones(Data data)
        {
            try
            {
                List<Heineken_Desinstalaciones> lstdesinstalaciones = new List<Heineken_Desinstalaciones>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    if (data.Parameter1.Trim() == "") data.Parameter1 = data.Parameter2;
                    if (data.Parameter2.Trim() == "") data.Parameter2 = data.Parameter1;

                    int iFolioDesde = 0;
                    Int32.TryParse(data.Parameter1.Trim(), out iFolioDesde);

                    int iFolioHasta = 0;
                    Int32.TryParse(data.Parameter2.Trim(), out iFolioHasta);

                    SqlCommand cmd = new SqlCommand("PA_ConDesInstalacionesPorFolio_HEINEKEN", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@iFolioDesde", SqlDbType.VarChar).Value = iFolioDesde.ToString();
                    cmd.Parameters.AddWithValue("@iFolioHasta", SqlDbType.VarChar).Value = iFolioHasta.ToString();

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Heineken_Desinstalaciones heineken_Desinstalaciones = new Heineken_Desinstalaciones();

                        heineken_Desinstalaciones.Folio = Convert.ToInt32(rdr["Folio"]);
                        heineken_Desinstalaciones.Tecnico = rdr["Técnico"].ToString();
                        heineken_Desinstalaciones.Lugar = rdr["Lugar"].ToString();
                        heineken_Desinstalaciones.Fecha_instalacion = Convert.ToDateTime(rdr["Fecha Inst."]).ToString("yyyy-MM-dd");
                        heineken_Desinstalaciones.Economico = rdr["Económico"].ToString();
                        heineken_Desinstalaciones.Vin = rdr["VIN"].ToString();
                        heineken_Desinstalaciones.Placa = rdr["Placa"].ToString();
                        heineken_Desinstalaciones.Num_seriego = rdr["No. Serie Go"].ToString();
                        heineken_Desinstalaciones.Fecha_inicio = rdr["Fecha Inicio"].ToString();
                        heineken_Desinstalaciones.Fecha_final = rdr["Fecha Final"].ToString();
                        heineken_Desinstalaciones.Fecha_cierre = rdr["Fecha Cierre"].ToString();
                        heineken_Desinstalaciones.Duplicado = rdr["Duplicado"].ToString();

                        lstdesinstalaciones.Add(heineken_Desinstalaciones);
                    }
                    con.Close();
                }
                return lstdesinstalaciones;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
