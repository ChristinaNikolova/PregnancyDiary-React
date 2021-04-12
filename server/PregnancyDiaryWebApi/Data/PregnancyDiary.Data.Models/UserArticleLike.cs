namespace PregnancyDiary.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class UserArticleLike
    {
        [Required]
        public string ArticleId { get; set; }

        public virtual Article Article { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }
    }
}
