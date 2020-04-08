using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WFACorreosClientesWEB.Models;

namespace WFACorreosClientesWEB.Interfaces
{
    public interface IClientesRFC
    {
        IEnumerable<ClientesRFC> GetClientesRFCs();
    }
}
