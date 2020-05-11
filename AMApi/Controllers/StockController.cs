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

    public class StockController : ControllerBase
    {
        public static List<Stock> Stock = new List<Stock>
        {

        };
        public static List<Product> Product = new List<Product>
        {
        };
        [HttpGet]
        public ActionResult<IEnumerable<Stock>> GetStockAll()
        {
            return Stock.ToList();
        }
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProductAll()
        {
            return Product.ToList();
        }



        [HttpGet("{id}")]
        public ActionResult<Stock> GetStockById(string id)
        {
            return Stock.FirstOrDefault(it => it.IdStock == id.ToString());
        }

        [HttpGet("{month}/{year}")]
        public ActionResult<Stock> GetStock(string month, string year)
        {
            DateTime now = DateTime.Now;
            return Stock.Find(it => DateTime.Parse(it.StockPerMonth).Month == now.Month && DateTime.Parse(it.StockPerMonth).Year == now.Year);

        }

        [HttpPost]
        public Stock AddStockTest([FromBody] Stock Stockx)
        {
            Guid id = Guid.NewGuid();
            var addDate = DateTime.Now;
           
            var item = new Stock
            {
                IdStock = id.ToString(),
                DataProductPerMonth = Stockx.DataProductPerMonth.ToArray(),
                StockPerMonth = addDate.ToString()
            };

            
            Stock.Add(item);
            return item;

        }

        [HttpPut("{id}")]
        public Stock UpdateStock(string id, [FromBody] Stock Stockx)
        {
            var _id = Stock.FirstOrDefault(it => it.IdStock == id.ToString());
            var addDate = DateTime.Now;                
            var item = new Stock
            {
                IdStock = _id.IdStock,                
                DataProductPerMonth = Stockx.DataProductPerMonth.ToArray(),
                StockPerMonth = addDate.ToString()
            };
            Stock.Remove(_id);
            Stock.Add(item);
            return item;
        }
    }
}

