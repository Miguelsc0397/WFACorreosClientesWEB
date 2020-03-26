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
    public class ChecklistazulDataAccessLayer : IChecklistazul
    {
        private string connectionString;
        public ChecklistazulDataAccessLayer(IConfiguration configuration)
        {
            connectionString = configuration["ConnectionStrings:ChecklistConnection"];
        }

        public IEnumerable<Checklistazul> GetChecklistazuls(DataCheck datacheck)
        {
            try
            {
                List<Checklistazul> lstcheck = new List<Checklistazul>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    if (datacheck.Parameter1.Trim() == "") datacheck.Parameter1 = datacheck.Parameter2;
                    if (datacheck.Parameter2.Trim() == "") datacheck.Parameter2 = datacheck.Parameter1;

                    int iFolioDesde = 0;
                    Int32.TryParse(datacheck.Parameter1.Trim(), out iFolioDesde);

                    int iFolioHasta = 0;
                    Int32.TryParse(datacheck.Parameter2.Trim(), out iFolioHasta);

                    SqlCommand cmd = new SqlCommand("SP_ConChecklistAzul", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@bSoloCompletos", SqlDbType.Bit).Value = datacheck.Showcompletos == true ? 1 : 0;
                    cmd.Parameters.AddWithValue("@iFolioIni", SqlDbType.Int).Value = iFolioDesde;
                    cmd.Parameters.AddWithValue("@iFolioFin", SqlDbType.Int).Value = iFolioHasta;


                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Checklistazul check = new Checklistazul();

                        //check.Folio = rdr["Folio"].ToString();
                        //check.Instalador = rdr["Instalador"].ToString();
                        //check.Tipo_instalacion = rdr["Tipo Inst."].ToString();
                        //check.Veh_region = rdr["VehReg"].ToString();
                        //check.Cedis = rdr["CEDIS"].ToString();
                        //check.Fecha_inicio = rdr["Fec. Ini."].ToString();
                        //check.Fecha_hora = rdr["Fec./Hr."].ToString();
                        //int var = 0;
                        //string porciento = "";
                        //porciento = rdr["%"].ToString();
                        //Int32.TryParse(porciento, out var);
                        //check.Porciento = var;
                        ////check.Porciento = rdr["%"] == null ? 0: Convert.ToInt32(rdr["%"]);
                        ////check.Porciento = Convert.ToInt32(rdr["%"]);
                        //check.Unidad_neg = rdr["Unidad Neg."].ToString();
                        //check.Marca = rdr["Marca"].ToString();
                        //check.Modelo = rdr["Modelo"].ToString();
                        //check.Vin = rdr["VIN"].ToString();
                        //check.Go = rdr["GO"].ToString();
                        //check.Codigo_veh = rdr["Codigo Veh."].ToString();
                        //check.Num_eco = rdr["# Eco."].ToString();
                        //check.Serial = rdr["Serial"].ToString();
                        //check.Placa = rdr["Placa"].ToString();
                        //check.Year = Convert.ToInt32(rdr["Año"]);
                        //check.Color = rdr["Color"].ToString();

                        lstcheck.Add(check);
                    }
                    con.Close();
                }
                return lstcheck;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
