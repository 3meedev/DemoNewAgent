namespace AMApi.Models
{
    public class Admin
    {
        public string IdAdmin { get; set; }
        public string NameAdmin { get; set; }
        public string UsernameAdmin { get; set; }
        public string PasswordAdmin { get; set; }
        public string TelAdmin { get; set; }
        public string LevelAdmin { get; set; }
        public string AddressAdmin { get; set; }
        public string File { get; set; }
        
    }
     public class User
    {
        public string IdUser { get; set; }
        public string NameUser { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string TelUser { get; set; }
        public string StatusUser { get; set; }
        public string AddressUser { get; set; }
        public string CardUser { get; set; }
    }

}