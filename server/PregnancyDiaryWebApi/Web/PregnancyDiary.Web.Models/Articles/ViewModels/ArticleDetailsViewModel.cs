namespace PregnancyDiary.Web.Models.Articles.ViewModels
{
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class ArticleDetailsViewModel : ArticleViewModel, IMapFrom<Article>
    {
        public string Author { get; set; }

        public string CategoryId { get; set; }

        public bool IsFavourite { get; set; }
    }
}
