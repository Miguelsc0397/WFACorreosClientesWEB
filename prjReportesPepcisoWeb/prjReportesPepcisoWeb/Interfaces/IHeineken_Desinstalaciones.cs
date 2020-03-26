using prjReportesPepcisoWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace prjReportesPepcisoWeb.Interfaces
{
    public interface IHeineken_Desinstalaciones
    {
        IEnumerable<Heineken_Desinstalaciones> GetDesinstalaciones(Data data);
    }
}
