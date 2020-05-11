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



    public class UserController : ControllerBase
    {


        public static List<Admin> DataAdmin = new List<Admin>
        {
            new Admin { IdAdmin = "1", NameAdmin = "admin1" , UsernameAdmin =  "1234", PasswordAdmin = "1234" ,TelAdmin = "0165466516" , LevelAdmin = "Admin" ,AddressAdmin = "15/8 ขอนแก่น"},
            // new Admin { IdAdmin = "2", NameAdmin = "admin2" , UsernameAdmin =  "12345", PasswordAdmin = "12345" ,TelAdmin = "0665606411" , LevelAdmin = "Meneger" ,AddressAdmin = "8/1 นครพนม"},
            // new Admin { IdAdmin = "3", NameAdmin = "admin3" , UsernameAdmin =  "123456", PasswordAdmin = "123456" ,TelAdmin = "0916113237" , LevelAdmin = "Head" ,AddressAdmin = "15/8 นครราชสีมา"}
        };

        [HttpGet]
        public ActionResult<IEnumerable<Admin>> GetAdminAll()
        {
            return DataAdmin.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Admin> GetAdminById(string id)
        {
            return DataAdmin.FirstOrDefault(it => it.IdAdmin == id.ToString());
        }

        [HttpPost]
        public Admin AddAdmin([FromBody] Admin Adminx)
        {
            var id = Guid.NewGuid().ToString();
            var item = new Admin
            {
                IdAdmin = id,
                NameAdmin = Adminx.NameAdmin,
                TelAdmin = Adminx.TelAdmin,
                UsernameAdmin = Adminx.UsernameAdmin,
                PasswordAdmin = Adminx.PasswordAdmin,
                LevelAdmin = Adminx.LevelAdmin,
                AddressAdmin = Adminx.AddressAdmin,
                File = Adminx.File
            };

            DataAdmin.Add(item);
            return item;
        }

        [HttpPut("{id}")]
        public Admin EditAdmin(string id, [FromBody] Admin Adminx)
        {
            var _id = DataAdmin.FirstOrDefault(it => it.IdAdmin == id.ToString());
            var item = new Admin
            {
                IdAdmin = id,
                NameAdmin = Adminx.NameAdmin,
                TelAdmin = Adminx.TelAdmin,
                UsernameAdmin = Adminx.UsernameAdmin,
                PasswordAdmin = Adminx.PasswordAdmin,
                LevelAdmin = Adminx.LevelAdmin,
                AddressAdmin = Adminx.AddressAdmin
            };
            DataAdmin.Remove(_id);
            DataAdmin.Add(item);
            return item;

        }

        [HttpDelete("{id}")]
        public void DeleteAdmin(string id)
        {
            var delete = DataAdmin.FirstOrDefault(it => it.IdAdmin == id.ToString());
            DataAdmin.Remove(delete);
        }
        // -----------------------------------------------------------------------------

        public static List<User> DataUser = new List<User>
        {
             new User { IdUser = "1", NameUser = "บอล" , Username =  "1234", Password = "1234",TelUser="dfgdfgdfg",AddressUser = "gfdgfdgfdg", StatusUser = "พร้อมใช้งาน",CardUser = "1125533448652"}

        };
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUserAll()
        {
            return DataUser.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetUserById(string id)
        {
            return DataUser.FirstOrDefault(it => it.IdUser == id.ToString());
        }
        [HttpGet("{data}")]
        public ActionResult<User> GetUserBydata(string data)
        {
            return DataUser.FirstOrDefault(it => it.Username == data);
        }

        [HttpPost]
        public User AddUser([FromBody] User Userx)
        {
            var id = Guid.NewGuid().ToString();
            var item = new User
            {
                IdUser = id,
                NameUser = Userx.NameUser,
                TelUser = Userx.TelUser,
                Username = Userx.Username,
                Password = Userx.Password,
                StatusUser = Userx.StatusUser,
                AddressUser = Userx.AddressUser,
                CardUser = Userx.CardUser

            };

            DataUser.Add(item);
            return item;
        }

        [HttpPut("{id}")]
        public User EditUser(string id, [FromBody] User Userx)
        {
            var _id = DataUser.FirstOrDefault(it => it.IdUser == id.ToString());
            var item = new User
            {
                IdUser = id,
                NameUser = Userx.NameUser,
                TelUser = Userx.TelUser,
                Username = Userx.Username,
                Password = Userx.Password,
                StatusUser = Userx.StatusUser,
                AddressUser = Userx.AddressUser,
                CardUser = Userx.CardUser
            };
            DataUser.Remove(_id);
            DataUser.Add(item);
            return item;

        }

        [HttpDelete("{id}")]
        public void DeleteUser(string id)
        {
            var delete = DataUser.FirstOrDefault(it => it.IdUser == id.ToString());
            DataUser.Remove(delete);
        }

        

    }


}