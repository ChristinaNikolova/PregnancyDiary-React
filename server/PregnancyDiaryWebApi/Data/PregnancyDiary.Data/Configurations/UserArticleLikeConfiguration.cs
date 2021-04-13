namespace PregnancyDiary.Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using PregnancyDiary.Data.Models;

    public class UserArticleLikeConfiguration : IEntityTypeConfiguration<UserArticleLike>
    {
        public void Configure(EntityTypeBuilder<UserArticleLike> userArticleLike)
        {
            userArticleLike
                .HasKey(ual => new { ual.UserId, ual.ArticleId });
        }
    }
}
