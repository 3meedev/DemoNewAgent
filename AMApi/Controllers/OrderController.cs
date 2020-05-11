using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace AMApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        public static List<Order> DataOrder = new List<Order>
        {

        };

        public static List<DataOrder> MirrorDataOrder = new List<DataOrder>
        {

        };

        public static List<Receipt> Receipt = new List<Receipt>
        {

        };
        public static List<Product> DataProduct = new List<Product>
        {

        };

        [HttpGet]
        public ActionResult<IEnumerable<Order>> GetOrderAll()
        {
            return DataOrder.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Order> GetOrderById(string id)
        {
            return DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
        }

        [HttpGet]
        public ActionResult<IEnumerable<DataOrder>> GetMirrorDataOrderAll()
        {
            return MirrorDataOrder.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<DataOrder> GetDataMirrorOrderById(string id)
        {
            return MirrorDataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
        }

        [HttpGet("{data}")]
        public ActionResult<IEnumerable<Order>> GetOrderbyUsername(string data)
        {
            return DataOrder.ToList().FindAll(it => it.UserOrder == data);
        }

        [HttpGet("{data}/{data2}")]
        public ActionResult<IEnumerable<Order>> GetOrderdatebyfindallbyyrearandmonth(string data, string data2)
        {
            return DataOrder.ToList().FindAll(it => (DateTime.Parse(it.DateOrder).Year.ToString() == data) && ((DateTime.Parse(it.DateOrder).Month.ToString() == data2)));
        }

        [HttpGet("{data}")]
        public ActionResult<IEnumerable<Order>> GetOrderdatebyfindall(string data)
        {
            return DataOrder.ToList().FindAll(it => DateTime.Parse(it.DateOrder).Month.ToString() == data);
        }
        [HttpGet("{data}")]
        public ActionResult<IEnumerable<Order>> GetOrderdatebyfindallbyyear(string data)
        {
            return DataOrder.ToList().FindAll(it => DateTime.Parse(it.DateOrder).Year.ToString() == data);
        }

        [HttpPost]
        public DataOrder AddOrder([FromBody] Order Orderx)
        {

            var text = "OD";
            var textsub = text.Substring(0, 1).ToString();
            var id = Guid.NewGuid().ToString();
            var textid = text + "-" + id.Substring(0, 4);

            // var split = id.Split("",5).ToString();
            // var textID = text + split.ToString() ;
            var item = new Order
            {
                IdOrder = textid,
                IdProduct = Orderx.IdProduct,
                NameProduct = Orderx.NameProduct,
                AmountProduct = Orderx.AmountProduct,
                PriceOrder = Orderx.PriceOrder,
                NameUser = Orderx.NameUser,
                AddressUser = Orderx.AddressUser,
                TelUser = Orderx.TelUser,
                UserOrder = Orderx.UserOrder,
                DateOrder = DateTime.Now.ToString("dd/MM/yyyy"),
                Status = "สั่งซื้อ"

            };

            var item2 = new DataOrder
            {
                IdOrder = textid,
                IdProduct = Orderx.IdProduct,
                NameProduct = Orderx.NameProduct,
                AmountProduct = Orderx.AmountProduct,
                PriceOrder = Orderx.PriceOrder,
                NameUser = Orderx.NameUser,
                AddressUser = Orderx.AddressUser,
                TelUser = Orderx.TelUser,
                UserOrder = Orderx.UserOrder,
                DateOrder = DateTime.Now.ToString("dd/MM/yyyy"),
                Status = "สั่งซื้อ"

            };

            MirrorDataOrder.Add(item2);
            DataOrder.Add(item);
            return item2;
        }

        [HttpPost]


        // [HttpPut("{id}")]
        // public Order EditAddFile(string id, [FromBody] Order Orderx)
        // {
        //     var _id = DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
        //     var item = new Order
        //     {
        //         IdOrder = id,
        //         IdProduct = Orderx.IdProduct,
        //         NameProduct = Orderx.NameProduct,
        //         AmountProduct = Orderx.AmountProduct,
        //         PriceOrder = Orderx.PriceOrder,
        //         NameUser = Orderx.NameUser,
        //         AddressUser = Orderx.AddressUser,
        //         TelUser = Orderx.TelUser,
        //         DateOrder = Orderx.DateOrder,
        //         UserOrder = Orderx.UserOrder,
        //         Status = "รับสั่งซื้อ",

        //     };
        //     DataOrder.Remove(_id);
        //     DataOrder.Add(item);
        //     return item;

        // }

        // [HttpPut("{id}")]
        // public Order EditOkOrder(string id, [FromBody] Order Orderx)
        // {
        //     var _id = DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
        //     var item = new Order
        //     {
        //         IdOrder = id,
        //         IdProduct = Orderx.IdProduct,
        //         NameProduct = Orderx.NameProduct,
        //         AmountProduct = Orderx.AmountProduct,
        //         PriceOrder = Orderx.PriceOrder,
        //         NameUser = Orderx.NameUser,
        //         AddressUser = Orderx.AddressUser,
        //         TelUser = Orderx.TelUser,
        //         DateOrder = Orderx.DateOrder,
        //         UserOrder = Orderx.UserOrder,
        //         Status = "รับสั่งซื้อ",

        //     };
        //     DataOrder.Remove(_id);
        //     DataOrder.Add(item);
        //     return item;
        // }

        // [HttpPut("{id}")]
        // public Order EditSendOrder(string id, [FromBody] Order Orderx)
        // {
        //     var _id = DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
        //     var item = new Order
        //     {
        //         IdOrder = id,
        //         IdProduct = Orderx.IdProduct,
        //         NameProduct = Orderx.NameProduct,
        //         AmountProduct = Orderx.AmountProduct,
        //         PriceOrder = Orderx.PriceOrder,
        //         NameUser = Orderx.NameUser,
        //         AddressUser = Orderx.AddressUser,
        //         TelUser = Orderx.TelUser,
        //         DateOrder = Orderx.DateOrder,
        //         SendDate = DateTime.Now.ToString("dd/MM/yyyy"),
        //         UserOrder = Orderx.UserOrder,
        //         Status = "ส่งสินค้า",

        //     };
        //     DataOrder.Remove(_id);
        //     DataOrder.Add(item);
        //     return item;
        // }

        // [HttpPut("{id}")]
        // public Order EditCancelOrder(string id, [FromBody] Order Orderx)
        // {
        //     var _id = DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
        //     var item = new Order
        //     {
        //         IdOrder = id,
        //         IdProduct = Orderx.IdProduct,
        //         NameProduct = Orderx.NameProduct,
        //         AmountProduct = Orderx.AmountProduct,
        //         PriceOrder = Orderx.PriceOrder,
        //         NameUser = Orderx.NameUser,
        //         AddressUser = Orderx.AddressUser,
        //         TelUser = Orderx.TelUser,
        //         DateOrder = Orderx.DateOrder,
        //         UserOrder = Orderx.UserOrder,
        //         Status = "ยกเลิก"

        //     };
        //     DataOrder.Remove(_id);
        //     DataOrder.Add(item);
        //     return item;
        // }

        // [HttpPut("{id}")]
        // public Order EditAcceptOrder(string id, [FromBody] Order Orderx)
        // {
        //     var _id = DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
        //     var item = new Order
        //     {
        //         IdOrder = id,
        //         IdProduct = Orderx.IdProduct,
        //         NameProduct = Orderx.NameProduct,
        //         AmountProduct = Orderx.AmountProduct,
        //         PriceOrder = Orderx.PriceOrder,
        //         NameUser = Orderx.NameUser,
        //         AddressUser = Orderx.AddressUser,
        //         TelUser = Orderx.TelUser,
        //         DateOrder = Orderx.DateOrder,
        //         SendDate = Orderx.SendDate,
        //         UserOrder = Orderx.UserOrder,
        //         Status = "ได้รับแล้ว",

        //     };
        //     DataOrder.Remove(_id);
        //     DataOrder.Add(item);
        //     return item;
        // }

        [HttpPut("{id}")]
        public Order CancelSellTotalProduct(string id, [FromBody] Order Orderx)
        {
            var _id = DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
            var getcheck = DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
            // จำนวนขาย
            int SellTotal = int.Parse(getcheck.AmountProduct);
            int Sell = int.Parse(Orderx.AmountProduct);
            int SellTotals = 0;

            // จำนวนทั้งหมด      
            int AllTotal = int.Parse(getcheck.TotalProduct);
            int All = int.Parse(Orderx.AmountProduct);
            int AllTotals = 0;


            if (getcheck.AmountProduct != "0")
            {
                SellTotals = SellTotal - SellTotal;
                AllTotals = AllTotal + SellTotal;
            }
            else
            {
                SellTotals = SellTotal - SellTotal;
                AllTotals = AllTotal + AllTotal;
            }

            var item = new Order
            {
                IdOrder = id,
                IdProduct = Orderx.IdProduct,
                NameProduct = _id.NameProduct,
                TypeProduct = _id.TypeProduct,
                PriceProduct = _id.PriceProduct,
                TotalProduct = getcheck.AmountProduct,
                Total = AllTotals.ToString(),
                StatusProduct = _id.StatusProduct,
                AmountProduct = SellTotals.ToString(),
                CostProduct = _id.CostProduct,

            };
            DataOrder.Remove(_id);
            DataOrder.Add(item);
            return item;
        }

        [HttpDelete("{id}")]
        public void DeleteOrder(string id)
        {

            var delete = DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
            DataOrder.Remove(delete);
        }

        [HttpDelete]
        public void DeleteOrderAll()
        {
            DataOrder.Clear();
        }

        // --------------------------------------------------------------------

        [HttpGet]
        public ActionResult<IEnumerable<Receipt>> GetReceiptAll()
        {
            return Receipt.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Receipt> GetReceiptById(string id)
        {
            return Receipt.FirstOrDefault(it => it.IdReceipt == id.ToString());
        }

        // public ActionResult<Receipt> GetDataReceiptById(string id)
        // {
        //     return Receipt.FirstOrDefault(it => it.IdReceipt == id.ToString());
        // }

    [HttpGet("{data}/{data2}")]
        public ActionResult<IEnumerable<Receipt>> GetReceiptdatebyfindallbyyrearandmonth(string data, string data2)
        {
            return Receipt.ToList().FindAll(it => (DateTime.Parse(it.Date).Year.ToString() == data) && ((DateTime.Parse(it.Date).Month.ToString() == data2)));
        }
  [HttpGet("{data}")]
        public ActionResult<IEnumerable<Receipt>> GetReceiptdatebyfindallbyyear(string data)
        {
            return Receipt.ToList().FindAll(it => DateTime.Parse(it.Date).Year.ToString() == data);
        }




        [HttpPost]
        public Receipt AddReceipt([FromBody] Receipt Receiptx)
        {
            var text = "OD";
            var textsub = text.Substring(0, 1).ToString();
            var id = Guid.NewGuid().ToString();
            var textid = text + "-" + id.Substring(0, 4);
            var addDate = DateTime.Now;

            var item = new Receipt
            {
                IdReceipt = textid,
                DataOrder = Receiptx.DataOrder.ToArray(),
                Date = DateTime.Now.ToString("dd/MM/yyyy"),
                File = Receiptx.File,
                Status = "รับสั่งซื้อ",
                StatusFile = "ไม่พบไฟล์"
            };


            Receipt.Add(item);
            return item;

        }

        [HttpDelete("{id}")]
        public void DeleteReceipt(string id)
        {

            var delete = Receipt.FirstOrDefault(it => it.IdReceipt == id.ToString());
            Receipt.Remove(delete);
        }

        [HttpPut("{id}")]
        public Receipt EditAddFile(string id, [FromBody] Receipt Receiptx)
        {
            var _id = Receipt.FirstOrDefault(it => it.IdReceipt == id.ToString());
            var item = new Receipt
            {
                IdReceipt = Receiptx.IdReceipt,
                DataOrder = Receiptx.DataOrder.ToArray(),
                Date = DateTime.Now.ToString("dd/MM/yyyy"),
                File = Receiptx.File,
                Status = "รับสั่งซื้อ",
                StatusFile = "แนบแล้ว"

            };
            Receipt.Remove(_id);
            Receipt.Add(item);
            return item;

        }

        [HttpPut("{id}")]
        public Receipt EditOkOrder(string id, [FromBody] Receipt Receiptx)
        {
            var _id = Receipt.FirstOrDefault(it => it.IdReceipt == id.ToString());
            var item = new Receipt
            {
                IdReceipt = Receiptx.IdReceipt,
                DataOrder = Receiptx.DataOrder.ToArray(),
                Date = DateTime.Now.ToString("dd/MM/yyyy"),
                File = Receiptx.File,
                Status = "รับสั่งซื้อ",
                StatusFile = Receiptx.StatusFile
            };
            Receipt.Remove(_id);
            Receipt.Add(item);
            return item;
        }

        [HttpPut("{id}")]
        public Receipt EditSendOrder(string id, [FromBody] Receipt Receiptx)
        {
            var _id = Receipt.FirstOrDefault(it => it.IdReceipt == id.ToString());
            var item = new Receipt
            {
                IdReceipt = Receiptx.IdReceipt,
                DataOrder = Receiptx.DataOrder.ToArray(),
                Date = DateTime.Now.ToString("dd/MM/yyyy"),
                File = Receiptx.File,
                SendDate = DateTime.Now.ToString("dd/MM/yyyy"),
                Status = "ส่งสินค้า",
                StatusFile = Receiptx.StatusFile

            };
            Receipt.Remove(_id);
            Receipt.Add(item);
            return item;
        }

        [HttpPut("{id}")]
        public Receipt EditCancelOrder(string id, [FromBody] Receipt Receiptx)
        {
            var _id = Receipt.FirstOrDefault(it => it.IdReceipt == id.ToString());
            var item = new Receipt
            {
                IdReceipt = Receiptx.IdReceipt,
                DataOrder = Receiptx.DataOrder.ToArray(),
                Date = DateTime.Now.ToString("dd/MM/yyyy"),
                File = Receiptx.File,
                Status = "ยกเลิก",
                StatusFile = Receiptx.StatusFile

            };
            Receipt.Remove(_id);
            Receipt.Add(item);
            return item;
        }

        [HttpPut("{id}")]
        public Receipt EditAcceptOrder(string id, [FromBody] Receipt Receiptx)
        {
            var _id = Receipt.FirstOrDefault(it => it.IdReceipt == id.ToString());
            var item = new Receipt
            {
                IdReceipt = Receiptx.IdReceipt,
                DataOrder = Receiptx.DataOrder.ToArray(),
                Date = DateTime.Now.ToString("dd/MM/yyyy"),
                File = Receiptx.File,
                SendDate = DateTime.Now.ToString("dd/MM/yyyy"),
                Status = "ได้รับแล้ว",
                StatusFile = Receiptx.StatusFile
            };
            Receipt.Remove(_id);
            Receipt.Add(item);
            return item;
        }


    }

}