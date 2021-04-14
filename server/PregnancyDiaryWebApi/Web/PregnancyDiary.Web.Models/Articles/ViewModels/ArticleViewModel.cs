namespace PregnancyDiary.Web.Models.Articles.ViewModels
{
    using System;

    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class ArticleViewModel : IMapFrom<Article>
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string ShortContent
            => this.Content.Substring(0, 250);

        public string Picture { get; set; }

        public string CategoryName { get; set; }

        public int LikesCount { get; set; }

        public int CommentsCount { get; set; }

        public DateTime CreatedOn { get; set; }

        public string CreatedOnAsString
            => this.CreatedOn.ToShortDateString();
    }
}
