namespace PregnancyDiary.Web.Models.Account.InputModels
{
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Common;

    public class RegisterInputModel
    {
        [Required]
        [MinLength(DataValidation.User.UsernameMinLength, ErrorMessage = Messages.Error.UsernameMinLength)]
        public string Username { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = Messages.Error.InvalidEmail)]
        public string Email { get; set; }

        [Required]
        [MinLength(DataValidation.User.PasswordMinLength, ErrorMessage = Messages.Error.PasswordMinLength)]
        public string Password { get; set; }
    }
}
