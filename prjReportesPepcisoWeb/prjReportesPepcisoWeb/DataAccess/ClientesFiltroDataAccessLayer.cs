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
    public class ClientesFiltroDataAccessLayer : IClientesFiltro
    {
        private string connectionString;
        string clave = "";
        string correos = "";   
        public ClientesFiltroDataAccessLayer(IConfiguration configuration)
        {
            connectionString = configuration["ConnectionStrings:CorreosConnection"];
        }

        public IEnumerable<ClientesFiltro> GetClientesFiltros(DataFiltro datafiltro)
        {
            try
            {
                List<ClientesFiltro> lstclientesfiltros = new List<ClientesFiltro>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {

                    SqlCommand cmd = new SqlCommand("Facturacion.spu_ConClientesFiltro", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@bitPagoAnt", SqlDbType.Bit).Value = datafiltro.Pagosanticipados == true ? 0 : 1;
                    cmd.Parameters.AddWithValue("@sLike", SqlDbType.VarChar).Value = datafiltro.Filtro.ToString();

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        ClientesFiltro clientesfiltro = new ClientesFiltro();

                        clientesfiltro.Clave_cliente = rdr["Clave Cliente"].ToString();
                        clientesfiltro.Nombre_cliente = rdr["Nombre Cliente"].ToString();
                        clientesfiltro.Pagos_anticipados = rdr["Pagos Anticipados"].ToString();
                        clientesfiltro.Correos_cliente = rdr["Correos Cliente"].ToString();
                        clientesfiltro.Correo_reseller = rdr["Correo Reseller"].ToString();

                        lstclientesfiltros.Add(clientesfiltro);
                    }
                    con.Close();
                }
                return lstclientesfiltros;
            }
            catch (Exception)
            {

                throw;
            }

        }


        public IEnumerable<ClientesFiltro> GetClientesFiltrosNull()
        {
            try
            {
                List<ClientesFiltro> lstclientesfiltros = new List<ClientesFiltro>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {

                    SqlCommand cmd = new SqlCommand("Facturacion.spu_ConClientesFiltro", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@bitPagoAnt", SqlDbType.Bit).Value = false;
                    cmd.Parameters.AddWithValue("@sLike", SqlDbType.VarChar).Value = "";

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        ClientesFiltro clientesfiltro = new ClientesFiltro();

                        clientesfiltro.Clave_cliente = rdr["Clave Cliente"].ToString();
                        clientesfiltro.Nombre_cliente = rdr["Nombre Cliente"].ToString();
                        clientesfiltro.Pagos_anticipados = rdr["Pagos Anticipados"].ToString();
                        clientesfiltro.Correos_cliente = rdr["Correos Cliente"].ToString();
                        clientesfiltro.Correo_reseller = rdr["Correo Reseller"].ToString();

                        lstclientesfiltros.Add(clientesfiltro);
                    }
                    con.Close();
                }
                return lstclientesfiltros;
            }
            catch (Exception)
            {

                throw;
            }

        }

        public int updateClientesCorreos(DataCorreo datacorreo)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {

                    clave = datacorreo.Numerocliente.Trim();
                    correos = datacorreo.Correosnuevos.Trim();

                    SqlCommand cmd = new SqlCommand("Facturacion.spu_ActCorreosCliente", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@claveCliente", datacorreo.Numerocliente);
                    cmd.Parameters.AddWithValue("@correosCliente", datacorreo.Correosnuevos);
                    cmd.Parameters.AddWithValue("@pagoAnticipado", SqlDbType.Bit).Value = datacorreo.Pagos == true ? 1 : 0;
                    cmd.Parameters.AddWithValue("@usuario", SqlDbType.VarChar).Value = "SISTEMAS";

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch (Exception)
            {

                throw;
            }
            
        }

        public ClientesFiltro GetClientebyRFC(ClientesFiltro parameter)
        {
            try
            {
                List<ClientesFiltro> lstclientesfiltros = new List<ClientesFiltro>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {

                    SqlCommand cmd = new SqlCommand("Facturacion.spu_ConClientesFiltro", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@bitPagoAnt", SqlDbType.Bit).Value = false;
                    cmd.Parameters.AddWithValue("@sLike", SqlDbType.VarChar).Value = "";

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        ClientesFiltro clientesfiltro = new ClientesFiltro();

                        clientesfiltro.Clave_cliente = rdr["Clave Cliente"].ToString();
                        clientesfiltro.Nombre_cliente = rdr["Nombre Cliente"].ToString();
                        clientesfiltro.Pagos_anticipados = rdr["Pagos Anticipados"].ToString();
                        clientesfiltro.Correos_cliente = rdr["Correos Cliente"].ToString();
                        clientesfiltro.Correo_reseller = rdr["Correo Reseller"].ToString();

                        lstclientesfiltros.Add(clientesfiltro);
                    }
                    con.Close();
                }
                return lstclientesfiltros.Where(x => x.Clave_cliente == parameter.Clave_cliente).FirstOrDefault();
            }
            catch (Exception)
            {

                throw;
            }

        }
    }
}