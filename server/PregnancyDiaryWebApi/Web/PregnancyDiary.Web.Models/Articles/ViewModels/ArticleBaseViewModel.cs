namespace PregnancyDiary.Web.Models.Articles.ViewModels
{
    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class ArticleBaseViewModel : IMapFrom<Article>
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Picture { get; set; }

        public string CategoryName { get; set; }

        public int LikesCount { get; set; }

        public int CommentsCount { get; set; }
    }
}
