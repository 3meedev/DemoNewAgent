using System;

namespace AMApi.Models
{
    public class product
    {        
        public string IdProduct { get; set; }
        public string NameProduct { get; set; }
        public string TypeProduct { get; set; }
        public string PriceProduct { get; set; }
        public string CostProduct { get; set; }        
        public string TotalProduct { get; set; }        
        public string Total { get; set; }
        public string AmountProduct { get; set; }
        public string StatusProduct { get; set; }
        public Boolean StatusCheck { get; set; }  
        public string TotalShow { get; set; }
    }
    public class Stock
    {

        public string IdStock { get; set; }
        public product[] DataProductPerMonth { get; set; }
        public string StockPerMonth { get; set; }
    }
}