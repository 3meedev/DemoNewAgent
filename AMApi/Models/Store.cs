using System;

namespace AMApi.Models
{
    public class Store
    {
        public string IdStore { get; set; }
        public string IdUser { get; set; }
        public string NameUser { get; set; }
        public string IdProduct { get; set; }
        public string NameProduct { get; set; }
        public string statusclear { get; set; }
        public string TotalProduct { get; set; }
        public string UnitProduct { get; set; }
        public string StatusProduct { get; set; }
        public string SellProduct { get; set; }
        public string Total { get; set; }
        public string TotalAll { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public string AddProductStore { get; set; }
        public DateTime? EditProductStore { get; set; }
        public DateTime? ClearProductStore { get; set; }        
        public string unitTotal { get; set; }
        public string CostProduct {get ; set;}
       
    }
}