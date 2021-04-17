namespace PregnancyDiary.Web.Models.Admin.Articles.InputModels
{
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Common;

    public class CreateArticleInputModel
    {
        [Required]
        [StringLength(DataValidation.Article.TitleMaxLenght, ErrorMessage = Messages.Error.RequiredMinMaxLength, MinimumLength = DataValidation.Article.TitleMinLenght)]
        public string Title { get; set; }

        [Required]
        [StringLength(DataValidation.Article.ContentMaxLenght, ErrorMessage = Messages.Error.RequiredMinMaxLength, MinimumLength = DataValidation.Article.ContentMinLenght)]
        public string Content { get; set; }

        [Required]
        public string Picture { get; set; }

        public string CategoryName { get; set; }
    }
}
