using prjReportesPepcisoWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace prjReportesPepcisoWeb.Interfaces
{
    public interface IKOF
    {
        IEnumerable<KOF> GetKOFs(Data data);
    }
}
