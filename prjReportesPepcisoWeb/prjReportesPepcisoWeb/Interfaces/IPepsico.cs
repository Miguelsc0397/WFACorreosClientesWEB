using prjReportesPepcisoWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace prjReportesPepcisoWeb.Interfaces
{
    public interface IPepsico
    {
        IEnumerable<Pepsico> GetAllPepsicos(Data data);

    }
}
