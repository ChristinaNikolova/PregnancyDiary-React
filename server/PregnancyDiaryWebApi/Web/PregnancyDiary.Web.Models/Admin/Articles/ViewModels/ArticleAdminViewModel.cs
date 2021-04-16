namespace PregnancyDiary.Web.Models.Admin.Articles.ViewModels
{
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;
    using PregnancyDiary.Web.Models.Articles.ViewModels;

    public class ArticleAdminViewModel : ArticleBaseViewModel, IMapFrom<Article>
    {
        public string CategoryId { get; set; }
    }
}
