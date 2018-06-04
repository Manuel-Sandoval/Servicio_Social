using FosilLab.DAO;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WpfApplication1.DAO
{
    public class EstadosDAO
    {
        public DataTable getEstados()
        {
            string sltStatement = "SELECT ID_PAIS, NOMBRE FROM PAISES ORDER BY ID_PAIS ASC";
            return new CRUD().select(sltStatement);
        }
    }
}
