﻿using System;
using System.Collections.Generic;
using System.Linq;
using WFACorreosClientesWEB.Models;
using System.Threading.Tasks;

namespace WFACorreosClientesWEB.service
{
    public interface IChecklistService
    {
        Checklistazul[] GetAllChecklistazuls(DataCheck datacheck);
    }
}
