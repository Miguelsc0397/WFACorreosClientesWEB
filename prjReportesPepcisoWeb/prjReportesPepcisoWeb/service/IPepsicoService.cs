using System;
using System.Collections.Generic;
using System.Linq;
using prjReportesPepcisoWeb.Models;
using System.Threading.Tasks;

namespace prjReportesPepcisoWeb.service
{
    public interface IPepsicoService
    {
        Pepsico[] GetAllPepsicos(Data data);
    }
}
