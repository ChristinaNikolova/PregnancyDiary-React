namespace PregnancyDiary.Web.Models.Admin.Categories.InputModels
{
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Common;

    public class CategoryInputModel
    {
        [Required]
        [StringLength(DataValidation.Category.NameMaxLenght, ErrorMessage = Messages.Error.RequiredMinMaxLength, MinimumLength = DataValidation.Category.NameMinLenght)]
        public string Name { get; set; }

        [Required]
        public string Picture { get; set; }
    }
}
