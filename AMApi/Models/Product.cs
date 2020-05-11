using System;

namespace AMApi.Models
{
    public class Product
    {
        public string IdProduct { get; set; }
        public string NameProduct { get; set; }
        public string TypeProduct { get; set; }
        public string PriceProduct { get; set; }
        public string CostProduct { get; set; }
        public string statusclear { get; set; }
        public string TotalProduct { get; set; }
        public string SellTotalProduct { get; set; }
        public string unitProduct { get; set; }
        public string unitTotal { get; set; }
        public string Total { get; set; }
        public string AmountProduct { get; set; }
        public string StatusProduct { get; set; }
        public string IdOrder { get; set; }
        public Boolean StatusCheck { get; set; }   
        public string Status { get; set; }   
        public int ShowTotal { get; set; }

        public string TotalShow { get; set; }

        public DateTime? ShowDate { get; set; }

        public string ButtonCheck { get; set; }  

    }
}