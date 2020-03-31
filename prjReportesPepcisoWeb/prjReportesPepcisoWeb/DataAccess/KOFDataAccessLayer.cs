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
    public class KOFDataAccessLayer : IKOF
    {
        private string connectionString;
        public KOFDataAccessLayer(IConfiguration configuration)
        {
            connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        public IEnumerable<KOF> GetKOFs(Data data)
        {
            try
            {
                List<KOF> lstKOF = new List<KOF>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    if (data.Parameter1.Trim() == "") data.Parameter1 = data.Parameter2;
                    if (data.Parameter2.Trim() == "") data.Parameter2 = data.Parameter1;

                    int iFolioDesde = 0;
                    Int32.TryParse(data.Parameter1.Trim(), out iFolioDesde);

                    int iFolioHasta = 0;
                    Int32.TryParse(data.Parameter2.Trim(), out iFolioHasta);

                    SqlCommand cmd = new SqlCommand("PA_ConInstalacionesPorFolio_KOF_BOTONES", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@iFolioDesde", SqlDbType.VarChar).Value = iFolioDesde.ToString();
                    cmd.Parameters.AddWithValue("@iFolioHasta", SqlDbType.VarChar).Value = iFolioHasta.ToString();

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        KOF kof = new KOF();

                        kof.Folio = Convert.ToInt32(rdr["Folio"]);
                        kof.Tecnico = rdr["Técnico"].ToString();
                        kof.Economico = rdr["Económico"].ToString();
                        kof.Vin = rdr["VIN"].ToString();
                        kof.Duplicado = rdr["Duplicado"].ToString();

                        lstKOF.Add(kof);
                    }
                    con.Close();
                }
                return lstKOF;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
