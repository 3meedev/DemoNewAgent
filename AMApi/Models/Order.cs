using System;

namespace AMApi.Models
{
    public class Order
    {
        public string IdOrder { get; set; }
        public string IdProduct { get; set; }
        public string NameProduct { get; set; }
        public string AmountProduct { get; set; }
        public string PriceOrder { get; set; }
        public string NameUser { get; set; }
        public string TelUser { get; set; }
        public string AddressUser { get; set; }
        public string DateOrder { get; set; }
        public string SendDate { get; set; }
        public string Status { get; set; }
        public string TotalProduct { get; set; }
        public string TypeProduct { get; set; }
        public string PriceProduct { get; set; }
        public string Total { get; set; }
        public string UserOrder {get; set;}
        public string StatusProduct { get; set; }
        public string CostProduct { get; set; }
        
    }

    public class DataOrder
    {
        public string IdOrder { get; set; }
        public string IdProduct { get; set; }
        public string NameProduct { get; set; }
        public string AmountProduct { get; set; }
        public string PriceOrder { get; set; }
        public string NameUser { get; set; }
        public string TelUser { get; set; }
        public string AddressUser { get; set; }
        public string DateOrder { get; set; }
        public string SendDate { get; set; }
        public string Status { get; set; }
        public string TotalProduct { get; set; }
        public string TypeProduct { get; set; }
        public string PriceProduct { get; set; }
        public string Total { get; set; }
        public string UserOrder {get; set;}
        public string StatusProduct { get; set; }
        public string CostProduct { get; set; }
        
    }

    public class Receipt {

        public string IdReceipt { get; set; }
        public DataOrder[] DataOrder { get; set; }
        public string Date { get; set; }        
        public string File { get; set; }
        public string StatusFile { get; set; }
        public string Status { get; set; }
        public string SendDate { get; set; }
    }
}