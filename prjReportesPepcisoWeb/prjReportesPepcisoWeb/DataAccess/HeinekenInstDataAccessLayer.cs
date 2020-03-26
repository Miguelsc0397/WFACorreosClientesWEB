using prjReportesPepcisoWeb.Interfaces;
using prjReportesPepcisoWeb.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace prjReportesPepcisoWeb.DataAccess
{
    public class HeinekenInstDataAccessLayer : IHeinekenInstalaciones
    {
        private string connectionString;

        public HeinekenInstDataAccessLayer(IConfiguration configuration)
        {
            connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        public IEnumerable<HeinekenInstalaciones> GetInstalaciones(Data data)
        {
            try
            {
                List<HeinekenInstalaciones> lstinstalaciones = new List<HeinekenInstalaciones>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    if (data.Parameter1.Trim() == "") data.Parameter1 = data.Parameter2;
                    if (data.Parameter2.Trim() == "") data.Parameter2 = data.Parameter1;

                    int iFolioDesde = 0;
                    Int32.TryParse(data.Parameter1.Trim(), out iFolioDesde);

                    int iFolioHasta = 0;
                    Int32.TryParse(data.Parameter2.Trim(), out iFolioHasta);

                    SqlCommand cmd = new SqlCommand("PA_ConInstalacionesPorFolio_HEINEKEN", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@iFolioDesde", SqlDbType.VarChar).Value = iFolioDesde.ToString();
                    cmd.Parameters.AddWithValue("@iFolioHasta", SqlDbType.VarChar).Value = iFolioHasta.ToString();

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        HeinekenInstalaciones heinekenInstalaciones = new HeinekenInstalaciones();

                        heinekenInstalaciones.Folio = Convert.ToInt32(rdr["Folio"]);
                        heinekenInstalaciones.Tecnico = rdr["Técnico"].ToString();
                        heinekenInstalaciones.Lugar = rdr["Lugar"].ToString();
                        heinekenInstalaciones.Fecha_instalacion = rdr["Fecha Inst."].ToString();
                        heinekenInstalaciones.Tipo_instalacion = rdr["Tipo Inst."].ToString();
                        heinekenInstalaciones.Cliente = rdr["Cliente"].ToString();
                        heinekenInstalaciones.Economico = rdr["Económico"].ToString();
                        heinekenInstalaciones.Vin = rdr["VIN"].ToString();
                        heinekenInstalaciones.Placa = rdr["Placa"].ToString();
                        heinekenInstalaciones.Year = rdr["Año"].ToString();
                        heinekenInstalaciones.Marca = rdr["Marca"].ToString();
                        heinekenInstalaciones.Modelo = rdr["Modelo"].ToString();
                        heinekenInstalaciones.Num_seriego = rdr["No. Serie Go"].ToString();
                        heinekenInstalaciones.Tipo_arnes = rdr["Tipo Arnes"].ToString();
                        heinekenInstalaciones.Fecha_inicio = rdr["Fecha Inicio"].ToString();
                        heinekenInstalaciones.Fecha_final = rdr["Fecha Final"].ToString();
                        heinekenInstalaciones.Fecha_cierre = rdr["Fecha Cierre"].ToString();
                        heinekenInstalaciones.Duplicado = rdr["Duplicado"].ToString();

                        lstinstalaciones.Add(heinekenInstalaciones);
                    }
                    con.Close();
                }
                return lstinstalaciones;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
