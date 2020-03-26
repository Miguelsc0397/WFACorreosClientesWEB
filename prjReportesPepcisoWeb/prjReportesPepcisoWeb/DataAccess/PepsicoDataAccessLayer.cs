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
    public class PepsicoDataAccessLayer : IPepsico
    {
        private string connectionString;
        public PepsicoDataAccessLayer(IConfiguration configuration)
        {
            connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        public IEnumerable<Pepsico> GetAllPepsicos(Data data)
        {
       
            try
            {
                List<Pepsico> lstpepsico = new List<Pepsico>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    if (data.Parameter1.Trim() == "") data.Parameter1 = data.Parameter2;
                    if (data.Parameter2.Trim() == "") data.Parameter2 = data.Parameter1;

                    int iFolioDesde = 0;
                    Int32.TryParse(data.Parameter1.Trim(), out iFolioDesde);

                    int iFolioHasta = 0;
                    Int32.TryParse(data.Parameter2.Trim(), out iFolioHasta);

                    SqlCommand cmd = new SqlCommand("PA_ConInstalacionesPorFolio_PMF", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@iFolioDesde", SqlDbType.VarChar).Value = iFolioDesde.ToString();
                    cmd.Parameters.AddWithValue("@iFolioHasta", SqlDbType.VarChar).Value = iFolioHasta.ToString(); 

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Pepsico pepsico = new Pepsico();

                        pepsico.Folio = Convert.ToInt32(rdr["Folio"]);
                        pepsico.Cedis = rdr["CEDIS"].ToString();
                        pepsico.Region_cedis = rdr["Región CEDIS"].ToString();
                        pepsico.Gamesa_sabritas = rdr["Gamesa/Sabritas"].ToString();
                        pepsico.Nombre_cliente = rdr["Nombre Cte."].ToString();
                        pepsico.Cerrado_el = rdr["Cerrado el"].ToString();
                        pepsico.Tipo_instalacion = rdr["Tipo Instalación"].ToString();
                        pepsico.Empresa_tecnico = rdr["Empresa Técnico"].ToString();
                        pepsico.Tecnico = rdr["Técnico"].ToString();
                        pepsico.Economico = rdr["Económico"].ToString();
                        pepsico.Placa = rdr["Placa"].ToString();
                        pepsico.Vin = rdr["VIN"].ToString();
                        pepsico.Num_seriego = rdr["No. Serie GO"].ToString();
                        pepsico.Fecha_inicio = rdr["Fecha Inicio"].ToString();
                        pepsico.Fecha_final = rdr["Fecha Final"].ToString();
                        pepsico.Fecha_cierre = rdr["Fecha Cierre"].ToString();
                        pepsico.Tiempo_cierre = rdr["Tiempo hasta cierre"].ToString();
                        pepsico.Duplicado = rdr["Duplicado"].ToString();
                        pepsico.Num_seriesuntech = rdr["No. Serie Suntech"].ToString();            

                        lstpepsico.Add(pepsico);
                    }
                    con.Close();
                }
                return lstpepsico;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
