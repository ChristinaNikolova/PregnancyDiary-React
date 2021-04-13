namespace PregnancyDiary.Web.Models.Account.ViewModels
{
    public class AuthenticationViewModel
    {
        public string Username { get; set; }

        public string Message { get; set; }

        public string Token { get; set; }

        public bool IsAdmin { get; set; }
    }
}
