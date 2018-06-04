using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;
using System.Configuration;

namespace FosilLab.DAO
{
    public class Conexion
    {

        public OracleConnection conectar() {

            String connectionString = ConfigurationManager.ConnectionStrings["conString"].ConnectionString;
            OracleConnection con = new OracleConnection(connectionString);
            try
            {
                con.Open();
            }
            catch (Exception exp)
            {

                return null;
            }

            return con;
        }

        public bool ejecutarComando()
        {
            

            return true;
        }

        public void desconectar(OracleConnection con)
        {
            con.Close();
        }

    }
}
