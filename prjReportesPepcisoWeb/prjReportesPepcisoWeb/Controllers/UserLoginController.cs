using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WFACorreosClientesWEB.Interfaces;
using WFACorreosClientesWEB.Models;
using Microsoft.AspNetCore.Mvc;
using WFACorreosClientesWEB.service;

namespace WFACorreosClientesWEB.Controllers
{
    [Route("api/[controller]")]
    public class UserLoginController
    {
        private readonly IUserLogin objlogin;

        public UserLoginController(IUserLogin _objlogin)
        {
            objlogin = _objlogin;
        }

        [HttpPost]
        [Route("Login")]
        public int Login([FromBody] UserLogin userlogin)
        {
            return objlogin.GetLogin(userlogin);
        }
    }
}
