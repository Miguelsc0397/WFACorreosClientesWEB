﻿using WFACorreosClientesWEB.Interfaces;
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
    public class FacturasRFCDataAccessLayer : IFacturasRFC
    {
        private string connectionString;
        public FacturasRFCDataAccessLayer(IConfiguration configuration)
        {
            connectionString = configuration["ConnectionStrings:CorreosConnection"];
        }

        public IEnumerable<FacturasRFC> GetFacturasRFCs(DataFactura datafactura)
        {
            try
            {
                List<FacturasRFC> lstfacturas = new List<FacturasRFC>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {

                    SqlCommand cmd = new SqlCommand("Facturacion.spu_COMP_ConFacturasClienteRFC", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@sRFC", SqlDbType.Char).Value = datafactura.Opcion.ToString();

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        FacturasRFC facturasrfc = new FacturasRFC();
                        
                        facturasrfc.Cliente = rdr["Cliente"].ToString();
                        facturasrfc.Nombre = rdr["Nombre"].ToString();
                        facturasrfc.Factura = rdr["Factura"].ToString();
                        facturasrfc.Division = rdr["Division"].ToString();
                        facturasrfc.UUID = rdr["UUID"].ToString();
                        facturasrfc.Total = Convert.ToDouble(rdr["Total"]);
                        facturasrfc.Moneda = rdr["Moneda"].ToString();
                        facturasrfc.Fecha_factura = rdr["Fecha Factura"].ToString();
                        facturasrfc.Hora_factura = rdr["Hora Factura"].ToString();
                        facturasrfc.Folio = Convert.ToInt32(rdr["Folio"]);

                        lstfacturas.Add(facturasrfc);

                    }
                    con.Close();
                }
                return lstfacturas;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataPendiente GetPendientes(DataFactura datafactura)
        {
            try
            {
                DataPendiente datos = new DataPendiente();
                //string sRespuesta = "";
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("Facturacion.spu_COMP_ConAplicacionesPendientesRFC", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@sRFC", datafactura.Opcion.Trim());

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        datos.Opcion = rdr["sRespuesta"].ToString();
                        //if (datos.Opcion != "")
                        //{
                            
                        //}
                        //else
                        //{
                        //    datos.Opcion = null;
                        //}
                    }
                    con.Close();
                    
                }
                return datos;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int GetConfirms(DataPendiente datapendiente)
        {
            try
            {
                string respuesta = "";
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("Facturacion.spu_COMP_ActCambiosClientes", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    respuesta = datapendiente.Opcion;
                    respuesta = respuesta.Substring(1,5);

                    cmd.Parameters.AddWithValue("@idCambio", SqlDbType.Int).Value = respuesta;
                    cmd.Parameters.AddWithValue("@sEstatosNew", SqlDbType.Char).Value = "T".ToString();
                    cmd.Parameters.AddWithValue("@sUsuario", SqlDbType.Char).Value = datapendiente.Usuario.ToString();

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

        public int GetCancels(DataPendiente datapendiente)
        {
            try
            {
                string respuesta = "";
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("Facturacion.spu_COMP_ActCambiosClientes", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    respuesta = datapendiente.Opcion;
                    respuesta = respuesta.Substring(1, 5);

                    cmd.Parameters.AddWithValue("@idCambio", SqlDbType.Int).Value = respuesta;
                    cmd.Parameters.AddWithValue("@sEstatosNew", SqlDbType.Char).Value = "C".ToString();
                    cmd.Parameters.AddWithValue("@sUsuario", SqlDbType.Char).Value = datapendiente.Usuario.ToString();

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

        public int GetDivisionEdit(DataDivision datadivision)
        {
            try
            {
                //DataDivision division = new DataDivision();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("Facturacion.spu_COMP_InsCambiosClientes", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@sClienteRFC", SqlDbType.NVarChar).Value = datadivision.Rfc.ToString().Trim();
                    cmd.Parameters.AddWithValue("@sClienteNew", SqlDbType.Char).Value = datadivision.Cliente.ToString().Trim();
                    cmd.Parameters.AddWithValue("@DivisionNew", SqlDbType.Char).Value = datadivision.Division.ToString().Trim();
                    cmd.Parameters.AddWithValue("@sUsuario", SqlDbType.Char).Value = datadivision.Usuario.ToString().Trim();

                    

                    con.Open();
                    //cmd.ExecuteNonQuery();
                    //con.Close();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        datadivision.Idcambio = Convert.ToInt32(rdr["idCambio"]);
                    }

                    foreach (FacturasRFC item in datadivision.Selectedrows)
                    {
                        SqlCommand command = new SqlCommand("Facturacion.spu_COMP_cambiosCliente", con);
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@idCambio", SqlDbType.Int).Value = datadivision.Idcambio;
                        command.Parameters.AddWithValue("@filial", SqlDbType.Char).Value = datadivision.Filial.ToString().Trim();
                        command.Parameters.AddWithValue("@suc", SqlDbType.Char).Value = datadivision.Sucursal.ToString().Trim();
                        command.Parameters.AddWithValue("@division", SqlDbType.Char).Value = datadivision.Division.ToString().Trim();
                        command.Parameters.AddWithValue("@cliente", SqlDbType.Char).Value = datadivision.Cliente.ToString().Trim();
                        command.Parameters.AddWithValue("@cteAnterior", SqlDbType.Char).Value = item.Cliente.ToString().Trim();
                        command.Parameters.AddWithValue("@Factura", SqlDbType.Char).Value = item.Factura.ToString().Trim();
                        command.Parameters.AddWithValue("@Usuario", SqlDbType.Char).Value = datadivision.Usuario.ToString().Trim();
                        command.ExecuteNonQuery();
                    }

                    con.Close();
                }
                return 1;
            }
            catch (Exception)
            {

                throw;
            }
        }

        //public IEnumerable<ClientesFiltro> GetClientesFiltros(DataFiltro datafiltro)
        //{
        //    try
        //    {
        //        List<ClientesFiltro> lstclientesfiltros = new List<ClientesFiltro>();

        //        using (SqlConnection con = new SqlConnection(connectionString))
        //        {

        //            SqlCommand cmd = new SqlCommand("Facturacion.spu_ConClientesFiltro", con);
        //            cmd.CommandType = CommandType.StoredProcedure;

        //            cmd.Parameters.AddWithValue("@bitPagoAnt", SqlDbType.Bit).Value = datafiltro.Pagosanticipados == true ? 0 : 1;
        //            cmd.Parameters.AddWithValue("@sLike", SqlDbType.VarChar).Value = datafiltro.Filtro.ToString();

        //            con.Open();
        //            SqlDataReader rdr = cmd.ExecuteReader();

        //            while (rdr.Read())
        //            {
        //                ClientesFiltro clientesfiltro = new ClientesFiltro();

        //                clientesfiltro.Clave_cliente = rdr["Clave Cliente"].ToString();
        //                clientesfiltro.Nombre_cliente = rdr["Nombre Cliente"].ToString();
        //                clientesfiltro.Pagos_anticipados = rdr["Pagos Anticipados"].ToString();
        //                clientesfiltro.Correos_cliente = rdr["Correos Cliente"].ToString();
        //                clientesfiltro.Correo_reseller = rdr["Correo Reseller"].ToString();

        //                lstclientesfiltros.Add(clientesfiltro);
        //            }
        //            con.Close();
        //        }
        //        return lstclientesfiltros;
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }

        //}


        //public IEnumerable<ClientesFiltro> GetClientesFiltrosNull()
        //{
        //    try
        //    {
        //        List<ClientesFiltro> lstclientesfiltros = new List<ClientesFiltro>();

        //        using (SqlConnection con = new SqlConnection(connectionString))
        //        {

        //            SqlCommand cmd = new SqlCommand("Facturacion.spu_ConClientesFiltro", con);
        //            cmd.CommandType = CommandType.StoredProcedure;

        //            cmd.Parameters.AddWithValue("@bitPagoAnt", SqlDbType.Bit).Value = false;
        //            cmd.Parameters.AddWithValue("@sLike", SqlDbType.VarChar).Value = "";

        //            con.Open();
        //            SqlDataReader rdr = cmd.ExecuteReader();

        //            while (rdr.Read())
        //            {
        //                ClientesFiltro clientesfiltro = new ClientesFiltro();

        //                clientesfiltro.Clave_cliente = rdr["Clave Cliente"].ToString();
        //                clientesfiltro.Nombre_cliente = rdr["Nombre Cliente"].ToString();
        //                clientesfiltro.Pagos_anticipados = rdr["Pagos Anticipados"].ToString();
        //                clientesfiltro.Correos_cliente = rdr["Correos Cliente"].ToString();
        //                clientesfiltro.Correo_reseller = rdr["Correo Reseller"].ToString();

        //                lstclientesfiltros.Add(clientesfiltro);
        //            }
        //            con.Close();
        //        }
        //        return lstclientesfiltros;
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }

        //}

        //public int updateClientesCorreos(DataCorreo datacorreo)
        //{
        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(connectionString))
        //        {

        //            clave = datacorreo.Numerocliente.Trim();
        //            correos = datacorreo.Correosnuevos.Trim();
        //            //if(datacorreo.Pagos == "SI")
        //            //{
        //            //    pagos = true;
        //            //}
        //            //else
        //            //{
        //            //    pagos = false;
        //            //}

        //            SqlCommand cmd = new SqlCommand("Facturacion.spu_ActCorreosCliente", con);
        //            cmd.CommandType = CommandType.StoredProcedure;

        //            cmd.Parameters.AddWithValue("@claveCliente", datacorreo.Numerocliente);
        //            cmd.Parameters.AddWithValue("@correosCliente", datacorreo.Correosnuevos);
        //            cmd.Parameters.AddWithValue("@pagoAnticipado", SqlDbType.Bit).Value = pagos == true ? 1 : 0;
        //            cmd.Parameters.AddWithValue("@usuario", SqlDbType.VarChar).Value = "SISTEMAS";

        //            con.Open();
        //            cmd.ExecuteNonQuery();
        //            con.Close();
        //        }
        //        return 1;
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }

        //}
    }
}