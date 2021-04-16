namespace PregnancyDiary.Web.Models.Users.ViewModels
{
    using System;

    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class UserFavouriteArticlesViewModel : IMapFrom<UserArticleLike>
    {
        public string ArticleId { get; set; }

        public string ArticleTitle { get; set; }

        public DateTime ArticleCreatedOn { get; set; }

        public string ArticlePicture { get; set; }

        public string ArticleCategoryId { get; set; }

        public string ArticleCategoryName { get; set; }
    }
}
