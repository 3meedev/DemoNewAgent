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

    public class ProductController : ControllerBase
    {
        public static List<Product> DataProduct = new List<Product>
        {
            // new Product {IdOrder = "100101",IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TypeProduct = "เครื่องราง",PriceProduct = "5999",CostProduct = "2999" ,TotalProduct = "0",Total="0",AmountProduct="0",StatusProduct = "กรุณาเลือกสถานะ",ShowTotal = 0,TotalShow = "0"},
            // new Product {IdOrder = "100102",IdProduct = "B7784",NameProduct = "น้ำยาล้างจานปู่เค็ม",TypeProduct = "ของใช้",PriceProduct = "299",CostProduct = "199" ,TotalProduct = "0",Total="0",AmountProduct="0",StatusProduct = "กรุณาเลือกสถานะ",ShowTotal = 0,TotalShow = "0"},
            // new Product {IdProduct = "R5596",NameProduct = "ไข่แดงเค็มปู่เค็ม",TypeProduct = "อาหาร",PriceProduct = "9",CostProduct = "1" ,TotalProduct = "0",Total="0",AmountProduct="0",StatusProduct = "กรุณาเลือกสถานะ",ShowTotal = 0,TotalShow = "0"},
            // new Product {IdProduct = "H8897",NameProduct = "ขนมปู่เค็ม",TypeProduct = "ขนม",PriceProduct = "99",CostProduct = "29" ,TotalProduct = "0",Total="0",AmountProduct="0",StatusProduct = "กรุณาเลือกสถานะ",ShowTotal = 0,TotalShow = "0"},
            // new Product {IdProduct = "S0015",NameProduct = "ครีมหลวงปู่เค็ม",TypeProduct = "เครื่องสำอาง",PriceProduct = "999",CostProduct = "499" ,TotalProduct = "0",Total="0",AmountProduct="0",StatusProduct = "กรุณาเลือกสถานะ",ShowTotal = 0,TotalShow = "0"},
            // new Product {IdProduct = "A8895",NameProduct = "เสื้อยืดหลวงปู่เค็ม",TypeProduct = "เสื้อผ้า",PriceProduct = "999",CostProduct = "299" ,TotalProduct = "0",Total="0",AmountProduct="0",StatusProduct = "กรุณาเลือกสถานะ",ShowTotal = 0,TotalShow = "0"}
        };

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProductAll()
        {
            return DataProduct.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProductById(string id)
        {
            return DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
        }
        [HttpGet("{data}")]
        public ActionResult<Product> GetProductBydata(string data)
        {
            return DataProduct.First(it => it.NameProduct == data);
        }
        [HttpPost]
        public Product AddProduct([FromBody] Product Productx)
        {
            // Guid g = Guid.NewGuid(); 
                   
            var item = new Product
            {
                IdProduct = Productx.IdProduct,
                NameProduct = Productx.NameProduct,
                TypeProduct = Productx.TypeProduct,
                PriceProduct = Productx.PriceProduct,
                TotalProduct = "0",
                Total = "0",
                AmountProduct = "0",
                SellTotalProduct = Productx.SellTotalProduct,
                StatusProduct = "กรุณาเลือกสถานะ",
                CostProduct = Productx.CostProduct,
                ShowTotal = Productx.ShowTotal,
                TotalShow = "0",
                
            };

            DataProduct.Add(item);

            // User.Id = id;

            // data.Add(Userx);
            return item;
        }
        [HttpPut("{id}")]
        public Product EditProductstatus(string id, [FromBody] Product Productx)
        {
            var _id = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            var item = new Product
            {
                IdProduct = id,
                NameProduct = _id.NameProduct,
                TypeProduct = _id.TypeProduct,
                PriceProduct = _id.PriceProduct,
                TotalProduct = _id.TotalProduct,
                unitProduct = _id.unitProduct,
                StatusProduct = Productx.StatusProduct,
                CostProduct = _id.CostProduct,
                AmountProduct = _id.AmountProduct,
                StatusCheck = _id.StatusCheck,
                ButtonCheck = _id.ButtonCheck,
                // TotalProduct = _id.TotalProduct,
                // ShowTotal = Productx.TotalProduct,
                Total = _id.Total,
                ShowDate = _id.ShowDate,
            };
            DataProduct.Remove(_id);
            DataProduct.Add(item);
            return item;
        }
        [HttpPut("{id}")]
        public Product EditNumber(string id, [FromBody] Product Productx)
        {
            var _id = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            var item = new Product
            {
                IdProduct = id,
                NameProduct = _id.NameProduct,
                TypeProduct = _id.TypeProduct,
                PriceProduct = _id.PriceProduct,
                TotalProduct = _id.TotalProduct,
                unitProduct = _id.unitProduct,
                StatusProduct = _id.StatusProduct,
                CostProduct = _id.CostProduct,
                AmountProduct = _id.AmountProduct,
                StatusCheck = _id.StatusCheck,
                ButtonCheck = _id.ButtonCheck,
                // TotalProduct = _id.TotalProduct,
                ShowTotal = 1,
                Total = _id.Total,
                ShowDate = _id.ShowDate,
                
            };
            DataProduct.Remove(_id);
            DataProduct.Add(item);
            return item;

        }
        [HttpPut("{id}")]
        public Product EditProduct(string id, [FromBody] Product Productx)
        {
            var _id = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            var item = new Product
            {
                IdProduct = id,
                NameProduct = _id.NameProduct,
                TypeProduct = _id.TypeProduct,
                PriceProduct = Productx.PriceProduct,
                TotalProduct = _id.TotalProduct,
                unitProduct = Productx.unitProduct,
                StatusProduct = _id.StatusProduct,
                CostProduct = Productx.CostProduct,
                AmountProduct = _id.AmountProduct,
                // TotalProduct = _id.TotalProduct,
                // ShowTotal = Productx.TotalProduct,
                Total = _id.Total
                
            };
            DataProduct.Remove(_id);
            DataProduct.Add(item);
            return item;

        }


        [HttpDelete("{id}")]
        public void DeleteProduct(string id)
        {
            var delete = DataProduct.FirstOrDefault(it => it.ShowTotal == 1);
            DataProduct.Remove(delete);
        }

        [HttpPut("{id}")]
        public Product EditAddTotalProduct(string id, [FromBody] Product Productx)
        {
            var _id = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            var getcheck = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            var ff = DataProduct.Find(it => it.IdProduct == id.ToString());
            int Total = int.Parse(getcheck.TotalProduct);
            int TotalProduct = int.Parse(getcheck.Total);
            int Add = int.Parse(Productx.TotalProduct);
            int Totals = 0;
            int Totals1 = 0;
            int TotalShow = 0;
            int CheckStatusTotal = 0;
            var addDate = DateTime.Now;


            // if (getcheck.Total == "0" && getcheck.TotalProduct == "0")
            // {
            //     Total = 0;

            //     Totals = TotalProduct + Add;
            //     Totals1 = Total + Add;
            //     // showtotal = stotal + Add;
            // }
            // else
            // {
            //     Totals = TotalProduct + Add;
            //     Totals1 = Total + Add;
            //     // showtotal = TotalProduct += TotalProduct;

            // }

            if (getcheck.Total == "0" && getcheck.TotalProduct == "0")
            {
                Total = 0;

                Totals = TotalProduct + Add;
                Totals1 = Total + Add;
                TotalShow = Total + Add;
            }
            else if (getcheck.ShowTotal == 1)
            {

                Totals = TotalProduct + Add;
                Totals1 = Total + Add;   
                TotalShow = Total + Add;  
                // CheckStatusTotal = 2;    
                _id.AmountProduct = "0";               
            }
            // else if (getcheck.ShowTotal == 2)
            // {
            //     Totals = TotalProduct + Add;
            //     Totals1 = Total + Add;
            //     TotalShow = Total + Add;   
            //     CheckStatusTotal = 0;                
            // }            
            else
            {
                Totals = TotalProduct + Add;
                Totals1 = Total + Add;
                TotalShow = Total + Add;

            }

            var item = new Product
            {
                IdProduct = id,
                NameProduct = _id.NameProduct,
                TypeProduct = _id.TypeProduct,
                PriceProduct = _id.PriceProduct,
                TotalProduct = Totals1.ToString(),
                Total = Totals.ToString(),
                StatusProduct = _id.StatusProduct,
                AmountProduct = _id.AmountProduct,
                CostProduct = _id.CostProduct,
                ShowTotal = CheckStatusTotal,
                ShowDate = addDate,
                TotalShow = TotalShow.ToString()
                

            };
            DataProduct.Remove(_id);
            DataProduct.Add(item);
            return item;
        }

        [HttpPut("{id}")]
        public Product AddSellTotalProduct(string id, [FromBody] Product Productx)
        {
            var _id = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            var getcheck = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            // จำนวนขาย
            int SellTotal = int.Parse(getcheck.AmountProduct);
            int Sell = int.Parse(Productx.AmountProduct);
            int SellTotals = 0;

            // จำนวนทั้งหมด      
            int AllTotal = int.Parse(getcheck.TotalProduct);
            int All = int.Parse(Productx.AmountProduct);
            int AllTotals = 0;


            if (getcheck.AmountProduct == "0")
            {
                SellTotal = 0;
                SellTotals = SellTotal + Sell;
                AllTotals = AllTotal - All;
                
            }
            else
            {
                SellTotals = SellTotal + Sell;
                AllTotals = AllTotal - All;
            }

            var item = new Product
            {
                IdProduct = id,
                NameProduct = _id.NameProduct,
                TypeProduct = _id.TypeProduct,
                PriceProduct = _id.PriceProduct,
                TotalProduct = AllTotals.ToString(),
                Total = _id.Total,
                StatusProduct = _id.StatusProduct,
                AmountProduct = SellTotals.ToString(),
                CostProduct = _id.CostProduct,
                TotalShow = _id.Total,
                ShowDate = _id.ShowDate,
            };
            DataProduct.Remove(_id);
            DataProduct.Add(item);
            return item;
        }

        [HttpGet("{id}/{amount}")]
        public Product CancelSellTotalProduct(string id, string amount)
        {
            var _id = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            var amountall = int.Parse(_id.AmountProduct) - int.Parse(amount);
            var totalall = int.Parse(_id.TotalProduct) + int.Parse(amount);
            var item = new Product
            {
                IdOrder = _id.IdOrder,
                IdProduct = id,
                NameProduct = _id.NameProduct,
                TypeProduct = _id.TypeProduct,
                PriceProduct = _id.PriceProduct,
                TotalProduct = totalall.ToString(),
                unitProduct = _id.unitProduct,
                StatusProduct = _id.StatusProduct,
                CostProduct = _id.CostProduct,
                AmountProduct = amountall.ToString(),
                // TotalProduct = _id.TotalProduct,
                TotalShow = _id.Total,
                Total = _id.Total,

            };
            DataProduct.Remove(_id);
            DataProduct.Add(item);
            return item;
            // var _id = DataProduct.FirstOrDefault(it => it.IdOrder == id.ToString());
            // var getcheck = DataProduct.FirstOrDefault(it => it.IdOrder == id.ToString());
            // // จำนวนขาย
            // int SellTotal = int.Parse(getcheck.AmountProduct);
            // int Sell = int.Parse(AmountProduct);
            // int SellTotals = 0;

            // // จำนวนทั้งหมด      
            // int AllTotal = int.Parse(getcheck.TotalProduct);
            // int All = int.Parse(AmountProduct);
            // int AllTotals = 0;


            // if (AmountProduct != null)
            // {
            //     SellTotals = SellTotal - SellTotal;
            //     AllTotals = AllTotal + SellTotal;
            // }         

            // var item = new Product
            // {
            //     IdOrder = _id.IdOrder,
            //     IdProduct = id,
            //     NameProduct = _id.NameProduct,
            //     TypeProduct = _id.TypeProduct,
            //     PriceProduct = _id.PriceProduct,
            //     TotalProduct = AllTotals.ToString(),
            //     Total = _id.Total,
            //     StatusProduct = _id.StatusProduct,
            //     AmountProduct = SellTotals.ToString(),
            //     CostProduct = _id.CostProduct,

            // };
            // DataProduct.Remove(_id);
            // DataProduct.Add(item);
            // return item;
        }
    }
}