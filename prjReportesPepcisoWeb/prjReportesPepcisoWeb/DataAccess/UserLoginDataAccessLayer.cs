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
    public class UserLoginDataAccessLayer : IUserLogin
    {
        private string connectionString;
        public UserLoginDataAccessLayer(IConfiguration configuration)
        {
            connectionString = configuration["ConnectionStrings:CorreosConnection"];
        }

        public int GetLogin(UserLogin userlogin)
        {
            try
            {
                int retval = 0;
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("Facturacion.spu_ConLoginUsuario", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@sUsuario", userlogin.Usuario.Trim());
                    cmd.Parameters.AddWithValue("@sPassword", userlogin.Password.Trim());

                    var returnParameter = cmd.Parameters.Add("@UsuValido", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;
                    //returnParameter.Direction = ParameterDirection.ReturnValue;

                    con.Open();
                    //cmd.ExecuteNonQuery();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        string value = 
                            rdr["UsuValido"].ToString();
                        retval = value != null && value != "False" ? 1 : 0;
                    }
                    con.Close();
                    //retval = (int)cmd.Parameters["@UsuValido"].Value;
                    //var result = returnParameter.Value;
                }
                return retval;
            }
            catch (Exception)
            {

                throw;
            }
        }

        //public IEnumerable<UserLogin> GetLogin(UserLogin userlogin)
        //{
        //    try
        //    {
        //        List<UserLogin> lstuserlogin = new List<UserLogin>();

        //        using (SqlConnection con = new SqlConnection(connectionString))
        //        {
        //            SqlCommand cmd = new SqlCommand("Facturacion.spu_ConLoginUsuario", con);
        //            cmd.CommandType = CommandType.StoredProcedure;

        //            con.Open();
        //            SqlDataReader rdr = cmd.ExecuteReader();

        //            while (rdr.Read())
        //            {
        //                UserLogin userslogin = new UserLogin();

        //                //userslogin.Usuario = rdr["Usuario"].ToString();
        //                //userslogin.Password = rdr["Password"].ToString();

        //                lstuserlogin.Add(userlogin);
        //            }
        //            con.Close();
        //        }
        //        return lstuserlogin;
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}




    }
}