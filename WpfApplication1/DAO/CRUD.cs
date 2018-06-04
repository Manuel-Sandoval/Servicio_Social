using FosilLab.Models;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FosilLab.DAO
{
    public class CRUD
    {
        public DataTable select(string query)
        {
            Conexion conexion = new Conexion();
            OracleConnection con = new Conexion().conectar();
            OracleCommand cmd = con.CreateCommand();

            cmd.CommandText = query;
            cmd.CommandType = CommandType.Text;
            OracleDataReader dr = cmd.ExecuteReader();
            DataTable dt = new DataTable();
            dt.Load(dr);
            dr.Close();
            conexion.desconectar(con);

            return dt;
        }

        //public bool update(List<Parametro> parametros, string query)
        //{
        //    
        //
        //    
        //}
        //
        //public bool insert()
        //{
        //
        //}

       // public bool delete()
        //{

        //}

    }
}
