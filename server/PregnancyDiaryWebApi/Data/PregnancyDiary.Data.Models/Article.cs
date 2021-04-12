namespace PregnancyDiary.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Common;
    using PregnancyDiary.Data.Common.BaseModels;

    public class Article : BaseDeletableModel<string>
    {
        public Article()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Comments = new HashSet<Comment>();
            this.Likes = new HashSet<UserArticleLike>();
        }

        [Required]
        [MaxLength(DataValidation.Article.TitleMaxLenght)]
        public string Title { get; set; }

        [Required]
        [MaxLength(DataValidation.Article.ContentMaxLenght)]
        public string Content { get; set; }

        [Required]
        public string Picture { get; set; }

        [Required]
        [MaxLength(DataValidation.Article.AuthorNameMaxLenght)]
        public string Author { get; set; }

        [Required]
        public string CategoryId { get; set; }

        public virtual Category Category { get; set; }

        public virtual ICollection<UserArticleLike> Likes { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
