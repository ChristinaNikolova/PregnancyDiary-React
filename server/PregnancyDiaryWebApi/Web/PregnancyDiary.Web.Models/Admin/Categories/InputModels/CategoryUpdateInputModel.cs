namespace PregnancyDiary.Web.Models.Admin.Categories.InputModels
{
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Common;
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class CategoryUpdateInputModel : IMapFrom<Category>
    {
        [Required]
        public string Id { get; set; }

        [Required]
        [StringLength(DataValidation.Category.NameMaxLenght, ErrorMessage = Messages.Error.RequiredMinMaxLength, MinimumLength = DataValidation.Category.NameMinLenght)]
        public string Name { get; set; }

        [Required]
        public string Picture { get; set; }
    }
}
