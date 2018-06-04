using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FosilLab.Models
{
    public class Parametro
    {
        private string _columna;
        private OracleDbType _tipo;
        private int _tamano;
        private string _valor;

        public string columna { get => _columna; set => _columna = value; }
        public OracleDbType tipo { get => _tipo; set => _tipo = value; }
        public int tamano { get => _tamano; set => _tamano = value; }
        public string valor { get => _valor; set => _valor = value; }
    }
}
