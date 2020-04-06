using WFACorreosClientesWEB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WFACorreosClientesWEB.Interfaces
{
    public interface IClientesFiltro
    {
        IEnumerable<ClientesFiltro> GetClientesFiltros(DataFiltro datafiltro);

        IEnumerable<ClientesFiltro> GetClientesFiltrosNull();

        int updateClientesCorreos(DataCorreo datacorreo);
    }
}
