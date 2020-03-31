using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using AutoMapper;
using WFACorreosClientesWEB.Models;


namespace WFACorreosClientesWEB.ClientApp.src.app.profiles
{
  public class SqlDataReaderProfile : Profile
  {
    public SqlDataReaderProfile()
    {
      CreateMap<SqlDataReader, Employee>()
              .ForMember(x => x.EmployeeId, x => x.MapFrom(z => z["EmployeeID"]))
              .ForMember(x => x.Name, x => x.MapFrom(z => z["Name"]))
              .ForMember(x => x.Gender, x => x.MapFrom(z => z["Gender"]))
              .ForMember(x => x.Department, x => x.MapFrom(z => z["Department"]))
              .ForMember(x => x.City, x => x.MapFrom(z => z["City"]));

      CreateMap<SqlDataReader, Pepsico>()
              .ForMember(x => x.Folio, x => x.MapFrom(z => z["Folio"]))
              .ForMember(x => x.Cedis, x => x.MapFrom(z => z["CEDIS"]))
              .ForMember(x => x.Region_cedis, x => x.MapFrom(z => z["Región CEDIS"]))
              .ForMember(x => x.Gamesa_sabritas, x => x.MapFrom(z => z["Gamesa/Sabritas"]))
              .ForMember(x => x.Nombre_cliente, x => x.MapFrom(z => z["Nombre Cte."]))
              .ForMember(x => x.Cerrado_el, x => x.MapFrom(z => z["Cerrado el"]))
              .ForMember(x => x.Tipo_instalacion, x => x.MapFrom(z => z["Tipo Instalación"]))
              .ForMember(x => x.Empresa_tecnico, x => x.MapFrom(z => z["Empresa Técnico"]))
              .ForMember(x => x.Tecnico, x => x.MapFrom(z => z["Técnico"]))
              .ForMember(x => x.Economico, x => x.MapFrom(z => z["Económico"]))
              .ForMember(x => x.Placa, x => x.MapFrom(z => z["Placa"]))
              .ForMember(x => x.Vin, x => x.MapFrom(z => z["VIN"]))
              .ForMember(x => x.Num_seriego, x => x.MapFrom(z => z["No. Serie GO"]))
              .ForMember(x => x.Fecha_inicio, x => x.MapFrom(z => z["Fecha Inicio"]))
              .ForMember(x => x.Fecha_final, x => x.MapFrom(z => z["Fecha Final"]))
              .ForMember(x => x.Fecha_cierre, x => x.MapFrom(z => z["Fecha Cierre"]))
              .ForMember(x => x.Tiempo_cierre, x => x.MapFrom(z => z["Tiempo hasta cierre"]))
              .ForMember(x => x.Duplicado, x => x.MapFrom(z => z["Duplicado"]))
              .ForMember(x => x.Num_seriesuntech, x => x.MapFrom(z => z["No. Serie Suntech"]));

      CreateMap<SqlDataReader, KOF>()
              .ForMember(x => x.Folio, x => x.MapFrom(z => z["Folio"]))
              .ForMember(x => x.Tecnico, x => x.MapFrom(z => z["Técnico"]))
              .ForMember(x => x.Economico, x => x.MapFrom(z => z["Económico"]))
              .ForMember(x => x.Vin, x => x.MapFrom(z => z["VIN"]))
              .ForMember(x => x.Duplicado, x => x.MapFrom(z => z["Duplicado"]));

      CreateMap<SqlDataReader, HeinekenInstalaciones>()
              .ForMember(x => x.Folio, x => x.MapFrom(z => z["Folio"]))
              .ForMember(x => x.Tecnico, x => x.MapFrom(z => z["Técnico"]))
              .ForMember(x => x.Lugar, x => x.MapFrom(z => z["Lugar"]))
              .ForMember(x => x.Fecha_instalacion, x => x.MapFrom(z => z["Fecha Inst."]))
              .ForMember(x => x.Tipo_instalacion, x => x.MapFrom(z => z["Tipo Inst."]))
              .ForMember(x => x.Cliente, x => x.MapFrom(z => z["Cliente"]))
              .ForMember(x => x.Economico, x => x.MapFrom(z => z["Económico"]))
              .ForMember(x => x.Vin, x => x.MapFrom(z => z["VIN"]))
              .ForMember(x => x.Placa, x => x.MapFrom(z => z["Placa"]))
              .ForMember(x => x.Year, x => x.MapFrom(z => z["Año"]))
              .ForMember(x => x.Marca, x => x.MapFrom(z => z["Marca"]))
              .ForMember(x => x.Modelo, x => x.MapFrom(z => z["Modelo"]))
              .ForMember(x => x.Num_seriego, x => x.MapFrom(z => z["No. Serie Go"]))
              .ForMember(x => x.Tipo_arnes, x => x.MapFrom(z => z["Tipo Arnes"]))
              .ForMember(x => x.Fecha_inicio, x => x.MapFrom(z => z["Fecha Inicio"]))
              .ForMember(x => x.Fecha_final, x => x.MapFrom(z => z["Fecha Final"]))
              .ForMember(x => x.Fecha_cierre, x => x.MapFrom(z => z["Fecha Cierre"]))
              .ForMember(x => x.Duplicado, x => x.MapFrom(z => z["Duplicado"]));

      CreateMap<SqlDataReader, Heineken_Desinstalaciones>()
              .ForMember(x => x.Folio, x => x.MapFrom(z => z["Folio"]))
              .ForMember(x => x.Tecnico, x => x.MapFrom(z => z["Técnico"]))
              .ForMember(x => x.Lugar, x => x.MapFrom(z => z["Lugar"]))
              .ForMember(x => x.Fecha_instalacion, x => x.MapFrom(z => z["Fecha Inst."]))
              .ForMember(x => x.Economico, x => x.MapFrom(z => z["Económico"]))
              .ForMember(x => x.Vin, x => x.MapFrom(z => z["VIN"]))
              .ForMember(x => x.Placa, x => x.MapFrom(z => z["Placa"]))
              .ForMember(x => x.Num_seriego, x => x.MapFrom(z => z["No. Serie Go"]))
              .ForMember(x => x.Fecha_inicio, x => x.MapFrom(z => z["Fecha Inicio"]))
              .ForMember(x => x.Fecha_final, x => x.MapFrom(z => z["Fecha Final"]))
              .ForMember(x => x.Fecha_cierre, x => x.MapFrom(z => z["Fecha Cierre"]))
              .ForMember(x => x.Duplicado, x => x.MapFrom(z => z["Duplicado"]));

      CreateMap<SqlDataReader, Checklistazul>()
              .ForMember(x => x.Folio, x => x.MapFrom(z => z["Folio"]))
              .ForMember(x => x.Instalador, x => x.MapFrom(z => z["Instalador"]))
              .ForMember(x => x.Tipo_instalacion, x => x.MapFrom(z => z["Tipo Inst."]))
              .ForMember(x => x.Veh_region, x => x.MapFrom(z => z["VehReg"]))
              .ForMember(x => x.Cedis, x => x.MapFrom(z => z["CEDIS"]))
              .ForMember(x => x.Fecha_inicio, x => x.MapFrom(z => z["Fec. Ini."]))
              .ForMember(x => x.Fecha_hora, x => x.MapFrom(z => z["Fec./Hr."]))
              .ForMember(x => x.Porciento, x => x.MapFrom(z => z["%"]))
              .ForMember(x => x.Unidad_neg, x => x.MapFrom(z => z["Unidad Neg."]))
              .ForMember(x => x.Marca, x => x.MapFrom(z => z["Marca"]))
              .ForMember(x => x.Modelo, x => x.MapFrom(z => z["Modelo"]))
              .ForMember(x => x.Vin, x => x.MapFrom(z => z["VIN"]))
              .ForMember(x => x.Go, x => x.MapFrom(z => z["GO"]))
              .ForMember(x => x.Codigo_veh, x => x.MapFrom(z => z["Codigo Veh."]))
              .ForMember(x => x.Num_eco, x => x.MapFrom(z => z["# Eco."]))
              .ForMember(x => x.Serial, x => x.MapFrom(z => z["Serial"]))
              .ForMember(x => x.Placa, x => x.MapFrom(z => z["Placa"]))
              .ForMember(x => x.Year, x => x.MapFrom(z => z["Año"]))
              .ForMember(x => x.Color, x => x.MapFrom(z => z["Color"]));
    }
  }
}
