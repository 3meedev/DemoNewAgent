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

    public class StoreController : ControllerBase
    {

        public static List<Store> DataStore = new List<Store>
        {
            // new Store {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TotalProduct="1",AddProductStore = "03/12/2563 13:28:15",CostProduct="2999"}
            // new Store {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TotalProduct="1",AddProductStore = "03/11/2563 13:28:15",CostProduct="2999"},
            // new Store {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TotalProduct="1",AddProductStore = "03/1/2563 13:28:15",CostProduct="2999"},
            // new Store {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TotalProduct="1",AddProductStore = "03/2/2563 13:28:15",CostProduct="2999"},
            // new Store {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TotalProduct="1",AddProductStore = "03/3/2563 13:28:15",CostProduct="2999"},
            // new Store {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TotalProduct="1",AddProductStore = "03/4/2563 13:28:15",CostProduct="2999"},
            // new Store {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TotalProduct="1",AddProductStore = "03/5/2563 13:28:15",CostProduct="2999"},
            // new Store {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TotalProduct="1",AddProductStore = "03/6/2563 13:28:15",CostProduct="2999"},
            // new Store {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TotalProduct="1",AddProductStore = "03/7/2563 13:28:15",CostProduct="2999"},
            // new Store {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TotalProduct="1",AddProductStore = "03/8/2563 13:28:15",CostProduct="2999"},
            // new Store {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TotalProduct="1",AddProductStore = "03/9/2563 13:28:15",CostProduct="2999"},
            // new Store {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TotalProduct="1",AddProductStore = "03/10/2563 13:28:15",CostProduct="2999"},
        };


        [HttpGet]
        public ActionResult<IEnumerable<Store>> GetStoreAll()
        {
            return DataStore.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Store> GetStoreById(string id)
        {
            return DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());
        }
        [HttpGet("{data}")]
        public ActionResult<IEnumerable<Store>> Getstoredatebyyear(string data)
        {
            return DataStore.ToList().FindAll(it => DateTime.Parse(it.AddProductStore).Year.ToString() == data);
        }

        [HttpGet("{data}")]
        public ActionResult<IEnumerable<Store>> Getstoredatebymouth(string data)
        {
            return DataStore.ToList().FindAll(it => DateTime.Parse(it.AddProductStore).Month.ToString() == data);
        }


        [HttpGet("{data}/{data2}")]
        public ActionResult<IEnumerable<Store>> Getstoredatebyfindall(string data, string data2)
        {
            return DataStore.ToList().FindAll(it => (DateTime.Parse(it.AddProductStore).Year.ToString() == data) && ((DateTime.Parse(it.AddProductStore).Month.ToString() == data2)));
        }
        [HttpPost]
        public Store AddStore([FromBody] Store Storex)
        {

            var addDate = DateTime.Now;

            var item = new Store
            {

                IdUser = Storex.IdStore,
                NameUser = Storex.NameUser,
                IdProduct = Storex.IdProduct,
                NameProduct = Storex.NameProduct,
                TotalProduct = Storex.TotalProduct,
                UnitProduct = Storex.UnitProduct,
                StatusProduct = Storex.StatusProduct,
                CostProduct = Storex.CostProduct,
                AddProductStore = DateTime.Now.ToString("dd/MM/yyyy")

            };

            DataStore.Add(item);
            return item;
        }

        [HttpPut("{id}")]
        public Store EditStore(string id, [FromBody] Store Storex)
        {
            var idx = DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());
            var editDate = DateTime.Now;
            var item = new Store
            {
                IdStore = id.ToString(),
                IdUser = Storex.IdUser,
                NameUser = Storex.NameUser,
                IdProduct = Storex.IdProduct,
                NameProduct = Storex.NameProduct,
                statusclear = Storex.statusclear,
                TotalProduct = Storex.TotalProduct,
                UnitProduct = Storex.UnitProduct,
                EditProductStore = editDate
            };
            DataStore.Remove(idx);
            DataStore.Add(item);
            return item;

        }

        [HttpPut("{id}")]

        public Store EditStore2(string id, [FromBody] Store Storex)
        {
            var idx = DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());
            var editDate = DateTime.Now;
            var item = new Store
            {
                NameProduct = idx.NameProduct,
                IdProduct = idx.IdProduct,
                TotalProduct = idx.TotalProduct,
                statusclear = Storex.statusclear
            };
            DataStore.Remove(idx);
            DataStore.Add(item);
            return item;

        }

        [HttpPut("{id}")]


        public Store ClearStore(string id, [FromBody] Store Storex)

        {

            var idx = DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());

            var clearDate = DateTime.Now;

            var item = new Store

            {
                IdStore = id.ToString(),
                ClearProductStore = clearDate
            };
            DataStore.Remove(idx);
            return item;
        }

        [HttpPut("{id}")]
        public Store SellTotalStore(string id, [FromBody] Store Storex)
        {
            var _id = DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());
            var getcheck = DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());
            int Total = int.Parse(getcheck.TotalProduct);
            int Sell = int.Parse(Storex.TotalProduct);
            int Totals = 0;

            if (getcheck.TotalProduct != "0")
            {
                Totals = Total - Sell;
            }
            var item = new Store
            {
                IdProduct = _id.IdProduct,
                NameProduct = _id.NameProduct,
                TotalProduct = Totals.ToString(),
            };
            DataStore.Remove(_id);
            DataStore.Add(item);
            return item;

        }

        [HttpPut("{id}")]
        public Store TotalStore(string id, [FromBody] Store Storex)
        {
            var _id = DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());
            var getcheck = DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());
            int Total = int.Parse(getcheck.TotalProduct);
            int Add = int.Parse(Storex.TotalProduct);
            int Totals = 0;

            if (getcheck.Total == "0")
            {
                Total = 0;
                Totals = Total + Add;
            }
            else
            {
                Totals = Total + Add;
            }

            var item = new Store
            {
                IdUser = Storex.IdStore,
                NameUser = Storex.NameUser,
                IdProduct = Storex.IdProduct,
                NameProduct = Storex.NameProduct,
                TotalProduct = Storex.TotalProduct,
                UnitProduct = Storex.UnitProduct,
                Total = Totals.ToString(),



            };
            DataStore.Remove(_id);
            DataStore.Add(item);
            return item;
        }
    }


}

