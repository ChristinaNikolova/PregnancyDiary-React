namespace PregnancyDiary.Web.Models.Admin.Articles.InputModels
{
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class UpdateArticleInputModel : CreateArticleInputModel, IMapFrom<Article>
    {
        [Required]
        public string Id { get; set; }
    }
}
